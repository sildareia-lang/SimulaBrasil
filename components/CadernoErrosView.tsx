'use client';

import React, { useState } from 'react';
import { BookmarkCheck, ArrowLeft, CheckCircle2, XCircle, RotateCcw, Lightbulb, Trash2 } from 'lucide-react';
import { Questao, QUESTOES_MOCK } from '@/lib/questionsData';
import { StudyStorage } from '@/lib/studyStorage';

interface Props {
  onBack: () => void;
  onRefreshStats: () => void;
}

export function CadernoErrosView({ onBack, onRefreshStats }: Props) {
  const [cadernoIds, setCadernoIds] = useState<string[]>(() => StudyStorage.getCadernoErros());
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const questoesNoCaderno = QUESTOES_MOCK.filter((q) => cadernoIds.includes(q.id));

  const handleSelect = (qid: string, letra: 'A' | 'B' | 'C' | 'D' | 'E') => {
    setUserAnswers((prev) => ({ ...prev, [qid]: letra }));
    setRevealed((prev) => ({ ...prev, [qid]: true }));
  };

  const handleRemover = (qid: string) => {
    StudyStorage.removerDoCadernoErros(qid);
    setCadernoIds((prev) => prev.filter((id) => id !== qid));
    onRefreshStats();
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6 animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Painel</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-3.5 py-1.5 rounded-full border border-rose-200 dark:border-rose-900">
          <BookmarkCheck className="w-4 h-4" />
          <span>{questoesNoCaderno.length} questões para refazer</span>
        </div>
      </div>

      {/* Header Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Caderno de Erros Ativo
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          O método mais eficiente para subir sua nota TRI no ENEM e vestibulares é entender a causa exata dos seus erros passados. Resolva novamente com calma e analise a resolução.
        </p>
      </div>

      {/* List */}
      {questoesNoCaderno.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 p-12 rounded-2xl border border-slate-200 dark:border-slate-700 text-center flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">
            Parabéns! Seu Caderno de Erros está zerado.
          </h3>
          <p className="text-xs text-slate-500 max-w-sm">
            Você não possui questões erradas pendentes. Continue praticando novos simulados para desafiar seus conhecimentos.
          </p>
          <button
            onClick={onBack}
            className="mt-2 px-5 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs"
          >
            Escolher Novo Simulado
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {questoesNoCaderno.map((q, idx) => {
            const userPick = userAnswers[q.id];
            const isRevealed = revealed[q.id];
            const isCorreta = userPick === q.respostaCorreta;

            return (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-4 text-xs"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{q.materia}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-[10px] text-slate-500">
                      {q.exame}
                    </span>
                  </div>

                  <button
                    onClick={() => handleRemover(q.id)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-600 transition-colors"
                    title="Remover do caderno de erros"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Já dominei este conceito</span>
                  </button>
                </div>

                <p className="font-semibold text-slate-800 dark:text-slate-200 leading-relaxed text-sm">
                  {q.enunciado}
                </p>

                {/* Options */}
                <div className="flex flex-col gap-2">
                  {q.opcoes.map((opcao) => {
                    const isSelected = userPick === opcao.id;
                    const showCorrect = isRevealed && opcao.id === q.respostaCorreta;
                    const showWrong = isRevealed && isSelected && !isCorreta;

                    let optClass = 'border-slate-200 dark:border-slate-700 hover:border-blue-400';
                    if (showCorrect) {
                      optClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 font-semibold';
                    } else if (showWrong) {
                      optClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-950 font-semibold';
                    } else if (isSelected) {
                      optClass = 'border-blue-600 bg-blue-50 dark:bg-blue-950/40';
                    }

                    return (
                      <button
                        key={opcao.id}
                        onClick={() => handleSelect(q.id, opcao.id)}
                        className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${optClass}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            showCorrect
                              ? 'bg-emerald-600 text-white'
                              : showWrong
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-700'
                          }`}
                        >
                          {opcao.id}
                        </span>
                        <span className="pt-0.5 leading-relaxed text-slate-800 dark:text-slate-200">
                          {opcao.texto}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Revealed Feedback */}
                {isRevealed && (
                  <div className="mt-2 p-4 rounded-xl bg-blue-50/70 dark:bg-slate-700/60 border border-blue-100 dark:border-slate-600 flex flex-col gap-2 animate-fadeIn">
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      {isCorreta ? (
                        <span className="text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Acertou desta vez!
                        </span>
                      ) : (
                        <span className="text-rose-700 dark:text-rose-300 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Gabarito correto: {q.respostaCorreta}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {q.explicacaoDetalhada.porQueCorreta}
                    </p>
                    {isCorreta && (
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => handleRemover(q.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                        >
                          Remover do Caderno de Erros
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
