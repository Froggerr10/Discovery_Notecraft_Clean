// lib/types.ts
// Tipos TypeScript para o Discovery Notecraft™

import { CNPJData } from './cnpj-api';

// Tipos básicos de questões
export type QuestionType = 'radio' | 'checkbox' | 'slider' | 'text' | 'textarea' | 'slider_percentage' | 'ranking';

export type Priority = 'CRÍTICA' | 'ALTA' | 'MÉDIA' | 'BAIXA';

// Metadados das seções
export interface SectionMetadata {
  id: number;
  title: string;
  suggested_role: string;
  department: string;
  priority: Priority;
}

// Definição de questão
export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
  has_observations: boolean;
  section_id: number;
  placeholder?: string;
}

// Resposta de questão com tipos dinâmicos e merge automático
export interface QuestionResponse {
  question_id: number;
  response: string | string[] | number | Record<string, number>;
  observations?: string;
  ai_aware_notes?: string;
  value?: any; // Para compatibilidade com o sistema atual
  lastModified?: number; // Timestamp para merge automático
  conflictResolved?: boolean; // Flag de conflito resolvido
}

// Dados da sessão de discovery
export interface DiscoverySession {
  id: string;
  company_cnpj: string;
  company_name: string;
  company_trade_name?: string;
  company_data: CNPJData;
  section_responsibilities: SectionResponsible[];
  started_at: string;
  completed_at?: string;
  current_section: number;
  responses: QuestionResponse[];
  metadata: SessionMetadata;
}

// Responsável por seção
export interface SectionResponsible {
  section_id: number;
  email: string;
  name?: string;
}

// Metadados da sessão
export interface SessionMetadata {
  ip_address?: string;
  user_agent?: string;
  completion_percentage: number;
  time_spent?: number;
  last_activity?: string;
}

// Estados de UI
export interface UIState {
  currentStep: 'cnpj' | 'responsibles' | 'questionnaire' | 'completed';
  currentSection: number;
  isLoading: boolean;
  error?: string;
  autoSaving: boolean;
  lastSaved?: string;
}

// Dados para análise IA
export interface AIInsights {
  sentiment_score: number;
  complexity_level: 'low' | 'medium' | 'high';
  strategic_importance: number;
  automation_potential: number;
  key_topics: string[];
  recommendations: string[];
  risk_factors: string[];
  generated_at: string;
}

// Tipos para validação
export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern';
  value?: any;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Props dos componentes principais
export interface Section0CNPJProps {
  onCNPJConfirmed: (data: CNPJData) => void;
}

export interface ResponsibleAssignmentProps {
  companyName: string;
  onAssignmentComplete: (assignments: SectionResponsible[]) => void;
}

export interface DiscoveryFormProps {
  sessionId: string;
  companyData: CNPJData;
  assignments: SectionResponsible[];
  onComplete: () => void;
}

export interface QuestionRendererProps {
  question: Question;
  value?: any;
  observations?: string;
  onChange: (value: any) => void;
  onObservationsChange: (observations: string) => void;
  error?: string;
}

// Analytics e estatísticas
export interface SessionAnalytics {
  session_id: string;
  total_questions: number;
  answered_questions: number;
  completion_percentage: number;
  time_started: string;
  last_activity: string;
  sections_completed: number[];
  ai_insights: AIInsights[];
  export_ready: boolean;
}

// Configurações do Discovery
export interface DiscoveryConfig {
  TOTAL_SECTIONS: number;
  TOTAL_QUESTIONS: number;
  CRITICAL_SECTIONS: number[];
  HIGH_PRIORITY_SECTIONS: number[];
  MEDIUM_PRIORITY_SECTIONS: number[];
  LOW_PRIORITY_SECTIONS: number[];
  COMPANY_NAME: string;
  SUBTITLE: string;
  AUTO_SAVE_INTERVAL: number;
  SESSION_TIMEOUT: number;
}

// Tipos para export de dados
export interface ExportData {
  session: DiscoverySession;
  analytics: SessionAnalytics;
  ai_insights: AIInsights[];
  exported_at: string;
  format_version: string;
}

// Utilities para TypeScript
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Helpers para validação de tipos
export const isQuestionResponse = (obj: any): obj is QuestionResponse => {
  return typeof obj === 'object' && 
         typeof obj.question_id === 'number' &&
         'response' in obj;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidCNPJ = (cnpj: string): boolean => {
  const numbers = cnpj.replace(/\D/g, '');
  return numbers.length === 14;
};

// Constants
export const QUESTION_TYPES: QuestionType[] = [
  'radio', 'checkbox', 'slider', 'text', 'textarea', 'slider_percentage', 'ranking'
];

export const PRIORITIES: Priority[] = ['CRÍTICA', 'ALTA', 'MÉDIA', 'BAIXA'];

export const DEPARTMENTS = [
  'Estratégico', 'Tecnologia', 'Comercial', 'Financeiro', 
  'Recursos Humanos', 'Jurídico', 'Operacional', 'Atendimento', 'Relacionamento'
];

// Default values
export const DEFAULT_SESSION_METADATA: SessionMetadata = {
  completion_percentage: 0,
  time_spent: 0,
  last_activity: new Date().toISOString()
};

export const DEFAULT_UI_STATE: UIState = {
  currentStep: 'cnpj',
  currentSection: 1,
  isLoading: false,
  autoSaving: false
};

export const DEFAULT_AI_INSIGHTS: Partial<AIInsights> = {
  sentiment_score: 0,
  complexity_level: 'medium',
  strategic_importance: 0,
  automation_potential: 0,
  key_topics: [],
  recommendations: [],
  risk_factors: []
};