import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Scissors, Sparkles, Camera, TrendingUp } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              AlphaCut
            </h1>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Seu Estilo,
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Otimizado por IA
              </span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl">
              Consultoria de visagismo masculino personalizada. Descubra o corte perfeito para o seu rosto com inteligência artificial.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              onClick={() => navigate('/onboarding')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 text-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Começar Agora Grátis
            </Button>
          </div>

          {/* Trust Badge */}
          <p className="text-sm text-zinc-500">
            ✓ Primeira análise grátis • ✓ Sem necessidade de cartão
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-blue-900 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-blue-950 flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Análise de Rosto</h3>
            <p className="text-zinc-400">
              IA identifica seu formato de rosto e tipo de cabelo para recomendações precisas
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-blue-900 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-blue-950 flex items-center justify-center mb-4">
              <Scissors className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Estilos Personalizados</h3>
            <p className="text-zinc-400">
              Recomendações de cortes baseadas no seu objetivo: autoridade, juventude, elegância
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-blue-900 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-blue-950 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Evolução Diária</h3>
            <p className="text-zinc-400">
              Acompanhe seus hábitos de cuidado pessoal e mantenha uma rotina consistente
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-24 text-center">
          <p className="text-zinc-500 mb-4">Confiado por homens que valorizam seu estilo</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700" />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-900 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-zinc-600 text-sm">
          <p>© 2024 AlphaCut. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )
}
