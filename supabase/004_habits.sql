-- Criar tabela de hábitos
CREATE TABLE IF NOT EXISTS habits (
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

CREATE POLICY "Users view own habits" ON habits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create own habits" ON habits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own habits" ON habits FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own habits" ON habits FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_habits_user_id ON habits(user_id);
