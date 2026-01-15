-- Funções e Triggers

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER profiles_updated BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER subscriptions_updated BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER habits_updated BEFORE UPDATE ON habits FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Função para criar perfil ao registrar usuário
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id) VALUES (NEW.id);
  INSERT INTO subscriptions (user_id, plan_type, status) VALUES (NEW.id, 'free', 'inactive');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para novos usuários
CREATE TRIGGER new_user_trigger AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Função para verificar acesso premium
CREATE OR REPLACE FUNCTION has_premium_access(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  sub_status TEXT;
  sub_end TIMESTAMPTZ;
BEGIN
  SELECT status, current_period_end INTO sub_status, sub_end FROM subscriptions WHERE user_id = user_uuid;
  RETURN sub_status = 'active' AND (sub_end IS NULL OR sub_end > NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
