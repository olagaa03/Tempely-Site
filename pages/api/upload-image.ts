import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const form = new formidable.IncomingForm();
  form.parse(req, async (err: any, fields: Fields, files: Files) => {
    if (err) {
      console.error('Formidable error:', err);
      return res.status(500).json({ error: 'File upload error.' });
    }
    const file = files.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded.' });
    try {
      const upload = await cloudinary.uploader.upload((file as any).filepath, {
        folder: 'tempely-images',
        resource_type: 'image',
      });
      return res.status(200).json({ url: upload.secure_url });
    } catch (e) {
      console.error('Cloudinary upload error:', e);
      return res.status(500).json({ error: 'Cloudinary upload failed.' });
    } finally {
      // Clean up temp file
      fs.unlink((file as any).filepath, () => {});
    }
  });
} 