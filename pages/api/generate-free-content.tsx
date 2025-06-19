import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    niche,
    platform,
    audience,
    tone,
    goal,
    product,
    pain,
  } = req.body;

  if (!niche || !platform) {
    return res.status(400).json({ error: 'Missing required fields: niche or platform' });
  }

  const prompt = `
Generate 2 short and engaging social media captions and 2 hooks for a brand.

Niche: ${niche}
Platform: ${platform}
Audience: ${audience || 'Not specified'}
Tone: ${tone || 'Not specified'}
Goal: ${goal || 'Not specified'}
Product: ${product || 'Not specified'}
Pain Point: ${pain || 'Not specified'}

Format:
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
        {
          role: 'system',
          content: 'You are a helpful social media assistant.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 400,
    });

    const output = response.choices[0]?.message?.content?.trim();

    if (!output) {
      return res.status(500).json({ error: 'No content returned from OpenAI' });
    }

    return res.status(200).json({ result: output });
  } catch (err: any) {
    console.error('[OpenAI Error]', err?.message || err);
    return res.status(500).json({ error: 'Something went wrong with OpenAI' });
  }
}
