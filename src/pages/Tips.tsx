import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Scissors, Shirt, Watch } from 'lucide-react'

interface Tip {
  id: string
  title: string
  category: string
  icon: any
  content: string
  readTime: string
}

export default function Tips() {
  const navigate = useNavigate()

  const tips: Tip[] = [
    {
      id: '1',
      title: 'Como Escolher o Barbeiro Ideal',
      category: 'Cortes',
      icon: Scissors,
      content: 'Um bom barbeiro faz toda a diferença. Procure profissionais que: entendam de visagismo, tenham portfólio de trabalhos anteriores, usem produtos de qualidade e principalmente, saibam ouvir o que você quer. A comunicação é fundamental.',
      readTime: '2 min'
    },
    {
      id: '2',
      title: 'Produtos Essenciais Para Cabelo Masculino',
      category: 'Cuidados',
      icon: Watch,
      content: 'Pomada matte: Para visual natural sem brilho. Cera: Fixação forte para penteados elaborados. Spray texturizador: Volume e movimento. Shampoo específico: Escolha para seu tipo de cabelo. Condicionador: Hidratação essencial.',
      readTime: '3 min'
    },
    {
      id: '3',
      title: 'Frequência Ideal de Corte',
      category: 'Manutenção',
      icon: Scissors,
      content: 'Cortes curtos (undercut, degradê): 2-3 semanas. Cortes médios: 3-4 semanas. Cabelos longos: 6-8 semanas. Aparar barba: semanal. Isso mantém o visual sempre impecável.',
      readTime: '2 min'
    },
    {
      id: '4',
      title: 'Combinando Cabelo e Barba',
      category: 'Estilo',
      icon: Shirt,
      content: 'A barba deve complementar seu corte. Rosto alongado: barba cheia e curta. Rosto redondo: barba mais longa nas laterais. Rosto quadrado: barba média bem desenhada. Rosto oval: qualquer estilo funciona.',
      readTime: '3 min'
    },
    {
      id: '5',
      title: 'Finalizadores: Quando e Como Usar',
      category: 'Produtos',
      icon: Watch,
      content: 'Pomada: Em cabelo levemente úmido, espalhe nas mãos e distribua. Cera: Pequena quantidade, aqueça nas mãos, aplique nas pontas. Spray: A 20cm de distância, finalize o penteado. Menos é mais: comece com pouco produto.',
      readTime: '2 min'
    },
    {
      id: '6',
      title: 'Cuidados com o Couro Cabeludo',
      category: 'Saúde',
      icon: Watch,
      content: 'Massageie o couro cabeludo ao lavar para estimular circulação. Use água morna, nunca quente. Shampoo 2-3x por semana no máximo. Evite dormir com cabelo molhado. Mantenha a toalha limpa.',
      readTime: '3 min'
    },
    {
      id: '7',
      title: 'Estilos Para o Ambiente Profissional',
      category: 'Profissional',
      icon: Shirt,
      content: 'Corporativo tradicional: degradê baixo, laterais curtas. Criativo: mais liberdade, undercut, topete. Conservador: corte clássico, sem desenhos. Sempre bem feito é a regra: cabelo e barba alinhados passam profissionalismo.',
      readTime: '2 min'
    },
    {
      id: '8',
      title: 'Recuperando Cabelo Danificado',
      category: 'Tratamento',
      icon: Watch,
      content: 'Hidratação semanal com máscara capilar. Evite secador muito quente. Corte as pontas danificadas. Use leave-in protetor. Evite produtos com álcool. Beba bastante água e tenha alimentação balanceada.',
      readTime: '3 min'
    }
  ]

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Cortes': 'text-blue-500',
      'Cuidados': 'text-green-500',
      'Manutenção': 'text-orange-500',
      'Estilo': 'text-purple-500',
      'Produtos': 'text-yellow-500',
      'Saúde': 'text-red-500',
      'Profissional': 'text-indigo-500',
      'Tratamento': 'text-pink-500'
    }
    return colors[category] || 'text-blue-500'
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
          Voltar
        </Button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Dicas de Estilo</h1>
          <p className="text-zinc-400">Aprenda tudo sobre cuidados e estilo masculino</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tips.map((tip) => {
            const Icon = tip.icon
            return (
              <Card
                key={tip.id}
                className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-xs text-zinc-500">{tip.readTime}</span>
                  </div>
                  <div className="mb-2">
                    <span className={`text-xs font-semibold ${getCategoryColor(tip.category)}`}>
                      {tip.category.toUpperCase()}
                    </span>
                  </div>
                  <CardTitle className="text-white text-lg">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400 text-sm leading-relaxed">{tip.content}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-950 to-zinc-900 border-blue-900 mt-8">
          <CardContent className="py-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Quer mais conteúdo exclusivo?</h3>
            <p className="text-zinc-400 mb-4">
              Assine Premium para acessar masterclasses, tutoriais em vídeo e consultoria personalizada
            </p>
            <Button
              onClick={() => navigate('/paywall')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              Ver Planos Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
