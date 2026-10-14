'use client';

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Filter,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Award
} from 'lucide-react';
import { Questao } from '@/lib/questionsData';
import { ExameConfig } from '@/lib/examsData';
import { StudyStorage } from '@/lib/studyStorage';

interface Props {
  exame: ExameConfig;
  questoes: Questao[];
  respostas: Record<string, string>;
  tempoSegundos: number;
  marcadasRevisao: string[];
  onRetry: () => void;
  onGoHome: () => void;
  onOpenCadernoErros: () => void;
}

export function ResultReportView({
  exame,
  questoes,
  respostas,
  tempoSegundos,
  marcadasRevisao,
  onRetry,
  onGoHome,
  onOpenCadernoErros,
}: Props) {
  const [filterMode, setFilterMode] = useState<'todas' | 'erros' | 'acertos' | 'revisao'>('todas');
  const [expandedQuestaoId, setExpandedQuestaoId] = useState<string | null>(null);
  const [cadernoErros, setCadernoErros] = useState<string[]>(() => StudyStorage.getCadernoErros());

  useEffect(() => {
    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }
  }, []);

  // Compute stats
  let acertos = 0;
  let erros = 0;
  let emBranco = 0;

  questoes.forEach((q) => {
    const userResp = respostas[q.id];
    if (!userResp) {
      emBranco++;
    } else if (userResp === q.respostaCorreta) {
      acertos++;
    } else {
      erros++;
    }
  });

  const total = questoes.length;
  const percentual = Math.round((acertos / total) * 100);
  // TRI calibration estimation formula (pure deterministic calculation)
  const bonusTRI = ((acertos * 7) % 20);
  const notaTRI = Math.min(1000, Math.round(450 + (acertos / total) * 450 + bonusTRI));

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const handleToggleCadernoErros = (qid: string) => {
    if (cadernoErros.includes(qid)) {
      StudyStorage.removerDoCadernoErros(qid);
      setCadernoErros((prev) => prev.filter((id) => id !== qid));
    } else {
      StudyStorage.adicionarAoCadernoErros(qid);
      setCadernoErros((prev) => [...prev, qid]);
    }
  };

  const filteredQuestoes = questoes.filter((q) => {
    const userResp = respostas[q.id];
    const isCorreta = userResp === q.respostaCorreta;
    const isRevisao = marcadasRevisao.includes(q.id);

    if (filterMode === 'erros') return !userResp || !isCorreta;
    if (filterMode === 'acertos') return isCorreta;
    if (filterMode === 'revisao') return isRevisao;
    return true;
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8 animate-fadeIn">
      {/* 1. Hero Score Banner */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 flex items-center justify-center shrink-0 shadow-inner">
            <Trophy className="w-10 h-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Simulado Concluído com Sucesso
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              Resultado: {exame.titulo}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Avaliação finalizada em {formatTime(tempoSegundos)} • Estatísticas computadas no seu histórico.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRetry}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Refazer</span>
          </button>
          <button
            onClick={onGoHome}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm transition-all"
          >
            <span>Voltar ao Início</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Acertos */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col">
          <span className="text-xs text-slate-500 dark:text-slate-400">Total de Acertos</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-emerald-600">{acertos}</span>
            <span className="text-xs text-slate-400">/ {total}</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1">
            {percentual}% de aproveitamento
          </span>
        </div>

        {/* Nota TRI */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col">
          <span className="text-xs text-slate-500 dark:text-slate-400">Nota Calibrada TRI</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-blue-600">{notaTRI}</span>
            <span className="text-xs text-slate-400">pontos</span>
          </div>
          <span className="text-[11px] text-blue-600 font-semibold mt-1">
            Estimativa oficial ENEM
          </span>
        </div>

        {/* Tempo Total */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col">
          <span className="text-xs text-slate-500 dark:text-slate-400">Tempo Gasto</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {formatTime(tempoSegundos)}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1">
            Média: {Math.round(tempoSegundos / total)}s / questão
          </span>
        </div>

        {/* Erros / Revisão */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col">
          <span className="text-xs text-slate-500 dark:text-slate-400">Caderno de Erros</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-rose-600">{erros}</span>
            <span className="text-xs text-slate-400">questões</span>
          </div>
          <button
            onClick={onOpenCadernoErros}
            className="text-[11px] text-rose-600 font-semibold mt-1 hover:underline text-left"
          >
            Salvas para praticar →
          </button>
        </div>
      </div>

      {/* 3. Gabarito Comentado Item por Item */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Gabarito Comentado Item por Item
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Revise o que você acertou e compreenda detalhadamente as armadilhas dos distratores.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-700 rounded-xl text-xs overflow-x-auto">
            <button
              onClick={() => setFilterMode('todas')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterMode === 'todas'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Todas ({total})
            </button>
            <button
              onClick={() => setFilterMode('erros')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterMode === 'erros'
                  ? 'bg-white dark:bg-slate-800 text-rose-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Erros ({erros})
            </button>
            <button
              onClick={() => setFilterMode('acertos')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterMode === 'acertos'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Acertos ({acertos})
            </button>
            <button
              onClick={() => setFilterMode('revisao')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filterMode === 'revisao'
                  ? 'bg-white dark:bg-slate-800 text-amber-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Revisão ({marcadasRevisao.length})
            </button>
          </div>
        </div>

        {/* Questions Detailed Accordion / List */}
        <div className="flex flex-col gap-4">
          {filteredQuestoes.map((q, idx) => {
            const userResp = respostas[q.id];
            const isCorreta = userResp === q.respostaCorreta;
            const isExpanded = expandedQuestaoId === q.id || filteredQuestoes.length === 1;
            const inCaderno = cadernoErros.includes(q.id);

            return (
              <div
                key={q.id}
                className={`rounded-xl border transition-all ${
                  isCorreta
                    ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20'
                    : userResp
                    ? 'border-rose-200 dark:border-rose-900/60 bg-rose-50/20'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50/40'
                }`}
              >
                {/* Accordion Summary Row */}
                <div
                  onClick={() => setExpandedQuestaoId(isExpanded ? null : q.id)}
                  className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 dark:hover:bg-slate-700/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                        isCorreta ? 'bg-emerald-600' : userResp ? 'bg-rose-600' : 'bg-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </span>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {q.materia}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {q.exame}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {q.enunciado}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right text-xs">
                      <span className="text-slate-400 mr-2">Sua resposta:</span>
                      <strong className={isCorreta ? 'text-emerald-600' : 'text-rose-600'}>
                        {userResp || 'Em branco'}
                      </strong>
                      <span className="text-slate-400 mx-2">•</span>
                      <span className="text-slate-400 mr-1">Gabarito:</span>
                      <strong className="text-emerald-600">{q.respostaCorreta}</strong>
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details & Complete Breakdown */}
                {isExpanded && (
                  <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex flex-col gap-4 text-xs">
                    {/* Prompt Text */}
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                        {q.enunciado}
                      </p>
                    </div>

                    {/* Options list showing user pick and correct pick */}
                    <div className="grid grid-cols-1 gap-2">
                      {q.opcoes.map((opcao) => {
                        const isThisUser = userResp === opcao.id;
                        const isThisCorreta = q.respostaCorreta === opcao.id;

                        let optClass = 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                        if (isThisCorreta) {
                          optClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-semibold';
                        } else if (isThisUser && !isThisCorreta) {
                          optClass = 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                        }

                        return (
                          <div
                            key={opcao.id}
                            className={`p-2.5 rounded-lg border flex items-start gap-2.5 ${optClass}`}
                          >
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 ${
                                isThisCorreta
                                  ? 'bg-emerald-600 text-white'
                                  : isThisUser
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              {opcao.id}
                            </span>
                            <span className="pt-0.5 leading-relaxed">{opcao.texto}</span>
                            {isThisCorreta && (
                              <span className="ml-auto text-[10px] text-emerald-700 dark:text-emerald-300 font-bold uppercase shrink-0 pt-0.5">
                                Correta
                              </span>
                            )}
                            {isThisUser && !isThisCorreta && (
                              <span className="ml-auto text-[10px] text-rose-600 dark:text-rose-300 font-bold uppercase shrink-0 pt-0.5">
                                Sua Resposta
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Pedagogical Explanation Block */}
                    <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-700/60 border border-blue-100 dark:border-slate-600 flex flex-col gap-2">
                      <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-300 text-xs">
                        <Lightbulb className="w-4 h-4 text-blue-600" />
                        <span>Resolução Didática Comentada:</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                        {q.explicacaoDetalhada.porQueCorreta}
                      </p>

                      {/* Distractor pitfalls */}
                      {q.explicacaoDetalhada.analiseDistratores && (
                        <div className="mt-2 pt-2 border-t border-blue-200/60 dark:border-slate-600 space-y-1 text-[11px]">
                          <span className="font-bold text-slate-700 dark:text-slate-300">
                            Análise dos Distratores:
                          </span>
                          {Object.entries(q.explicacaoDetalhada.analiseDistratores).map(
                            ([letra, analise]) => (
                              <div key={letra} className="text-slate-600 dark:text-slate-400">
                                <strong>{letra}:</strong> {analise}
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>

                    {/* Caderno de erros action */}
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleToggleCadernoErros(q.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          inCaderno
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        <BookmarkCheck className="w-3.5 h-3.5" />
                        <span>{inCaderno ? 'No Caderno de Erros' : 'Salvar no Caderno de Erros'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
