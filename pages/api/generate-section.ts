import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { z } from 'zod';
import { getAuth } from '@clerk/nextjs/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Input validation schema
const InputSchema = z.object({
  niche: z.string().min(1),
  platform: z.string().min(1),
  audience: z.string().min(1),
  tone: z.string().min(1),
  goal: z.string().min(1),
  section: z.string().min(1),
  product: z.string().optional(),
  pain: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: Please sign in.' });
  }

  const parsed = InputSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid or missing input fields' });
  }

  const { niche, platform, audience, tone, goal, product = 'Not specified', pain = 'Not specified', section } = parsed.data;

  const generatePrompt = (): string => {
    switch (section) {
      case 'captions':
        return `
Generate 3 unique, scroll-stopping captions optimized for ${platform}. Match the tone "${tone}" and include relevant hashtags. The copy should emotionally connect with the audience and drive engagement.

Niche: ${niche}
Audience: ${audience}
Product: ${product}
Pain Point: ${pain}
Goal: ${goal}
        `.trim();
      case 'hooks':
        return `
Write 3 attention-grabbing hooks for use as openers in Reels or TikToks. Leverage curiosity, pain points, or controversy. If the input is unclear or unusual, still generate best-practice hooks for a general audience. Never return an empty or generic response—always provide 3 bold, actionable hooks.

Niche: ${niche}
Platform: ${platform}
Audience: ${audience}
Tone: ${tone}
Goal: ${goal}
Product: ${product}
Pain Point: ${pain}
        `.trim();
      case 'ideas':
        return `
You are a world-class viral content strategist. Generate 3 original, non-generic content ideas or angles for creators in the ${niche} niche, targeting ${audience} on ${platform}. Each idea should be bold, trend-aware, and have viral potential. Avoid generic advice—reference real trends, pain points, or audience desires. If the input is unclear or unusual, still generate 3 best-practice ideas for a general audience. Never return an empty or generic response—always provide 3 actionable ideas.

Tone: ${tone}
Goal: ${goal}
        `.trim();
      case 'template':
        return `
You are a top-tier scriptwriter. Provide a reusable, high-converting video script template for the ${niche} niche on ${platform}, targeting ${audience}. The template should include labeled sections (e.g., [HOOK], [VALUE], [CTA]) and be adaptable for different topics. Keep it actionable and premium. If the input is unclear or unusual, still generate a best-practice template for a general audience. Never return an empty or generic response—always provide a full template.

Tone: ${tone}
Goal: ${goal}
        `.trim();
      case 'tip':
        return `
Give one tactical content strategy tip for improving performance on ${platform} in the ${niche} niche. Focus on trends, timing, or formats.
        `.trim();
      case 'why':
        return `
Explain why this kind of content works well. Reference emotional triggers, content psychology (e.g., urgency, validation), and strategic framing.

Audience: ${audience}
Tone: ${tone}
Product: ${product}
Pain Point: ${pain}
        `.trim();
      default:
        return '';
    }
  };

  const prompt = generatePrompt();
  if (!prompt) {
    return res.status(400).json({ error: 'Invalid section name' });
  }

  const formatOutput = (raw: string, section: string): string => {
    if (section === 'captions' || section === 'hooks') {
      return raw
        .split('\n')
        .filter(line => line.trim() && !/^\d+\.$/.test(line)) // remove "1.", "2.", etc.
        .map(line => line.replace(/^[-•\d.]+\s*/, '').trim()) // remove "-", "•", numbers
        .join('\n');
    }
    return raw.trim();
  };

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a senior brand strategist and persuasive content writer.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 600,
    });

    const output = response.choices?.[0]?.message?.content?.trim();

    // Fallback for empty or too-short output
    if (!output || output.length < 20) {
      return res.status(200).json({ result: 'Sorry, no content could be generated at this time. Please try again with more details or different input.' });
    }

    return res.status(200).json({ result: formatOutput(output, section) });
  } catch (error: any) {
    console.error('[OpenAI Error]', error?.message || error);
    return res.status(500).json({ error: 'Something went wrong with OpenAI. Please try again later.' });
  }
}
