'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Clock,
  PauseCircle,
  PlayCircle,
  Sun,
  Coffee,
  Flag,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Edit3,
  X,
  ArrowLeft,
  ArrowRight,
  Check,
  AlertTriangle,
  Lightbulb,
  Cloud,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Questao } from '@/lib/questionsData';
import { ExameConfig } from '@/lib/examsData';
import { QuestionGraphics } from './QuestionGraphics';
import { StudyStorage, PreferenciasVisuais } from '@/lib/studyStorage';

interface Props {
  exame: ExameConfig;
  questoes: Questao[];
  modo: 'simulado' | 'treino_rapido';
  prefs: PreferenciasVisuais;
  onChangePrefs: (newPrefs: PreferenciasVisuais) => void;
  onFinishExam: (respostas: Record<string, string>, tempoSegundos: number, marcadasRevisao: string[]) => void;
  onExit: () => void;
}

export function ExamArenaView({
  exame,
  questoes,
  modo,
  prefs,
  onChangePrefs,
  onFinishExam,
  onExit,
}: Props) {
  // Navigation & current question index
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (exame.id === 'enem-2024-dia1' && questoes.length >= 14) {
      return 13; // Index 13 = Questão 14 as depicted in Image 3
    }
    return 0;
  });

  const currentQuestao = questoes[currentIndex] || questoes[0];

  // User answers & reviews
  const [respostas, setRespostas] = useState<Record<string, string>>(() => {
    const saved = StudyStorage.getRespostas();
    if (Object.keys(saved).length > 0) return saved;

    // Initial answered state for ENEM 1º Dia to match Image 3 (13 feitas + questão 14 selecionada)
    if (exame.id === 'enem-2024-dia1' && questoes.length >= 14) {
      const mockInit: Record<string, string> = {};
      const letters: Array<'A' | 'B' | 'C' | 'D' | 'E'> = ['B', 'A', 'C', 'D', 'B', 'E', 'A', 'C', 'B', 'D', 'A', 'C', 'E'];
      for (let i = 0; i < 13; i++) {
        mockInit[questoes[i].id] = letters[i % letters.length];
      }
      mockInit[questoes[13].id] = 'B'; // Questão 14 alternativa B selecionada
      return mockInit;
    }
    return {};
  });

  const [marcadasRevisao, setMarcadasRevisao] = useState<string[]>(() => {
    const saved = StudyStorage.getMarcadasRevisao();
    if (saved.length > 0) return saved;
    if (exame.id === 'enem-2024-dia1' && questoes.length >= 22) {
      return [questoes[7].id, questoes[21].id]; // Questões 8 e 22 sinalizadas para revisão
    }
    return [];
  });
  const [rascunhos, setRascunhos] = useState<Record<string, string>>({});

  // Timer state
  const initialSeconds = exame.id === 'enem-2024-dia1'
    ? 2 * 3600 + 41 * 60 + 18 // 02:41:18 exato do protótipo
    : exame.tempoSugeridoMinutos * 60;
  const [segundosRestantes, setSegundosRestantes] = useState(
    modo === 'simulado' ? initialSeconds : 0
  );
  const [tempoDecorrido, setTempoDecorrido] = useState(0);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  // UI helpers
  const [fontSizeStep, setFontSizeStep] = useState(prefs.fontSizeStep || 0); // -1, 0, 1, 2
  const [isSepiaMode, setIsSepiaMode] = useState(prefs.tema === 'sepia');
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const handleSelectOption = React.useCallback(
    (letra: 'A' | 'B' | 'C' | 'D' | 'E') => {
      const qid = currentQuestao.id;
      setRespostas((prev) => {
        const updated = { ...prev, [qid]: letra };
        StudyStorage.setResposta(qid, letra);
        return updated;
      });
    },
    [currentQuestao.id]
  );

  const handleClearOption = () => {
    const qid = currentQuestao.id;
    setRespostas((prev) => {
      const updated = { ...prev };
      delete updated[qid];
      StudyStorage.limparResposta(qid);
      return updated;
    });
  };

  // Timer countdown / countup
  useEffect(() => {
    if (isTimerPaused) return;

    const interval = setInterval(() => {
      setTempoDecorrido((prev) => prev + 1);
      if (modo === 'simulado') {
        setSegundosRestantes((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerPaused, modo]);

  // Keyboard shortcut listener (1-5 or A-E to pick option; Arrows to navigate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in the scratchpad textarea
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) {
        return;
      }

      const key = e.key.toUpperCase();
      const optionMap: Record<string, 'A' | 'B' | 'C' | 'D' | 'E'> = {
        '1': 'A',
        '2': 'B',
        '3': 'C',
        '4': 'D',
        '5': 'E',
        A: 'A',
        B: 'B',
        C: 'C',
        D: 'D',
        E: 'E',
      };

      if (optionMap[key]) {
        handleSelectOption(optionMap[key]);
      } else if (e.key === 'ArrowRight' && currentIndex < questoes.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questoes.length, handleSelectOption]);

  const handleToggleRevisao = () => {
    const qid = currentQuestao.id;
    const isNow = StudyStorage.toggleMarcadaRevisao(qid);
    if (isNow) {
      setMarcadasRevisao((prev) => [...prev, qid]);
    } else {
      setMarcadasRevisao((prev) => prev.filter((id) => id !== qid));
    }
  };

  const handleSaveScratchpad = (text: string) => {
    const qid = currentQuestao.id;
    setRascunhos((prev) => ({ ...prev, [qid]: text }));
    StudyStorage.setRascunho(qid, text);
  };

  // Format timer
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const totalQuestoes = questoes.length;
  const respondidasCount = Object.keys(respostas).filter((id) =>
    questoes.some((q) => q.id === id)
  ).length;
  const emBrancoCount = totalQuestoes - respondidasCount;
  const emRevisaoCount = marcadasRevisao.filter((id) =>
    questoes.some((q) => q.id === id)
  ).length;

  const currentSelectedAnswer = respostas[currentQuestao.id];
  const isCurrentFlagged = marcadasRevisao.includes(currentQuestao.id);
  const currentScratchpad = rascunhos[currentQuestao.id] || StudyStorage.getRascunho(currentQuestao.id);

  // Font size styles
  const getFontSizeClass = () => {
    if (fontSizeStep === -1) return 'text-sm';
    if (fontSizeStep === 1) return 'text-lg';
    if (fontSizeStep === 2) return 'text-xl';
    return 'text-base';
  };

  return (
    <div className={`w-full min-h-screen flex flex-col ${isSepiaMode ? 'bg-[#FAF6EE] text-[#433422]' : 'bg-[#F8F9FF] dark:bg-slate-900 text-slate-800 dark:text-slate-100'}`}>
      {/* 1. Status & Progress Ribbon */}
      <div className={`w-full sticky top-20 z-40 shadow-xs border-b border-slate-200 dark:border-slate-800 ${isSepiaMode ? 'bg-[#F5EFE1]' : 'bg-white dark:bg-slate-850'}`}>
        {/* Fine Linear Progress Meter */}
        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / totalQuestoes) * 100}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Exam Spec & Question Track */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 text-xs font-bold tracking-wide shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              {exame.categoria}
            </span>
            <div className="hidden sm:flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {currentQuestao.disciplinaGeral}
              </span>
              <span>•</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                Questão {currentIndex + 1} de {totalQuestoes}
              </span>
            </div>
          </div>

          {/* Cognitive Ergonomic Timer Bar */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-xs">
            <Clock className={`w-4 h-4 text-blue-600 dark:text-blue-400 ${isTimerPaused ? '' : 'animate-pulse'}`} />
            <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-100">
              {modo === 'simulado' ? formatTime(segundosRestantes) : formatTime(tempoDecorrido)}
            </span>
            {modo === 'simulado' && (
              <button
                onClick={() => setIsTimerPaused(!isTimerPaused)}
                className="ml-1 text-slate-400 hover:text-blue-600 transition-colors p-0.5 rounded-full"
                title={isTimerPaused ? 'Retomar cronômetro' : 'Pausar cronômetro'}
              >
                {isTimerPaused ? <PlayCircle className="w-4 h-4 text-emerald-600" /> : <PauseCircle className="w-4 h-4" />}
              </button>
            )}
          </div>

          {/* Visual Accessibility & Revision Flagging */}
          <div className="flex items-center gap-2">
            {/* Font resize buttons */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-0.5 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setFontSizeStep((s) => Math.max(-1, s - 1))}
                className="w-7 h-7 flex items-center justify-center text-xs text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-full transition-all font-semibold"
                title="Diminuir fonte (A-)"
              >
                A-
              </button>
              <button
                onClick={() => setFontSizeStep((s) => Math.min(2, s + 1))}
                className="w-7 h-7 flex items-center justify-center text-xs text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-full transition-all font-bold"
                title="Aumentar fonte (A+)"
              >
                A+
              </button>
            </div>

            {/* Sepia Mode Toggle */}
            <button
              onClick={() => {
                const nextSepia = !isSepiaMode;
                setIsSepiaMode(nextSepia);
                onChangePrefs({
                  ...prefs,
                  tema: nextSepia ? 'sepia' : 'conforto',
                });
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                isSepiaMode
                  ? 'bg-amber-200 text-amber-950 font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
              title="Alternar modo leitura sépia suave"
            >
              <Coffee className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden md:inline">Sépia</span>
            </button>

            {/* Mark for review */}
            <button
              onClick={handleToggleRevisao}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isCurrentFlagged
                  ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-300'
                  : 'bg-amber-50 dark:bg-slate-800 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 hover:bg-amber-100'
              }`}
              title="Marcar questão para revisar depois"
            >
              <Flag className={`w-3.5 h-3.5 ${isCurrentFlagged ? 'fill-white' : ''}`} />
              <span className="hidden sm:inline">
                {isCurrentFlagged ? 'Marcada p/ Revisão' : 'Marcar p/ Revisão'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Primary Testing Arena: Split Architecture */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Core: Context, Question Text, Diagram & Alternates */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Focus Question Article Card */}
            <div
              className={`rounded-2xl p-6 md:p-8 shadow-sm border transition-all ${
                isSepiaMode
                  ? 'bg-[#FBF7EE] border-[#E8DFC8]'
                  : 'bg-white dark:bg-slate-800/90 border-slate-200/80 dark:border-slate-700/60'
              }`}
            >
              {/* Header inside question card */}
              <div className="flex flex-wrap items-center justify-between pb-3 mb-5 border-b border-slate-100 dark:border-slate-700/60 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                    {currentQuestao.cadernoInfo || `${currentQuestao.exame} • ${currentQuestao.anoFase}`}
                  </span>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold">
                  {currentQuestao.habilidade}
                </span>
              </div>

              {/* Dynamic Typography Question Content */}
              <div className={`space-y-4 ${getFontSizeClass()}`}>
                {/* Motivator Passage */}
                {currentQuestao.textoMotivador && (
                  <div className="bg-slate-50 dark:bg-slate-700/40 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                    <p className="leading-relaxed italic text-slate-700 dark:text-slate-300 font-serif">
                      {currentQuestao.textoMotivador}
                    </p>
                    {currentQuestao.referenciaTexto && (
                      <div className="mt-2 text-right">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {currentQuestao.referenciaTexto}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Question Diagram / Graphic */}
                {currentQuestao.temGrafico && currentQuestao.tipoGrafico && (
                  <QuestionGraphics tipo={currentQuestao.tipoGrafico} />
                )}

                {/* Prompt Question */}
                <div className="pt-2">
                  <p className="font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {currentQuestao.enunciado}
                  </p>
                </div>
              </div>

              {/* High-Comfort Tactile Alternates (A-E) */}
              <div className="mt-6 flex flex-col gap-2.5" role="radiogroup">
                {currentQuestao.opcoes.map((opcao) => {
                  const isSelected = currentSelectedAnswer === opcao.id;
                  const isTreino = modo === 'treino_rapido';
                  const isCorreta = opcao.id === currentQuestao.respostaCorreta;
                  const showFeedbackHighlight = isTreino && currentSelectedAnswer;

                  let borderClass = 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50/70 dark:hover:bg-slate-700/40';
                  let bgClass = isSepiaMode ? 'bg-[#FBF7EE]' : 'bg-white dark:bg-slate-800';
                  let beadClass = 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200';

                  if (isSelected) {
                    borderClass = 'border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/20';
                    bgClass = 'bg-blue-50/70 dark:bg-blue-950/40';
                    beadClass = 'bg-blue-600 text-white font-bold';
                  }

                  if (showFeedbackHighlight) {
                    if (isCorreta) {
                      borderClass = 'border-emerald-500 ring-2 ring-emerald-500/30';
                      bgClass = 'bg-emerald-50 dark:bg-emerald-950/40';
                      beadClass = 'bg-emerald-600 text-white';
                    } else if (isSelected && !isCorreta) {
                      borderClass = 'border-rose-500 ring-2 ring-rose-500/30';
                      bgClass = 'bg-rose-50 dark:bg-rose-950/40';
                      beadClass = 'bg-rose-600 text-white';
                    }
                  }

                  return (
                    <div
                      key={opcao.id}
                      onClick={() => handleSelectOption(opcao.id)}
                      className={`group relative flex items-start gap-3 p-3.5 rounded-xl border ${borderClass} ${bgClass} transition-all cursor-pointer select-none`}
                    >
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${beadClass}`}
                      >
                        {opcao.id}
                      </span>
                      <span className={`pt-1 text-sm leading-relaxed text-slate-800 dark:text-slate-200 ${isSelected ? 'font-semibold' : ''}`}>
                        {opcao.texto}
                      </span>

                      {isSelected && !showFeedbackHighlight && (
                        <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 ml-auto shrink-0 pt-1" />
                      )}

                      {showFeedbackHighlight && isCorreta && (
                        <div className="ml-auto shrink-0 flex items-center gap-1 text-emerald-600 font-bold text-xs pt-1">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="hidden sm:inline">Correta</span>
                        </div>
                      )}

                      {showFeedbackHighlight && isSelected && !isCorreta && (
                        <div className="ml-auto shrink-0 flex items-center gap-1 text-rose-600 font-bold text-xs pt-1">
                          <XCircle className="w-5 h-5" />
                          <span className="hidden sm:inline">Incorreta</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Micro-actions inside Question Panel */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                  <Cloud className="w-4 h-4" />
                  Resposta salva automaticamente
                </span>
                {currentSelectedAnswer && (
                  <button
                    onClick={handleClearOption}
                    className="hover:text-rose-600 transition-colors flex items-center gap-1 text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Limpar resposta selecionada
                  </button>
                )}
              </div>

              {/* Immediate Didactic Feedback in Treino Mode */}
              {modo === 'treino_rapido' && currentSelectedAnswer && (
                <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 animate-fadeIn">
                  <div className="flex items-center gap-2 mb-2 font-bold text-xs text-slate-900 dark:text-slate-100">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>Gabarito Comentado Instantâneo:</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {currentQuestao.explicacaoDetalhada.porQueCorreta}
                  </p>
                  {currentQuestao.explicacaoDetalhada.dicaPedagogica && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-600 text-[11px] text-blue-700 dark:text-blue-300">
                      <strong>Dica da Banca:</strong> {currentQuestao.explicacaoDetalhada.dicaPedagogica}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Virtual Scratchpad Drawer */}
            {isScratchpadOpen && (
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 animate-fadeIn">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <Edit3 className="w-4 h-4 text-amber-600" />
                    <span>Bloco de Rascunho da Questão {currentIndex + 1} (Anotações Pessoais)</span>
                  </div>
                  <button
                    onClick={() => setIsScratchpadOpen(false)}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  value={currentScratchpad}
                  onChange={(e) => handleSaveScratchpad(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-y"
                  placeholder="Faça cálculos, anotações de eliminação de alternativas ou esquemas mentais aqui..."
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* Right Column: Exam Navigator (Mapa da Prova 1..N) */}
          <aside className="lg:col-span-4 flex flex-col gap-4 sticky top-36">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200/80 dark:border-slate-700/60">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  Mapa da Prova
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                  {respondidasCount}/{totalQuestoes} Feitas
                </span>
              </div>

              {/* Matrix Grid of Questions */}
              <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-5 gap-1.5 p-2 bg-slate-50 dark:bg-slate-900/60 rounded-xl max-h-[380px] overflow-y-auto">
                {questoes.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = !!respostas[q.id];
                  const isFlagged = marcadasRevisao.includes(q.id);

                  let cellClass = 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300';

                  if (isAnswered) {
                    cellClass = 'bg-emerald-600 text-white font-semibold';
                  }

                  if (isFlagged) {
                    cellClass = 'bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-100 ring-1 ring-amber-400 font-bold';
                  }

                  if (isCurrent) {
                    cellClass = 'bg-blue-600 text-white font-extrabold shadow-md ring-2 ring-blue-400 ring-offset-2';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative w-full aspect-square flex items-center justify-center rounded-lg text-xs transition-all ${cellClass}`}
                      type="button"
                    >
                      {idx + 1}
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-600 border border-white" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Semantic Legend */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 grid grid-cols-2 gap-y-2 gap-x-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-emerald-600 inline-block" />
                  <span className="text-slate-600 dark:text-slate-400">Respondida ({respondidasCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-blue-600 inline-block" />
                  <span className="text-slate-600 dark:text-slate-400">Atual ({currentIndex + 1})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-amber-200 border border-amber-400 inline-block" />
                  <span className="text-slate-600 dark:text-slate-400">Revisar ({emRevisaoCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-slate-200 dark:bg-slate-700 inline-block" />
                  <span className="text-slate-600 dark:text-slate-400">Em branco ({emBrancoCount})</span>
                </div>
              </div>

              {/* Quick Keyboard Tip */}
              <div className="mt-4 bg-slate-50 dark:bg-slate-700/40 rounded-xl p-3 flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="leading-tight">
                  Use as teclas <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 rounded font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 text-[11px]">1</kbd> a <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 rounded font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 text-[11px]">5</kbd> para selecionar de A a E.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* 3. Persistent Sticky Bottom Action Toolbar */}
      <div className="sticky bottom-0 w-full z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between gap-3">
          {/* Left: Back Navigation */}
          <button
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-all shadow-xs disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Questão Anterior</span>
            <span className="sm:hidden">Anterior</span>
          </button>

          {/* Center: Scratchpad Toggle & Jump Help */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsScratchpadOpen(!isScratchpadOpen)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-600 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors shadow-xs"
            >
              <Edit3 className="w-4 h-4 text-amber-600" />
              <span className="hidden md:inline">Rascunho Virtual</span>
              <span className="md:hidden">Rascunho</span>
            </button>

            {/* Advance Button */}
            {currentIndex < totalQuestoes - 1 ? (
              <button
                onClick={() => setCurrentIndex((i) => Math.min(totalQuestoes - 1, i + 1))}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-md active:scale-95 transition-all"
              >
                <span>Próxima Questão</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-md active:scale-95 transition-all"
              >
                <span>Revisar e Finalizar</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right: Submission Hand-in Button */}
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 text-xs font-bold hover:bg-rose-600 hover:text-white transition-all shadow-xs active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="hidden sm:inline">Entregar Prova</span>
            <span className="sm:hidden">Entregar</span>
          </button>
        </div>
      </div>

      {/* 4. Safety Submission Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-3 text-rose-600">
              <AlertTriangle className="w-7 h-7" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                Finalizar Simulado?
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Você respondeu <strong className="text-slate-900 dark:text-slate-100">{respondidasCount} de {totalQuestoes} questões</strong> do caderno. Ainda restam{' '}
              <strong className="text-slate-900 dark:text-slate-100">{emBrancoCount} questões em branco</strong> e{' '}
              <strong className="text-amber-600">{emRevisaoCount} marcadas para revisão</strong>.
            </p>

            <div className="my-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Tempo de aplicação:</span>
                <span className="font-bold text-blue-600">{formatTime(tempoDecorrido)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Exame selecionado:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{exame.titulo}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                Continuar Respondendo
              </button>
              <button
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  onFinishExam(respostas, tempoDecorrido, marcadasRevisao);
                }}
                className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700 transition-all"
              >
                Confirmar Entrega
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
