-- ============================================================
-- COPIE ESTE SQL E EXECUTE NO SUPABASE DASHBOARD
-- Vá em: Supabase Dashboard > SQL Editor > New Query
-- Cole todo este código e clique em RUN
-- ============================================================

-- Tabela de Assinaturas
CREATE TABLE IF NOT EXISTS public.subscriptions (
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

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users view subscription" ON public.subscriptions;
CREATE POLICY "Users view subscription" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS sub_user_idx ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS sub_stripe_idx ON public.subscriptions(stripe_customer_id);

-- Tabela de Hábitos
CREATE TABLE IF NOT EXISTS public.habits (
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

ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users view habits" ON public.habits;
DROP POLICY IF EXISTS "Users create habits" ON public.habits;
DROP POLICY IF EXISTS "Users update habits" ON public.habits;
DROP POLICY IF EXISTS "Users delete habits" ON public.habits;

CREATE POLICY "Users view habits" ON public.habits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create habits" ON public.habits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update habits" ON public.habits FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete habits" ON public.habits FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS habits_user_idx ON public.habits(user_id);

-- Triggers para updated_at
DROP TRIGGER IF EXISTS subscriptions_updated_trigger ON public.subscriptions;
CREATE TRIGGER subscriptions_updated_trigger
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS habits_updated_trigger ON public.habits;
CREATE TRIGGER habits_updated_trigger
  BEFORE UPDATE ON public.habits
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Atualizar função handle_new_user para incluir subscriptions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id) VALUES (NEW.id);
  INSERT INTO public.subscriptions (user_id, plan_type, status) VALUES (NEW.id, 'free', 'inactive');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- FIM - Execute tudo de uma vez no Supabase Dashboard
-- ============================================================
