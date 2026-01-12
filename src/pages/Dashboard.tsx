import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { Camera, History, Target, BookOpen, User, Crown, Flame } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Analysis {
  id: string
  date: string
  faceShape: string
  hairType: string
  goal: string
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { subscription, hasAccess, canAnalyze } = useSubscription()
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [habitStreak, setHabitStreak] = useState(0)

  useEffect(() => {
    if (!user) {
      navigate('/onboarding')
      return
    }

    // Carregar análises
    const savedAnalyses = localStorage.getItem('alphacut-analyses')
    if (savedAnalyses) {
      setAnalyses(JSON.parse(savedAnalyses))
    }

    // Carregar streak de hábitos
    const savedHabits = localStorage.getItem('alphacut-habits')
    if (savedHabits) {
      const habits = JSON.parse(savedHabits)
      setHabitStreak(habits.streak || 0)
    }
  }, [user, navigate])

  const handleNewAnalysis = () => {
    if (!canAnalyze) {
      navigate('/paywall')
    } else {
      navigate('/analysis')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AlphaCut</h1>
                <p className="text-xs text-zinc-500">Olá, {user?.name}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/profile')}
              className="text-zinc-400 hover:text-white"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Status Card */}
        <Card className="bg-gradient-to-r from-blue-950 to-zinc-900 border-blue-900 mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {hasAccess ? (
                    <>
                      <Crown className="w-5 h-5 text-yellow-500" />
                      <span className="text-yellow-500 font-semibold text-sm">PREMIUM</span>
                    </>
                  ) : (
                    <>
                      <span className="text-zinc-400 text-sm">Plano Gratuito</span>
                    </>
                  )}
                </div>
                <p className="text-2xl font-bold text-white">
                  {hasAccess ? 'Análises Ilimitadas' : `${subscription.analysisCount}/1 Análise Usada`}
                </p>
                {!hasAccess && subscription.analysisCount >= 1 && (
                  <p className="text-sm text-zinc-400 mt-1">Assine para continuar analisando</p>
                )}
              </div>
              {habitStreak > 0 && (
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="text-2xl font-bold text-white">{habitStreak}</span>
                  </div>
                  <p className="text-sm text-zinc-400">dias seguidos</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Action */}
        <Card className="bg-zinc-900 border-zinc-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-500" />
              Nova Análise
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Descubra o corte perfeito para o seu rosto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleNewAnalysis}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              size="lg"
            >
              Fazer Análise de Visagismo
            </Button>
            {!canAnalyze && (
              <p className="text-xs text-center text-zinc-500 mt-3">
                Você já usou sua análise gratuita
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card
            className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all"
            onClick={() => navigate('/habits')}
          >
            <CardContent className="pt-6">
              <Target className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-semibold text-white mb-1">Hábitos</h3>
              <p className="text-sm text-zinc-400">Acompanhe sua evolução diária</p>
            </CardContent>
          </Card>

          <Card
            className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all"
            onClick={() => navigate('/tips')}
          >
            <CardContent className="pt-6">
              <BookOpen className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-semibold text-white mb-1">Dicas</h3>
              <p className="text-sm text-zinc-400">Aprenda sobre estilo masculino</p>
            </CardContent>
          </Card>

          <Card
            className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all"
            onClick={() => navigate('/profile')}
          >
            <CardContent className="pt-6">
              <User className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-semibold text-white mb-1">Perfil</h3>
              <p className="text-sm text-zinc-400">Gerenciar conta e plano</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Analyses */}
        {analyses.length > 0 && (
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <History className="w-5 h-5 text-blue-500" />
                Histórico de Análises
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyses.slice(0, 3).map((analysis) => (
                  <div
                    key={analysis.id}
                    onClick={() => navigate(`/results/${analysis.id}`)}
                    className="flex items-center justify-between p-3 rounded-lg bg-zinc-950 hover:bg-zinc-800 cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="text-white font-medium">{analysis.goal}</p>
                      <p className="text-sm text-zinc-500">
                        {new Date(analysis.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-xs text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full">
                      {analysis.faceShape}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
