import type { NextApiRequest, NextApiResponse } from 'next';

const RUNWAY_API_URL = 'https://api.runwayml.com/v1';
const POLL_INTERVAL = 4000; // ms
const MAX_POLLS = 15; // ~60 seconds

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { script, style } = req.body;
  if (!script) return res.status(400).json({ error: 'Missing script.' });

  try {
    // 1. Submit the generation job
    const genRes = await fetch(`${RUNWAY_API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: script + (style ? ` Style: ${style}` : ''),
      }),
    });

    if (!genRes.ok) {
      const error = await genRes.text();
      return res.status(500).json({ error });
    }

    const genData = await genRes.json();
    const jobId = genData.id || genData.job_id;
    if (!jobId) return res.status(500).json({ error: 'No job ID returned from RunwayML.' });

    // 2. Poll for job completion
    let videoUrl = null;
    let status = '';
    for (let i = 0; i < MAX_POLLS; i++) {
      await new Promise(r => setTimeout(r, POLL_INTERVAL));
      const pollRes = await fetch(`${RUNWAY_API_URL}/jobs/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
        },
      });
      if (!pollRes.ok) continue;
      const pollData = await pollRes.json();
      status = pollData.status;
      videoUrl = pollData.result?.video || pollData.video_url || null;
      if (status === 'succeeded' && videoUrl) break;
      if (status === 'failed') break;
    }

    if (status === 'succeeded' && videoUrl) {
      return res.status(200).json({ videoUrl });
    } else if (status === 'failed') {
      return res.status(500).json({ error: 'Video generation failed.' });
    } else {
      return res.status(500).json({ error: 'Video generation timed out. Please try again later.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate video.' });
  }
} 