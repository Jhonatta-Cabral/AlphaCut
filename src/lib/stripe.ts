import { loadStripe } from '@stripe/stripe-js'
import { getStripePriceId } from '@/config/plans'

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY!
const stripePromise = loadStripe(stripePublicKey)

export async function createCheckoutSession(
  userId: string,
  plan: 'monthly' | 'annual'
) {
  try {
    const priceId = getStripePriceId(plan)
    const frontendUrl = import.meta.env.VITE_FRONTEND_URL || window.location.origin

    const response = await fetch(`${frontendUrl}/api/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        userId,
        successUrl: `${frontendUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${frontendUrl}/paywall`,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create checkout session')
    }

    const { sessionId } = await response.json()

    // Redirecionar para o Checkout Session URL
    window.location.href = `https://checkout.stripe.com/c/pay/${sessionId}`
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

export { stripePromise }
