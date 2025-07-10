import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { script, style } = req.body;
  if (!script) return res.status(400).json({ error: 'Missing script.' });

  // RunwayML Gen-2 text-to-video endpoint
  // Docs: https://docs.runwayml.com/docs/gen-2-api
  const endpoint = 'https://api.runwayml.com/v1/generate';

  try {
    const runwayRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: script + (style ? ` Style: ${style}` : ''),
        // You can add more parameters here if needed (e.g., seed, output_format)
      }),
    });

    if (!runwayRes.ok) {
      const error = await runwayRes.text();
      return res.status(500).json({ error });
    }

    const data = await runwayRes.json();
    // The response will contain a video URL or a job ID for polling
    // For simplicity, assume synchronous (video_url in response)
    // If async, you may need to poll for completion
    const videoUrl = data.video_url || data.result?.video || null;
    if (!videoUrl) return res.status(500).json({ error: 'No video URL returned from RunwayML.' });
    res.status(200).json({ videoUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate video.' });
  }
} 