-- Criar tabela de análises
CREATE TABLE IF NOT EXISTS analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  goal TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  face_shape TEXT,
  hair_type TEXT,
  ai_recommendations JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own analyses" ON analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create own analyses" ON analyses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own analyses" ON analyses FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_analyses_user_id ON analyses(user_id);
