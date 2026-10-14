'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  TrendingUp,
  Sparkles,
  PlayCircle,
  Compass,
  Moon,
  Clock,
  Target,
  BookmarkCheck,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Video,
  Lightbulb,
  Award,
  Users,
  Eye,
  Check,
  RotateCcw
} from 'lucide-react';
import { PerfilEstudante, MetaDiaria, PreferenciasVisuais } from '@/lib/studyStorage';
import { ExameConfig, EXAMES_CATALOGO } from '@/lib/examsData';

interface Props {
  perfil: PerfilEstudante;
  metas: MetaDiaria[];
  onToggleMeta: (id: string) => void;
  prefs: PreferenciasVisuais;
  onToggleComfort: () => void;
  onStartExam: (exameId: string, modo?: 'simulado' | 'treino_rapido') => void;
  onOpenCadernoErros: () => void;
  onSelectTab: (tab: 'inicio' | 'provas' | 'desempenho' | 'material') => void;
  cadernoErrosCount: number;
}

export function DashboardView({
  perfil,
  metas,
  onToggleMeta,
  prefs,
  onToggleComfort,
  onStartExam,
  onOpenCadernoErros,
  onSelectTab,
  cadernoErrosCount,
}: Props) {
  const [selectedFilter, setSelectedFilter] = useState<string>('Todos');
  const [maratonaInscrito, setMaratonaInscrito] = useState(false);

  const filterTabs = [
    'Todos',
    'ENEM',
    'SAEB 3º Ano',
    'SAEB 9º Ano',
    'Fuvest & Unicamp',
    'Vestibulares Regionais',
    'OBA',
  ];

  const filteredExames = EXAMES_CATALOGO.filter((exame) => {
    if (selectedFilter === 'Todos') return true;
    if (selectedFilter === 'ENEM') return exame.categoria === 'ENEM';
    if (selectedFilter === 'SAEB 3º Ano') return exame.categoria === 'SAEB 3º Ano';
    if (selectedFilter === 'SAEB 9º Ano') return exame.categoria === 'SAEB 9º Ano';
    if (selectedFilter === 'Fuvest & Unicamp') return exame.categoria === 'Fuvest & Unicamp';
    if (selectedFilter === 'Vestibulares Regionais') return exame.categoria === 'Vestibulares Regionais';
    if (selectedFilter === 'OBA') return exame.categoria === 'OBA';
    return true;
  });

  const metasConcluidas = metas.filter((m) => m.concluida).length;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 flex flex-col gap-10">
      {/* 1. Hero / Student Welcome Section */}
      <section className="relative w-full rounded-2xl bg-white dark:bg-slate-800/90 p-6 md:p-10 shadow-sm border border-slate-100 dark:border-slate-700/60 overflow-hidden flex flex-col gap-8">
        {/* Soft ambient decorative glows */}
        <div className="absolute -right-20 -top-24 w-96 h-96 rounded-full bg-emerald-100/40 dark:bg-emerald-950/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-24 w-96 h-96 rounded-full bg-blue-100/50 dark:bg-blue-950/30 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col max-w-2xl">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Meta Semanal Atingida
              </span>

              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  prefs.tema === 'conforto' || prefs.tema === 'sepia'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 opacity-60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Modo Conforto Visual Ativo
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
              Olá, {perfil.nome.split(' ')[0]}!{' '}
              <span className="text-blue-600 dark:text-blue-400">
                Pronta para conquistar sua aprovação hoje?
              </span>
            </h1>

            {/* Motivational subtext */}
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 flex items-center flex-wrap gap-2">
              <span>
                Faltam <strong className="text-slate-800 dark:text-slate-100">42 dias</strong> para o ENEM
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="inline-flex items-center text-emerald-700 dark:text-emerald-400 font-medium">
                <TrendingUp className="w-4 h-4 mr-1 text-emerald-600" />
                Seu ritmo está 15% acima da meta semanal
              </span>
            </p>
          </div>

          {/* Student Status Block */}
          <div className="flex items-center gap-4 shrink-0 bg-slate-50 dark:bg-slate-700/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-600/60 shadow-xs">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2Kkz2eRM1wSKjRTwfWSplpauu0eMjZDPImQs27OXODjmJ0d72llqEQ-9nnWKv3MpnUCJhWg6yQZEhYqvxMIwcubNTA6Bnjk-p9NbYZYKnQcg3PmaWZv8bh9KdQ7T7mxtWD0V2q-bFyWE9ZYRtqc0XzazH13oP_zVl9X5p4J98LcBCxoi99GkCWbdeBkxvInrqmChVdVelAuAHYq2ob9Nm4BFaVK1H5-Qq_rCamAA__IocU92iUEXiaQ"
              alt="Foto da estudante"
              className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover shadow-sm ring-1 ring-slate-200 dark:ring-slate-600"
            />
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                Status Geral
              </span>
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {perfil.nivelLabel}
              </span>
              <div className="w-36 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden mt-1.5">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${(perfil.xpAtual / perfil.xpProximo) * 100}%` }}
                />
              </div>
              <span className="text-[11px] text-blue-700 dark:text-blue-400 mt-1 font-semibold">
                {perfil.xpAtual} / {perfil.xpProximo} XP para Nível {perfil.nivelNumero + 1}
              </span>
            </div>
          </div>
        </div>

        {/* 3 Snapshot Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Metric 1 */}
          <div className="bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700 rounded-2xl p-5 flex items-center justify-between hover:-translate-y-0.5 transition-transform shadow-xs">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Simulados Concluídos
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">18</span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">+3 este mês</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                1.620 questões respondidas
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/80 flex items-center justify-center text-blue-700 dark:text-blue-300 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700 rounded-2xl p-5 flex items-center justify-between hover:-translate-y-0.5 transition-transform shadow-xs">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Taxa de Acertos Geral
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">78.4%</span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">▲ 4.2%</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Consistente com corte de Medicina
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700 rounded-2xl p-5 flex items-center justify-between hover:-translate-y-0.5 transition-transform shadow-xs">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Tempo Médio / Questão
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">2m 45s</span>
                <span className="text-xs text-blue-700 dark:text-blue-400 font-bold">Ideal (&lt;3min)</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Ritmo ótimo para gestão do tempo
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-700 dark:text-indigo-300 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onStartExam('simulado-rapido-15', 'simulado')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 text-white font-semibold text-sm shadow-md hover:bg-blue-700 active:scale-95 transition-all"
            >
              <PlayCircle className="w-5 h-5" />
              <span>Iniciar Simulado Rápido (15 Questões Diárias)</span>
            </button>

            <button
              onClick={() => onSelectTab('provas')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-blue-300 font-semibold text-sm hover:bg-blue-100 dark:hover:bg-slate-600 active:scale-95 transition-all"
            >
              <Compass className="w-5 h-5" />
              <span>Escolher Prova por Estado / Nível</span>
            </button>
          </div>

          <button
            onClick={onToggleComfort}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition-colors"
          >
            <Moon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Ajustar Descanso Visual</span>
          </button>
        </div>
      </section>

      {/* 2. Performance Panel & Area Mastery (Bento style grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Subject Mastery Breakdown (8 cols) */}
        <section className="lg:col-span-8 bg-white dark:bg-slate-800/90 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <span className="text-xs text-blue-600 dark:text-blue-400 uppercase font-bold tracking-wider">
                  Diagnóstico de Precisão
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Rendimento por Área do Conhecimento
                </h2>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 text-xs">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Calculado via Teoria da Resposta ao Item (TRI)</span>
              </div>
            </div>

            {/* Progress Bars List with bespoke colors */}
            <div className="flex flex-col gap-5">
              {/* Matemática */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
                    Matemática e suas Tecnologias
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    82% <span className="text-slate-400 font-normal text-xs">(845.2 TRI)</span>
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
                  <div className="h-full bg-emerald-600 rounded-full transition-all duration-700" style={{ width: '82%' }} />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Ponto forte: Geometria Espacial & Probabilidade</span>
                  <span>410 questões feitas</span>
                </div>
              </div>

              {/* Ciências da Natureza */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
                    Ciências da Natureza
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    74% <span className="text-slate-400 font-normal text-xs">(760.8 TRI)</span>
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-700" style={{ width: '74%' }} />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Ponto forte: Ecologia | Atenção: Termodinâmica</span>
                  <span>385 questões feitas</span>
                </div>
              </div>

              {/* Linguagens e Códigos */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <span className="w-3 h-3 rounded-full bg-purple-600 inline-block" />
                    Linguagens e Códigos
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    85% <span className="text-slate-400 font-normal text-xs">(715.4 TRI)</span>
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
                  <div className="h-full bg-purple-600 rounded-full transition-all duration-700" style={{ width: '85%' }} />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Ponto forte: Interpretação Textual & Artes Visuais</span>
                  <span>430 questões feitas</span>
                </div>
              </div>

              {/* Ciências Humanas */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <span className="w-3 h-3 rounded-full bg-amber-600 inline-block" />
                    Ciências Humanas
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    79% <span className="text-slate-400 font-normal text-xs">(738.9 TRI)</span>
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
                  <div className="h-full bg-amber-600 rounded-full transition-all duration-700" style={{ width: '79%' }} />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Ponto forte: Era Vargas & Urbanização Brasileira</span>
                  <span>395 questões feitas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Custom TRI Recommendation Banner */}
          <div className="mt-8 p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/50 flex items-start gap-4">
            <div className="p-2 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-lg shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-xs leading-relaxed">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Dica pedagógica da IA baseada na sua TRI:
              </span>
              <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                Foco sugerido para hoje: <strong className="text-slate-900 dark:text-slate-100">Termodinâmica</strong> e{' '}
                <strong className="text-slate-900 dark:text-slate-100">Funções Trigonométricas</strong>. Acertar 3 questões médias desses tópicos adicionará aproximadamente{' '}
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">+24 pontos</span> na sua nota calibrada.
              </p>
            </div>
          </div>
        </section>

        {/* Study Routine & Daily Goals Checklist (4 cols) */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {/* Daily Goals Card */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/60 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">Metas de Hoje</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                {metasConcluidas} de {metas.length} Concluídas
              </span>
            </div>

            <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                style={{ width: `${(metasConcluidas / metas.length) * 100}%` }}
              />
            </div>

            <ul className="flex flex-col gap-2 mt-1">
              {metas.map((meta) => (
                <li
                  key={meta.id}
                  onClick={() => onToggleMeta(meta.id)}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                    meta.concluida
                      ? 'bg-slate-50 dark:bg-slate-700/40 text-slate-500'
                      : 'bg-blue-50/70 dark:bg-slate-700/70 text-slate-800 dark:text-slate-100 border border-blue-200 dark:border-blue-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                        meta.concluida
                          ? 'bg-emerald-600 text-white'
                          : 'border-2 border-slate-400 dark:border-slate-500'
                      }`}
                    >
                      {meta.concluida && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className={meta.concluida ? 'line-through opacity-70' : 'font-medium'}>
                      {meta.texto}
                    </span>
                  </div>
                  {!meta.concluida && (
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">
                      Pendente
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Study Shortcuts / Tools */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/60 flex flex-col gap-3">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              Ferramentas de Revisão
            </h3>

            <div className="flex flex-col gap-2.5">
              {/* Caderno de Erros */}
              <button
                onClick={onOpenCadernoErros}
                className="group flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-950/70 text-rose-600 flex items-center justify-center">
                    <BookmarkCheck className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                      Caderno de Erros Ativo
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {cadernoErrosCount > 0 ? `${cadernoErrosCount} questões para refazer` : 'Nenhum erro pendente'}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </button>

              {/* Gabaritos em Vídeo / Comentados */}
              <button
                onClick={() => onStartExam('enem-2024-dia1', 'treino_rapido')}
                className="group flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/70 text-blue-600 flex items-center justify-center">
                    <Video className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                      Modo Treino com Feedback Imediato
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Explicações didáticas e sem pressão de tempo
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* 3. Featured Tests & Exams Section with Filter Tabs */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs text-blue-600 dark:text-blue-400 uppercase font-bold tracking-wider">
              Banco de Provas Atualizado
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Simulados e Provas em Destaque
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Ambiente de aplicação idêntico ao modelo presencial com cronômetro calibrado e correção instantânea.
            </p>
          </div>

          <button
            onClick={() => onSelectTab('provas')}
            className="inline-flex items-center gap-1.5 text-xs md:text-sm text-blue-600 dark:text-blue-400 font-bold hover:underline self-start md:self-auto"
          >
            <span>Ver catálogo completo (120+ exames)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                selectedFilter === tab
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 4 Rich Featured Exam Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredExames.map((exame) => (
            <article
              key={exame.id}
              className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 flex flex-col justify-between shadow-sm border border-slate-100 dark:border-slate-700/60 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${exame.badgePillColor}`}
                  >
                    {exame.badgePill}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {exame.tagExtra}
                  </span>
                </div>

                <div className="w-full h-36 rounded-xl overflow-hidden mb-3 relative">
                  <img
                    src={exame.imagemUrl}
                    alt={exame.imagemAlt}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-white/90 dark:bg-slate-900/90 backdrop-blur text-[11px] text-slate-800 dark:text-slate-200 font-semibold shadow-xs">
                    {exame.badgeImagem}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {exame.titulo}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {exame.subtitulo}
                </p>

                <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-xs my-3">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> {exame.totalQuestoes} Questões
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> ~{Math.floor(exame.tempoSugeridoMinutos / 60)}h
                    {exame.tempoSugeridoMinutos % 60 > 0 ? `${exame.tempoSugeridoMinutos % 60}m` : '00m'}
                  </span>
                </div>

                {/* Difficulty Indicator */}
                <div className="flex flex-col gap-1 mb-5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500 dark:text-slate-400">Dificuldade Estimada</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {exame.dificuldade}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${exame.dificuldadeCor} rounded-full`}
                      style={{ width: `${exame.dificuldadePorcentagem}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => onStartExam(exame.id, 'simulado')}
                  className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-98 transition-all shadow-sm"
                >
                  <span>Começar Simulado</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onStartExam(exame.id, 'treino_rapido')}
                  className="w-full py-1.5 rounded-lg text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Modo Treino Rápido (Sem Cronômetro)
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Community Activity & Live Simulation Room Callout */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center shrink-0">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-blue-200 uppercase tracking-wider font-bold">
              Simulado Nacional em Tempo Real
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Maratona de Redação & Matemática ao Vivo
            </h3>
            <p className="text-xs md:text-sm text-blue-100 mt-0.5">
              Neste domingo às 13:00h • Mais de 4.800 estudantes confirmados em todo o Brasil.
            </p>
          </div>
        </div>

        <button
          onClick={() => setMaratonaInscrito(!maratonaInscrito)}
          className={`px-6 py-3.5 rounded-full text-xs md:text-sm font-bold transition-all shrink-0 shadow-sm active:scale-95 ${
            maratonaInscrito
              ? 'bg-emerald-500 text-white'
              : 'bg-white text-blue-700 hover:bg-blue-50'
          }`}
        >
          {maratonaInscrito ? '✓ Vaga Garantida!' : 'Garantir Minha Vaga Gratuita'}
        </button>
      </section>
    </div>
  );
}
