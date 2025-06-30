import type { NextApiRequest, NextApiResponse } from 'next';
import { clerkClient } from '@clerk/clerk-sdk-node';
import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: false,
  },
};

// 📦 Read raw body buffer
function buffer(readable: any) {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    readable.on('data', (chunk: Buffer) => chunks.push(chunk));
    readable.on('end', () => resolve(Buffer.concat(chunks)));
    readable.on('error', reject);
  });
}

// 🔍 Lookup user by email
const getUserByEmail = async (email: string) => {
  try {
    const users = await clerkClient.users.getUserList({ emailAddress: [email] });
    return users[0];
  } catch (err) {
    console.error('Clerk email lookup failed:', err);
    return null;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const rawBody = (await buffer(req)).toString('utf8');
  const signature = req.headers['x-signature'] as string;
  const secret = process.env.LEMON_WEBHOOK_SECRET!;

  const computedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  if (signature !== computedSignature) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const event = JSON.parse(rawBody);
  const eventName = event.event_name;
  const email = event.data?.attributes?.user_email || event.data?.attributes?.email;

  if (!email) return res.status(400).json({ error: 'No email in payload' });

  const user = await getUserByEmail(email);
  console.log('Lemon Squeezy webhook email:', email);
  if (!user) {
    console.error('User not found for email:', email);
    return res.status(404).json({ error: 'User not found in Clerk', email });
  } else {
    console.log('User found:', user.id, user.emailAddresses);
  }

  // ✅ Grant Pro access
  if (eventName === 'subscription_created' || eventName === 'order_created') {
    try {
      await clerkClient.users.updateUser(user.id, {
        publicMetadata: { pro: true },
      });
      console.log('Pro access granted to user:', user.id);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Failed to update Clerk user:', err);
      return res.status(500).json({ error: 'Failed to update Clerk user', details: err });
    }
  }

  // 🚫 Revoke Pro access
  if (eventName === 'subscription_cancelled') {
    await clerkClient.users.updateUser(user.id, {
      publicMetadata: { pro: false },
    });
    console.log('Pro access revoked for user:', user.id);
    return res.status(200).json({ success: true });
  }

  // 👌 Fallback
  return res.status(200).json({ received: true });
}
