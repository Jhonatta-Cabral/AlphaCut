# 🚀 Guia de Publicação - AlphaCut

## ✅ O QUE JÁ ESTÁ PRONTO

### 1. **Configurações de Ambiente**
- ✅ Stripe Live Mode (chaves públicas e secretas)
- ✅ Supabase (URL e chaves)
- ✅ OpenAI API Key
- ✅ Webhook Secret da Stripe
- ✅ IDs de Preço dos Planos (Mensal e Anual)

### 2. **Infraestrutura Backend**
- ✅ API de Checkout (`/api/create-checkout-session.ts`)
- ✅ Webhook da Stripe (`/api/stripe-webhook.ts`)
- ✅ Configuração Vercel (`vercel.json`)

### 3. **Integração Stripe**
- ✅ Biblioteca Stripe instalada (`@stripe/stripe-js`)
- ✅ Função `createCheckoutSession()` em `/src/lib/stripe.ts`
- ✅ Página de Paywall atualizada com checkout real

### 4. **Banco de Dados**
- ✅ Esquema SQL criado (profiles, subscriptions, analyses, habits)
- ✅ Políticas RLS (Row Level Security)
- ✅ Triggers automáticos
- ✅ Função `has_premium_access()`

---

## 📋 PASSOS FINAIS PARA PUBLICAR

### **PASSO 1: Executar SQL no Supabase Dashboard**

O botão "Execute" está com erro. Execute manualmente:

1. Abra: **Supabase Dashboard** → **SQL Editor** → **New Query**
2. Copie e cole TODO o conteúdo do arquivo: `/workspace/EXECUTAR_NO_SUPABASE.sql`
3. Clique em **RUN**
4. Verifique se as tabelas foram criadas em **Table Editor**

---

### **PASSO 2: Deploy no Vercel**

```bash
# Instalar Vercel CLI (se ainda não tiver)
npm install -g vercel

# Fazer deploy
vercel --prod
```

**Durante o deploy, configure as variáveis de ambiente:**
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VITE_STRIPE_PUBLIC_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_FRONTEND_URL` (URL do seu app no Vercel)
- `OPENAI_API_KEY`

---

### **PASSO 3: Configurar Webhook na Stripe**

1. Acesse: **Stripe Dashboard** → **Developers** → **Webhooks**
2. Clique em **Add endpoint**
3. URL do endpoint: `https://SEU_DOMINIO.vercel.app/api/stripe-webhook`
4. Eventos para ouvir:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copie o **Signing Secret** e atualize `STRIPE_WEBHOOK_SECRET` no Vercel

---

### **PASSO 4: Testar Fluxo Completo**

1. **Criar conta** → Deve criar registro em `profiles` e `subscriptions`
2. **Clicar em "Assinar"** → Deve redirecionar para Stripe Checkout
3. **Completar pagamento** → Webhook deve atualizar status no Supabase
4. **Verificar Dashboard** → Status deve mostrar "Premium Ativo"

---

## ⚠️ O QUE AINDA PRECISA SER FEITO (OPCIONAL)

### **Autenticação Real com Supabase** (Atualmente usa localStorage)
O app está usando localStorage simulado. Para produção real:
- Implementar Supabase Auth (login/registro)
- Trocar `localStorage.getItem('userId')` por `supabase.auth.getUser()`
- Adicionar proteção de rotas

### **Análise de IA com OpenAI** (Atualmente usa dados simulados)
A página de análise está com dados fake. Para produção real:
- Criar API `/api/analyze-photo.ts`
- Integrar OpenAI Vision API
- Processar foto do usuário e retornar recomendações reais

---

## 📁 ARQUIVOS IMPORTANTES

```
/workspace/
├── api/
│   ├── create-checkout-session.ts   # Cria sessão de pagamento
│   └── stripe-webhook.ts             # Processa eventos da Stripe
├── src/
│   ├── config/
│   │   └── plans.ts                  # IDs de preço dos planos
│   ├── lib/
│   │   ├── supabase.ts               # Cliente Supabase
│   │   └── stripe.ts                 # Função de checkout
│   └── pages/
│       └── Paywall.tsx               # Página de assinatura (ATUALIZADA)
├── vercel.json                       # Configuração do Vercel
└── EXECUTAR_NO_SUPABASE.sql         # SQL para criar tabelas

```

---

## 🎯 RESUMO DO QUE FOI FEITO

✅ **Banco de dados estruturado** (4 tabelas + RLS + triggers)
✅ **Integração Stripe Checkout** (pagamentos reais em Live Mode)
✅ **Webhook handler** (sincroniza assinaturas com Supabase)
✅ **APIs serverless** (Vercel Functions)
✅ **Configuração de planos** (IDs de preço Live)

---

## 🚨 CHECKLIST FINAL

- [ ] SQL executado no Supabase (tabelas criadas)
- [ ] Deploy feito no Vercel
- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] Webhook configurado na Stripe
- [ ] Teste completo de assinatura realizado
- [ ] Verificar se Supabase recebe atualização após pagamento

---

## 📞 SUPORTE

Se algum passo falhar:
1. Verifique os logs do Vercel
2. Verifique os logs do Stripe (Developers → Webhooks → Logs)
3. Verifique os logs do Supabase (Logs → Postgres Logs)

Boa sorte! 🚀
