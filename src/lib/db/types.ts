export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      app_user: {
        Row: {
          created_at: string
          display_name: string | null
          email: string
          failed_login_count: number
          id: string
          is_active: boolean
          locked_until: string | null
          role: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email: string
          failed_login_count?: number
          id: string
          is_active?: boolean
          locked_until?: string | null
          role: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string
          failed_login_count?: number
          id?: string
          is_active?: boolean
          locked_until?: string | null
          role?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          actor_id: string | null
          after: Json | null
          before: Json | null
          created_at: string
          entity: string
          entity_id: string
          id: string
          reason: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          after?: Json | null
          before?: Json | null
          created_at?: string
          entity: string
          entity_id: string
          id?: string
          reason?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          after?: Json | null
          before?: Json | null
          created_at?: string
          entity?: string
          entity_id?: string
          id?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      business_day_lock: {
        Row: {
          business_date: string
          locked_at: string
          locked_by: string | null
        }
        Insert: {
          business_date: string
          locked_at?: string
          locked_by?: string | null
        }
        Update: {
          business_date?: string
          locked_at?: string
          locked_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_day_lock_locked_by_fkey"
            columns: ["locked_by"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      correction_request: {
        Row: {
          approved_by: string | null
          created_at: string
          evidence_path: string
          id: string
          reason: string
          requested_by: string | null
          status: string
          target_txn_id: string
        }
        Insert: {
          approved_by?: string | null
          created_at?: string
          evidence_path: string
          id?: string
          reason: string
          requested_by?: string | null
          status?: string
          target_txn_id: string
        }
        Update: {
          approved_by?: string | null
          created_at?: string
          evidence_path?: string
          id?: string
          reason?: string
          requested_by?: string | null
          status?: string
          target_txn_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "correction_request_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "correction_request_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "correction_request_target_txn_id_fkey"
            columns: ["target_txn_id"]
            isOneToOne: false
            referencedRelation: "transaction"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery: {
        Row: {
          created_at: string
          delivered_qty: number
          id: string
          status: string
          transaction_id: string
        }
        Insert: {
          created_at?: string
          delivered_qty?: number
          id?: string
          status?: string
          transaction_id: string
        }
        Update: {
          created_at?: string
          delivered_qty?: number
          id?: string
          status?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transaction"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_shipment: {
        Row: {
          business_date: string
          confirmed_by: string | null
          created_at: string
          delivery_id: string
          id: string
          qty: number
          seq: number
          shipped_at: string
        }
        Insert: {
          business_date: string
          confirmed_by?: string | null
          created_at?: string
          delivery_id: string
          id?: string
          qty: number
          seq: number
          shipped_at?: string
        }
        Update: {
          business_date?: string
          confirmed_by?: string | null
          created_at?: string
          delivery_id?: string
          id?: string
          qty?: number
          seq?: number
          shipped_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_shipment_confirmed_by_fkey"
            columns: ["confirmed_by"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "delivery_shipment_delivery_id_fkey"
            columns: ["delivery_id"]
            isOneToOne: false
            referencedRelation: "delivery"
            referencedColumns: ["id"]
          },
        ]
      }
      incentive_result: {
        Row: {
          amount_jpy: number
          created_at: string
          id: string
          kind: string
          origin_period: string | null
          participant_id: string
          period: string
          rule_version_id: string
          source_correction_id: string | null
        }
        Insert: {
          amount_jpy: number
          created_at?: string
          id?: string
          kind?: string
          origin_period?: string | null
          participant_id: string
          period: string
          rule_version_id: string
          source_correction_id?: string | null
        }
        Update: {
          amount_jpy?: number
          created_at?: string
          id?: string
          kind?: string
          origin_period?: string | null
          participant_id?: string
          period?: string
          rule_version_id?: string
          source_correction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "incentive_result_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incentive_result_rule_version_id_fkey"
            columns: ["rule_version_id"]
            isOneToOne: false
            referencedRelation: "incentive_rule_version"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incentive_result_source_correction_id_fkey"
            columns: ["source_correction_id"]
            isOneToOne: false
            referencedRelation: "correction_request"
            referencedColumns: ["id"]
          },
        ]
      }
      incentive_rule_version: {
        Row: {
          approved_by: string | null
          created_at: string
          created_by: string | null
          effective_from: string
          id: string
          rate_table: Json | null
          status: string
          version_no: number
        }
        Insert: {
          approved_by?: string | null
          created_at?: string
          created_by?: string | null
          effective_from: string
          id?: string
          rate_table?: Json | null
          status?: string
          version_no: number
        }
        Update: {
          approved_by?: string | null
          created_at?: string
          created_by?: string | null
          effective_from?: string
          id?: string
          rate_table?: Json | null
          status?: string
          version_no?: number
        }
        Relationships: [
          {
            foreignKeyName: "incentive_rule_version_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incentive_rule_version_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      lot: {
        Row: {
          available_qty: number
          business_date: string
          created_at: string
          id: string
          initial_qty: number
          item: string
          lot_code: string
          package_count: number
          status: string
        }
        Insert: {
          available_qty: number
          business_date: string
          created_at?: string
          id?: string
          initial_qty: number
          item: string
          lot_code: string
          package_count: number
          status?: string
        }
        Update: {
          available_qty?: number
          business_date?: string
          created_at?: string
          id?: string
          initial_qty?: number
          item?: string
          lot_code?: string
          package_count?: number
          status?: string
        }
        Relationships: []
      }
      mekiki_record: {
        Row: {
          assessed_at: string
          assessor_id: string | null
          business_date: string
          grade: string
          id: string
          lot_id: string
        }
        Insert: {
          assessed_at?: string
          assessor_id?: string | null
          business_date: string
          grade: string
          id?: string
          lot_id: string
        }
        Update: {
          assessed_at?: string
          assessor_id?: string | null
          business_date?: string
          grade?: string
          id?: string
          lot_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mekiki_record_assessor_id_fkey"
            columns: ["assessor_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mekiki_record_lot_id_fkey"
            columns: ["lot_id"]
            isOneToOne: false
            referencedRelation: "lot"
            referencedColumns: ["id"]
          },
        ]
      }
      participant: {
        Row: {
          category: string
          created_at: string
          id: string
          license_type: string
          name: string
          status: string
          valid_from: string
          valid_to: string | null
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          license_type: string
          name: string
          status?: string
          valid_from: string
          valid_to?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          license_type?: string
          name?: string
          status?: string
          valid_from?: string
          valid_to?: string | null
        }
        Relationships: []
      }
      participant_status_history: {
        Row: {
          changed_at: string
          changed_by: string | null
          from_status: string | null
          id: string
          participant_id: string
          reason: string
          to_status: string
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          from_status?: string | null
          id?: string
          participant_id: string
          reason: string
          to_status: string
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          from_status?: string | null
          id?: string
          participant_id?: string
          reason?: string
          to_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "participant_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_status_history_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_record: {
        Row: {
          business_date: string
          created_at: string
          due_date: string
          eligible_amount_jpy: number
          id: string
          paid_on: string | null
          paid_on_time: boolean | null
          participant_id: string
        }
        Insert: {
          business_date: string
          created_at?: string
          due_date: string
          eligible_amount_jpy: number
          id?: string
          paid_on?: string | null
          paid_on_time?: boolean | null
          participant_id: string
        }
        Update: {
          business_date?: string
          created_at?: string
          due_date?: string
          eligible_amount_jpy?: number
          id?: string
          paid_on?: string | null
          paid_on_time?: boolean | null
          participant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_record_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant"
            referencedColumns: ["id"]
          },
        ]
      }
      seri_result: {
        Row: {
          business_date: string
          confirmed_by: string | null
          created_at: string
          decided_at: string
          id: string
          lot_id: string
          qty: number
          unit_price: number
          winner_participant_id: string
        }
        Insert: {
          business_date: string
          confirmed_by?: string | null
          created_at?: string
          decided_at?: string
          id?: string
          lot_id: string
          qty: number
          unit_price: number
          winner_participant_id: string
        }
        Update: {
          business_date?: string
          confirmed_by?: string | null
          created_at?: string
          decided_at?: string
          id?: string
          lot_id?: string
          qty?: number
          unit_price?: number
          winner_participant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "seri_result_confirmed_by_fkey"
            columns: ["confirmed_by"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seri_result_lot_id_fkey"
            columns: ["lot_id"]
            isOneToOne: false
            referencedRelation: "lot"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seri_result_winner_participant_id_fkey"
            columns: ["winner_participant_id"]
            isOneToOne: false
            referencedRelation: "participant"
            referencedColumns: ["id"]
          },
        ]
      }
      transaction: {
        Row: {
          business_date: string
          buyer_participant_id: string
          cancel_reason: string | null
          cancelled_at: string | null
          cancelled_by: string | null
          confirmed_at: string | null
          confirmed_by: string | null
          created_at: string
          id: string
          lot_id: string
          qty: number
          status: string
          txn_code: string
          type: string
          unit_price: number
        }
        Insert: {
          business_date: string
          buyer_participant_id: string
          cancel_reason?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          confirmed_at?: string | null
          confirmed_by?: string | null
          created_at?: string
          id?: string
          lot_id: string
          qty: number
          status?: string
          txn_code: string
          type?: string
          unit_price: number
        }
        Update: {
          business_date?: string
          buyer_participant_id?: string
          cancel_reason?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          confirmed_at?: string | null
          confirmed_by?: string | null
          created_at?: string
          id?: string
          lot_id?: string
          qty?: number
          status?: string
          txn_code?: string
          type?: string
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "transaction_buyer_participant_id_fkey"
            columns: ["buyer_participant_id"]
            isOneToOne: false
            referencedRelation: "participant"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_cancelled_by_fkey"
            columns: ["cancelled_by"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_confirmed_by_fkey"
            columns: ["confirmed_by"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_lot_id_fkey"
            columns: ["lot_id"]
            isOneToOne: false
            referencedRelation: "lot"
            referencedColumns: ["id"]
          },
        ]
      }
      transaction_adjustment: {
        Row: {
          amount_delta: number
          created_at: string
          id: string
          kind: string
          qty_delta: number
          source_correction_id: string
          target_txn_id: string
          unit_price_delta: number
        }
        Insert: {
          amount_delta: number
          created_at?: string
          id?: string
          kind: string
          qty_delta: number
          source_correction_id: string
          target_txn_id: string
          unit_price_delta: number
        }
        Update: {
          amount_delta?: number
          created_at?: string
          id?: string
          kind?: string
          qty_delta?: number
          source_correction_id?: string
          target_txn_id?: string
          unit_price_delta?: number
        }
        Relationships: [
          {
            foreignKeyName: "transaction_adjustment_source_correction_id_fkey"
            columns: ["source_correction_id"]
            isOneToOne: false
            referencedRelation: "correction_request"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_adjustment_target_txn_id_fkey"
            columns: ["target_txn_id"]
            isOneToOne: false
            referencedRelation: "transaction"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      reconciliation_line: {
        Row: {
          amount_jpy: number | null
          business_date: string | null
          participant_id: string | null
          qty: number | null
          source_id: string | null
          source_type: string | null
          variance: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
