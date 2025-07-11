import type { NextApiRequest, NextApiResponse } from 'next';

const ENDPOINT = 'https://api.dev.runwayml.com/v1/text_to_image';
const RUNWAY_VERSION = '2024-11-06'; // Update if needed from docs

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt.' });
  try {
    const runwayRes = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Runway-Version': RUNWAY_VERSION,
      },
      body: JSON.stringify({
        prompt,
        model: 'gen4_turbo'
      }),
    });
    if (!runwayRes.ok) {
      const errorText = await runwayRes.text();
      console.error('RunwayML text-to-image error:', errorText);
      // Improved error handling for moderation/invalid prompt
      if (errorText.includes('Invalid value') || errorText.toLowerCase().includes('moderation')) {
        return res.status(400).json({ error: 'Your prompt was blocked by our safety filters. Please try a different description.' });
      }
      return res.status(500).json({ error: errorText });
    }
    const data = await runwayRes.json();
    const imageUrl = data.result?.image_url || data.image_url || data.output?.[0] || null;
    if (!imageUrl) return res.status(500).json({ error: 'No image URL returned.' });
    res.status(200).json({ imageUrl });
  } catch (err) {
    console.error('RunwayML text-to-image API error:', err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
} 