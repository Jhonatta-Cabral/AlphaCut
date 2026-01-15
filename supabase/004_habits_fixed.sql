-- Criar tabela de hábitos (versão corrigida)
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  target_days INTEGER DEFAULT 30,
  current_streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  completed_dates JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE habits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view habits" ON habits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create habits" ON habits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update habits" ON habits FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete habits" ON habits FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX habits_user_idx ON habits(user_id);
