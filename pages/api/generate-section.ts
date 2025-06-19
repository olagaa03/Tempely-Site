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
    product = 'Not specified',
    pain = 'Not specified',
    section,
  }: {
    niche: string;
    platform: string;
    audience: string;
    tone: string;
    goal: string;
    product?: string;
    pain?: string;
    section: string;
  } = req.body;

  if (!niche || !platform || !audience || !tone || !goal || !section) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Generate dynamic prompt
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
        Write 3 attention-grabbing hooks for use as openers in Reels or TikToks. Leverage curiosity, pain points, or controversy.
        
        Niche: ${niche}
        Platform: ${platform}
        Audience: ${audience}
        Tone: ${tone}
        Goal: ${goal}
        Product: ${product}
        Pain Point: ${pain}
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
        .filter(line => line.trim() && !/^\d+\.$/.test(line)) // removes "2." or "3."
        .map(line => line.replace(/^[-•\d.]+\s*/, '').trim()) // removes "-", "•", "1.", etc.
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

    const output = response.choices[0]?.message?.content?.trim();

if (!output) {
  return res.status(500).json({ error: 'No content returned' });
}

// ✅ Apply formatting before sending to frontend
return res.status(200).json({ result: formatOutput(output, section) }); // ✅ use cleaned output

  } catch (error: any) {
    console.error('[OpenAI Error]', error?.message || error);
    return res.status(500).json({ error: 'Something went wrong with OpenAI' });
  }
}
