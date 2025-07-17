-- Discovery Notecraft™ - Database Schema
-- Data: 2024
-- Versão: 2.0

-- 1. Tabela de Sessões de Discovery
CREATE TABLE IF NOT EXISTS discovery_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Dados da empresa (CNPJ)
    cnpj TEXT,
    company_name TEXT,
    company_fantasy_name TEXT,
    company_size TEXT,
    company_main_activity TEXT,
    company_location TEXT,
    company_status TEXT,
    
    -- Dados do respondente
    respondent_name TEXT,
    respondent_email TEXT,
    respondent_phone TEXT,
    
    -- Estado da sessão
    current_section INTEGER DEFAULT 0,
    is_completed BOOLEAN DEFAULT FALSE,
    completion_percentage DECIMAL(5,2) DEFAULT 0,
    
    -- Responsáveis por seção (JSON)
    section_responsibilities JSONB,
    
    -- Metadados
    session_metadata JSONB,
    ip_address INET,
    user_agent TEXT
);

-- 2. Tabela de Respostas
CREATE TABLE IF NOT EXISTS discovery_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Relacionamento
    session_id UUID REFERENCES discovery_sessions(id) ON DELETE CASCADE,
    
    -- Dados da questão
    question_id INTEGER NOT NULL,
    section_id INTEGER NOT NULL,
    
    -- Resposta
    response_data JSONB NOT NULL,
    
    -- Campos adicionais
    observations TEXT,
    ai_aware_notes TEXT, -- Campo oculto para análise IA
    
    -- Metadados da resposta
    response_time_seconds INTEGER,
    is_required BOOLEAN DEFAULT TRUE,
    
    -- Constraint única por sessão + questão
    UNIQUE(session_id, question_id)
);

-- 3. Tabela de Analytics (opcional)
CREATE TABLE IF NOT EXISTS discovery_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    session_id UUID REFERENCES discovery_sessions(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- 'section_start', 'section_complete', 'question_answered', etc.
    event_data JSONB,
    
    -- Para métricas de tempo
    timestamp_event TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Índices para performance
CREATE INDEX IF NOT EXISTS idx_discovery_sessions_cnpj ON discovery_sessions(cnpj);
CREATE INDEX IF NOT EXISTS idx_discovery_sessions_created_at ON discovery_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_discovery_sessions_completion ON discovery_sessions(is_completed);

CREATE INDEX IF NOT EXISTS idx_discovery_responses_session_id ON discovery_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_discovery_responses_question_id ON discovery_responses(question_id);
CREATE INDEX IF NOT EXISTS idx_discovery_responses_section_id ON discovery_responses(section_id);

CREATE INDEX IF NOT EXISTS idx_discovery_analytics_session_id ON discovery_analytics(session_id);
CREATE INDEX IF NOT EXISTS idx_discovery_analytics_event_type ON discovery_analytics(event_type);

-- 5. Triggers para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_discovery_sessions_updated_at 
    BEFORE UPDATE ON discovery_sessions 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_discovery_responses_updated_at 
    BEFORE UPDATE ON discovery_responses 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 6. RLS (Row Level Security) - Opcional
-- ALTER TABLE discovery_sessions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE discovery_responses ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE discovery_analytics ENABLE ROW LEVEL SECURITY;

-- Comentários
COMMENT ON TABLE discovery_sessions IS 'Sessões de Discovery Notecraft™ - dados da empresa e progresso';
COMMENT ON TABLE discovery_responses IS 'Respostas individuais do questionário Discovery';
COMMENT ON TABLE discovery_analytics IS 'Analytics e métricas do processo de Discovery';

COMMENT ON COLUMN discovery_responses.ai_aware_notes IS 'Campo oculto para insights IA gerados automaticamente';
COMMENT ON COLUMN discovery_sessions.section_responsibilities IS 'JSON com responsáveis designados por seção';
