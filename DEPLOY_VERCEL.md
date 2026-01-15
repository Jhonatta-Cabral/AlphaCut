# 🚀 Deploy no Vercel - AlphaCut

## Por que Vercel?
- ✅ **Gratuito** para projetos pessoais
- ✅ **Suporta APIs serverless** (webhooks da Stripe)
- ✅ **Deploy automático** em 2 minutos
- ✅ **HTTPS gratuito** e CDN global
- ✅ **Integração perfeita** com React + Vite

---

## 📋 PASSO A PASSO (10 MINUTOS)

### **Passo 1: Fazer Login no Vercel**

No terminal, execute:
```bash
vercel login
```

Escolha uma opção:
- **GitHub** (recomendado)
- **Email**
- **GitLab**

### **Passo 2: Fazer Deploy**

```bash
vercel --prod
```

O Vercel vai perguntar:
1. **Set up and deploy?** → YES
2. **Which scope?** → Escolha sua conta
3. **Link to existing project?** → NO
4. **Project name?** → alphacut (ou deixe o padrão)
5. **Directory?** → ./ (aperte Enter)
6. **Override settings?** → NO

Aguarde o deploy (1-2 minutos).

### **Passo 3: Configurar Variáveis de Ambiente**

Acesse: https://vercel.com/dashboard

1. Clique no projeto **alphacut**
2. Vá em **Settings** → **Environment Variables**
3. Adicione TODAS as variáveis:

```
STRIPE_SECRET_KEY=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
STRIPE_WEBHOOK_SECRET=whsec_t7dvQUrhe9ooUHuVgm00ziPgmwfg1CJw
SUPABASE_URL=https://oquidmssxumbqiqkzqsg.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xdWlkbXNzeHVtYnFpcWt6cXNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODI0NDkxNiwiZXhwIjoyMDgzODIwOTE2fQ.xXaOQFFBTGqERaZo52Q4PrB5elJH52OWea-61oF2mhw

VITE_STRIPE_PUBLIC_KEY=pk_live_51SFZkUAPD5yL4G6BjKQsh4UcajBwNnquYxFJdUQS53QlqJRUJfLcNuXpI08GU13YCNieJX5jwCPT7Bl1tnuarCL1008n8UkGLT
VITE_SUPABASE_URL=https://oquidmssxumbqiqkzqsg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xdWlkbXNzeHVtYnFpcWt6cXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNDQ5MTYsImV4cCI6MjA4MzgyMDkxNn0.Aw2A0fK3ma8UrEoQi7F6B0mbscUAtyD2OXCyrNiBuY8
VITE_OPENAI_API_KEY=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
VITE_STRIPE_PAYMENT_LINK_MONTHLY=(seu payment link mensal)
VITE_STRIPE_PAYMENT_LINK_ANNUAL=(seu payment link anual)
```

4. Marque: **Production**, **Preview**, **Development**
5. Clique em **Save**

### **Passo 4: Fazer Redeploy**

Após adicionar as variáveis, faça redeploy:
```bash
vercel --prod
```

Copie a URL gerada (ex: `https://alphacut.vercel.app`)

### **Passo 5: Atualizar Webhook na Stripe**

1. Acesse: https://dashboard.stripe.com/webhooks
2. Clique no webhook existente
3. Atualize a **Endpoint URL**:
```
https://SEU_DOMINIO.vercel.app/api/stripe-webhook
```
4. Salvar

### **Passo 6: Atualizar VITE_FRONTEND_URL**

Volte no Vercel:
1. **Settings** → **Environment Variables**
2. Adicione:
```
VITE_FRONTEND_URL=https://SEU_DOMINIO.vercel.app
```
3. Redeploy novamente:
```bash
vercel --prod
```

---

## ✅ PRONTO! AGORA ESTÁ 100% AUTOMÁTICO

Quando alguém assinar:
1. ✅ Clica em "Assinar"
2. ✅ É redirecionado para Stripe Checkout
3. ✅ Completa o pagamento
4. ✅ Stripe envia webhook para `/api/stripe-webhook`
5. ✅ API atualiza automaticamente o Supabase
6. ✅ Usuário tem acesso premium ativado

---

## 🧪 TESTAR

Após deploy completo:
1. Acesse seu app no Vercel
2. Clique em "Assinar"
3. Complete o pagamento (use cartão teste ou real)
4. Verifique no Supabase se status mudou para `active`

---

## 📊 MONITORAR

**Logs do Vercel:**
https://vercel.com/dashboard → Seu projeto → **Logs**

**Logs da Stripe:**
https://dashboard.stripe.com/webhooks → Seu webhook → **Logs**

**Dados no Supabase:**
Dashboard → Table Editor → Tabela `subscriptions`

---

## 🎉 SEU APP ESTARÁ NO AR!

URL final: `https://alphacut.vercel.app` (ou domínio customizado)

Funcionamento 100% automático e pronto para receber assinantes reais! 🚀
