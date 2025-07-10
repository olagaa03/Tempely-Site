import type { NextApiRequest, NextApiResponse } from 'next';

const ENDPOINT = 'https://api.dev.runwayml.com/v1/image_to_video';
const RUNWAY_VERSION = '2024-11-06'; // Update if needed from docs
const MODEL = 'gen4_turbo'; // Use the model you have access to

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { promptImage, promptText } = req.body;
  if (!promptImage) return res.status(400).json({ error: 'Missing promptImage.' });
  try {
    const runwayRes = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Runway-Version': RUNWAY_VERSION,
      },
      body: JSON.stringify({
        promptImage,
        promptText: promptText || '',
        model: MODEL,
        duration: 5,
        ratio: '1280:720',
      }),
    });
    if (!runwayRes.ok) {
      const errorText = await runwayRes.text();
      console.error('RunwayML image-to-video error:', errorText);
      return res.status(500).json({ error: errorText });
    }
    const data = await runwayRes.json();
    const jobId = data.id;
    if (!jobId) return res.status(500).json({ error: 'No job ID returned.' });
    // Poll for completion
    let videoUrl = null;
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
      videoUrl = pollData.result?.video_url || pollData.output?.[0] || null;
      if (status === 'succeeded' && videoUrl) break;
      if (status === 'failed') break;
    }
    if (status === 'succeeded' && videoUrl) {
      return res.status(200).json({ videoUrl });
    } else if (status === 'failed') {
      return res.status(500).json({ error: 'Video generation failed.' });
    } else {
      return res.status(500).json({ error: 'Video generation timed out.' });
    }
  } catch (err) {
    console.error('RunwayML image-to-video API error:', err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
} 