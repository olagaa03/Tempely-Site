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

// --- New: Frameworks and Vibes ---
const FRAMEWORKS = [
  'AIDA (Attention, Interest, Desire, Action)',
  'PAS (Problem, Agitation, Solution)',
  'Storytelling',
  'Listicle',
  'Bold/Controversial',
  'Educational',
  'Conversational',
];
const VIBES = [
  'Bold',
  'Funny',
  'Controversial',
  'Educational',
  'Inspiring',
  'Disruptive',
  'Relatable',
  'High-Energy',
];

// --- Schema Update ---
const FullScriptSchema = z.object({
  niche: z.string().min(1),
  platform: z.string().min(1),
  audience: z.string().min(1),
  format: z.string().min(1),
  extra: z.string().optional(),
  tone: z.string().optional(),
  goal: z.string().optional(),
  framework: z.string().optional(),
  vibe: z.string().optional(),
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
  framework: z.string().optional(),
  vibe: z.string().optional(),
});

// --- Helper: Critique & Improve Prompt ---
async function critiqueAndImprove(prompt: string, output: string) {
  // Step 1: Critique
  const critiquePrompt = `You are a world-class content strategist. Critique the following script for originality, engagement, and effectiveness. List 2-3 specific ways it could be improved.\n\nScript:\n${output}`;
  const critiqueRes = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: critiquePrompt }],
    temperature: 0.7,
    max_tokens: 300,
  });
  const critique = critiqueRes.choices?.[0]?.message?.content?.trim();

  // Step 2: Improve
  const improvePrompt = `You are a world-class content strategist. Here is a critique of a script, followed by the original script. Rewrite the script to address the critique and make it more original, engaging, and effective.\n\nCritique:\n${critique}\n\nOriginal Script:\n${output}\n\nImproved Script:`;
  const improveRes = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: improvePrompt }],
    temperature: 0.8,
    max_tokens: 800,
  });
  const improved = improveRes.choices?.[0]?.message?.content?.trim();
  return { critique, improved };
}

// --- Main Handler ---
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
  let niche, format, audience, platform, extra, tone, goal, framework, vibe, regenerateBlock, blockContent, scriptContext;
  if (req.body.regenerateBlock) {
    parsed = RegenerateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid or missing input fields for regeneration.' });
    }
    ({ regenerateBlock, blockContent, scriptContext, tone, goal, platform, format, audience, niche, extra, framework, vibe } = parsed.data);
  } else {
    parsed = FullScriptSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid or missing input fields.' });
    }
    ({ niche, format, audience, platform, extra, tone, goal, framework, vibe } = parsed.data);
  }

  // --- Prompt Engineering ---
  let prompt;
  if (regenerateBlock && scriptContext && blockContent) {
    // Regenerate only a specific block (with framework/vibe)
    let extraBlockInstructions = `\nFramework: ${framework || 'Best for this content'}\nVibe: ${vibe || 'Best for this audience'}\n`;
    extraBlockInstructions += `\nInstructions:\n- You are a world-renowned, in-demand ${niche || scriptContext.niche || '[NICHE]'} content strategist.\n- Write as a real human expert, not an AI.\n- Reference real pain points, trends, or language from the ${niche || scriptContext.niche || '[NICHE]'} world.\n- Be bold, opinionated, and original—avoid generic or “AI-sounding” lines.\n- Use the selected framework and vibe.\n- Do NOT return a list or multiple options—just one line/block.\n- Match the style, tone, and context of the rest of the script.`;
    prompt = `You are a world-class video content strategist and scriptwriter.\n\nHere is the current script context:\nScript Title: ${scriptContext.title}\nLength: ${scriptContext.length}\nVibe: ${scriptContext.vibe}\nGoal: ${scriptContext.goal}\nTone: ${tone || scriptContext.tone || ''}\nPlatform: ${platform}\nFormat: ${format}\nTarget Audience: ${audience}\n\nScript:\n${scriptContext.script}\n\nRegenerate ONLY the following block:\nBlock Label: ${regenerateBlock}\nCurrent Block Content: ${blockContent}\n${extraBlockInstructions}`;
  } else {
    // Full script generation (with framework/vibe)
    prompt = `\nYou are a world-class video content strategist and scriptwriter.\n\nYour job is to create a high-converting, visually organized video script for the following:\n- Niche: ${niche}\n- Format: ${format}\n- Target Audience: ${audience}\n- Platform: ${platform}\n- Tone: ${tone || ''}\n- Goal: ${goal || ''}\n- Framework: ${framework || 'Best for this content'}\n- Vibe: ${vibe || 'Best for this audience'}\n${extra ? `- Extra Instructions: ${extra}` : ''}\n\nDELIVER THE FOLLOWING SECTIONS (use clear section headers, bolded with **, and keep the order):\n\n**Script Title:**\nGive a punchy, creative title for the script.\n\n**Length:**\nEstimate the video length in seconds.\n\n**Vibe:**\nDescribe the style/tone (e.g., bold, punchy, educational, fun, disruptive).\n\n**Goal:**\nState the main goal of the script (e.g., drive engagement, educate, inspire action).\n\n**Script:**\nBreak the script into labeled time blocks (e.g., [HOOK | 0–4s], [TRUTH DROP | 4–12s], [REALITY CHECK | 12–21s], [CTA | 21–27s]). Use clear labels and keep each block concise and actionable. Use line breaks for clarity.\n\n**Caption:**\nWrite a compelling caption for posting this video on ${platform}. Include relevant hashtags if appropriate.\n\n**CTA:**\nWrite a strong call to action for the end of the video or for the caption.`;
  }

  try {
    // Step 1: Generate
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.85,
      max_tokens: 900,
    });
    const output = response.choices?.[0]?.message?.content?.trim();
    if (!output) {
      return res.status(500).json({ error: 'No content returned from OpenAI.' });
    }

    // Step 2: Critique & Improve
    const { critique, improved } = await critiqueAndImprove(prompt, output);

    if (regenerateBlock && scriptContext) {
      // Return only the regenerated block (improved)
      return res.status(200).json({ result: improved, critique });
    }

    return res.status(200).json({ result: improved, critique });
  } catch (error: any) {
    console.error('❌ Pro API error:', error?.message || error);
    return res.status(500).json({ error: 'Pro content generation failed.' });
  }
}
