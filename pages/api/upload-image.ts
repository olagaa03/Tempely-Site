import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  // For demo: return a placeholder image URL
  // In production, use a real file upload handler (e.g., S3, Cloudinary, etc.)
  res.status(200).json({ url: 'https://via.placeholder.com/512x512.png?text=Uploaded+Image' });
} 