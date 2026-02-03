import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Info } from 'lucide-react'
import { faceShapeCharacteristics, type FaceShape } from '@/utils/faceAnalysis'

export default function FaceShapeGuide() {
  const navigate = useNavigate()

  const faceShapes: FaceShape[] = [
    'Coração',
    'Quadrado',
    'Pêra',
    'Retângulo',
    'Redondo',
    'Oval',
    'Diamante',
    'Oblongo'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="text-zinc-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Guia de Formatos de Rosto
          </h1>
          <p className="text-zinc-400">
            Entenda os 8 formatos principais e como identificá-los
          </p>
        </div>

        {/* Imagem de Referência */}
        <Card className="bg-zinc-900 border-zinc-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Referência Visual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-zinc-950 p-4 rounded-lg">
              <img
                src="/formato-rosto-masculino.jpg"
                alt="Referência dos 8 formatos de rosto masculino"
                className="w-full rounded-lg"
              />
              <p className="text-xs text-zinc-500 mt-3 text-center">
                Os 8 formatos de rosto masculino utilizados em nossa análise
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Detalhes de Cada Formato */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Características Detalhadas</h2>

          {faceShapes.map((shape) => {
            const data = faceShapeCharacteristics[shape]
            return (
              <Card key={shape} className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white text-xl">{shape}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-zinc-400 mb-2">Descrição</p>
                    <p className="text-white">{data.description}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-zinc-400 mb-2">
                      Características Principais
                    </p>
                    <ul className="space-y-1">
                      {data.features.map((feature, i) => (
                        <li key={i} className="text-zinc-300 text-sm flex items-start">
                          <span className="text-blue-500 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-zinc-950 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-white mb-2">
                      Recomendações de Cabelo
                    </p>
                    <ul className="space-y-1">
                      {data.hairRecommendations.map((rec, i) => (
                        <li key={i} className="text-zinc-400 text-sm flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-blue-950 to-zinc-900 border-blue-900 mt-8">
          <CardContent className="py-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Pronto para descobrir seu formato?
            </h3>
            <p className="text-zinc-400 mb-6">
              Faça uma análise completa do seu rosto e receba recomendações personalizadas
            </p>
            <Button
              onClick={() => navigate('/analysis')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              Fazer Análise Agora
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
