-- ============================================================
-- ATIVAR ASSINATURA MANUALMENTE NO SUPABASE
-- ============================================================
-- Use este SQL para ativar a assinatura do cliente que pagou
-- Execute no Supabase Dashboard > SQL Editor
-- ============================================================

-- PASSO 1: Criar usuário (se ainda não existir)
-- IMPORTANTE: Troque 'email@cliente.com' pelo email real do cliente

DO $$
DECLARE
  new_user_id UUID;
  user_email TEXT := 'email@cliente.com'; -- ⚠️ TROCAR AQUI
BEGIN
  -- Verificar se usuário já existe
  SELECT id INTO new_user_id FROM auth.users WHERE email = user_email;

  -- Se não existir, criar
  IF new_user_id IS NULL THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      confirmation_token,
      raw_app_meta_data,
      raw_user_meta_data
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      user_email,
      crypt('AlphaCut2025!', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '',
      '{"provider":"email","providers":["email"]}',
      '{}'
    )
    RETURNING id INTO new_user_id;

    RAISE NOTICE 'Usuário criado com sucesso! ID: %', new_user_id;
    RAISE NOTICE 'Email: %', user_email;
    RAISE NOTICE 'Senha temporária: AlphaCut2025!';
  ELSE
    RAISE NOTICE 'Usuário já existe! ID: %', new_user_id;
  END IF;

  -- PASSO 2: Ativar assinatura
  -- ⚠️ TROCAR os valores abaixo com os dados da Stripe

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
    new_user_id,
    'cus_XXXXXXXXX', -- ⚠️ TROCAR: Customer ID da Stripe
    'sub_XXXXXXXXX', -- ⚠️ TROCAR: Subscription ID da Stripe
    'price_1SoZB3APD5yL4G6BRJop7DTO', -- ⚠️ TROCAR se for anual: price_1SoZC2APD5yL4G6BP1G2rS4K
    'active',
    'monthly', -- ⚠️ TROCAR para 'annual' se for plano anual
    NOW(),
    NOW() + INTERVAL '1 month', -- ⚠️ TROCAR para '1 year' se for anual
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

  RAISE NOTICE 'Assinatura ativada com sucesso!';
  RAISE NOTICE 'Envie as credenciais para o cliente:';
  RAISE NOTICE '  Email: %', user_email;
  RAISE NOTICE '  Senha: AlphaCut2025!';
END $$;

-- ============================================================
-- VERIFICAR ASSINATURAS ATIVAS
-- ============================================================
SELECT
  u.email,
  s.status,
  s.plan_type,
  s.stripe_customer_id,
  s.current_period_end
FROM public.subscriptions s
JOIN auth.users u ON u.id = s.user_id
WHERE s.status = 'active';
