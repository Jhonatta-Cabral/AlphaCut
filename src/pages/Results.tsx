import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { ArrowLeft, Lock, Crown, Scissors, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Analysis {
  id: string
  date: string
  faceShape: string
  hairType: string
  goal: string
  photo: string
}

interface StyleRecommendation {
  name: string
  description: string
  imageUrl: string
  tips: string[]
}

export default function Results() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { hasAccess } = useSubscription()
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [recommendations, setRecommendations] = useState<StyleRecommendation[]>([])

  useEffect(() => {
    const savedAnalyses = localStorage.getItem('alphacut-analyses')
    if (savedAnalyses) {
      const analyses = JSON.parse(savedAnalyses)
      const found = analyses.find((a: Analysis) => a.id === id)
      if (found) {
        setAnalysis(found)
        generateRecommendations(found)
      } else {
        navigate('/dashboard')
      }
    } else {
      navigate('/dashboard')
    }
  }, [id, navigate])

  const generateRecommendations = (analysis: Analysis) => {
    // Simulação de recomendações baseadas no formato de rosto
    const stylesByFaceShape: Record<string, StyleRecommendation[]> = {
      'Oval': [
        {
          name: 'Undercut Clássico',
          description: 'Laterais raspadas com volume no topo. Versátil e moderno.',
          imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400',
          tips: ['Mantenha o topo entre 5-8cm', 'Laterais na régua 1 ou 2', 'Use pomada matte para fixação']
        },
        {
          name: 'Degradê Médio',
          description: 'Transição suave nas laterais com textura no topo.',
          imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400',
          tips: ['Perfeito para cabelo ondulado', 'Peça transição média', 'Finalize com spray texturizador']
        }
      ],
      'Retangular': [
        {
          name: 'Franja Lateral',
          description: 'Franja jogada para o lado com volume controlado.',
          imageUrl: 'https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=400',
          tips: ['Suaviza a testa alongada', 'Volume nas laterais', 'Finalize com secador']
        },
        {
          name: 'Pompadour Moderno',
          description: 'Volume no topo com laterais baixas.',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
          tips: ['Adiciona altura', 'Use pomada forte', 'Seque com escova']
        }
      ],
      'Redondo': [
        {
          name: 'Topete Alto',
          description: 'Volume vertical para alongar o rosto.',
          imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
          tips: ['Foco em altura', 'Laterais curtas', 'Pomada com brilho']
        },
        {
          name: 'Corte Angular',
          description: 'Linhas definidas que criam ângulos no rosto.',
          imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
          tips: ['Desenhos nas laterais', 'Barba ajuda a definir', 'Manutenção semanal']
        }
      ],
      'Quadrado': [
        {
          name: 'Degradê Alto Texturizado',
          description: 'Suaviza a mandíbula forte com textura.',
          imageUrl: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400',
          tips: ['Textura descontraída', 'Evite muito volume lateral', 'Cera matte']
        },
        {
          name: 'Buzz Cut',
          description: 'Corte militar curto que destaca a estrutura.',
          imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400',
          tips: ['Prático e masculino', 'Régua 3-5', 'Mantenha barba bem feita']
        }
      ],
      'Triangular': [
        {
          name: 'Volume Lateral',
          description: 'Adiciona largura na região superior.',
          imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
          tips: ['Volume nas laterais superiores', 'Evite muito no topo', 'Spray volumizador']
        },
        {
          name: 'Franja Preenchida',
          description: 'Franja que equilibra a testa estreita.',
          imageUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400',
          tips: ['Franja texturizada', 'Evite cortes muito curtos', 'Finalize com mousse']
        }
      ]
    }

    const recs = stylesByFaceShape[analysis.faceShape] || stylesByFaceShape['Oval']
    setRecommendations(recs)
  }

  if (!analysis) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="text-zinc-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Dashboard
        </Button>

        {/* Análise Básica (Sempre visível) */}
        <Card className="bg-zinc-900 border-zinc-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              Análise do Seu Rosto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={analysis.photo}
                  alt="Sua foto"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Seu Objetivo</p>
                  <p className="text-lg text-white font-semibold">{analysis.goal}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Formato do Rosto</p>
                  <Badge variant="secondary" className="text-base">
                    {analysis.faceShape}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Data da Análise</p>
                  <p className="text-white">
                    {new Date(analysis.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo Premium (Bloqueado para usuários free) */}
        {!hasAccess ? (
          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800">
            <CardContent className="py-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
                <Lock className="w-8 h-8 text-zinc-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Consultoria Completa Bloqueada
              </h3>
              <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                Você viu seu formato de rosto! Para acessar as recomendações personalizadas de cortes,
                dicas detalhadas e análise completa, assine o plano Premium.
              </p>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Crown className="w-5 h-5 text-yellow-500" />
                <span className="text-yellow-500 font-semibold">PREMIUM</span>
              </div>
              <Button
                onClick={() => navigate('/paywall')}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                Ver Planos Premium
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Tipo de Cabelo */}
            <Card className="bg-zinc-900 border-zinc-800 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Seu Tipo de Cabelo</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  {analysis.hairType}
                </Badge>
              </CardContent>
            </Card>

            {/* Recomendações de Estilo */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Scissors className="w-6 h-6 text-blue-500" />
                Cortes Recomendados Para Você
              </h2>
              <p className="text-zinc-400 mb-6">
                Baseado no seu formato de rosto {analysis.faceShape} e objetivo de {analysis.goal.toLowerCase()}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {recommendations.map((rec, index) => (
                  <Card key={index} className="bg-zinc-900 border-zinc-800 overflow-hidden">
                    <img
                      src={rec.imageUrl}
                      alt={rec.name}
                      className="w-full h-48 object-cover"
                    />
                    <CardHeader>
                      <CardTitle className="text-white">{rec.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-zinc-400 mb-4">{rec.description}</p>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-white">Dicas do Barbeiro:</p>
                        <ul className="space-y-1">
                          {rec.tips.map((tip, i) => (
                            <li key={i} className="text-sm text-zinc-400 flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Button
              onClick={() => navigate('/analysis')}
              variant="outline"
              className="w-full border-zinc-700 text-white hover:bg-zinc-800"
            >
              Fazer Nova Análise
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
