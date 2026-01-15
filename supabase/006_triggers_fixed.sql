-- Criar triggers para as novas tabelas (subscriptions e habits)
CREATE TRIGGER subscriptions_updated_trigger
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER habits_updated_trigger
  BEFORE UPDATE ON habits
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();
