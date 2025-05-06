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
      admin_logs: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
        }
        Relationships: []
      }
      content_templates: {
        Row: {
          category: string | null
          content: string
          created_at: string
          creator_id: string | null
          id: string
          is_public: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          creator_id?: string | null
          id?: string
          is_public?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          creator_id?: string | null
          id?: string
          is_public?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
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
      mentions: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          original_id: string | null
          platform_id: string | null
          username: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          original_id?: string | null
          platform_id?: string | null
          username: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          original_id?: string | null
          platform_id?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentions_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "social_platforms"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          recipient_id: string | null
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          recipient_id?: string | null
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          recipient_id?: string | null
          sender_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      post_analytics: {
        Row: {
          clicks: number | null
          comments: number | null
          created_at: string | null
          id: string
          likes: number | null
          platform_id: string | null
          post_id: string | null
          shares: number | null
          updated_at: string | null
          views: number | null
        }
        Insert: {
          clicks?: number | null
          comments?: number | null
          created_at?: string | null
          id?: string
          likes?: number | null
          platform_id?: string | null
          post_id?: string | null
          shares?: number | null
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          clicks?: number | null
          comments?: number | null
          created_at?: string | null
          id?: string
          likes?: number | null
          platform_id?: string | null
          post_id?: string | null
          shares?: number | null
          updated_at?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "post_analytics_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "social_platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_analytics_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_platforms: {
        Row: {
          created_at: string | null
          external_post_id: string | null
          id: string
          platform_id: string | null
          post_id: string | null
          status: string
        }
        Insert: {
          created_at?: string | null
          external_post_id?: string | null
          id?: string
          platform_id?: string | null
          post_id?: string | null
          status?: string
        }
        Update: {
          created_at?: string | null
          external_post_id?: string | null
          id?: string
          platform_id?: string | null
          post_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_platforms_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "social_platforms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_platforms_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          image_url: string | null
          published_at: string | null
          scheduled_for: string | null
          status: string
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          scheduled_for?: string | null
          status: string
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          scheduled_for?: string | null
          status?: string
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      rss_feeds: {
        Row: {
          added_by: string | null
          category: string
          country: string
          created_at: string
          id: string
          is_default: boolean | null
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          added_by?: string | null
          category: string
          country: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          added_by?: string | null
          category?: string
          country?: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      social_platforms: {
        Row: {
          access_token: string | null
          account_name: string | null
          created_at: string | null
          icon: string
          id: string
          is_connected: boolean | null
          last_sync: string | null
          name: string
          notifications: Json | null
          platform_id: string
          refresh_token: string | null
          sync_frequency: string | null
          token_expires_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          account_name?: string | null
          created_at?: string | null
          icon: string
          id?: string
          is_connected?: boolean | null
          last_sync?: string | null
          name: string
          notifications?: Json | null
          platform_id: string
          refresh_token?: string | null
          sync_frequency?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          account_name?: string | null
          created_at?: string | null
          icon?: string
          id?: string
          is_connected?: boolean | null
          last_sync?: string | null
          name?: string
          notifications?: Json | null
          platform_id?: string
          refresh_token?: string | null
          sync_frequency?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          description: string | null
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Relationships: []
      }
      user_feeds: {
        Row: {
          created_at: string
          feed_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          feed_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          feed_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_feeds_feed_id_fkey"
            columns: ["feed_id"]
            isOneToOne: false
            referencedRelation: "rss_feeds"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
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
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
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
