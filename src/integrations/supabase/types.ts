export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          email: string | null
          id: string
          ip_address: string | null
          resource_id: string | null
          resource_type: string
          status: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          email?: string | null
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type: string
          status: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          email?: string | null
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string
          status?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      analytics_conversions: {
        Row: {
          conversions: number
          created_at: string
          date: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          conversions?: number
          created_at?: string
          date: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          conversions?: number
          created_at?: string
          date?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      analytics_sources: {
        Row: {
          count: number
          created_at: string
          id: string
          source: string
          updated_at: string
          user_id: string
        }
        Insert: {
          count?: number
          created_at?: string
          id?: string
          source: string
          updated_at?: string
          user_id: string
        }
        Update: {
          count?: number
          created_at?: string
          id?: string
          source?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      analytics_visitors: {
        Row: {
          count: number
          created_at: string
          date: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          count?: number
          created_at?: string
          date: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          count?: number
          created_at?: string
          date?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      email_account_settings: {
        Row: {
          created_at: string
          email_account_id: string
          forward_all: boolean
          id: string
          notify_on_new: boolean
          selected_folders: Json | null
          sync_frequency: number
          updated_at: string
          use_folders: boolean
        }
        Insert: {
          created_at?: string
          email_account_id: string
          forward_all?: boolean
          id?: string
          notify_on_new?: boolean
          selected_folders?: Json | null
          sync_frequency?: number
          updated_at?: string
          use_folders?: boolean
        }
        Update: {
          created_at?: string
          email_account_id?: string
          forward_all?: boolean
          id?: string
          notify_on_new?: boolean
          selected_folders?: Json | null
          sync_frequency?: number
          updated_at?: string
          use_folders?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "email_account_settings_email_account_id_fkey"
            columns: ["email_account_id"]
            isOneToOne: false
            referencedRelation: "email_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      email_accounts: {
        Row: {
          access_token: string | null
          created_at: string | null
          email: string
          expires_at: number | null
          id: string
          last_synced: string | null
          provider: string
          refresh_token: string | null
          status: string | null
          updated_at: string | null
          user_id: string
          watch_expiration: string | null
          watch_history_id: string | null
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          email: string
          expires_at?: number | null
          id?: string
          last_synced?: string | null
          provider: string
          refresh_token?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
          watch_expiration?: string | null
          watch_history_id?: string | null
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          email?: string
          expires_at?: number | null
          id?: string
          last_synced?: string | null
          provider?: string
          refresh_token?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
          watch_expiration?: string | null
          watch_history_id?: string | null
        }
        Relationships: []
      }
      email_sync_history: {
        Row: {
          completed_at: string | null
          created_at: string
          email_account_id: string
          emails_fetched: number
          emails_processed: number
          error: string | null
          error_message: string | null
          id: string
          last_email_date: string | null
          status: string
          sync_type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          email_account_id: string
          emails_fetched?: number
          emails_processed?: number
          error?: string | null
          error_message?: string | null
          id?: string
          last_email_date?: string | null
          status: string
          sync_type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          email_account_id?: string
          emails_fetched?: number
          emails_processed?: number
          error?: string | null
          error_message?: string | null
          id?: string
          last_email_date?: string | null
          status?: string
          sync_type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_sync_history_email_account_id_fkey"
            columns: ["email_account_id"]
            isOneToOne: false
            referencedRelation: "email_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      emails: {
        Row: {
          body_html: string | null
          body_text: string | null
          created_at: string
          email_account_id: string
          id: string
          message_id: string
          processed: boolean
          received_at: string
          recipients: Json
          sender: string
          subject: string | null
          updated_at: string
        }
        Insert: {
          body_html?: string | null
          body_text?: string | null
          created_at?: string
          email_account_id: string
          id?: string
          message_id: string
          processed?: boolean
          received_at?: string
          recipients?: Json
          sender: string
          subject?: string | null
          updated_at?: string
        }
        Update: {
          body_html?: string | null
          body_text?: string | null
          created_at?: string
          email_account_id?: string
          id?: string
          message_id?: string
          processed?: boolean
          received_at?: string
          recipients?: Json
          sender?: string
          subject?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "emails_email_account_id_fkey"
            columns: ["email_account_id"]
            isOneToOne: false
            referencedRelation: "email_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      filters: {
        Row: {
          active: boolean
          condition: Json
          created_at: string
          email_account_id: string
          id: string
          last_triggered: string | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          active?: boolean
          condition: Json
          created_at?: string
          email_account_id: string
          id?: string
          last_triggered?: string | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          active?: boolean
          condition?: Json
          created_at?: string
          email_account_id?: string
          id?: string
          last_triggered?: string | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "filters_email_account_id_fkey"
            columns: ["email_account_id"]
            isOneToOne: false
            referencedRelation: "email_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      forwarding_rules: {
        Row: {
          created_at: string
          enabled: boolean
          filter_id: string
          id: string
          updated_at: string
          user_id: string
          whatsapp_connection_id: string
        }
        Insert: {
          created_at?: string
          enabled?: boolean
          filter_id: string
          id?: string
          updated_at?: string
          user_id: string
          whatsapp_connection_id: string
        }
        Update: {
          created_at?: string
          enabled?: boolean
          filter_id?: string
          id?: string
          updated_at?: string
          user_id?: string
          whatsapp_connection_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forwarding_rules_filter_id_fkey"
            columns: ["filter_id"]
            isOneToOne: false
            referencedRelation: "filters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forwarding_rules_whatsapp_connection_id_fkey"
            columns: ["whatsapp_connection_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_connections"
            referencedColumns: ["id"]
          },
        ]
      }
      message_templates: {
        Row: {
          content: string
          created_at: string
          id: string
          name: string
          type: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          name: string
          type: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          name?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      oauth_states: {
        Row: {
          code_verifier: string | null
          created_at: string
          expires_at: string
          platform: string
          redirect_url: string
          state: string
          user_id: string
        }
        Insert: {
          code_verifier?: string | null
          created_at?: string
          expires_at?: string
          platform: string
          redirect_url: string
          state: string
          user_id: string
        }
        Update: {
          code_verifier?: string | null
          created_at?: string
          expires_at?: string
          platform?: string
          redirect_url?: string
          state?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_history: {
        Row: {
          amount: number
          created_at: string
          currency: string
          flutterwave_ref: string | null
          id: string
          payment_date: string
          plan_tier: string
          status: string
          transaction_ref: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          flutterwave_ref?: string | null
          id?: string
          payment_date?: string
          plan_tier: string
          status: string
          transaction_ref: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          flutterwave_ref?: string | null
          id?: string
          payment_date?: string
          plan_tier?: string
          status?: string
          transaction_ref?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payment_transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string
          flutterwave_ref: string | null
          id: string
          payment_processor_response: Json | null
          payment_provider: string | null
          plan_id: string
          status: string
          transaction_ref: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          flutterwave_ref?: string | null
          id?: string
          payment_processor_response?: Json | null
          payment_provider?: string | null
          plan_id: string
          status: string
          transaction_ref: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          flutterwave_ref?: string | null
          id?: string
          payment_processor_response?: Json | null
          payment_provider?: string | null
          plan_id?: string
          status?: string
          transaction_ref?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          content: string
          created_at: string
          id: string
          scheduled_for: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          scheduled_for?: string | null
          status: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          scheduled_for?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          consent_status: string | null
          created_at: string
          id: string
          name: string | null
          plan: string | null
          status: string | null
          subscription_end_date: string | null
          subscription_start_date: string | null
          updated_at: string
          whatsapp_number: string | null
          whatsapp_verified: boolean | null
        }
        Insert: {
          consent_status?: string | null
          created_at?: string
          id: string
          name?: string | null
          plan?: string | null
          status?: string | null
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          updated_at?: string
          whatsapp_number?: string | null
          whatsapp_verified?: boolean | null
        }
        Update: {
          consent_status?: string | null
          created_at?: string
          id?: string
          name?: string | null
          plan?: string | null
          status?: string | null
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          updated_at?: string
          whatsapp_number?: string | null
          whatsapp_verified?: boolean | null
        }
        Relationships: []
      }
      social_connections: {
        Row: {
          access_token: string
          created_at: string
          id: string
          meta: Json | null
          platform: string
          platform_user_id: string
          platform_username: string | null
          refresh_token: string | null
          scope: string | null
          token_expires_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token: string
          created_at?: string
          id?: string
          meta?: Json | null
          platform: string
          platform_user_id: string
          platform_username?: string | null
          refresh_token?: string | null
          scope?: string | null
          token_expires_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string
          created_at?: string
          id?: string
          meta?: Json | null
          platform?: string
          platform_user_id?: string
          platform_username?: string | null
          refresh_token?: string | null
          scope?: string | null
          token_expires_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          flutterwave_customer_id: string | null
          id: string
          is_trial: boolean
          subscribed: boolean
          subscription_end: string | null
          subscription_start: string | null
          subscription_tier: string | null
          trial_end: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          flutterwave_customer_id?: string | null
          id?: string
          is_trial?: boolean
          subscribed?: boolean
          subscription_end?: string | null
          subscription_start?: string | null
          subscription_tier?: string | null
          trial_end?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          flutterwave_customer_id?: string | null
          id?: string
          is_trial?: boolean
          subscribed?: boolean
          subscription_end?: string | null
          subscription_start?: string | null
          subscription_tier?: string | null
          trial_end?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          created_at: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      whatsapp_connections: {
        Row: {
          created_at: string
          id: string
          phone_number: string
          updated_at: string
          user_id: string
          verified: boolean
        }
        Insert: {
          created_at?: string
          id?: string
          phone_number: string
          updated_at?: string
          user_id: string
          verified?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          phone_number?: string
          updated_at?: string
          user_id?: string
          verified?: boolean
        }
        Relationships: []
      }
      whatsapp_messages: {
        Row: {
          created_at: string
          direction: string
          email_id: string | null
          id: string
          message_text: string
          status: string
          updated_at: string
          whatsapp_connection_id: string
          whatsapp_message_id: string | null
        }
        Insert: {
          created_at?: string
          direction: string
          email_id?: string | null
          id?: string
          message_text: string
          status?: string
          updated_at?: string
          whatsapp_connection_id: string
          whatsapp_message_id?: string | null
        }
        Update: {
          created_at?: string
          direction?: string
          email_id?: string | null
          id?: string
          message_text?: string
          status?: string
          updated_at?: string
          whatsapp_connection_id?: string
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_messages_email_id_fkey"
            columns: ["email_id"]
            isOneToOne: false
            referencedRelation: "emails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_messages_whatsapp_connection_id_fkey"
            columns: ["whatsapp_connection_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_connections"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_verification_codes: {
        Row: {
          code: string
          created_at: string | null
          expires_at: string
          id: string
          phone_number: string
          used: boolean | null
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string | null
          expires_at: string
          id?: string
          phone_number: string
          used?: boolean | null
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string | null
          expires_at?: string
          id?: string
          phone_number?: string
          used?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      whatsapp_verifications: {
        Row: {
          created_at: string | null
          expires_at: string
          id: number
          phone_number: string
          used: boolean | null
          verification_code: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: never
          phone_number: string
          used?: boolean | null
          verification_code: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: never
          phone_number?: string
          used?: boolean | null
          verification_code?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_oauth_states: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      has_role: {
        Args:
          | { _user_id: string; _role: Database["public"]["Enums"]["app_role"] }
          | { _user_id: string; _role: string }
        Returns: boolean
      }
      log_activity: {
        Args:
          | Record<PropertyKey, never>
          | {
              _action: string
              _resource_type: string
              _resource_id: string
              _status: string
              _details: Json
            }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      connection_status: "active" | "inactive" | "failed" | "pending"
      email_provider_type: "gmail" | "outlook" | "imap" | "smtp"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      connection_status: ["active", "inactive", "failed", "pending"],
      email_provider_type: ["gmail", "outlook", "imap", "smtp"],
    },
  },
} as const
