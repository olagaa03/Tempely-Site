import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { z } from 'zod';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';

// In-memory rate limiter (per userId)
type UsageStore = {
  [userId: string]: {
    count: number;
    lastReset: number;
  };
};

const usageStore: UsageStore = {};
const MAX_REQUESTS = 5;
const TIME_WINDOW = 24 * 60 * 60 * 1000; // 24 hours

function isRateLimited(userId: string): boolean {
  const now = Date.now();
  const user = usageStore[userId];

  if (!user) {
    usageStore[userId] = { count: 1, lastReset: now };
    return false;
  }

  if (now - user.lastReset > TIME_WINDOW) {
    usageStore[userId] = { count: 1, lastReset: now };
    return false;
  }

  if (user.count >= MAX_REQUESTS) return true;

  user.count += 1;
  return false;
}

// Schema validation using Zod
const InputSchema = z.object({
  niche: z.string().min(1),
  platform: z.string().min(1),
  audience: z.string().min(1),
  tone: z.string().min(1),
  goal: z.string().min(1),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if user has unlimited generations subscription
    const user = await clerkClient.users.getUser(userId);
    const hasUnlimitedGenerations = user.publicMetadata?.unlimitedGenerations === true;
    
    if (!hasUnlimitedGenerations && isRateLimited(userId)) {
      return res.status(429).json({
        error: 'Free usage limit reached. Try again tomorrow or upgrade to unlimited generations for $9.99/month.',
      });
    }

    const parse = InputSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Invalid input fields' });
    }

    const { niche, platform, audience, tone, goal } = parse.data;

    if (!process.env.TEMPLY_FREE_API_KEY) {
      console.error('Missing TEMPLY_FREE_API_KEY');
      return res.status(500).json({ error: 'Server misconfiguration: API key missing' });
    }

    const openai = new OpenAI({
      apiKey: process.env.TEMPLY_FREE_API_KEY,
    });

    const prompt = `
Generate 1 basic content idea, 2 scroll-stopping captions, and 2 engaging hook ideas for content on ${platform}.
Make sure they're aligned with the following:

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

    console.log(`[SUCCESS] Content generated for user ${userId}${hasUnlimitedGenerations ? ' (unlimited)' : ''}`);
    return res.status(200).json({ result: output });
  } catch (error: any) {
    console.error('[Server Error]', error?.message || error);
    return res.status(500).json({ error: 'Content generation failed.' });
  }
}
