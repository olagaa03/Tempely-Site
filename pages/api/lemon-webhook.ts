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
const getUserByEmail = async (email: string): Promise<any> => {
  try {
    const users = await clerkClient.users.getUserList({ emailAddress: [email] });
    return users[0];
  } catch (err) {
    console.error('Clerk email lookup failed:', err);
    return null;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Lemon Squeezy webhook received');
  if (req.method !== 'POST') return res.status(405).end();

  let rawBody;
  try {
    rawBody = (await buffer(req)).toString('utf8');
  } catch (err) {
    console.error('Error reading raw body:', err);
    return res.status(400).json({ error: 'Failed to read body' });
  }

  const signature = req.headers['x-signature'] as string;
  const secret = process.env.LEMON_WEBHOOK_SECRET!;
  let computedSignature;
  try {
    computedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');
  } catch (err) {
    console.error('Error computing signature:', err);
    return res.status(500).json({ error: 'Signature computation failed' });
  }

  if (signature !== computedSignature) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch (err) {
    console.error('Error parsing event JSON:', err);
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const eventName = event.meta?.event_name;
  const email = event.data?.attributes?.user_email || event.data?.attributes?.email;
  let user;
  try {
    user = await getUserByEmail(email);
  } catch (err) {
    console.error('Error during Clerk user lookup:', err);
    return res.status(500).json({ error: 'User lookup failed' });
  }

  let productId = null;
  if (eventName === 'order_created') {
    productId = event.data?.attributes?.first_order_item?.product_id;
  } else {
    productId = event.data?.attributes?.product_id;
  }

  if (!user) {
    return res.status(404).json({ error: 'User not found in Clerk' });
  }

  if (eventName === 'subscription_created' || eventName === 'order_created') {
    try {
      const customerPortalUrl = event.data?.attributes?.urls?.customer_portal || '';
      if (String(productId) === '567880') {
        try {
          await clerkClient.users.updateUser(user.id, {
            publicMetadata: { unlimitedGenerations: true, customerPortal: customerPortalUrl },
          });
        } catch (err) {
          console.error('Clerk update error (unlimitedGenerations):', err);
        }
        return res.status(200).json({ success: true });
      }
      try {
        await clerkClient.users.updateUser(user.id, {
          publicMetadata: { pro: true, customerPortal: customerPortalUrl },
        });
      } catch (err) {
        console.error('Clerk update error (pro):', err);
      }
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Failed to update Clerk user:', err);
      return res.status(500).json({ error: 'Failed to update Clerk user' });
    }
  }

  if (eventName === 'subscription_cancelled') {
    try {
      if (String(productId) === '567880') {
        try {
          await clerkClient.users.updateUser(user.id, {
            publicMetadata: { unlimitedGenerations: false },
          });
        } catch (err) {
          console.error('Clerk update error (revoke unlimitedGenerations):', err);
        }
        return res.status(200).json({ success: true });
      }
      try {
        await clerkClient.users.updateUser(user.id, {
          publicMetadata: { pro: false },
        });
      } catch (err) {
        console.error('Clerk update error (revoke pro):', err);
      }
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Failed to revoke access:', err);
      return res.status(500).json({ error: 'Failed to revoke access' });
    }
  }

  return res.status(200).json({ received: true });
}
