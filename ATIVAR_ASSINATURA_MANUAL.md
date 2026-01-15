# 🔧 Como Ativar Assinatura Manualmente no Supabase

Como a plataforma Lasy não suporta webhooks serverless, você precisa ativar as assinaturas manualmente no Supabase.

## 📋 PASSO A PASSO

### 1. **Obter Dados da Stripe**

Quando alguém assinar:

1. Acesse: https://dashboard.stripe.com/subscriptions
2. Clique na assinatura mais recente
3. Anote:
   - **Customer ID** (começa com `cus_...`)
   - **Subscription ID** (começa com `sub_...`)
   - **Price ID** (o que foi usado no pagamento)
   - **Email do cliente**

### 2. **Criar ou Atualizar Usuário no Supabase**

Acesse: Supabase Dashboard > SQL Editor > New Query

Cole e execute este SQL (substitua os valores):

```sql
-- Primeiro, criar usuário se não existir (substitua o email)
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
)
VALUES (
  gen_random_uuid(),
  'email@cliente.com', -- TROCAR PELO EMAIL DO CLIENTE
  crypt('senha-temporaria-123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING
RETURNING id;

-- Copie o UUID retornado acima (id do usuário)
-- Use esse UUID no próximo comando

-- Ativar assinatura (substitua os valores)
INSERT INTO public.subscriptions (
  user_id,
  stripe_customer_id,
  stripe_subscription_id,
  stripe_price_id,
  status,
  plan_type,
  current_period_start,
  current_period_end,
  cancel_at_period_end
)
VALUES (
  'UUID-DO-USUARIO-COPIADO-ACIMA', -- TROCAR
  'cus_XXXXXXXXX', -- TROCAR pelo Customer ID da Stripe
  'sub_XXXXXXXXX', -- TROCAR pelo Subscription ID da Stripe
  'price_1SoZB3APD5yL4G6BRJop7DTO', -- Price ID (mensal ou anual)
  'active',
  'monthly', -- ou 'annual'
  NOW(),
  NOW() + INTERVAL '1 month', -- ou '1 year' para anual
  FALSE
)
ON CONFLICT (user_id)
DO UPDATE SET
  stripe_customer_id = EXCLUDED.stripe_customer_id,
  stripe_subscription_id = EXCLUDED.stripe_subscription_id,
  stripe_price_id = EXCLUDED.stripe_price_id,
  status = 'active',
  plan_type = EXCLUDED.plan_type,
  current_period_start = EXCLUDED.current_period_start,
  current_period_end = EXCLUDED.current_period_end;
```

### 3. **Enviar Credenciais para o Cliente**

Depois de ativar, envie para o cliente:
- Email: `email@cliente.com`
- Senha temporária: `senha-temporaria-123`
- Instrução: "Acesse o app e faça login. Recomendamos trocar a senha no perfil."

---

## 🚀 SOLUÇÃO DEFINITIVA (RECOMENDADO)

Para automatizar 100%, você precisa migrar para uma plataforma que suporte APIs serverless:

### **Opção 1: Vercel (RECOMENDADO)**
1. Crie conta no Vercel: https://vercel.com
2. Faça deploy do projeto:
   ```bash
   vercel --prod
   ```
3. Configure as variáveis de ambiente no Vercel
4. Atualize a URL do webhook na Stripe

### **Opção 2: Netlify**
Similar ao Vercel, suporta Functions

### **Opção 3: Railway / Render**
Plataformas com suporte a APIs backend

---

## ⚡ SCRIPT RÁPIDO (PARA CASOS URGENTES)

Se quiser ativar RAPIDAMENTE sem criar usuário novo:

```sql
-- Listar todos os usuários existentes
SELECT id, email FROM auth.users;

-- Ativar assinatura para um usuário existente
UPDATE public.subscriptions
SET
  stripe_customer_id = 'cus_XXXXXX',
  stripe_subscription_id = 'sub_XXXXXX',
  status = 'active',
  plan_type = 'monthly',
  current_period_end = NOW() + INTERVAL '1 month'
WHERE user_id = 'UUID-DO-USUARIO';
```

---

## 📊 VERIFICAR ASSINATURAS ATIVAS

```sql
SELECT
  s.user_id,
  u.email,
  s.status,
  s.plan_type,
  s.stripe_customer_id,
  s.current_period_end
FROM public.subscriptions s
JOIN auth.users u ON u.id = s.user_id
WHERE s.status = 'active';
```
