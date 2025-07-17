// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dilcrttdiztmowvgayiq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpbGNydHRkaXp0bW93dmdheWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MDUyNTgsImV4cCI6MjA2NjQ4MTI1OH0.2JrmiMo4s6sjXIa20ZcpFFyPR3khGshIv_eFyZtvPJg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Interfaces para o banco
export interface DiscoverySession {
  id: string;
  cnpj?: string;
  company_name: string;
  company_fantasy_name?: string;
  company_size?: string;
  company_main_activity?: string;
  company_location?: string;
  company_status?: string;
  respondent_name?: string;
  respondent_email?: string;
  respondent_phone?: string;
  current_section: number;
  is_completed?: boolean;
  completion_percentage: number;
  section_responsibilities?: any;
  session_metadata?: any;
  ip_address?: string;
  user_agent?: string;
  created_at?: string;
  updated_at?: string;
}

export interface QuestionResponse {
  user_id?: string;
  session_id: string;
  question_id: number;
  section_id: number;
  response_data: any;
  observations?: string;
  ai_aware_notes?: string;
  response_time_seconds?: number;
  is_required?: boolean;
  created_at?: string;
  updated_at?: string;
}

// CRUD para sessões
export class DiscoverySessionService {
  static async createSession(sessionData: Omit<DiscoverySession, 'created_at' | 'updated_at'>): Promise<DiscoverySession> {
    const { data, error } = await supabase
      .from('discovery_sessions')
      .insert([sessionData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getSession(sessionId: string): Promise<DiscoverySession | null> {
    const { data, error } = await supabase
      .from('discovery_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  static async updateSession(sessionId: string, updates: Partial<DiscoverySession>): Promise<DiscoverySession> {
    const { data, error } = await supabase
      .from('discovery_sessions')
      .update(updates)
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateProgress(sessionId: string, currentSection: number, completionPercentage: number): Promise<void> {
    const { error } = await supabase
      .from('discovery_sessions')
      .update({
        current_section: currentSection,
        completion_percentage: completionPercentage
      })
      .eq('id', sessionId);

    if (error) throw error;
  }

  static async completeSession(sessionId: string): Promise<void> {
    const { error } = await supabase
      .from('discovery_sessions')
      .update({
        is_completed: true,
        completion_percentage: 100
      })
      .eq('id', sessionId);

    if (error) throw error;
  }
}

// CRUD para respostas das questões
export class QuestionResponseService {
  static async saveResponse(responseData: Omit<QuestionResponse, 'created_at'>): Promise<QuestionResponse> {
    // Verificar se já existe resposta para esta questão na sessão
    const { data: existing, error: selectError } = await supabase
      .from('discovery_responses')
      .select('id')
      .eq('session_id', responseData.session_id)
      .eq('question_id', responseData.question_id)
      .single();
    if (selectError && selectError.code !== 'PGRST116') {
      console.error('❌ Erro ao buscar resposta existente:', selectError);
    }
    // Validação extra para campos obrigatórios
    if (!responseData.session_id || responseData.question_id == null || responseData.section_id == null || responseData.response_data == null) {
      console.error('[Supabase][saveResponse] ERRO: Campo obrigatório ausente', {
        session_id: responseData.session_id,
        question_id: responseData.question_id,
        section_id: responseData.section_id,
        response_data: responseData.response_data
      });
      throw new Error('Campo obrigatório ausente ao salvar resposta');
    }
    const dataToSave = {
      session_id: responseData.session_id,
      question_id: responseData.question_id,
      section_id: responseData.section_id,
      response_data: typeof responseData.response_data === 'string' ? responseData.response_data : Array.isArray(responseData.response_data) || typeof responseData.response_data === 'object' ? responseData.response_data : null,
      observations: responseData.observations,
      ai_aware_notes: responseData.ai_aware_notes
    };
    console.log('[Supabase][saveResponse] Payload para salvar:', JSON.stringify(dataToSave));
    if (existing) {
      // Atualizar resposta existente
      const { data, error } = await supabase
        .from('discovery_responses')
        .update(dataToSave)
        .eq('id', existing.id)
        .select()
        .single();
      if (error) {
        console.error('❌ Erro ao atualizar:', error);
        throw error;
      }
      return data;
    } else {
      // Inserir nova resposta
      const { data, error } = await supabase
        .from('discovery_responses')
        .insert([dataToSave])
        .select()
        .single();
      if (error) {
        console.error('❌ Erro ao inserir:', error);
        throw error;
      }
      return data;
    }
  }

  static async getSessionResponses(sessionId: string): Promise<QuestionResponse[]> {
    const { data, error } = await supabase
      .from('discovery_responses')
      .select('*')
      .eq('session_id', sessionId)
      .order('question_id');

    if (error) throw error;
    return data || [];
  }

  static async getSectionResponses(sessionId: string, sectionId: number): Promise<QuestionResponse[]> {
    const { data, error } = await supabase
      .from('discovery_responses')
      .select('*')
      .eq('session_id', sessionId)
      .eq('section_id', sectionId)
      .order('question_id');

    if (error) throw error;
    return data || [];
  }

  static async getResponse(sessionId: string, questionId: number): Promise<QuestionResponse | null> {
    const { data, error } = await supabase
      .from('discovery_responses')
      .select('*')
      .eq('session_id', sessionId)
      .eq('question_id', questionId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  static async updateAIInsights(responseId: string, aiInsights: any): Promise<void> {
    const { error } = await supabase
      .from('discovery_responses')
      .update({ ai_aware_notes: aiInsights })
      .eq('id', responseId);

    if (error) throw error;
  }
}

export const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const generateResponseId = () => {
  return `response_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export class SupabaseError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = 'SupabaseError';
  }
}

export const withErrorHandling = async <T>(operation: () => Promise<T>): Promise<T> => {
  try {
    return await operation();
  } catch (error: any) {
    console.error('Supabase operation failed:', error);
    throw new SupabaseError(
      error.message || 'Operação no banco de dados falhou',
      error
    );
  }
};
