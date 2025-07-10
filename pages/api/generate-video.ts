import type { NextApiRequest, NextApiResponse } from 'next';

const RUNWAY_API_URL = 'https://api.runwayml.com/v1';
const POLL_INTERVAL = 4000; // ms
const MAX_POLLS = 15; // ~60 seconds
const MODEL_NAME = 'gen-2'; // Update if your RunwayML dashboard uses a different model name

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { script, style } = req.body;
  if (!script) return res.status(400).json({ error: 'Missing script.' });

  try {
    // 1. Submit the generation job to the correct endpoint and payload
    const genRes = await fetch(`${RUNWAY_API_URL}/inferences`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        input: {
          prompt: script + (style ? ` Style: ${style}` : ''),
        },
      }),
    });

    if (!genRes.ok) {
      const errorText = await genRes.text();
      console.error('RunwayML /inferences error:', errorText);
      return res.status(500).json({ error: errorText });
    }

    const genData = await genRes.json();
    console.log('RunwayML /inferences response:', genData);
    const jobId = genData.id || genData.job_id;
    if (!jobId) {
      console.error('No job ID returned from RunwayML:', genData);
      return res.status(500).json({ error: 'No job ID returned from RunwayML.' });
    }

    // 2. Poll for job completion
    let videoUrl = null;
    let status = '';
    for (let i = 0; i < MAX_POLLS; i++) {
      await new Promise(r => setTimeout(r, POLL_INTERVAL));
      const pollRes = await fetch(`${RUNWAY_API_URL}/inferences/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
        },
      });
      if (!pollRes.ok) {
        const pollError = await pollRes.text();
        console.error(`RunwayML /inferences/${jobId} error:`, pollError);
        continue;
      }
      const pollData = await pollRes.json();
      console.log(`RunwayML /inferences/${jobId} poll response:`, pollData);
      status = pollData.status;
      videoUrl = pollData.output?.[0] || pollData.result?.video || pollData.video_url || null;
      if (status === 'succeeded' && videoUrl) break;
      if (status === 'failed') break;
    }

    if (status === 'succeeded' && videoUrl) {
      return res.status(200).json({ videoUrl });
    } else if (status === 'failed') {
      console.error('RunwayML job failed.');
      return res.status(500).json({ error: 'Video generation failed.' });
    } else {
      console.error('RunwayML job timed out.');
      return res.status(500).json({ error: 'Video generation timed out. Please try again later.' });
    }
  } catch (err) {
    console.error('RunwayML API error (catch):', err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
} 