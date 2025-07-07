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
const FullScriptSchema = z.object({
  niche: z.string().min(1),
  platform: z.string().min(1),
  audience: z.string().min(1),
  format: z.string().min(1),
  extra: z.string().optional(),
  tone: z.string().optional(),
  goal: z.string().optional(),
});

const RegenerateSchema = z.object({
  regenerateBlock: z.string().min(1),
  blockContent: z.string().min(1),
  scriptContext: z.any(),
  tone: z.string().optional(),
  goal: z.string().optional(),
  platform: z.string().optional(),
  format: z.string().optional(),
  audience: z.string().optional(),
  niche: z.string().optional(),
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

  let parsed;
  let niche, format, audience, platform, extra, tone, goal, regenerateBlock, blockContent, scriptContext;
  if (req.body.regenerateBlock) {
    console.log('[DEBUG] Regeneration request body:', req.body);
    parsed = RegenerateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid or missing input fields for regeneration.' });
    }
    ({ regenerateBlock, blockContent, scriptContext, tone, goal, platform, format, audience, niche, extra } = parsed.data);
  } else {
    parsed = FullScriptSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid or missing input fields.' });
    }
    ({ niche, format, audience, platform, extra, tone, goal } = parsed.data);
  }

  if (regenerateBlock) {
    if (!blockContent) {
      return res.status(400).json({ error: 'Missing blockContent for regeneration.' });
    }
    if (!scriptContext) {
      return res.status(400).json({ error: 'Missing scriptContext for regeneration.' });
    }
    if (!regenerateBlock) {
      return res.status(400).json({ error: 'Missing regenerateBlock for regeneration.' });
    }
  }

  let prompt;
  if (regenerateBlock && scriptContext && blockContent) {
    // Regenerate only a specific block
    let extraBlockInstructions = '';
    if (/hook/i.test(regenerateBlock)) {
      extraBlockInstructions = `\nInstructions:\n- Return ONLY a single, creative, high-impact hook line for a TikTok video.\n- Make it scroll-stopping, punchy, and original.\n- Do NOT return a list or multiple options—just one line.\n- Do NOT repeat the label.\n- Match the style, tone, and context of the rest of the script.\n- Example of a good hook: (Animated, lively voice) \"Stop scrolling—this 3 seconds could change your content game!\"`;
    } else if (/value|proposition|drop/i.test(regenerateBlock)) {
      extraBlockInstructions = `\nInstructions:\n- Return ONLY a single, creative, high-value statement for this section.\n- Make it actionable, specific, and valuable.\n- Do NOT return a list or multiple options—just one line.\n- Do NOT repeat the label.\n- Match the style, tone, and context of the rest of the script.`;
    } else if (/cta|call to action/i.test(regenerateBlock)) {
      extraBlockInstructions = `\nInstructions:\n- Return ONLY a single, strong call to action.\n- Make it motivating, clear, and platform-appropriate.\n- Do NOT return a list or multiple options—just one line.\n- Do NOT repeat the label.\n- Match the style, tone, and context of the rest of the script.`;
    } else {
      extraBlockInstructions = `\nInstructions:\n- Return ONLY a single, creative, and contextually appropriate line for this section.\n- Do NOT return a list or multiple options—just one line.\n- Do NOT repeat the label.\n- Match the style, tone, and context of the rest of the script.`;
    }
    prompt = `You are a world-class video content strategist and scriptwriter.\n\nHere is the current script context:\nScript Title: ${scriptContext.title}\nLength: ${scriptContext.length}\nVibe: ${scriptContext.vibe}\nGoal: ${scriptContext.goal}\nTone: ${tone || scriptContext.tone || ''}\nPlatform: ${platform}\nFormat: ${format}\nTarget Audience: ${audience}\n\nScript:\n${scriptContext.script}\n\nRegenerate ONLY the following block:\nBlock Label: ${regenerateBlock}\nCurrent Block Content: ${blockContent}\n${extraBlockInstructions}`;
  } else {
    // Full script generation
    prompt = `
You are a world-class video content strategist and scriptwriter.

Your job is to create a high-converting, visually organized video script for the following:
- Niche: ${niche}
- Format: ${format}
- Target Audience: ${audience}
- Platform: ${platform}
- Tone: ${tone || ''}
- Goal: ${goal || ''}
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
  }

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

    if (regenerateBlock && scriptContext) {
      // Return only the regenerated block
      return res.status(200).json({ result: output });
    }

    console.log(`[PRO ✅] Content generated for user ${userId}`);
    return res.status(200).json({ result: output });
  } catch (error: any) {
    console.error('❌ Pro API error:', error?.message || error);
    return res.status(500).json({ error: 'Pro content generation failed.' });
  }
}
