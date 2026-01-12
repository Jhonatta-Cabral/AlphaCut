// Tipos compartilhados da aplicação

export interface User {
  id: string
  name: string
  email: string
  photo?: string
  createdAt: string
}

export interface Analysis {
  id: string
  date: string
  faceShape: FaceShape
  hairType: HairType
  goal: string
  photo: string
}

export type FaceShape = 'Oval' | 'Retangular' | 'Redondo' | 'Quadrado' | 'Triangular'
export type HairType = 'Liso' | 'Ondulado' | 'Cacheado' | 'Crespo'
export type PlanType = 'free' | 'monthly' | 'annual'

export interface Subscription {
  plan: PlanType
  analysisCount: number
  startDate?: string
  expiresAt?: string
}

export interface StyleRecommendation {
  name: string
  description: string
  imageUrl: string
  tips: string[]
}

export interface Habit {
  id: string
  label: string
  completed: boolean
}

export interface HabitData {
  date: string
  habits: Habit[]
  streak: number
  lastCompletedDate: string
}
