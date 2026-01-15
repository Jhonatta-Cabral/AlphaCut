import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { ArrowLeft, User, Crown, LogOut, Settings, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'

export default function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { subscription, cancelSubscription } = useSubscription()
  const { toast } = useToast()

  const handleLogout = () => {
    logout()
    toast({
      title: 'Até logo!',
      description: 'Você saiu da sua conta'
    })
    navigate('/')
  }

  const handleCancelSubscription = () => {
    cancelSubscription()
    toast({
      title: 'Assinatura cancelada',
      description: 'Você ainda tem acesso até o fim do período pago',
      variant: 'destructive'
    })
  }

  const handleDeleteAccount = () => {
    logout()
    toast({
      title: 'Conta deletada',
      description: 'Todos os seus dados foram removidos',
      variant: 'destructive'
    })
    navigate('/')
  }

  const getPlanName = () => {
    if (subscription.plan === 'monthly') return 'Premium Mensal'
    if (subscription.plan === 'annual') return 'Premium Anual'
    return 'Gratuito'
  }

  const getPlanPrice = () => {
    if (subscription.plan === 'monthly') return 'R$ 9,90/mês'
    if (subscription.plan === 'annual') return 'R$ 49,00/ano'
    return 'Grátis'
  }

  const getExpirationDate = () => {
    if (subscription.expiresAt) {
      return new Date(subscription.expiresAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
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
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Meu Perfil</h1>
          <p className="text-zinc-400">Gerencie sua conta e assinatura</p>
        </div>

        {/* User Info */}
        <Card className="bg-zinc-900 border-zinc-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-500" />
              Informações da Conta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-zinc-500 mb-1">Nome</p>
              <p className="text-white font-medium">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500 mb-1">Email</p>
              <p className="text-white font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500 mb-1">Membro desde</p>
              <p className="text-white font-medium">
                {user?.createdAt &&
                  new Date(user.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Info */}
        <Card className="bg-zinc-900 border-zinc-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              Plano Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">{getPlanName()}</h3>
                  {subscription.plan !== 'free' && (
                    <Badge className="bg-gradient-to-r from-yellow-600 to-yellow-700 border-0">
                      ATIVO
                    </Badge>
                  )}
                </div>
                <p className="text-zinc-400">{getPlanPrice()}</p>
                {getExpirationDate() && (
                  <p className="text-sm text-zinc-500 mt-2">
                    Renovação em {getExpirationDate()}
                  </p>
                )}
              </div>
            </div>

            {subscription.plan === 'free' ? (
              <Button
                onClick={() => navigate('/paywall')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <Crown className="w-4 h-4 mr-2" />
                Fazer Upgrade para Premium
              </Button>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full border-zinc-700 text-white hover:bg-zinc-800">
                    Cancelar Assinatura
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-zinc-900 border-zinc-800">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Cancelar assinatura?</AlertDialogTitle>
                    <AlertDialogDescription className="text-zinc-400">
                      Você perderá acesso às análises ilimitadas e conteúdo exclusivo.
                      Seu acesso será mantido até {getExpirationDate()}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-zinc-800 text-white border-zinc-700">
                      Manter Assinatura
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleCancelSubscription}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Sim, Cancelar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </CardContent>
        </Card>

        {/* Usage Stats */}
        <Card className="bg-zinc-900 border-zinc-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Estatísticas de Uso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Análises realizadas</span>
                <span className="text-white font-semibold">{subscription.analysisCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Plano</span>
                <span className="text-white font-semibold">
                  {subscription.plan === 'free' ? 'Limitado' : 'Ilimitado'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-zinc-700 text-white hover:bg-zinc-800"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair da Conta
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full border-red-900 text-red-500 hover:bg-red-950"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Deletar Conta
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-zinc-900 border-zinc-800">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">Deletar conta permanentemente?</AlertDialogTitle>
                <AlertDialogDescription className="text-zinc-400">
                  Esta ação não pode ser desfeita. Todos os seus dados, análises e histórico serão removidos permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-zinc-800 text-white border-zinc-700">
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Sim, Deletar Tudo
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}
