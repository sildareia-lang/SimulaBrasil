export interface PerfilEstudante {
  nome: string;
  meta: string;
  nivelLabel: string;
  nivelNumero: number;
  xpAtual: number;
  xpProximo: number;
  diasSeguidos: number;
  fotoUrl: string;
}

export interface SimuladoFinalizado {
  id: string;
  exameId: string;
  exameTitulo: string;
  dataIso: string;
  tempoSegundos: number;
  totalQuestoes: number;
  totalRespondidas: number;
  acertos: number;
  percentualAcerto: number;
  notaCalibradaTRI: number;
  respostas: Record<string, string>;
  marcadasRevisao: string[];
}

export interface MetaDiaria {
  id: string;
  texto: string;
  concluida: boolean;
}

export interface PreferenciasVisuais {
  fontSizeStep: number; // -1: pequeno, 0: padrão, 1: médio, 2: grande
  tema: 'normal' | 'conforto' | 'sepia' | 'dark';
}

const STORAGE_KEYS = {
  PERFIL: 'simulabrasil_perfil',
  RESPOSTAS: 'simulabrasil_respostas',
  REVISAO: 'simulabrasil_revisao',
  RASCUNHOS: 'simulabrasil_rascunhos',
  HISTORICO: 'simulabrasil_historico',
  CADERNO_ERROS: 'simulabrasil_caderno_erros',
  METAS: 'simulabrasil_metas',
  PREFS: 'simulabrasil_preferencias',
  EXAME_EM_ANDAMENTO: 'simulabrasil_exame_ativo',
};

export const DEFAULT_PERFIL: PerfilEstudante = {
  nome: 'Mariana Silva',
  meta: 'Vestibulanda 2025 • Foco ENEM & Medicina',
  nivelLabel: 'Nível 14 • Avançado',
  nivelNumero: 14,
  xpAtual: 780,
  xpProximo: 1000,
  diasSeguidos: 7,
  fotoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNRhmecXt8xf96xWLczXKH73RL1-XILzzcoBufBBIdtWU1XuXl0ZClwtUZg-KL8vhxt8gooNmTUj8V77d5dTcLMVkDENXQUN6oYrFQVBFmMLUS5e3kmPtaqJZnTqZebe3w37GA4Z32tFUjw-6nMCvquKdthtXh7WS9fTTnIbeVTxJJRtglZIi3GNor5kY1zLeS4tArqG8Fr3o8LiCMyipC12oEjNaA9Zca93biDjbDbq2Tzzd6Vy4lHQ',
};

export const DEFAULT_METAS: MetaDiaria[] = [
  { id: 'meta-1', texto: '15 Questões Matinais de Biologia', concluida: true },
  { id: 'meta-2', texto: 'Revisão de Redação ENEM Nota 1000', concluida: true },
  { id: 'meta-3', texto: '1 Simulado Rápido de Física ou Termodinâmica', concluida: false },
];

export const DEFAULT_PREFS: PreferenciasVisuais = {
  fontSizeStep: 0,
  tema: 'conforto',
};

// Safe helper for localStorage
export const StudyStorage = {
  getPerfil(): PerfilEstudante {
    if (typeof window === 'undefined') return DEFAULT_PERFIL;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PERFIL);
      return data ? JSON.parse(data) : DEFAULT_PERFIL;
    } catch {
      return DEFAULT_PERFIL;
    }
  },

  setPerfil(perfil: PerfilEstudante) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.PERFIL, JSON.stringify(perfil));
    } catch (e) {
      console.warn('Erro ao salvar perfil no localStorage', e);
    }
  },

  getRespostas(): Record<string, string> {
    if (typeof window === 'undefined') return {};
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESPOSTAS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  setResposta(questaoId: string, alternativa: string) {
    if (typeof window === 'undefined') return;
    try {
      const current = this.getRespostas();
      current[questaoId] = alternativa;
      localStorage.setItem(STORAGE_KEYS.RESPOSTAS, JSON.stringify(current));
    } catch (e) {
      console.warn(e);
    }
  },

  limparResposta(questaoId: string) {
    if (typeof window === 'undefined') return;
    try {
      const current = this.getRespostas();
      delete current[questaoId];
      localStorage.setItem(STORAGE_KEYS.RESPOSTAS, JSON.stringify(current));
    } catch (e) {
      console.warn(e);
    }
  },

  getMarcadasRevisao(): string[] {
    if (typeof window === 'undefined') return ['fuvest-lit-hist'];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REVISAO);
      return data ? JSON.parse(data) : ['fuvest-lit-hist'];
    } catch {
      return [];
    }
  },

  toggleMarcadaRevisao(questaoId: string): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const current = this.getMarcadasRevisao();
      const index = current.indexOf(questaoId);
      let isNowMarked = false;
      if (index >= 0) {
        current.splice(index, 1);
        isNowMarked = false;
      } else {
        current.push(questaoId);
        isNowMarked = true;
      }
      localStorage.setItem(STORAGE_KEYS.REVISAO, JSON.stringify(current));
      return isNowMarked;
    } catch {
      return false;
    }
  },

  getRascunho(questaoId: string): string {
    if (typeof window === 'undefined') return '';
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RASCUNHOS);
      const all = data ? JSON.parse(data) : {};
      return all[questaoId] || '';
    } catch {
      return '';
    }
  },

  setRascunho(questaoId: string, texto: string) {
    if (typeof window === 'undefined') return;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RASCUNHOS);
      const all = data ? JSON.parse(data) : {};
      all[questaoId] = texto;
      localStorage.setItem(STORAGE_KEYS.RASCUNHOS, JSON.stringify(all));
    } catch (e) {
      console.warn(e);
    }
  },

  getHistorico(): SimuladoFinalizado[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORICO);
      if (data) return JSON.parse(data);
      // Mock inicial caso esteja vazio para alimentar os cards do dashboard
      return [
        {
          id: 'sim-init-1',
          exameId: 'enem-2024-dia1',
          exameTitulo: 'Simulado Oficial ENEM 2024 - 1º Dia',
          dataIso: new Date(Date.now() - 86400000 * 2).toISOString(),
          tempoSegundos: 7200,
          totalQuestoes: 45,
          totalRespondidas: 42,
          acertos: 35,
          percentualAcerto: 78.4,
          notaCalibradaTRI: 765.2,
          respostas: {},
          marcadasRevisao: [],
        },
      ];
    } catch {
      return [];
    }
  },

  salvarSimuladoFinalizado(simulado: SimuladoFinalizado) {
    if (typeof window === 'undefined') return;
    try {
      const historico = this.getHistorico();
      historico.unshift(simulado);
      localStorage.setItem(STORAGE_KEYS.HISTORICO, JSON.stringify(historico));

      // Atualiza XP do estudante
      const perfil = this.getPerfil();
      perfil.xpAtual = Math.min(1000, perfil.xpAtual + simulado.acertos * 15);
      if (perfil.xpAtual >= 1000) {
        perfil.nivelNumero += 1;
        perfil.xpAtual = perfil.xpAtual - 1000;
        perfil.nivelLabel = `Nível ${perfil.nivelNumero} • Mestre`;
      }
      this.setPerfil(perfil);
    } catch (e) {
      console.warn(e);
    }
  },

  getCadernoErros(): string[] {
    if (typeof window === 'undefined') return ['enem-fis-termo'];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CADERNO_ERROS);
      return data ? JSON.parse(data) : ['enem-fis-termo'];
    } catch {
      return ['enem-fis-termo'];
    }
  },

  adicionarAoCadernoErros(questaoId: string) {
    if (typeof window === 'undefined') return;
    try {
      const current = this.getCadernoErros();
      if (!current.includes(questaoId)) {
        current.push(questaoId);
        localStorage.setItem(STORAGE_KEYS.CADERNO_ERROS, JSON.stringify(current));
      }
    } catch (e) {
      console.warn(e);
    }
  },

  removerDoCadernoErros(questaoId: string) {
    if (typeof window === 'undefined') return;
    try {
      const current = this.getCadernoErros().filter((id) => id !== questaoId);
      localStorage.setItem(STORAGE_KEYS.CADERNO_ERROS, JSON.stringify(current));
    } catch (e) {
      console.warn(e);
    }
  },

  getMetas(): MetaDiaria[] {
    if (typeof window === 'undefined') return DEFAULT_METAS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.METAS);
      return data ? JSON.parse(data) : DEFAULT_METAS;
    } catch {
      return DEFAULT_METAS;
    }
  },

  toggleMeta(metaId: string) {
    if (typeof window === 'undefined') return;
    try {
      const metas = this.getMetas();
      const updated = metas.map((m) => (m.id === metaId ? { ...m, concluida: !m.concluida } : m));
      localStorage.setItem(STORAGE_KEYS.METAS, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  },

  getPreferencias(): PreferenciasVisuais {
    if (typeof window === 'undefined') return DEFAULT_PREFS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PREFS);
      return data ? JSON.parse(data) : DEFAULT_PREFS;
    } catch {
      return DEFAULT_PREFS;
    }
  },

  setPreferencias(prefs: PreferenciasVisuais) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(prefs));
    } catch (e) {
      console.warn(e);
    }
  },

  // Reset complete local progress (as explicitly requested: "Inclua um botão simples para 'Resetar meu progresso local'")
  resetarProgressoGeral() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEYS.RESPOSTAS);
      localStorage.removeItem(STORAGE_KEYS.REVISAO);
      localStorage.removeItem(STORAGE_KEYS.RASCUNHOS);
      localStorage.removeItem(STORAGE_KEYS.HISTORICO);
      localStorage.removeItem(STORAGE_KEYS.CADERNO_ERROS);
      localStorage.removeItem(STORAGE_KEYS.METAS);
      localStorage.removeItem(STORAGE_KEYS.EXAME_EM_ANDAMENTO);
      localStorage.setItem(STORAGE_KEYS.PERFIL, JSON.stringify(DEFAULT_PERFIL));
      localStorage.setItem(STORAGE_KEYS.METAS, JSON.stringify(DEFAULT_METAS));
    } catch (e) {
      console.warn('Erro ao resetar progresso', e);
    }
  },
};
