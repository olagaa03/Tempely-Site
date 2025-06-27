/*
// pages/api/lemon-webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { users } from '@clerk/nextjs/api';
import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: false, // We need the raw body for signature verification
  },
};

function buffer(readable: any) {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    readable.on('data', (chunk: Buffer) => chunks.push(chunk));
    readable.on('end', () => resolve(Buffer.concat(chunks)));
    readable.on('error', reject);
  });
}

const getUserByEmail = async (email: string) => {
  const { data: userList } = await users.getUserList({ emailAddress: [email] });
  return userList[0];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  // 1. Get raw body
  const rawBody = (await buffer(req)).toString('utf8');

  // 2. Get signature from header
  const signature = req.headers['x-signature'] as string;
  const secret = process.env.LEMON_WEBHOOK_SECRET!;

  // 3. Compute HMAC SHA256
  const computed = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  // 4. Compare
  if (signature !== computed) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // 5. Parse the JSON body
  const event = JSON.parse(rawBody);

  // Handle subscription or order creation (grant Pro)
  if (event.event_name === 'subscription_created' || event.event_name === 'order_created') {
    const email = event.data?.attributes?.user_email || event.data?.attributes?.email;
    if (!email) return res.status(400).json({ error: 'No email found' });

    // Find Clerk user by email
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Set pro: true in Clerk public metadata
    await users.updateUser(user.id, {
      publicMetadata: { pro: true }
    });

    return res.status(200).json({ success: true });
  }

  // Handle subscription cancellation (revoke Pro)
  if (event.event_name === 'subscription_cancelled') {
    const email = event.data?.attributes?.user_email || event.data?.attributes?.email;
    const user = await getUserByEmail(email);
    if (user) {
      await users.updateUser(user.id, {
        publicMetadata: { pro: false }
      });
    }
    return res.status(200).json({ success: true });
  }

  res.status(200).json({ received: true });
} 
*/ 