-- =====================================================
-- DISCOVERY NOTECRAFT™ V2 - SCHEMA SUPABASE ATUALIZADO
-- Estrutura para o novo fluxo: CNPJ → Responsáveis → Questionário
-- =====================================================

-- =====================================================
-- 1. TABELA PRINCIPAL: SESSÕES DO DISCOVERY
-- =====================================================
CREATE TABLE IF NOT EXISTS discovery_sessions (
  id VARCHAR(100) PRIMARY KEY, -- discovery_{timestamp}_{random}
  
  -- Dados da empresa (via CNPJ)
  company_cnpj VARCHAR(18) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  company_trade_name VARCHAR(255),
  company_data JSONB NOT NULL, -- Dados completos da consulta CNPJ
  
  -- Responsáveis por seção
  section_responsibilities JSONB NOT NULL, -- {sectionId: email}
  
  -- Controle de progresso
  started_at TIMESTAMP WITH TIME ZONE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  current_section INTEGER DEFAULT 1,
  total_progress INTEGER DEFAULT 0, -- 0-100%
  
  -- Metadados
  metadata JSONB, -- {ip_address, user_agent, completion_percentage}
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. RESPOSTAS DAS QUESTÕES (109 questões)
-- =====================================================
CREATE TABLE IF NOT EXISTS question_responses (
  id VARCHAR(100) PRIMARY KEY, -- response_{timestamp}_{random}
  session_id VARCHAR(100) REFERENCES discovery_sessions(id) ON DELETE CASCADE,
  
  -- Identificação da questão
  question_id INTEGER NOT NULL,
  section_id INTEGER NOT NULL,
  
  -- Resposta estruturada
  response_data JSONB NOT NULL, -- Valor da resposta (flexível: string, array, object)
  
  -- Campos adicionais
  observations TEXT, -- Campo observações (visível ao cliente)
  ai_insights JSONB, -- Campo IA-Aware (insights automáticos)
  
  -- Metadados
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Índices únicos
  UNIQUE(session_id, question_id)
);

-- =====================================================
-- 3. ÍNDICES PARA PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_discovery_sessions_cnpj ON discovery_sessions(company_cnpj);
CREATE INDEX IF NOT EXISTS idx_discovery_sessions_progress ON discovery_sessions(total_progress);
CREATE INDEX IF NOT EXISTS idx_discovery_sessions_created ON discovery_sessions(created_at);

CREATE INDEX IF NOT EXISTS idx_question_responses_session ON question_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_question_responses_section ON question_responses(section_id);
CREATE INDEX IF NOT EXISTS idx_question_responses_completed ON question_responses(completed_at);

-- =====================================================
-- 4. FUNÇÃO PARA ATUALIZAR TIMESTAMP AUTOMATICAMENTE
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE TRIGGER update_discovery_sessions_updated_at
    BEFORE UPDATE ON discovery_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 5. POLÍTICAS RLS (ROW LEVEL SECURITY) - OPCIONAL
-- =====================================================
-- Comentado por enquanto para facilitar desenvolvimento
-- ALTER TABLE discovery_sessions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE question_responses ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "Sessões são públicas para leitura" ON discovery_sessions FOR SELECT USING (true);
-- CREATE POLICY "Respostas são públicas para leitura" ON question_responses FOR SELECT USING (true);

-- =====================================================
-- 6. VIEWS ÚTEIS PARA ANÁLISE
-- =====================================================
CREATE OR REPLACE VIEW discovery_progress_summary AS
SELECT 
    ds.id,
    ds.company_name,
    ds.company_trade_name,
    ds.started_at,
    ds.completed_at,
    ds.current_section,
    ds.total_progress,
    COUNT(qr.id) as questions_answered,
    COUNT(DISTINCT qr.section_id) as sections_started,
    CASE 
        WHEN ds.completed_at IS NOT NULL THEN 'completed'
        WHEN COUNT(qr.id) > 0 THEN 'in_progress'
        ELSE 'started'
    END as status
FROM discovery_sessions ds
LEFT JOIN question_responses qr ON ds.id = qr.session_id
GROUP BY ds.id, ds.company_name, ds.company_trade_name, ds.started_at, 
         ds.completed_at, ds.current_section, ds.total_progress;

-- =====================================================
-- SCHEMA CRIADO COM SUCESSO!
-- =====================================================