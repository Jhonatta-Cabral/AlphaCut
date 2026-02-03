import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { ArrowLeft, BookOpen, Scissors, Shirt, Watch, Lock, Crown, X, Sparkles } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

interface Tip {
  id: string
  title: string
  category: string
  icon: any
  preview: string
  content: string[]
  isPremium: boolean
  readTime: string
}

export default function Tips() {
  const navigate = useNavigate()
  const { hasAccess } = useSubscription()
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null)

  const tips: Tip[] = [
    {
      id: '1',
      title: 'Como Escolher o Barbeiro Ideal',
      category: 'Cortes',
      icon: Scissors,
      preview: 'Um bom barbeiro faz toda a diferença no resultado final. Descubra o que procurar.',
      content: [
        'Um bom barbeiro é essencial para manter seu visual sempre impecável. Mas como encontrar o profissional ideal? Aqui estão os pontos principais:',
        '**1. Verifique o Portfólio**: Todo barbeiro de qualidade tem fotos de trabalhos anteriores. Veja se o estilo dele combina com o que você busca.',
        '**2. Conhecimento de Visagismo**: O profissional precisa entender formatos de rosto e saber recomendar cortes adequados para você.',
        '**3. Comunicação**: Um ótimo barbeiro sabe ouvir. Ele deve fazer perguntas sobre seu estilo de vida, rotina e preferências antes de começar o corte.',
        '**4. Higiene e Produtos**: O ambiente deve ser limpe e organizado. Verifique se usam produtos de qualidade e se as ferramentas são esterilizadas.',
        '**5. Consistência**: Um bom teste é voltar algumas vezes. O barbeiro consegue replicar o mesmo corte com qualidade? Isso mostra profissionalismo.',
        'Investir tempo para encontrar o barbeiro certo vale muito a pena. Você terá resultados melhores e mais consistentes ao longo do tempo.'
      ],
      isPremium: false,
      readTime: '3 min'
    },
    {
      id: '2',
      title: 'Produtos Essenciais Para Cabelo Masculino',
      category: 'Cuidados',
      icon: Watch,
      preview: 'Conheça os produtos fundamentais que todo homem deve ter.',
      content: [
        'Ter os produtos certos faz toda a diferença no resultado final do seu visual. Aqui está o kit essencial:',
        '**Pomada Matte**: Ideal para um visual natural sem brilho. Ótima fixação e fácil de remodelar ao longo do dia. Perfeita para ambientes profissionais.',
        '**Cera Modeladora**: Para penteados mais elaborados que precisam de fixação forte. Use em pequenas quantidades.',
        '**Spray Texturizador**: Adiciona volume e movimento. Aplique antes de finalizar o penteado para um efeito mais natural.',
        '**Shampoo Específico**: Escolha de acordo com seu tipo de cabelo (oleoso, seco, normal). Não use shampoo de corpo - seu cabelo merece produto específico.',
        '**Condicionador**: Essencial para manter a hidratação. Use 2-3x por semana, focando no comprimento e pontas.',
        '**Dica Premium**: Invista em produtos de qualidade. Um pote de pomada boa dura meses e o resultado vale o investimento.'
      ],
      isPremium: false,
      readTime: '4 min'
    },
    {
      id: '3',
      title: 'Frequência Ideal de Corte Por Estilo',
      category: 'Manutenção',
      icon: Scissors,
      preview: 'Descubra com que frequência você deve ir ao barbeiro para cada tipo de corte.',
      content: [
        'Manter a frequência certa de cortes é crucial para ter sempre um visual impecável. Veja o cronograma ideal:',
        '**Cortes Muito Curtos (Buzz Cut, Military)**: 1-2 semanas. Esses estilos perdem a forma rapidamente.',
        '**Cortes Curtos com Degradê**: 2-3 semanas. O degradê começa a crescer e perde a definição.',
        '**Undercut e Laterais Raspadas**: 3 semanas. As laterais crescem e o contraste com o topo diminui.',
        '**Cortes Médios**: 4-5 semanas. Você tem mais flexibilidade, mas precisa manter a forma.',
        '**Cabelos Longos**: 6-8 semanas. Vá apenas para aparar as pontas e manter a saúde do cabelo.',
        '**Barba**: Semanal para manter contornos definidos. A cada 2-3 semanas para ajuste de comprimento.',
        'Lembre-se: é melhor ir com mais frequência e fazer ajustes leves do que esperar muito e precisar de um corte drástico.'
      ],
      isPremium: false,
      readTime: '3 min'
    },
    {
      id: '4',
      title: 'Masterclass: Técnicas Avançadas de Styling',
      category: 'Estilo',
      icon: Sparkles,
      preview: 'Aprenda técnicas profissionais para finalizar seu cabelo como um barbeiro.',
      content: [
        'Neste guia premium, você aprenderá técnicas que barbeiros profissionais usam diariamente:',
        '**Secagem Profissional**: Como usar o secador para criar volume, textura e direção. Temperatura correta, distância ideal e movimento das mãos.',
        '**Aplicação de Produtos**: A técnica correta de espalhar pomada, cera e spray. Como aquecer nas mãos, distribuir uniformemente e criar diferentes efeitos.',
        '**Penteados Clássicos**: Passo a passo para criar pompadour, side part, slick back e quiff. Incluindo truques para fazer durar o dia todo.',
        '**Finalização Texturizada**: Como criar aquele visual "bagunçado arrumado" que está em alta. Produtos certos e técnicas de aplicação.',
        '**Manutenção Durante o Dia**: Como retocar o cabelo ao longo do dia sem precisar refazer tudo. Truques rápidos para reuniões importantes.',
        '**Adaptação ao Clima**: Técnicas específicas para dias úmidos, muito secos, ou com vento. Como fazer seu penteado resistir a qualquer situação.',
        '**Ferramentas Profissionais**: Quando vale a pena investir em escova, pente, secador profissional. Como escolher e usar cada ferramenta.',
        'Este conteúdo completo inclui dicas que levaram anos para barbeiros profissionais dominarem.'
      ],
      isPremium: true,
      readTime: '12 min'
    },
    {
      id: '5',
      title: 'Guia Completo: Barba Perfeita',
      category: 'Barba',
      icon: Scissors,
      preview: 'Do crescimento à manutenção - tudo sobre barba em um guia definitivo.',
      content: [
        'Este é o guia mais completo sobre barba que você vai encontrar:',
        '**Fase 1: Crescimento**: Os primeiros 30 dias são cruciais. Como lidar com coceira, falhas e crescimento irregular. Quando começar a aparar.',
        '**Definindo o Estilo**: Qual formato de barba combina com seu rosto. Curta corporativa, média estilosa ou longa de lenhador - prós e contras.',
        '**Rotina de Cuidados**: Lavar, hidratar, pentear e modelar. Produtos essenciais: óleo, balm, shampoo específico. Frequência ideal de cada etapa.',
        '**Aparar em Casa**: Técnicas profissionais para aparar sozinho. Como usar máquina, tesoura e navalha. Definição de contornos no pescoço e bochechas.',
        '**Problemas Comuns**: Pelos encravados, caspa, coceira, manchas brancas. Soluções práticas para cada problema.',
        '**Tintura e Coloração**: Quando considerar, como escolher o tom certo, aplicação profissional vs caseira.',
        '**Barba e Idade**: Como adaptar o estilo da barba conforme você envelhece. Lidando com fios brancos de forma estilosa.',
        '**Integração com Corte**: Como combinar barba e cabelo para um visual harmonioso. Exemplos práticos para diferentes formatos de rosto.'
      ],
      isPremium: true,
      readTime: '15 min'
    },
    {
      id: '6',
      title: 'Cuidados com o Couro Cabeludo',
      category: 'Saúde',
      icon: Watch,
      preview: 'A base de um cabelo saudável começa no couro cabeludo.',
      content: [
        'Muitos homens focam apenas no cabelo e esquecem do couro cabeludo. Esse é um erro que pode comprometer todo o visual:',
        '**Limpeza Adequada**: Massageie o couro cabeludo ao lavar - isso estimula a circulação e remove impurezas. Use as pontas dos dedos, nunca as unhas.',
        '**Temperatura da Água**: Use água morna, nunca quente. Água muito quente resseca o couro cabeludo e pode causar oleosidade excessiva como compensação.',
        '**Frequência de Lavagem**: 2-3x por semana é ideal para a maioria. Lavar todo dia pode ressecar. Menos que isso pode causar acúmulo de oleosidade.',
        '**Esfoliação**: Uma vez por semana, use um shampoo esfoliante ou faça uma esfoliação suave. Remove células mortas e estimula crescimento.',
        '**Hidratação**: Couro cabeludo também precisa de hidratação. Use tônicos específicos ou óleos leves.',
        '**Evite**: Dormir com cabelo molhado, usar toalhas sujas, coçar com força, produtos com álcool em excesso.',
        'Um couro cabeludo saudável é a base para um cabelo forte, brilhante e com crescimento adequado.'
      ],
      isPremium: false,
      readTime: '4 min'
    },
    {
      id: '7',
      title: 'Estilo Profissional: Do Corporativo ao Criativo',
      category: 'Profissional',
      icon: Shirt,
      preview: 'Como adaptar seu visual para diferentes ambientes de trabalho.',
      content: [
        'Seu cabelo comunica antes mesmo de você falar. Veja como escolher o estilo certo para sua carreira:',
        '**Corporativo Tradicional (Bancos, Advocacia, Consultoria)**: Degradê baixo ou médio com laterais curtas. Topo penteado para o lado. Barba curta e bem definida ou rosto limpo. Evite: desenhos, cores, comprimento excessivo.',
        '**Área Criativa (Publicidade, Design, Tech)**: Mais liberdade! Undercut, topete, texturas. Barba média é bem-vinda. Você pode arriscar mais sem perder profissionalismo.',
        '**Ambientes Conservadores (Médico, Professor, Engenharia)**: Cortes clássicos sempre funcionam. Short crop, side part, quiff discreto. Mantenha sempre bem feito - cortes desleixados passam má impressão.',
        '**Empreendedor/Autônomo**: Seu estilo pode refletir sua marca pessoal. Seja autêntico, mas sempre bem cuidado. Investir no visual é investir no seu negócio.',
        '**Regra de Ouro**: Seja qual for seu ambiente, cabelo e barba bem cuidados sempre passam profissionalismo. A diferença está no estilo, não na qualidade da manutenção.',
        'Adapte-se à cultura da empresa, mas não perca sua identidade. O equilíbrio é a chave.'
      ],
      isPremium: false,
      readTime: '5 min'
    },
    {
      id: '8',
      title: 'Protocolo Completo: Recuperação Capilar',
      category: 'Tratamento',
      icon: Sparkles,
      preview: 'Sistema profissional para recuperar cabelos danificados.',
      content: [
        'Este é um protocolo profissional de 90 dias para recuperar cabelos danificados por química, calor ou falta de cuidados:',
        '**Semanas 1-4 (Fase de Limpeza)**: Corte todas as pontas danificadas. Use shampoo detox 1x por semana. Hidratação profunda 2x por semana. Elimine ferramentas de calor.',
        '**Semanas 5-8 (Fase de Reconstrução)**: Máscaras de reconstrução com queratina. Ampolas de tratamento. Introduza leave-in protetor. Comece a usar óleos leves.',
        '**Semanas 9-12 (Fase de Manutenção)**: Continue hidratações semanais. Retome ferramentas de calor COM protetor térmico. Cortes de manutenção a cada 3 semanas.',
        '**Nutrição de Dentro Para Fora**: Biotina, vitamina E, ômega 3. Hidratação adequada (2L água/dia). Alimentação balanceada com proteínas.',
        '**Produtos Recomendados**: Lista específica de shampoos, máscaras, leave-ins e óleos que funcionam. Marcas premium e opções acessíveis.',
        '**Evite Completamente**: Shampoos com sulfato, água muito quente, dormir com cabelo molhado, elásticos apertados, pentear molhado sem cuidado.',
        '**Resultados Esperados**: Semana 4 - menos quebra. Semana 8 - brilho e maciez. Semana 12 - cabelo renovado e saudável.',
        'Siga o protocolo rigorosamente e você verá resultados impressionantes.'
      ],
      isPremium: true,
      readTime: '10 min'
    },
    {
      id: '9',
      title: 'Produtos Premium vs Acessíveis: Vale a Pena?',
      category: 'Produtos',
      icon: Watch,
      preview: 'Análise honesta sobre quando investir e quando economizar.',
      content: [
        'Você realmente precisa gastar muito em produtos? A resposta é: depende. Vamos analisar:',
        '**Shampoo e Condicionador**: Aqui vale investir. A diferença de qualidade é grande. Um shampoo bom dura meses e protege seu cabelo. Marcas intermediárias já fazem diferença.',
        '**Pomadas e Ceras**: Produtos premium duram mais e performam melhor. Um pote caro pode durar 6+ meses. Divida o valor pelos meses de uso - não fica tão caro assim.',
        '**Sprays e Finalizadores**: Marcas intermediárias funcionam bem. Não precisa pagar muito caro, mas evite os muito baratos.',
        '**Onde Economizar**: Pentes, escovas básicas, toalhas. Aqui não faz muita diferença.',
        '**Onde Investir**: Máquina de corte (se usar em casa), secador, produtos de hidratação, finalizadores diários.',
        '**Teste Antes de Comprar**: Muitas barbearias vendem produtos. Peça para testar antes de comprar. Ou compre versões menores primeiro.',
        'A regra é: produtos que você usa todo dia merecem investimento. Produtos ocasionais podem ser mais acessíveis.'
      ],
      isPremium: false,
      readTime: '4 min'
    },
    {
      id: '10',
      title: 'Academia de Grooming: Curso Completo',
      category: 'Masterclass',
      icon: Crown,
      preview: 'O curso mais completo sobre cuidados masculinos.',
      content: [
        'Bem-vindo à Academia de Grooming - o curso mais completo sobre cuidados e estilo masculino:',
        '**Módulo 1 - Fundamentos**: Anatomia do cabelo e barba. Como identificar seu tipo. Ciclo de crescimento. Base científica de todos os cuidados.',
        '**Módulo 2 - Análise Facial**: Como identificar seu formato de rosto. Proporções ideais. Harmonia facial. O que valorizar e o que suavizar.',
        '**Módulo 3 - Cortes Estratégicos**: Cada formato de rosto tem cortes ideais. Guia completo com fotos, explicações e recomendações profissionais.',
        '**Módulo 4 - Barba Arquitetada**: Como desenhar a barba perfeita para seu rosto. Técnicas de contorno, definição e preenchimento.',
        '**Módulo 5 - Produtos Profissionais**: Tudo sobre cada categoria de produto. Como escolher, quando usar, quanto aplicar. Combinações que funcionam.',
        '**Módulo 6 - Técnicas de Styling**: Das básicas às avançadas. Como criar qualquer penteado. Segredos de barbeiros profissionais revelados.',
        '**Módulo 7 - Fotografia e Ângulos**: Como se apresentar melhor em fotos e vídeos. Ângulos que valorizam, poses naturais, iluminação.',
        '**Módulo 8 - Manutenção e Rotinas**: Criando sua rotina personalizada. Cronograma de cuidados. Como manter resultados a longo prazo.',
        '**Bônus**: Acesso ao grupo exclusivo de membros, sessões de Q&A ao vivo, atualizações de conteúdo, certificado de conclusão.',
        'Este é o único curso que você vai precisar. Conhecimento acumulado de décadas de experiência.'
      ],
      isPremium: true,
      readTime: '45 min (curso)'
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
      'Tratamento': 'text-pink-500',
      'Barba': 'text-cyan-500',
      'Masterclass': 'text-amber-500'
    }
    return colors[category] || 'text-blue-500'
  }

  const handleTipClick = (tip: Tip) => {
    if (tip.isPremium && !hasAccess) {
      navigate('/paywall')
    } else {
      setSelectedTip(tip)
    }
  }

  const freeTips = tips.filter(t => !t.isPremium)
  const premiumTips = tips.filter(t => t.isPremium)

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
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

        {/* Dicas Gratuitas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Artigos Gratuitos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeTips.map((tip) => {
              const Icon = tip.icon
              return (
                <Card
                  key={tip.id}
                  onClick={() => handleTipClick(tip)}
                  className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center group-hover:bg-blue-950 transition-colors">
                        <Icon className="w-5 h-5 text-blue-500" />
                      </div>
                      <span className="text-xs text-zinc-500">{tip.readTime}</span>
                    </div>
                    <div className="mb-2">
                      <span className={`text-xs font-semibold ${getCategoryColor(tip.category)}`}>
                        {tip.category.toUpperCase()}
                      </span>
                    </div>
                    <CardTitle className="text-white text-lg group-hover:text-blue-400 transition-colors">
                      {tip.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-400 text-sm leading-relaxed">{tip.preview}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Dicas Premium */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Crown className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-white">Conteúdo Premium</h2>
            <Badge variant="secondary" className="bg-yellow-950 text-yellow-500 border-yellow-800">
              EXCLUSIVO
            </Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumTips.map((tip) => {
              const Icon = tip.icon
              const isLocked = !hasAccess
              return (
                <Card
                  key={tip.id}
                  onClick={() => handleTipClick(tip)}
                  className={`bg-zinc-900 border-zinc-800 transition-all cursor-pointer group relative overflow-hidden ${
                    isLocked ? 'hover:border-yellow-800' : 'hover:border-zinc-700'
                  }`}
                >
                  {isLocked && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="w-8 h-8 rounded-full bg-zinc-950 border border-yellow-800 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center group-hover:bg-yellow-950 transition-colors">
                        <Icon className="w-5 h-5 text-yellow-500" />
                      </div>
                      <span className="text-xs text-zinc-500">{tip.readTime}</span>
                    </div>
                    <div className="mb-2">
                      <span className={`text-xs font-semibold ${getCategoryColor(tip.category)}`}>
                        {tip.category.toUpperCase()}
                      </span>
                    </div>
                    <CardTitle className="text-white text-lg group-hover:text-yellow-400 transition-colors">
                      {tip.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-400 text-sm leading-relaxed">{tip.preview}</p>
                    {isLocked && (
                      <div className="mt-4">
                        <Badge variant="outline" className="border-yellow-800 text-yellow-500">
                          Apenas Premium
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* CTA Premium */}
        {!hasAccess && (
          <Card className="bg-gradient-to-r from-yellow-950 to-zinc-900 border-yellow-900 mt-12">
            <CardContent className="py-8 text-center">
              <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Desbloqueie Todo o Conteúdo</h3>
              <p className="text-zinc-400 mb-6 max-w-2xl mx-auto">
                Acesse masterclasses exclusivas, guias completos, protocolos profissionais e muito mais.
                Conhecimento que levou anos para reunir, disponível para você agora.
              </p>
              <Button
                onClick={() => navigate('/paywall')}
                size="lg"
                className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800"
              >
                Ver Planos Premium
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dialog de Conteúdo */}
      <Dialog open={!!selectedTip} onOpenChange={() => setSelectedTip(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-zinc-900 border-zinc-800">
          {selectedTip && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`text-xs font-semibold ${getCategoryColor(selectedTip.category)}`}>
                      {selectedTip.category.toUpperCase()}
                    </span>
                    <DialogTitle className="text-2xl text-white mt-2">
                      {selectedTip.title}
                    </DialogTitle>
                    <p className="text-sm text-zinc-500 mt-2">
                      Tempo de leitura: {selectedTip.readTime}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedTip(null)}
                    className="text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </DialogHeader>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                {selectedTip.content.map((paragraph, i) => {
                  // Detectar títulos com **
                  if (paragraph.includes('**')) {
                    const parts = paragraph.split('**')
                    return (
                      <p key={i} className="text-base">
                        {parts.map((part, j) =>
                          j % 2 === 1 ?
                            <strong key={j} className="text-white font-semibold">{part}</strong> :
                            part
                        )}
                      </p>
                    )
                  }
                  return <p key={i} className="text-base">{paragraph}</p>
                })}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
