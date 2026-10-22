export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          role: "user" | "admin";
          timezone: string;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          role?: "user" | "admin";
          timezone?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          role?: "user" | "admin";
          timezone?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      goals: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          category: "study" | "work";
          status: "active" | "completed" | "archived";
          start_date: string | null;
          target_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          title: string;
          description?: string | null;
          category?: "study" | "work";
          status?: "active" | "completed" | "archived";
          start_date?: string | null;
          target_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          category?: "study" | "work";
          status?: "active" | "completed" | "archived";
          start_date?: string | null;
          target_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "goals_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      tasks: {
        Row: {
          id: string;
          user_id: string;
          goal_id: string | null;
          title: string;
          due_date: string | null;
          status: "todo" | "completed";
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          goal_id?: string | null;
          title: string;
          due_date?: string | null;
          status?: "todo" | "completed";
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          goal_id?: string | null;
          title?: string;
          due_date?: string | null;
          status?: "todo" | "completed";
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_goal_same_user_fk";
            columns: ["goal_id", "user_id"];
            isOneToOne: false;
            referencedRelation: "goals";
            referencedColumns: ["id", "user_id"];
          },
          {
            foreignKeyName: "tasks_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      study_logs: {
        Row: {
          id: string;
          user_id: string;
          study_date: string;
          minutes: number;
          note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          study_date?: string;
          minutes: number;
          note?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          study_date?: string;
          minutes?: number;
          note?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "study_logs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      weekly_stats: {
        Args: { p_days?: number };
        Returns: { day: string; minutes: number; tasks_completed: number }[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
