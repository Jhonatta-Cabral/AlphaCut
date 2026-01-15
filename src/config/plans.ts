/**
 * Configuração dos Planos de Assinatura - Stripe Live Mode
 *
 * IDs de Preço (Price IDs) da Stripe em Produção
 */

export const STRIPE_PLANS = {
  monthly: {
    priceId: 'price_1SoZB3APD5yL4G6BRJop7DTO',
    name: 'Plano Mensal',
    price: 19.90,
    currency: 'BRL',
    interval: 'month',
    description: 'Compromisso flexível',
    features: [
      'Análises ilimitadas de visagismo',
      'Recomendações completas de cortes',
      'Dicas personalizadas para seu rosto',
      'Histórico completo de análises',
    ]
  },
  annual: {
    priceId: 'price_1SoZC2APD5yL4G6BP1G2rS4K',
    name: 'Plano Anual',
    price: 149.00,
    currency: 'BRL',
    interval: 'year',
    description: 'Melhor custo-benefício',
    monthlyEquivalent: 12.42,
    savings: 89.80,
    discount: '58% OFF',
    features: [
      'Análises ilimitadas de visagismo',
      'Recomendações completas de cortes',
      'Dicas personalizadas para seu rosto',
      'Histórico completo de análises',
      'Conteúdo educativo exclusivo',
      'Rastreador de hábitos avançado',
      'Suporte prioritário',
      'Atualizações de novos estilos'
    ]
  }
} as const

export type PlanType = keyof typeof STRIPE_PLANS

/**
 * Retorna o Price ID do Stripe para um plano específico
 */
export function getStripePriceId(plan: PlanType): string {
  return STRIPE_PLANS[plan].priceId
}

/**
 * Retorna informações completas de um plano
 */
export function getPlanInfo(plan: PlanType) {
  return STRIPE_PLANS[plan]
}
