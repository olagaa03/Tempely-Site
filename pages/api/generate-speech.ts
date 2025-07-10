import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { topic, tone } = req.body;
  if (!topic || !tone) return res.status(400).json({ error: 'Missing topic or tone.' });

  const prompt = `Write a ${tone} speech about: ${topic}`;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 400,
        temperature: 0.8,
      }),
    });

    if (!openaiRes.ok) {
      const error = await openaiRes.text();
      return res.status(500).json({ error });
    }

    const data = await openaiRes.json();
    const speech = data.choices?.[0]?.message?.content || '';
    res.status(200).json({ speech });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate speech.' });
  }
} 