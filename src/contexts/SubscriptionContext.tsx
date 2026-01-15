import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type PlanType = 'free' | 'monthly' | 'annual'

interface Subscription {
  plan: PlanType
  analysisCount: number
  startDate?: string
  expiresAt?: string
}

interface SubscriptionContextType {
  subscription: Subscription
  hasAccess: boolean
  canAnalyze: boolean
  incrementAnalysis: () => void
  subscribe: (plan: PlanType) => void
  cancelSubscription: () => void
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] = useState<Subscription>({
    plan: 'free',
    analysisCount: 0
  })

  useEffect(() => {
    const savedSub = localStorage.getItem('alphacut-subscription')
    if (savedSub) {
      setSubscription(JSON.parse(savedSub))
    }
  }, [])

  const saveSubscription = (sub: Subscription) => {
    setSubscription(sub)
    localStorage.setItem('alphacut-subscription', JSON.stringify(sub))
  }

  const hasAccess = subscription.plan !== 'free'
  const canAnalyze = subscription.plan !== 'free' || subscription.analysisCount < 1

  const incrementAnalysis = () => {
    const newSub = { ...subscription, analysisCount: subscription.analysisCount + 1 }
    saveSubscription(newSub)
  }

  const subscribe = (plan: PlanType) => {
    const startDate = new Date()
    const expiresAt = new Date()

    if (plan === 'monthly') {
      expiresAt.setMonth(expiresAt.getMonth() + 1)
    } else if (plan === 'annual') {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1)
    }

    saveSubscription({
      plan,
      analysisCount: subscription.analysisCount,
      startDate: startDate.toISOString(),
      expiresAt: expiresAt.toISOString()
    })
  }

  const cancelSubscription = () => {
    saveSubscription({
      plan: 'free',
      analysisCount: subscription.analysisCount
    })
  }

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        hasAccess,
        canAnalyze,
        incrementAnalysis,
        subscribe,
        cancelSubscription
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}
