import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';
import OpenAI from 'openai';
import { z } from 'zod';

const apiKey = process.env.TEMPLY_PRO_API_KEY;

if (!apiKey) {
  console.error('❌ TEMPLY_PRO_API_KEY missing in env!');
}

const openai = new OpenAI({ apiKey });

// Validate request body
const InputSchema = z.object({
  niche: z.string().min(1),
  platform: z.string().min(1),
  audience: z.string().min(1),
  format: z.string().min(1),
  extra: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: Please sign in.' });
  }

  // Check Clerk metadata for Pro access
  const user = await clerkClient.users.getUser(userId);
  if (!user.publicMetadata?.pro) {
    return res.status(403).json({ error: 'Forbidden: Pro access required.' });
  }

  const parsed = InputSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid or missing input fields.' });
  }

  const { niche, format, audience, platform, extra } = parsed.data;

  const prompt = `
You are a world-class video content strategist and scriptwriter.

Your job is to create a high-converting, visually organized video script for the following:
- Niche: ${niche}
- Format: ${format}
- Target Audience: ${audience}
- Platform: ${platform}
${extra ? `- Extra Instructions: ${extra}` : ''}

DELIVER THE FOLLOWING SECTIONS (use clear section headers, bolded with **, and keep the order):

**Script Title:**
Give a punchy, creative title for the script.

**Length:**
Estimate the video length in seconds.

**Vibe:**
Describe the style/tone (e.g., bold, punchy, educational, fun, disruptive).

**Goal:**
State the main goal of the script (e.g., drive engagement, educate, inspire action).

**Script:**
Break the script into labeled time blocks (e.g., [HOOK | 0–4s], [TRUTH DROP | 4–12s], [REALITY CHECK | 12–21s], [CTA | 21–27s]). Use clear labels and keep each block concise and actionable. Use line breaks for clarity.

**Caption:**
Write a compelling caption for posting this video on ${platform}. Include relevant hashtags if appropriate.

**CTA:**
Write a strong call to action for the end of the video or for the caption.
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.75,
      max_tokens: 800,
    });

    const output = response.choices?.[0]?.message?.content?.trim();

    if (!output) {
      return res.status(500).json({ error: 'No content returned from OpenAI.' });
    }

    console.log(`[PRO ✅] Content generated for user ${userId}`);
    return res.status(200).json({ result: output });
  } catch (error: any) {
    console.error('❌ Pro API error:', error?.message || error);
    return res.status(500).json({ error: 'Pro content generation failed.' });
  }
}
