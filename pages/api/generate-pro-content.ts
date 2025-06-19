import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const apiKey = process.env.TEMPLY_PRO_API_KEY;

if (!apiKey) {
  console.error('❌ TEMPLY_PRO_API_KEY missing in env!');
}

const openai = new OpenAI({
  apiKey: apiKey!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { niche, platform, audience, tone, goal, product, pain, format } = req.body || {};

  if (!niche || !platform || !audience || !tone || !goal || !format) {
    return res.status(400).json({ error: 'Missing required fields in request body.' });
  }

  const prompt = `
You're a world-class brand strategist and content marketing expert.

Your task is to create marketing content that:
- Feels professionally written and emotionally compelling
- Is tailored to the user's niche, audience, and product
- Explains the strategic reasoning behind each section

FORMAT: ${format}

USER INPUT:
Niche: ${niche}
Platform: ${platform}
Audience: ${audience}
Tone: ${tone}
Goal: ${goal}
Product: ${product || 'Not specified'}
Customer Pain Point: ${pain || 'Not specified'}

DELIVER THE FOLLOWING SECTIONS:

1. **Captions**
Generate 3 unique, scroll-stopping ${format}s optimized for ${platform}. Match the tone "${tone}" and include relevant hashtags.

2. **Hook Ideas**
Write 3 attention-grabbing hooks to use as opening lines or intro text. Use curiosity or emotional triggers.

3. **Content Strategy Tip**
Give one tactical tip to improve performance for this format. Focus on trends, timing, formats, or creative approach.

4. **Why This Works**
Explain why these examples work — reference psychology, copywriting principles, audience targeting, or structure. Speak like a strategist, not an AI.
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

    return res.status(200).json({ result: output });
  } catch (error: any) {
    console.error('❌ Pro API error:', error?.message || error);
    return res.status(500).json({ error: 'Pro content generation failed. Check API key or logs.' });
  }
}
