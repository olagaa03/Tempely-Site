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
  console.log('--- WEBHOOK HANDLER START ---');
  console.log('Request method:', req.method);
  console.log('Request headers:', JSON.stringify({ ...req.headers, authorization: undefined, cookie: undefined }));
  console.log('Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    LEMON_WEBHOOK_SECRET: process.env.LEMON_WEBHOOK_SECRET ? 'SET' : 'NOT SET',
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? 'SET' : 'NOT SET',
    LEMON_UNLIMITED_PRODUCT_ID: process.env.LEMON_UNLIMITED_PRODUCT_ID,
  });

  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).end();
  }

  let rawBody;
  try {
    rawBody = (await buffer(req)).toString('utf8');
    console.log('Raw body:', rawBody);
  } catch (err) {
    console.error('Error reading raw body:', err);
    return res.status(400).json({ error: 'Failed to read body' });
  }

  const signature = req.headers['x-signature'] as string;
  const secret = process.env.LEMON_WEBHOOK_SECRET!;
  console.log('Signature from header:', signature);
  console.log('Secret is set:', !!secret);

  let computedSignature;
  try {
    computedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');
    console.log('Computed signature:', computedSignature);
  } catch (err) {
    console.error('Error computing signature:', err);
    return res.status(500).json({ error: 'Signature computation failed' });
  }

  if (signature !== computedSignature) {
    console.error('Signature mismatch!');
    return res.status(401).json({ error: 'Invalid signature' });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
    console.log('Parsed event:', JSON.stringify(event, null, 2));
  } catch (err) {
    console.error('Error parsing event JSON:', err);
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const eventName = event.meta?.event_name;
  const email = event.data?.attributes?.user_email || event.data?.attributes?.email;
  console.log('Webhook event name:', eventName);
  console.log('Webhook email:', email);

  let user;
  try {
    user = await getUserByEmail(email);
    console.log('User lookup result:', user ? user.id : 'NOT FOUND', user);
  } catch (err) {
    console.error('Error during Clerk user lookup:', err);
    return res.status(500).json({ error: 'User lookup failed' });
  }

  // Product ID extraction
  let productId = null;
  if (eventName === 'order_created') {
    productId = event.data?.attributes?.first_order_item?.product_id;
  } else {
    productId = event.data?.attributes?.product_id;
  }
  console.log('Product ID:', productId, 'Type:', typeof productId);
  console.log('Checking if productId matches 567880...');

  if (!user) {
    console.error('No Clerk user found for email:', email);
    return res.status(404).json({ error: 'User not found in Clerk' });
  }

  // ✅ Grant Pro or Unlimited Generations access
  if (eventName === 'subscription_created' || eventName === 'order_created') {
    try {
      const customerPortalUrl = event.data?.attributes?.urls?.customer_portal || '';
      console.log('Customer portal URL:', customerPortalUrl);
      // Unlimited Generations product
      if (String(productId) === '567880') {
        console.log('ProductId matches 567880. About to update Clerk user metadata for unlimitedGenerations...');
        try {
          const updateResult = await clerkClient.users.updateUser(user.id, {
            publicMetadata: { unlimitedGenerations: true, customerPortal: customerPortalUrl },
          });
          console.log('Update result:', updateResult);
        } catch (err) {
          console.error('Clerk update error (unlimitedGenerations):', err);
        }
        console.log('Unlimited generations access granted to user:', user.id);
        return res.status(200).json({ success: true });
      } else {
        console.log('productId did NOT match 567880:', productId);
      }
      // Default Pro access (other product IDs)
      try {
        const updateResult = await clerkClient.users.updateUser(user.id, {
          publicMetadata: { pro: true, customerPortal: customerPortalUrl },
        });
        console.log('Pro update result:', updateResult);
      } catch (err) {
        console.error('Clerk update error (pro):', err);
      }
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
      if (String(productId) === '567880') {
        console.log('Revoking unlimitedGenerations for user:', user.id);
        try {
          const updateResult = await clerkClient.users.updateUser(user.id, {
            publicMetadata: { unlimitedGenerations: false },
          });
          console.log('Revoke update result:', updateResult);
        } catch (err) {
          console.error('Clerk update error (revoke unlimitedGenerations):', err);
        }
        console.log('Unlimited generations access revoked for user:', user.id);
        return res.status(200).json({ success: true });
      }
      // Default Pro access revocation (other product IDs)
      try {
        const updateResult = await clerkClient.users.updateUser(user.id, {
          publicMetadata: { pro: false },
        });
        console.log('Revoke pro update result:', updateResult);
      } catch (err) {
        console.error('Clerk update error (revoke pro):', err);
      }
      console.log('Pro access revoked for user:', user.id);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Failed to revoke access:', err);
      return res.status(500).json({ error: 'Failed to revoke access' });
    }
  }

  // 👌 Fallback
  console.log('No matching event type. Returning received:true.');
  return res.status(200).json({ received: true });
}
