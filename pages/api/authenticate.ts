import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password } = req.body;

  if (password === process.env.TEMP_PASSWORD) {
    res.status(200).json({ access: true });
  } else {
    res.status(401).json({ access: false });
  }
}
