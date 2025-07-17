// lib/revenue-estimation.ts
// Algoritmo proprietário para estimativa de faturamento e cálculo de ROI

export interface RevenueEstimation {
  estimated_revenue: {
    min: number;
    max: number;
    average: number;
  };
  company_size: 'MICRO' | 'PEQUENA' | 'MÉDIA' | 'GRANDE';
  confidence_score: number;
  pricing_recommendations: {
    conservative: number;
    recommended: number;
    premium: number;
  };
  roi_projections: {
    automation_savings: number;
    efficiency_gains: number;
    total_annual_savings: number;
    roi_percentage: number;
  };
}

interface CompanyData {
  porte?: string;
  capital_social?: string | number;
  atividade_principal?: Array<{
    code: string;
    text: string;
  }>;
  funcionarios_estimado?: number;
}

// Tabela de multiplicadores por CNAE (setor)
const CNAE_MULTIPLIERS: Record<string, number> = {
  // Serviços profissionais, científicos e técnicos
  '69': 2.5,  // Atividades jurídicas, contábeis e de auditoria
  '70': 2.0,  // Atividades de consultoria em gestão empresarial
  '71': 1.8,  // Serviços de arquitetura e engenharia
  '72': 3.0,  // Pesquisa e desenvolvimento científico
  '73': 2.2,  // Publicidade e pesquisa de mercado
  '74': 1.9,  // Outras atividades profissionais, científicas e técnicas
  '75': 1.5,  // Atividades veterinárias

  // Informação e comunicação  
  '58': 2.8,  // Atividades de edição
  '59': 2.5,  // Atividades cinematográficas, produção de vídeos
  '60': 2.0,  // Atividades de rádio e televisão
  '61': 3.5,  // Telecomunicações
  '62': 4.0,  // Atividades dos serviços de tecnologia da informação
  '63': 2.5,  // Atividades de prestação de serviços de informação

  // Atividades financeiras, de seguros e serviços relacionados
  '64': 8.0,  // Atividades de serviços financeiros
  '65': 6.0,  // Seguros, resseguros, previdência complementar
  '66': 4.0,  // Atividades auxiliares dos serviços financeiros

  // Comércio
  '45': 1.2,  // Comércio de veículos automotores
  '46': 1.8,  // Comércio atacadista
  '47': 1.5,  // Comércio varejista

  // Indústria
  '10': 1.0,  // Fabricação de produtos alimentícios
  '11': 1.2,  // Fabricação de bebidas
  '13': 0.8,  // Fabricação de produtos têxteis
  '14': 0.9,  // Confecção de artigos do vestuário
  '20': 2.0,  // Fabricação de produtos químicos
  '21': 3.5,  // Fabricação de produtos farmoquímicos
  '26': 2.5,  // Fabricação de equipamentos de informática
  '29': 1.8,  // Fabricação de veículos automotores
  '30': 2.2,  // Fabricação de outros equipamentos de transporte

  // Construção
  '41': 1.3,  // Construção de edifícios
  '42': 1.5,  // Obras de infraestrutura
  '43': 1.1,  // Serviços especializados para construção

  // Default para setores não mapeados
  'default': 1.0
};

// Estimativa base por porte (Receita Federal)
const REVENUE_BY_SIZE: Record<string, {min: number, max: number}> = {
  'MEI': { min: 0, max: 81000 },
  'ME': { min: 81000, max: 4800000 },
  'EPP': { min: 4800000, max: 300000000 },
  'MICROEMPRESA': { min: 0, max: 360000 },
  'EMPRESA DE PEQUENO PORTE': { min: 360000, max: 4800000 },
  'DEMAIS': { min: 4800000, max: 300000000 },
  'GRANDE': { min: 300000000, max: 10000000000 }
};

function extractCNAE(cnae_code?: string): string {
  if (!cnae_code || typeof cnae_code !== 'string') return '00';
  
  // Extrai os primeiros 2 dígitos do CNAE
  return cnae_code.substring(0, 2);
}

function parseCapitalSocial(capital_string?: string | number): number {
  if (!capital_string) return 0;
  
  // Converte para string se for número
  const capital_str = String(capital_string);
  
  // Remove caracteres não numéricos exceto ponto e vírgula
  const cleaned = capital_str.replace(/[^\d.,]/g, '');
  
  // Converte para número
  const parsed = parseFloat(cleaned.replace(',', '.'));
  return isNaN(parsed) ? 0 : parsed;
}

function getMultiplierByCNAE(cnae_code?: string): number {
  if (!cnae_code || typeof cnae_code !== 'string') {
    return CNAE_MULTIPLIERS['default'];
  }
  
  const sector = extractCNAE(cnae_code);
  return CNAE_MULTIPLIERS[sector] || CNAE_MULTIPLIERS['default'];
}

function estimateEmployeeCount(porte?: string, capital_social?: number): number {
  if (!porte || typeof porte !== 'string') return 10;
  
  const estimates: Record<string, number> = {
    'MEI': 1,
    'ME': 15,
    'EPP': 80,
    'MICROEMPRESA': 8,
    'EMPRESA DE PEQUENO PORTE': 25,
    'DEMAIS': 100,
    'GRANDE': 500
  };
  
  let base_estimate = estimates[porte.toUpperCase()] || 20;
  
  // Ajusta baseado no capital social
  if (capital_social && typeof capital_social === 'number') {
    if (capital_social > 10000000) base_estimate *= 3;
    else if (capital_social > 1000000) base_estimate *= 2;
    else if (capital_social > 100000) base_estimate *= 1.5;
  }
  
  return Math.round(base_estimate);
}

export function calculateRevenueEstimation(companyData: CompanyData): RevenueEstimation {
  // Validação e sanitização de dados de entrada
  const porte = (companyData.porte && typeof companyData.porte === 'string') 
    ? companyData.porte.toUpperCase() 
    : 'DEMAIS';
    
  const capital_social = parseCapitalSocial(companyData.capital_social);
  const cnae_code = companyData.atividade_principal?.[0]?.code;
  const funcionarios = companyData.funcionarios_estimado || estimateEmployeeCount(porte, capital_social);
  
  // Base de receita por porte
  const revenue_base = REVENUE_BY_SIZE[porte] || REVENUE_BY_SIZE['DEMAIS'];
  
  // Multiplicador por setor
  const sector_multiplier = getMultiplierByCNAE(cnae_code);
  
  // Multiplicador por capital social
  let capital_multiplier = 1.0;
  if (capital_social > 50000000) capital_multiplier = 3.0;
  else if (capital_social > 10000000) capital_multiplier = 2.5;
  else if (capital_social > 5000000) capital_multiplier = 2.0;
  else if (capital_social > 1000000) capital_multiplier = 1.8;
  else if (capital_social > 500000) capital_multiplier = 1.5;
  else if (capital_social > 100000) capital_multiplier = 1.3;
  
  // Multiplicador por funcionários
  const employee_multiplier = Math.log10(funcionarios + 1) * 0.8 + 0.8;
  
  // Cálculo final
  const total_multiplier = sector_multiplier * capital_multiplier * employee_multiplier;
  
  const estimated_min = Math.round(revenue_base.min * total_multiplier);
  const estimated_max = Math.round(revenue_base.max * total_multiplier);
  const estimated_avg = Math.round((estimated_min + estimated_max) / 2);
  
  // Confidence score baseado na qualidade dos dados
  let confidence = 0.7; // Base
  if (capital_social > 0) confidence += 0.1;
  if (cnae_code) confidence += 0.1;
  if (funcionarios > 1) confidence += 0.1;
  confidence = Math.min(confidence, 0.95);
  
  // Classificação de tamanho
  let company_size: 'MICRO' | 'PEQUENA' | 'MÉDIA' | 'GRANDE';
  if (estimated_avg < 360000) company_size = 'MICRO';
  else if (estimated_avg < 4800000) company_size = 'PEQUENA';
  else if (estimated_avg < 300000000) company_size = 'MÉDIA';
  else company_size = 'GRANDE';
  
  // Recomendações de pricing (% do faturamento)
  const pricing_recommendations = {
    conservative: Math.round(estimated_avg * 0.005), // 0.5%
    recommended: Math.round(estimated_avg * 0.01),   // 1.0%
    premium: Math.round(estimated_avg * 0.02)        // 2.0%
  };
  
  // Projeções de ROI (estimativas conservadoras)
  const automation_savings = Math.round(estimated_avg * 0.03); // 3% economia em automação
  const efficiency_gains = Math.round(estimated_avg * 0.02);   // 2% ganho de eficiência
  const total_annual_savings = automation_savings + efficiency_gains;
  const roi_percentage = Math.round((total_annual_savings / pricing_recommendations.recommended) * 100);
  
  return {
    estimated_revenue: {
      min: estimated_min,
      max: estimated_max,
      average: estimated_avg
    },
    company_size,
    confidence_score: confidence,
    pricing_recommendations,
    roi_projections: {
      automation_savings,
      efficiency_gains,
      total_annual_savings,
      roi_percentage
    }
  };
}

// Função para formatar valores monetários
export function formatCurrency(value: number): string {
  // Validação de entrada
  if (typeof value !== 'number' || isNaN(value) || value < 0) {
    return 'R$ 0';
  }
  
  if (value >= 1000000000) {
    return `R$ ${(value / 1000000000).toFixed(1)}B`;
  } else if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)}k`;
  } else {
    return `R$ ${value.toFixed(0)}`;
  }
}

// Função para gerar argumentação de vendas
export function generateSalesArgument(estimation: RevenueEstimation): string {
  // Validação de entrada
  if (!estimation || !estimation.estimated_revenue || !estimation.pricing_recommendations) {
    return 'Análise não disponível no momento.';
  }
  
  const revenue_range = `${formatCurrency(estimation.estimated_revenue.min)} - ${formatCurrency(estimation.estimated_revenue.max)}`;
  const investment_percentage = estimation.estimated_revenue.average > 0 
    ? ((estimation.pricing_recommendations.recommended / estimation.estimated_revenue.average) * 100).toFixed(1)
    : '0.0';
  
  const payback_months = estimation.roi_projections.roi_percentage > 0 
    ? Math.round(12 / (estimation.roi_projections.roi_percentage / 100))
    : 12;
  
  return `
Nossa análise indica que sua empresa tem faturamento estimado de ${revenue_range} 
(empresa ${estimation.company_size.toLowerCase()}). 

O investimento recomendado de ${formatCurrency(estimation.pricing_recommendations.recommended)} 
representa apenas ${investment_percentage}% do faturamento anual.

Projeção de retorno:
• Economia em automação: ${formatCurrency(estimation.roi_projections.automation_savings)}/ano
• Ganhos de eficiência: ${formatCurrency(estimation.roi_projections.efficiency_gains)}/ano
• ROI total: ${estimation.roi_projections.roi_percentage}% no primeiro ano

Isso significa que o investimento se paga em ${payback_months} meses!
  `.trim();
}
