-- ==========================================
-- AI STARTUP BUILDER - DATABASE SCHEMA & RLS
-- Migration: 20260913000000_initial_schema.sql
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------
-- 1. PROFILES TABLE
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------
-- 2. STARTUPS TABLE
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.startups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- NULL for public demo startups
  title TEXT NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  industry TEXT,
  target_audience TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------
-- 3. DELIVERABLES TABLE (9 Core Output Deliverables)
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.deliverables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  startup_id UUID NOT NULL REFERENCES public.startups(id) ON DELETE CASCADE,
  business_model JSONB NOT NULL DEFAULT '{}'::jsonb,      -- 1. Lean Canvas
  competitor_matrix JSONB NOT NULL DEFAULT '{}'::jsonb,   -- 2. Competitor Analysis
  ui_wireframe JSONB NOT NULL DEFAULT '{}'::jsonb,        -- 3. UI Design Specifications & Components
  tech_stack JSONB NOT NULL DEFAULT '{}'::jsonb,          -- 4. Tech Stack & Architecture
  database_schema JSONB NOT NULL DEFAULT '{}'::jsonb,     -- 5. Database Schema & SQL DDL
  cost_estimation JSONB NOT NULL DEFAULT '{}'::jsonb,     -- 6. Year 1 Tiered Cost Breakdown
  marketing_plan JSONB NOT NULL DEFAULT '{}'::jsonb,      -- 7. Marketing Strategy & Day 1 Tactics
  pitch_deck JSONB NOT NULL DEFAULT '{}'::jsonb,          -- 8. 10-Slide Pitch Deck
  landing_page JSONB NOT NULL DEFAULT '{}'::jsonb,        -- 9. Landing Page Wireframe & Copy
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT unique_startup_deliverables UNIQUE(startup_id)
);

-- ------------------------------------------
-- 4. SIMULATION RUNS TABLE (Stress-Test & Pivot Engine)
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.simulation_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  startup_id UUID NOT NULL REFERENCES public.startups(id) ON DELETE CASCADE,
  shock_type TEXT NOT NULL, -- 'free_clone', 'traffic_1m', 'cost_increase_40', 'custom'
  shock_prompt TEXT NOT NULL,
  impact_summary TEXT,
  pivoted_lean_canvas JSONB NOT NULL DEFAULT '{}'::jsonb,
  pivoted_tech_stack JSONB NOT NULL DEFAULT '{}'::jsonb,
  pivoted_cost_breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
  strategic_pivots JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------
-- 5. WAITLIST SUBSCRIBERS TABLE
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.waitlist_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  startup_id UUID NOT NULL REFERENCES public.startups(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.simulation_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist_subscribers ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------
-- PROFILES POLICIES
-- ------------------------------------------
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ------------------------------------------
-- STARTUPS POLICIES
-- ------------------------------------------
-- Users can view their own startups OR guest/demo startups (user_id IS NULL)
CREATE POLICY "Users can view own or demo startups" 
  ON public.startups FOR SELECT 
  USING (user_id IS NULL OR auth.uid() = user_id);

-- Authenticated users can insert startups for themselves, or anon can insert demo startups
CREATE POLICY "Users can create startups" 
  ON public.startups FOR INSERT 
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

-- Only startup owner can update their startup
CREATE POLICY "Users can update own startups" 
  ON public.startups FOR UPDATE 
  USING (auth.uid() = user_id);

-- Only startup owner can delete their startup
CREATE POLICY "Users can delete own startups" 
  ON public.startups FOR DELETE 
  USING (auth.uid() = user_id);

-- ------------------------------------------
-- DELIVERABLES POLICIES
-- ------------------------------------------
CREATE POLICY "Users can view deliverables for accessible startups" 
  ON public.deliverables FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.startups s 
      WHERE s.id = deliverables.startup_id 
      AND (s.user_id IS NULL OR s.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can create deliverables for their startups" 
  ON public.deliverables FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.startups s 
      WHERE s.id = deliverables.startup_id 
      AND (s.user_id IS NULL OR s.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can update deliverables for their startups" 
  ON public.deliverables FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.startups s 
      WHERE s.id = deliverables.startup_id 
      AND (s.user_id IS NULL OR s.user_id = auth.uid())
    )
  );

-- ------------------------------------------
-- SIMULATION RUNS POLICIES
-- ------------------------------------------
CREATE POLICY "Users can view simulations for accessible startups" 
  ON public.simulation_runs FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.startups s 
      WHERE s.id = simulation_runs.startup_id 
      AND (s.user_id IS NULL OR s.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can create simulations for accessible startups" 
  ON public.simulation_runs FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.startups s 
      WHERE s.id = simulation_runs.startup_id 
      AND (s.user_id IS NULL OR s.user_id = auth.uid())
    )
  );

-- ------------------------------------------
-- WAITLIST SUBSCRIBERS POLICIES
-- ------------------------------------------
-- Anyone can submit an email to the waitlist capture form
CREATE POLICY "Anyone can subscribe to waitlist" 
  ON public.waitlist_subscribers FOR INSERT 
  WITH CHECK (true);

-- Startup owners can view subscribers to their waitlist
CREATE POLICY "Startup owners can view waitlist subscribers" 
  ON public.waitlist_subscribers FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.startups s 
      WHERE s.id = waitlist_subscribers.startup_id 
      AND (s.user_id IS NULL OR s.user_id = auth.uid())
    )
  );

-- ==========================================
-- TRIGGERS & FUNCTIONS
-- ==========================================

-- Function to handle automated profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution on auth.users table
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger for auto-updating updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_startups_updated_at BEFORE UPDATE ON public.startups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_deliverables_updated_at BEFORE UPDATE ON public.deliverables FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
