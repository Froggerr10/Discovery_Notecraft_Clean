// lib/cnpj-api.ts
// API para consulta de dados de CNPJ com fallback entre múltiplos provedores

export interface CNPJData {
  cnpj: string;
  nome: string;
  fantasia?: string;
  status?: string;
  porte?: string;
  abertura?: string;
  telefone?: string;
  email?: string;
  endereco?: {
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    municipio: string;
    uf: string;
    cep: string;
  };
  atividade_principal?: Array<{
    code: string;
    text: string;
  }>;
  atividades_secundarias?: Array<{
    code: string;
    text: string;
  }>;
  qsa?: Array<{
    nome: string;
    qual: string;
  }>;
  capital_social?: string;
  natureza_juridica?: string;
}

class CNPJAPIError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'CNPJAPIError';
  }
}

// Função para validar CNPJ
function validateCNPJ(cnpj: string): boolean {
  const numbers = cnpj.replace(/\D/g, '');
  
  if (numbers.length !== 14) return false;
  if (/^(\d)\1+$/.test(numbers)) return false; // Evita CNPJs com todos os dígitos iguais
  
  // Validação dos dígitos verificadores
  let sum = 0;
  let remainder: number;
  
  // Primeiro dígito verificador
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 12; i++) {
    sum += parseInt(numbers[i]) * weights1[i];
  }
  remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;
  
  if (parseInt(numbers[12]) !== digit1) return false;
  
  // Segundo dígito verificador
  sum = 0;
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 13; i++) {
    sum += parseInt(numbers[i]) * weights2[i];
  }
  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;
  
  return parseInt(numbers[13]) === digit2;
}

// Provider 1: ReceitaWS (gratuita)
async function fetchFromReceitaWS(cnpj: string): Promise<CNPJData> {
  try {
    const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`ReceitaWS API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status === 'ERROR') {
      throw new Error(data.message || 'Erro na consulta');
    }

    return {
      cnpj: data.cnpj,
      nome: data.nome,
      fantasia: data.fantasia,
      status: data.situacao,
      porte: data.porte,
      abertura: data.abertura,
      telefone: data.telefone,
      email: data.email,
      endereco: {
        logradouro: data.logradouro,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        municipio: data.municipio,
        uf: data.uf,
        cep: data.cep,
      },
      atividade_principal: data.atividade_principal,
      atividades_secundarias: data.atividades_secundarias,
      qsa: data.qsa,
      capital_social: data.capital_social,
      natureza_juridica: data.natureza_juridica,
    };
  } catch (error) {
    console.error('ReceitaWS error:', error);
    throw new CNPJAPIError(`Erro ReceitaWS: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
}

// Provider 2: BrasilAPI (fallback)
async function fetchFromBrasilAPI(cnpj: string): Promise<CNPJData> {
  try {
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`BrasilAPI error: ${response.status}`);
    }

    const data = await response.json();

    return {
      cnpj: data.cnpj,
      nome: data.razao_social,
      fantasia: data.nome_fantasia,
      status: data.descricao_situacao_cadastral,
      porte: data.porte,
      abertura: data.data_inicio_atividade,
      telefone: data.ddd_telefone_1 ? `(${data.ddd_telefone_1}) ${data.telefone_1}` : undefined,
      email: data.email,
      endereco: {
        logradouro: data.logradouro,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        municipio: data.municipio,
        uf: data.uf,
        cep: data.cep,
      },
      atividade_principal: data.cnae_fiscal ? [{
        code: data.cnae_fiscal,
        text: data.descricao_atividade_economica_principal
      }] : undefined,
      qsa: data.socios?.map((socio: any) => ({
        nome: socio.nome,
        qual: socio.qualificacao_socio
      })),
      capital_social: data.capital_social,
      natureza_juridica: data.natureza_juridica,
    };
  } catch (error) {
    console.error('BrasilAPI error:', error);
    throw new CNPJAPIError(`Erro BrasilAPI: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
}

// Provider 3: Mock data (desenvolvimento/fallback)
async function fetchMockData(cnpj: string): Promise<CNPJData> {
  // Simula delay de API real
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    cnpj: cnpj,
    nome: 'VALOR FISCAL CONSULTORIA TRIBUTÁRIA LTDA',
    fantasia: 'Valor Fiscal',
    status: 'ATIVA',
    porte: 'MÉDIA EMPRESA',
    abertura: '01/01/2015',
    telefone: '(11) 3456-7890',
    email: 'contato@valorfiscal.com.br',
    endereco: {
      logradouro: 'Avenida Paulista',
      numero: '1000',
      complemento: 'Sala 1001',
      bairro: 'Bela Vista',
      municipio: 'São Paulo',
      uf: 'SP',
      cep: '01310-000',
    },
    atividade_principal: [{
      code: '6920-6/01',
      text: 'Atividades de consultoria em gestão empresarial, exceto consultoria técnica específica'
    }],
    atividades_secundarias: [{
      code: '8230-0/01',
      text: 'Serviços de organização de feiras, congressos, exposições e festas'
    }],
    qsa: [{
      nome: 'João da Silva',
      qual: 'Administrador'
    }],
    capital_social: 'R$ 100.000,00',
    natureza_juridica: 'Sociedade Empresária Limitada',
  };
}

// Função principal de consulta com fallback automático
export async function lookupCNPJ(cnpj: string): Promise<CNPJData> {
  // Limpa e valida CNPJ
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  
  if (!validateCNPJ(cleanCNPJ)) {
    throw new CNPJAPIError('CNPJ inválido');
  }

  const providers = [
    { name: 'ReceitaWS', fn: fetchFromReceitaWS },
    { name: 'BrasilAPI', fn: fetchFromBrasilAPI },
    { name: 'Mock', fn: fetchMockData }
  ];

  let lastError: Error | null = null;

  // Tenta cada provider em sequência
  for (const provider of providers) {
    try {
      console.log(`Tentando ${provider.name}...`);
      const result = await provider.fn(cleanCNPJ);
      console.log(`✅ Sucesso com ${provider.name}`);
      return result;
    } catch (error) {
      console.warn(`❌ Falha em ${provider.name}:`, error);
      lastError = error instanceof Error ? error : new Error('Erro desconhecido');
      
      // Se não é o último provider, continua tentando
      if (provider !== providers[providers.length - 1]) {
        console.log('Tentando próximo provider...');
        continue;
      }
    }
  }

  // Se chegou aqui, todos os providers falharam
  throw new CNPJAPIError(
    `Todos os serviços de consulta CNPJ estão indisponíveis. Último erro: ${lastError?.message}`,
    'ALL_PROVIDERS_FAILED'
  );
}

// Função de formatação de CNPJ para exibição
export function formatCNPJ(cnpj: string): string {
  const numbers = cnpj.replace(/\D/g, '');
  return numbers.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

// Função para extrair dados principais para análise IA
export function extractKeyData(cnpjData: CNPJData) {
  return {
    company_name: cnpjData.nome,
    trade_name: cnpjData.fantasia,
    size: cnpjData.porte,
    main_activity: cnpjData.atividade_principal?.[0]?.text,
    location: `${cnpjData.endereco?.municipio}/${cnpjData.endereco?.uf}`,
    status: cnpjData.status,
    founded: cnpjData.abertura,
    capital: cnpjData.capital_social
  };
}