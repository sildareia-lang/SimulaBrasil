'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  ArrowRight,
  Filter,
  Search,
  CheckCircle2,
  Sparkles,
  Zap,
  GraduationCap,
  Layers,
  Compass
} from 'lucide-react';
import { ExameConfig, EXAMES_CATALOGO } from '@/lib/examsData';
import { QUESTOES_MOCK } from '@/lib/questionsData';

interface Props {
  onStartExam: (exameId: string, modo: 'simulado' | 'treino_rapido') => void;
  onFilterBySubject: (materia: string) => void;
}

export function CatalogView({ onStartExam, onFilterBySubject }: Props) {
  const [selectedPilar, setSelectedPilar] = useState<'todos' | 'fundamental' | 'medio'>('todos');
  const [selectedCategoria, setSelectedCategoria] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [studyModeSelect, setStudyModeSelect] = useState<'simulado' | 'treino_rapido'>('simulado');

  const subjectsList = [
    'Geografia Urbana',
    'Termodinâmica',
    'Ecologia e Meio Ambiente',
    'Funções e Álgebra',
    'Geometria e Medidas',
    'Interpretação e Recursos Expressivos',
    'Astronomia - Sistema Solar e Mecânica Celeste',
    'Astrofísica e Gravitação',
    'Literatura e História do Brasil',
    'Química Ambiental e Saúde Pública',
  ];

  const filteredExames = EXAMES_CATALOGO.filter((ex) => {
    if (selectedPilar === 'fundamental' && ex.nivel !== 'Fundamental') return false;
    if (selectedPilar === 'medio' && ex.nivel !== 'Médio') return false;
    if (selectedCategoria !== 'Todas' && ex.categoria !== selectedCategoria) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ex.titulo.toLowerCase().includes(q);
      const matchDesc = ex.subtitulo.toLowerCase().includes(q);
      const matchCat = ex.categoria.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCat) return false;
    }
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 flex flex-col gap-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>Educação Aberta & Gratuita</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              Catálogo Geral de Provas e Simulados
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Organizado em 2 grandes pilares: Ensino Fundamental (1º ao 9º ano) e Ensino Médio (1º ao 3º ano). Escolha seu modo de treino: Simulado Completo ou Prática Sem Pressão.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-700 p-1 rounded-xl text-xs font-semibold shrink-0">
            <button
              onClick={() => setStudyModeSelect('simulado')}
              className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                studyModeSelect === 'simulado'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Simulado com Cronômetro</span>
            </button>
            <button
              onClick={() => setStudyModeSelect('treino_rapido')}
              className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                studyModeSelect === 'treino_rapido'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Treino com Feedback Instantâneo</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
          {/* Pilar Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedPilar('todos')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors shrink-0 ${
                selectedPilar === 'todos'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              Todos os Níveis
            </button>
            <button
              onClick={() => setSelectedPilar('fundamental')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors shrink-0 ${
                selectedPilar === 'fundamental'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
              }`}
            >
              Ensino Fundamental (1º ao 9º Ano)
            </button>
            <button
              onClick={() => setSelectedPilar('medio')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors shrink-0 ${
                selectedPilar === 'medio'
                  ? 'bg-blue-600 text-white'
                  : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
              }`}
            >
              Ensino Médio (1º ao 3º Ano)
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar exame ou matéria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Direct Filter by Subject Drawer */}
      <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col gap-2">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-blue-600" />
          Filtro Direto por Disciplina / Assunto Específico:
        </span>
        <div className="flex flex-wrap gap-2">
          {subjectsList.map((m) => (
            <button
              key={m}
              onClick={() => onFilterBySubject(m)}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors shadow-2xs font-medium"
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExames.map((exame) => (
          <article
            key={exame.id}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${exame.badgePillColor}`}
                >
                  {exame.badgePill}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {exame.nivel}
                </span>
              </div>

              <div className="w-full h-36 rounded-xl overflow-hidden mb-3 relative">
                <img
                  src={exame.imagemUrl}
                  alt={exame.imagemAlt}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-white/90 dark:bg-slate-900/90 text-[10px] font-bold">
                  {exame.badgeImagem}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {exame.titulo}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {exame.subtitulo}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-500 my-3">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> {exame.totalQuestoes} Questões
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> ~{Math.floor(exame.tempoSugeridoMinutos / 60)}h
                </span>
              </div>
            </div>

            <button
              onClick={() => onStartExam(exame.id, studyModeSelect)}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-sm active:scale-98"
            >
              <span>{studyModeSelect === 'simulado' ? 'Iniciar Simulado' : 'Iniciar Treino Rápido'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
