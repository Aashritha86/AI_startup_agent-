import { StartupDeliverables } from './startup';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      startups: {
        Row: {
          id: string
          user_id: string | null
          title: string
          tagline: string | null
          description: string
          industry: string | null
          target_audience: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          title: string
          tagline?: string | null
          description: string
          industry?: string | null
          target_audience?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          title?: string
          tagline?: string | null
          description?: string
          industry?: string | null
          target_audience?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      deliverables: {
        Row: {
          id: string
          startup_id: string
          business_model: Json
          competitor_matrix: Json
          ui_wireframe: Json
          tech_stack: Json
          database_schema: Json
          cost_estimation: Json
          marketing_plan: Json
          pitch_deck: Json
          landing_page: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          startup_id: string
          business_model?: Json
          competitor_matrix?: Json
          ui_wireframe?: Json
          tech_stack?: Json
          database_schema?: Json
          cost_estimation?: Json
          marketing_plan?: Json
          pitch_deck?: Json
          landing_page?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          startup_id?: string
          business_model?: Json
          competitor_matrix?: Json
          ui_wireframe?: Json
          tech_stack?: Json
          database_schema?: Json
          cost_estimation?: Json
          marketing_plan?: Json
          pitch_deck?: Json
          landing_page?: Json
          created_at?: string
          updated_at?: string
        }
      }
      simulation_runs: {
        Row: {
          id: string
          startup_id: string
          shock_type: string
          shock_prompt: string
          impact_summary: string | null
          pivoted_lean_canvas: Json
          pivoted_tech_stack: Json
          pivoted_cost_breakdown: Json
          strategic_pivots: Json
          created_at: string
        }
        Insert: {
          id?: string
          startup_id: string
          shock_type: string
          shock_prompt: string
          impact_summary?: string | null
          pivoted_lean_canvas?: Json
          pivoted_tech_stack?: Json
          pivoted_cost_breakdown?: Json
          strategic_pivots?: Json
          created_at?: string
        }
        Update: {
          id?: string
          startup_id?: string
          shock_type?: string
          shock_prompt?: string
          impact_summary?: string | null
          pivoted_lean_canvas?: Json
          pivoted_tech_stack?: Json
          pivoted_cost_breakdown?: Json
          strategic_pivots?: Json
          created_at?: string
        }
      }
      waitlist_subscribers: {
        Row: {
          id: string
          startup_id: string
          email: string
          name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          startup_id: string
          email: string
          name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          startup_id?: string
          email?: string
          name?: string | null
          created_at?: string
        }
      }
    }
  }
}
