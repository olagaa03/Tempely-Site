import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// In-memory IP rate limiter
type UsageStore = {
  [ip: string]: {
    count: number;
    lastReset: number;
  };
};

const usageStore: UsageStore = {};
const MAX_REQUESTS = 5;
const TIME_WINDOW = 24 * 60 * 60 * 1000; // 24h

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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { niche, platform, audience, tone, goal } = req.body || {};

  if (!niche || !platform || !audience || !tone || !goal) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: 'Free usage limit reached. Try again tomorrow or upgrade to Temply Pro.',
    });
  }

  const apiKey = process.env.TEMPLY_FREE_API_KEY;
  if (!apiKey) {
    console.error('❌ Missing FREE API key');
    return res.status(500).json({ error: 'Server misconfiguration: API key missing' });
  }

  const openai = new OpenAI({ apiKey });

  const prompt = `
Generate 2 scroll-stopping captions, 2 engaging hook ideas, and 1 basic content idea for content on ${platform}.
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

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a content strategist and copywriter.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const output = response.choices[0]?.message?.content?.trim();

    if (!output) {
      return res.status(500).json({ error: 'No content returned from OpenAI.' });
    }

    return res.status(200).json({ result: output });
  } catch (error: any) {
    console.error('❌ OpenAI Error:', error?.message || error);
    return res.status(500).json({ error: 'Failed to connect to OpenAI.' });
  }
}
