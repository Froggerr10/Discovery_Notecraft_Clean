// lib/mock-supabase.ts - SALVAMENTO LOCAL TEMPORÁRIO
export interface DiscoverySession {
  id: string;
  company_cnpj: string;
  company_name: string;
  company_data: any;
  responses: any[];
  started_at: string;
  completed_at?: string;
}

export class MockSupabaseService {
  static saveSession(sessionData: any) {
    console.log('💾 Salvando sessão:', sessionData);
    localStorage.setItem('discovery_session', JSON.stringify(sessionData));
    return Promise.resolve({ id: 'session_' + Date.now() });
  }

  static saveResponse(responseData: any) {
    console.log('💾 Salvando resposta:', responseData);
    const existing = localStorage.getItem('discovery_responses') || '[]';
    const responses = JSON.parse(existing);
    responses.push(responseData);
    localStorage.setItem('discovery_responses', JSON.stringify(responses));
    return Promise.resolve({ id: 'response_' + Date.now() });
  }

  static getSession(sessionId: string) {
    const data = localStorage.getItem('discovery_session');
    return Promise.resolve(data ? JSON.parse(data) : null);
  }

  static getResponses() {
    const data = localStorage.getItem('discovery_responses') || '[]';
    return Promise.resolve(JSON.parse(data));
  }
}
