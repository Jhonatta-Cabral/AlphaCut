-- ============================================================
-- SQL - LIMPAR E RECRIAR TUDO DO ZERO
-- Execute este no Supabase Dashboard
-- ============================================================

-- PASSO 1: Remover tabelas existentes (se houver)
DROP TABLE IF EXISTS public.habits CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;

-- PASSO 2: Criar tabela de Assinaturas
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_price_id TEXT,
  status TEXT NOT NULL DEFAULT 'inactive',
  plan_type TEXT NOT NULL DEFAULT 'free',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  canceled_at TIMESTAMPTZ,
  analysis_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Política de acesso
CREATE POLICY "Users view subscription" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Índices
CREATE INDEX sub_user_idx ON public.subscriptions(user_id);
CREATE INDEX sub_stripe_idx ON public.subscriptions(stripe_customer_id);

-- PASSO 3: Criar tabela de Hábitos
CREATE TABLE public.habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  target_days INTEGER DEFAULT 30,
  current_streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  completed_dates JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso
CREATE POLICY "Users view habits" ON public.habits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users create habits" ON public.habits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update habits" ON public.habits
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users delete habits" ON public.habits
  FOR DELETE USING (auth.uid() = user_id);

-- Índice
CREATE INDEX habits_user_idx ON public.habits(user_id);

-- PASSO 4: Criar triggers para updated_at
CREATE TRIGGER subscriptions_updated_trigger
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER habits_updated_trigger
  BEFORE UPDATE ON public.habits
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- PASSO 5: Recriar função handle_new_user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id) VALUES (NEW.id) ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.subscriptions (user_id, plan_type, status) VALUES (NEW.id, 'free', 'inactive');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- CONCLUÍDO! Tabelas criadas e configuradas
-- ============================================================
