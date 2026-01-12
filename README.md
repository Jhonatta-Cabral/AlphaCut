# AlphaCut - Consultoria de Estilo Masculino

Um aplicativo PWA (Progressive Web App) de consultoria de visagismo masculino baseado em IA, com design premium dark mode e monetização por assinatura.

## 🎯 Funcionalidades

### Core Features
- **Análise de Visagismo**: Upload de foto e análise do formato de rosto e tipo de cabelo
- **Recomendações Personalizadas**: Sugestões de cortes baseadas no objetivo do usuário
- **Rastreador de Hábitos**: Acompanhamento diário com sistema de streak/ofensiva
- **Conteúdo Educativo**: Dicas e artigos sobre estilo e cuidados masculinos

### Sistema de Monetização
- **1 Análise Gratuita**: Mostra apenas o formato do rosto
- **Plano Mensal**: R$ 9,90/mês - Acesso completo
- **Plano Anual**: R$ 49,00/ano - 58% de economia
- **Paywall**: Análises completas bloqueadas para usuários free

### Funcionalidades Técnicas
- PWA com manifesto configurado
- Autenticação simples com localStorage
- Sistema de assinaturas
- Histórico de análises
- Dark mode premium (cinza chumbo, preto, azul royal)
- Design responsivo e minimalista
- Interface focada em imagens

## 🚀 Como Usar

O app já está configurado e pronto para uso! Todas as funcionalidades estão implementadas:

1. **Landing Page** (`/`) - Apresentação do app
2. **Onboarding** (`/onboarding`) - Criação de conta
3. **Dashboard** (`/dashboard`) - Hub principal do usuário
4. **Análise** (`/analysis`) - Fazer nova análise de visagismo
5. **Resultados** (`/results/:id`) - Ver resultado da análise
6. **Hábitos** (`/habits`) - Rastreador de hábitos diários
7. **Dicas** (`/tips`) - Conteúdo educativo
8. **Perfil** (`/profile`) - Gerenciar conta e assinatura
9. **Paywall** (`/paywall`) - Tela de venda dos planos

## 🎨 Design System

### Cores
- **Background**: Gradiente de cinza chumbo/preto (`zinc-950`, `zinc-900`)
- **Cards**: `zinc-900` com bordas `zinc-800`
- **Primary**: Azul royal (`blue-600`, `blue-700`)
- **Accent**: Dourado para badges Premium (`yellow-500`, `yellow-600`)
- **Text**: Branco para títulos, `zinc-400` para descrições

### Tipografia
- Moderna, limpa e minimalista
- Hierarquia clara entre títulos e textos

## 📦 Estrutura de Dados

### LocalStorage Keys
- `alphacut-user` - Dados do usuário
- `alphacut-subscription` - Informações de assinatura
- `alphacut-analyses` - Histórico de análises
- `alphacut-habits` - Dados do rastreador de hábitos

### Tipos de Análise
```typescript
{
  id: string
  date: string
  faceShape: 'Oval' | 'Retangular' | 'Redondo' | 'Quadrado' | 'Triangular'
  hairType: 'Liso' | 'Ondulado' | 'Cacheado' | 'Crespo'
  goal: string
  photo: string (base64)
}
```

## 🔐 Sistema de Acesso

### Usuário Free
- 1 análise gratuita
- Vê apenas o formato do rosto
- Conteúdo educativo básico
- Rastreador de hábitos

### Usuário Premium
- Análises ilimitadas
- Recomendações completas de cortes
- Tipo de cabelo
- Dicas detalhadas
- Todo histórico salvo

## 🎯 Objetivos de Análise

O usuário escolhe um objetivo que influencia as recomendações:
1. **Parecer mais jovem** - Cortes que rejuvenescem
2. **Passar autoridade** - Estilo profissional e confiante
3. **Visual moderno** - Cortes atuais e estilosos
4. **Elegância clássica** - Estilo atemporal e sofisticado

## 📊 Rastreador de Hábitos

4 hábitos diários:
- 💧 Hidratação (2L água)
- 💪 Treino físico
- ✨ Cuidado pessoal
- ✂️ Cuidados com a barba

Sistema de streak motivacional com contador de dias seguidos.

## 🛠️ Stack Técnica

- **React 18** com TypeScript
- **Vite** para build
- **Tailwind CSS** para estilização
- **shadcn/ui** para componentes
- **React Router DOM v7** para navegação
- **Lucide React** para ícones
- **localStorage** para persistência
- **PWA** com manifesto configurado

## 📱 PWA Features

- Instalável no dispositivo
- Funciona offline (após primeira carga)
- Ícones e splash screen configurados
- Meta tags para iOS e Android

## 🎉 Pronto para Usar!

O AlphaCut está totalmente funcional e pronto para ser testado. Todas as páginas, funcionalidades e integrações estão implementadas!
