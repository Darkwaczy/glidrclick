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
      email_accounts: {
        Row: {
          access_token: string | null
          created_at: string
          credentials: Json | null
          email: string
          expires_at: string | null
          id: string
          last_synced: string | null
          provider: Database["public"]["Enums"]["email_provider_type"]
          refresh_token: string | null
          status: Database["public"]["Enums"]["connection_status"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string
          credentials?: Json | null
          email: string
          expires_at?: string | null
          id?: string
          last_synced?: string | null
          provider: Database["public"]["Enums"]["email_provider_type"]
          refresh_token?: string | null
          status?: Database["public"]["Enums"]["connection_status"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string
          credentials?: Json | null
          email?: string
          expires_at?: string | null
          id?: string
          last_synced?: string | null
          provider?: Database["public"]["Enums"]["email_provider_type"]
          refresh_token?: string | null
          status?: Database["public"]["Enums"]["connection_status"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      emails: {
        Row: {
          body_html: string | null
          body_text: string | null
          conversation_id: string | null
          created_at: string
          email_account_id: string
          id: string
          message_id: string
          processed: boolean | null
          received_at: string
          recipients: Json
          sender: string
          subject: string | null
        }
        Insert: {
          body_html?: string | null
          body_text?: string | null
          conversation_id?: string | null
          created_at?: string
          email_account_id: string
          id?: string
          message_id: string
          processed?: boolean | null
          received_at: string
          recipients: Json
          sender: string
          subject?: string | null
        }
        Update: {
          body_html?: string | null
          body_text?: string | null
          conversation_id?: string | null
          created_at?: string
          email_account_id?: string
          id?: string
          message_id?: string
          processed?: boolean | null
          received_at?: string
          recipients?: Json
          sender?: string
          subject?: string | null
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
      forwarding_rules: {
        Row: {
          created_at: string
          email_account_id: string
          enabled: boolean
          filter_from: string[] | null
          filter_labels: string[] | null
          filter_subject: string[] | null
          id: string
          updated_at: string
          user_id: string
          whatsapp_connection_id: string
        }
        Insert: {
          created_at?: string
          email_account_id: string
          enabled?: boolean
          filter_from?: string[] | null
          filter_labels?: string[] | null
          filter_subject?: string[] | null
          id?: string
          updated_at?: string
          user_id: string
          whatsapp_connection_id: string
        }
        Update: {
          created_at?: string
          email_account_id?: string
          enabled?: boolean
          filter_from?: string[] | null
          filter_labels?: string[] | null
          filter_subject?: string[] | null
          id?: string
          updated_at?: string
          user_id?: string
          whatsapp_connection_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forwarding_rules_email_account_id_fkey"
            columns: ["email_account_id"]
            isOneToOne: false
            referencedRelation: "email_accounts"
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
      whatsapp_connections: {
        Row: {
          created_at: string
          id: string
          phone_number: string
          status: Database["public"]["Enums"]["connection_status"] | null
          updated_at: string
          user_id: string
          verification_code: string | null
          verified: boolean
        }
        Insert: {
          created_at?: string
          id?: string
          phone_number: string
          status?: Database["public"]["Enums"]["connection_status"] | null
          updated_at?: string
          user_id: string
          verification_code?: string | null
          verified?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          phone_number?: string
          status?: Database["public"]["Enums"]["connection_status"] | null
          updated_at?: string
          user_id?: string
          verification_code?: string | null
          verified?: boolean
        }
        Relationships: []
      }
      whatsapp_messages: {
        Row: {
          created_at: string
          delivered_at: string | null
          direction: string | null
          email_id: string | null
          id: string
          media_url: string | null
          message_text: string
          read_at: string | null
          sent_at: string | null
          status: string | null
          whatsapp_connection_id: string
          whatsapp_message_id: string | null
        }
        Insert: {
          created_at?: string
          delivered_at?: string | null
          direction?: string | null
          email_id?: string | null
          id?: string
          media_url?: string | null
          message_text: string
          read_at?: string | null
          sent_at?: string | null
          status?: string | null
          whatsapp_connection_id: string
          whatsapp_message_id?: string | null
        }
        Update: {
          created_at?: string
          delivered_at?: string | null
          direction?: string | null
          email_id?: string | null
          id?: string
          media_url?: string | null
          message_text?: string
          read_at?: string | null
          sent_at?: string | null
          status?: string | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
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
      connection_status: ["active", "inactive", "failed", "pending"],
      email_provider_type: ["gmail", "outlook", "imap", "smtp"],
    },
  },
} as const
