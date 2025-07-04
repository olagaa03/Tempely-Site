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
  console.log('Lemon Squeezy webhook payload:', JSON.stringify(event, null, 2));
  const eventName = event.event_name;
  const email = event.data?.attributes?.user_email || event.data?.attributes?.email;
  console.log('Webhook email:', email);
  const user = await getUserByEmail(email);
  console.log('Found user:', user ? user.id : 'NOT FOUND');

  // Product ID extraction
  let productId = null;
  if (eventName === 'order_created') {
    productId = event.data?.attributes?.first_order_item?.product_id;
  } else {
    productId = event.data?.attributes?.product_id;
  }
  console.log('Product ID:', productId);

  if (!user) {
    console.error('No Clerk user found for email:', email);
    return res.status(404).json({ error: 'User not found in Clerk' });
  }

  // ✅ Grant Pro or Unlimited Generations access
  if (eventName === 'subscription_created' || eventName === 'order_created') {
    try {
      const customerPortalUrl = event.data?.attributes?.urls?.customer_portal || '';
      // Unlimited Generations product
      if (productId === 567880) {
        console.log('About to update Clerk user metadata...');
        try {
          const updateResult = await clerkClient.users.updateUser(user.id, {
            publicMetadata: { unlimitedGenerations: true, customerPortal: customerPortalUrl },
          });
          console.log('Update result:', updateResult);
        } catch (err) {
          console.error('Clerk update error:', err);
        }
        console.log('Unlimited generations access granted to user:', user.id);
        return res.status(200).json({ success: true });
      }
      // Default Pro access (other product IDs)
      await clerkClient.users.updateUser(user.id, {
        publicMetadata: { pro: true, customerPortal: customerPortalUrl },
      });
      console.log('Pro access granted to user:', user.id);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Failed to update Clerk user:', err);
      return res.status(500).json({ error: 'Failed to update Clerk user' });
    }
  }

  // 🚫 Revoke Unlimited Generations or Pro access
  if (eventName === 'subscription_cancelled') {
    try {
      // Unlimited Generations product
      if (productId === 567880) {
        await clerkClient.users.updateUser(user.id, {
          publicMetadata: { unlimitedGenerations: false },
        });
        console.log('Unlimited generations access revoked for user:', user.id);
        return res.status(200).json({ success: true });
      }
      // Default Pro access revocation (other product IDs)
      await clerkClient.users.updateUser(user.id, {
        publicMetadata: { pro: false },
      });
      console.log('Pro access revoked for user:', user.id);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Failed to revoke access:', err);
      return res.status(500).json({ error: 'Failed to revoke access' });
    }
  }

  // 👌 Fallback
  return res.status(200).json({ received: true });
}
