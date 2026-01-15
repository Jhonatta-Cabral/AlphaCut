import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { Crown, Check, ArrowLeft, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function Paywall() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubscribe = async (plan: 'monthly' | 'annual') => {
    try {
      toast({
        title: 'Redirecionando para o pagamento...',
        description: 'Aguarde um momento',
      })

      // Redirecionar para Stripe Checkout
      const userId = localStorage.getItem('userId') || 'guest'
      const { createCheckoutSession } = await import('@/lib/stripe')

      await createCheckoutSession(userId, plan)
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: 'Erro ao processar pagamento',
        description: 'Tente novamente em alguns instantes',
        variant: 'destructive'
      })
    }
  }

  const features = [
    'Análises ilimitadas de visagismo',
    'Recomendações completas de cortes',
    'Dicas personalizadas para seu rosto',
    'Histórico completo de análises',
    'Conteúdo educativo exclusivo',
    'Rastreador de hábitos avançado',
    'Suporte prioritário',
    'Atualizações de novos estilos'
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

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-600 to-yellow-800 mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Desbloqueie Seu Potencial
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Acesso completo às análises de IA e consultoria de estilo personalizada
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Monthly Plan */}
          <Card className="bg-zinc-900 border-zinc-800 hover:border-blue-700 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-white text-2xl">Mensal</CardTitle>
                <Badge variant="secondary">Popular</Badge>
              </div>
              <CardDescription className="text-zinc-400">
                Compromisso flexível
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">R$ 19,90</span>
                  <span className="text-zinc-500">/mês</span>
                </div>
                <p className="text-sm text-zinc-500 mt-1">Renovação automática</p>
              </div>

              <Button
                onClick={() => handleSubscribe('monthly')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 mb-6"
                size="lg"
              >
                Assinar Plano Mensal
              </Button>

              <div className="space-y-3">
                {features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-blue-500" />
                    </div>
                    <span className="text-sm text-zinc-400">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Annual Plan */}
          <Card className="bg-gradient-to-br from-zinc-900 to-blue-950 border-blue-700 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white border-0">
                <Zap className="w-3 h-3 mr-1" />
                58% OFF
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-white text-2xl">Anual</CardTitle>
              <CardDescription className="text-zinc-400">
                Melhor custo-benefício
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">R$ 149,00</span>
                  <span className="text-zinc-500">/ano</span>
                </div>
                <p className="text-sm text-green-500 font-semibold mt-1">
                  Equivale a R$ 12,42/mês - Economize R$ 89,80
                </p>
              </div>

              <Button
                onClick={() => handleSubscribe('annual')}
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 mb-6"
                size="lg"
              >
                <Crown className="w-4 h-4 mr-2" />
                Assinar Plano Anual
              </Button>

              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-yellow-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-yellow-500" />
                    </div>
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Proof */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="py-8">
            <div className="text-center">
              <div className="flex justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-zinc-400 italic mb-2">
                "O AlphaCut transformou completamente minha rotina de cuidados. Finalmente descobri o corte perfeito para o meu rosto!"
              </p>
              <p className="text-sm text-zinc-600">- Carlos M., Premium desde 2024</p>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <div className="mt-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Dúvidas Frequentes</h2>
          <div className="space-y-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-white mb-2">Posso cancelar a qualquer momento?</h3>
                <p className="text-sm text-zinc-400">
                  Sim! Sem multas ou taxas. Você mantém acesso até o fim do período pago.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-white mb-2">Como funciona a renovação?</h3>
                <p className="text-sm text-zinc-400">
                  Renovação automática para sua comodidade. Você pode desativar nas configurações do perfil.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-white mb-2">Preciso de cartão de crédito?</h3>
                <p className="text-sm text-zinc-400">
                  Aceitamos cartão de crédito, débito e PIX. Pagamento 100% seguro.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
