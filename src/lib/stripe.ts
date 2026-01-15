export async function createCheckoutSession(
  userId: string,
  plan: 'monthly' | 'annual'
) {
  try {
    // Obter Payment Link das variáveis de ambiente
    const paymentLink = plan === 'monthly'
      ? import.meta.env.VITE_STRIPE_PAYMENT_LINK_MONTHLY
      : import.meta.env.VITE_STRIPE_PAYMENT_LINK_ANNUAL

    if (!paymentLink) {
      throw new Error('Payment Link não configurado. Configure as variáveis de ambiente VITE_STRIPE_PAYMENT_LINK_MONTHLY e VITE_STRIPE_PAYMENT_LINK_ANNUAL')
    }

    // Redirecionar para Payment Link da Stripe com o ID do usuário
    window.location.href = `${paymentLink}?client_reference_id=${userId}`
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}
