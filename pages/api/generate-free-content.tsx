import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// In-memory rate limiter (per IP)
type UsageStore = {
  [ip: string]: {
    count: number;
    lastReset: number;
  };
};

const usageStore: UsageStore = {};
const MAX_REQUESTS = 5;
const TIME_WINDOW = 24 * 60 * 60 * 1000; // 24 hours

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const user = usageStore[ip];

  if (!user) {
    usageStore[ip] = { count: 1, lastReset: now };
    return false;
  }

  if (now - user.lastReset > TIME_WINDOW) {
    usageStore[ip] = { count: 1, lastReset: now };
    return false;
  }

  if (user.count >= MAX_REQUESTS) return true;

  user.count += 1;
  return false;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const {
      niche,
      platform,
      audience,
      tone,
      goal,
    }: {
      niche: string;
      platform: string;
      audience: string;
      tone: string;
      goal: string;
    } = req.body;

    if (!niche || !platform || !audience || !tone || !goal) {
      console.warn('Missing input fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown';

    if (isRateLimited(ip)) {
      console.log(`Rate limit exceeded for IP: ${ip}`);
      return res.status(429).json({
        error: 'Free usage limit reached. Try again tomorrow or upgrade to Temply Pro.',
      });
    }

    if (!process.env.TEMPLY_FREE_API_KEY) {
      console.error('Missing TEMPLY_FREE_API_KEY');
      return res.status(500).json({ error: 'Server misconfiguration: API key missing' });
    }

    const openai = new OpenAI({
      apiKey: process.env.TEMPLY_FREE_API_KEY,
    });

    const prompt = `
Generate 1 basic content idea, 2 scroll-stopping captions, and 2 engaging hook ideas for content on ${platform}.
Make sure they’re aligned with the following:

Niche: ${niche}
Audience: ${audience}
Tone: ${tone}
Goal: ${goal}

Structure:
Content Idea:
- ...

Captions:
1. ...
2. ...

Hooks:
1. ...
2. ...
`.trim();

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a skilled content strategist and copywriter.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.75,
      max_tokens: 500,
    });

    const output = response.choices[0]?.message?.content?.trim();

    if (!output) {
      console.error('No content returned from OpenAI');
      return res.status(500).json({ error: 'No content returned' });
    }

    console.log('Content generated successfully');
    return res.status(200).json({ result: output });
  } catch (error: any) {
    console.error('[Server Error]', error?.message || error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
