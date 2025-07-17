// Script de teste para verificar dados no Supabase
const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://dilcrttdiztmowvgayiq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpbGNydHRkaXp0bW93dmdheWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MDUyNTgsImV4cCI6MjA2NjQ4MTI1OH0.2JrmiMo4s6sjXIa20ZcpFFyPR3khGshIv_eFyZtvPJg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseData() {
  console.log('🔍 VERIFICANDO DADOS NO SUPABASE...\n');
  
  try {
    // 1. Verificar sessões de discovery
    console.log('📋 SESSÕES DE DISCOVERY:');
    console.log('=' .repeat(50));
    
    const { data: sessions, error: sessionsError } = await supabase
      .from('discovery_sessions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (sessionsError) {
      console.log('❌ Erro ao buscar sessões:', sessionsError.message);
    } else if (sessions && sessions.length > 0) {
      sessions.forEach((session, index) => {
        console.log(`\n📊 SESSÃO ${index + 1}:`);
        console.log(`ID: ${session.id}`);
        console.log(`Empresa: ${session.company_name || 'N/A'}`);
        console.log(`CNPJ: ${session.cnpj || 'N/A'}`);
        console.log(`Respondente: ${session.respondent_name || 'N/A'}`);
        console.log(`Email: ${session.respondent_email || 'N/A'}`);
        console.log(`Status: ${session.status || 'N/A'}`);
        console.log(`Criado: ${new Date(session.created_at).toLocaleString('pt-BR')}`);
        console.log(`Progress: ${session.completion_percentage || 0}%`);
      });
    } else {
      console.log('❌ Nenhuma sessão encontrada!');
    }

    // 2. Verificar respostas das questões
    console.log('\n\n💬 RESPOSTAS DAS QUESTÕES:');
    console.log('=' .repeat(50));
    
    const { data: responses, error: responsesError } = await supabase
      .from('question_responses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (responsesError) {
      console.log('❌ Erro ao buscar respostas:', responsesError.message);
    } else if (responses && responses.length > 0) {
      console.log(`\n✅ TOTAL DE RESPOSTAS: ${responses.length}\n`);
      
      responses.forEach((response, index) => {
        console.log(`📝 RESPOSTA ${index + 1}:`);
        console.log(`Session ID: ${response.session_id}`);
        console.log(`Question ID: ${response.question_id}`);
        console.log(`Resposta: ${JSON.stringify(response.response, null, 2)}`);
        
        if (response.observations) {
          console.log(`Observações: ${response.observations}`);
        }
        
        if (response.ai_insights) {
          console.log(`IA Insights: ${JSON.stringify(response.ai_insights, null, 2)}`);
        }
        
        console.log(`Criado: ${new Date(response.created_at).toLocaleString('pt-BR')}`);
        console.log('-'.repeat(40));
      });
    } else {
      console.log('❌ Nenhuma resposta encontrada!');
    }

    // 3. Estatísticas gerais
    console.log('\n\n📊 ESTATÍSTICAS:');
    console.log('=' .repeat(50));
    console.log(`📋 Total de Sessões: ${sessions ? sessions.length : 0}`);
    console.log(`💬 Total de Respostas: ${responses ? responses.length : 0}`);
    
    if (responses && responses.length > 0) {
      const responsesWithAI = responses.filter(r => r.ai_insights);
      const responsesWithObs = responses.filter(r => r.observations);
      
      console.log(`🤖 Respostas com IA Insights: ${responsesWithAI.length}`);
      console.log(`📝 Respostas com Observações: ${responsesWithObs.length}`);
      
      // Contar por seção
      const sectionCount = {};
      responses.forEach(r => {
        if (r.ai_insights && r.ai_insights.section_id) {
          const sectionId = r.ai_insights.section_id;
          sectionCount[sectionId] = (sectionCount[sectionId] || 0) + 1;
        }
      });
      
      console.log('\n📊 RESPOSTAS POR SEÇÃO:');
      Object.entries(sectionCount).forEach(([section, count]) => {
        console.log(`  Seção ${section}: ${count} respostas`);
      });
    }

  } catch (error) {
    console.log('❌ ERRO GERAL:', error.message);
  }
}

// Executar o teste
testSupabaseData().then(() => {
  console.log('\n✅ TESTE CONCLUÍDO!');
  process.exit(0);
}).catch(error => {
  console.log('💥 ERRO FATAL:', error);
  process.exit(1);
});
