import type { NextApiRequest, NextApiResponse } from 'next';

const ENDPOINT = 'https://api.dev.runwayml.com/v1/upscale_video';
const RUNWAY_VERSION = '2024-11-06'; // Update if needed from docs
const MODEL = 'gen4_turbo'; // Use the model you have access to

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { videoUrl } = req.body;
  if (!videoUrl) return res.status(400).json({ error: 'Missing videoUrl.' });
  try {
    const runwayRes = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Runway-Version': RUNWAY_VERSION,
      },
      body: JSON.stringify({
        videoUrl,
        model: MODEL,
      }),
    });
    if (!runwayRes.ok) {
      const errorText = await runwayRes.text();
      console.error('RunwayML upscale-video error:', errorText);
      return res.status(500).json({ error: errorText });
    }
    const data = await runwayRes.json();
    const jobId = data.id;
    if (!jobId) return res.status(500).json({ error: 'No job ID returned.' });
    // Poll for completion
    let upscaledUrl = null;
    let status = '';
    for (let i = 0; i < 15; i++) {
      await new Promise(r => setTimeout(r, 4000));
      const pollRes = await fetch(`https://api.dev.runwayml.com/v1/tasks/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
          'X-Runway-Version': RUNWAY_VERSION,
        },
      });
      if (!pollRes.ok) continue;
      const pollData = await pollRes.json();
      status = pollData.status;
      upscaledUrl = pollData.result?.video_url || pollData.output?.[0] || null;
      if (status === 'succeeded' && upscaledUrl) break;
      if (status === 'failed') break;
    }
    if (status === 'succeeded' && upscaledUrl) {
      return res.status(200).json({ upscaledUrl });
    } else if (status === 'failed') {
      return res.status(500).json({ error: 'Upscale failed.' });
    } else {
      return res.status(500).json({ error: 'Upscale timed out.' });
    }
  } catch (err) {
    console.error('RunwayML upscale-video API error:', err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
} 