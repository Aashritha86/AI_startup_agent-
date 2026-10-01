-- ==========================================
-- AI STARTUP BUILDER - INITIAL DATABASE SCHEMA & RLS
-- File: supabase/migrations/001_initial_schema.sql
-- ==========================================

-- 1. USERS TABLE (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. STARTUPS TABLE
CREATE TABLE IF NOT EXISTS public.startups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  tagline TEXT,
  raw_idea TEXT NOT NULL,
  category TEXT,
  target_market TEXT,
  budget TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. STARTUP BLUEPRINTS TABLE
CREATE TABLE IF NOT EXISTS public.startup_blueprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_id UUID NOT NULL REFERENCES public.startups(id) ON DELETE CASCADE,
  lean_canvas JSONB NOT NULL DEFAULT '{}'::jsonb,
  tech_stack JSONB NOT NULL DEFAULT '{}'::jsonb,
  db_schema_sql TEXT,
  competitors JSONB NOT NULL DEFAULT '[]'::jsonb,
  financials JSONB NOT NULL DEFAULT '{}'::jsonb,
  pitch_deck JSONB NOT NULL DEFAULT '[]'::jsonb,
  app_code JSONB NOT NULL DEFAULT '{}'::jsonb,
  devils_advocate JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT unique_startup_blueprint UNIQUE(startup_id)
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startup_blueprints ENABLE ROW LEVEL SECURITY;

-- Users Table Policies
CREATE POLICY "Users can view their own user record"
  ON public.users FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own user record"
  ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Startups Table Policies
CREATE POLICY "Users can view their own startups"
  ON public.startups FOR SELECT
  USING (user_id IS NULL OR auth.uid() = user_id);

CREATE POLICY "Users can insert startups"
  ON public.startups FOR INSERT
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

CREATE POLICY "Users can update their own startups"
  ON public.startups FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own startups"
  ON public.startups FOR DELETE
  USING (auth.uid() = user_id);

-- Startup Blueprints Table Policies
CREATE POLICY "Users can view blueprints for accessible startups"
  ON public.startup_blueprints FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.startups s
      WHERE s.id = startup_blueprints.startup_id
      AND (s.user_id IS NULL OR s.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can create blueprints for their startups"
  ON public.startup_blueprints FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.startups s
      WHERE s.id = startup_blueprints.startup_id
      AND (s.user_id IS NULL OR s.user_id = auth.uid())
    )
  );
