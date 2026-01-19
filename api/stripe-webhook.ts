import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

type StripeSubWithPeriod = Stripe.Subscription & {
  current_period_start: number
  current_period_end: number
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export const config = {
  api: {
    bodyParser: false,
  },
}

async function buffer(readable: any) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId || session.client_reference_id

        if (!userId) {
          console.error('No userId found in session')
          break
        }

        const subscription = (await stripe.subscriptions.retrieve(
  session.subscription as string
)) as unknown as StripeSubWithPeriod

        const priceId = subscription.items.data[0].price.id
        const planType = priceId.includes('month') ? 'monthly' : 'annual'

        await supabase.from('subscriptions').upsert({
          user_id: userId,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: subscription.id,
          stripe_price_id: priceId,
          status: 'active',
          plan_type: planType,
          current_period_start: subscription.current_period_start
  ? new Date(subscription.current_period_start * 1000).toISOString()
  : null,
current_period_end: subscription.current_period_end
  ? new Date(subscription.current_period_end * 1000).toISOString()
  : null,
          cancel_at_period_end: false,
        })

        console.log(`Subscription activated for user ${userId}`)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as StripeSubWithPeriod
        const customerId = subscription.customer as string

        const { data: existingSub } = await supabase
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (!existingSub) {
          console.error('No subscription found for customer:', customerId)
          break
        }

        await supabase
          .from('subscriptions')
          .update({
            status: subscription.status,
            current_period_start: subscription.current_period_start
  ? new Date(subscription.current_period_start * 1000).toISOString()
  : null,
current_period_end: subscription.current_period_end
  ? new Date(subscription.current_period_end * 1000).toISOString()
  : null,
            cancel_at_period_end: subscription.cancel_at_period_end,
            canceled_at: subscription.canceled_at
              ? new Date(subscription.canceled_at * 1000).toISOString()
              : null,
          })
          .eq('stripe_customer_id', customerId)

        console.log(`Subscription updated for customer ${customerId}`)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
            canceled_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId)

        console.log(`Subscription canceled for customer ${customerId}`)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return res.status(200).json({ received: true })
  } catch (error: any) {
    console.error('Error processing webhook:', error)
    return res.status(500).json({ error: error.message })
  }
}
