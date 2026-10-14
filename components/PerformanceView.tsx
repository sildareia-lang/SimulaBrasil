'use client';

import React from 'react';
import {
  TrendingUp,
  Award,
  Calendar,
  Clock,
  RotateCcw,
  CheckCircle2,
  BookmarkCheck,
  Target,
  BarChart2,
  Sparkles
} from 'lucide-react';
import { SimuladoFinalizado, PerfilEstudante } from '@/lib/studyStorage';

interface Props {
  historico: SimuladoFinalizado[];
  perfil: PerfilEstudante;
  onResetProgress: () => void;
  onOpenCadernoErros: () => void;
}

export function PerformanceView({
  historico,
  perfil,
  onResetProgress,
  onOpenCadernoErros,
}: Props) {
  const totalSimulados = historico.length;
  const mediaAcerto =
    totalSimulados > 0
      ? Math.round(
          historico.reduce((acc, h) => acc + h.percentualAcerto, 0) / totalSimulados
        )
      : 78;

  const melhorNota =
    totalSimulados > 0
      ? Math.max(...historico.map((h) => h.notaCalibradaTRI || 700))
      : 845;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 flex flex-col gap-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
            Painel de Diagnóstico & Evolução
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            Seu Desempenho e Calibragem TRI
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Todas as métricas são processadas no seu navegador e salvas localmente para sua total privacidade.
          </p>
        </div>

        <button
          onClick={onResetProgress}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 hover:bg-rose-100 transition-colors shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Resetar meu progresso local</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500">Média Geral de Acertos</span>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
              {mediaAcerto}%
            </div>
            <span className="text-xs text-emerald-600 font-semibold">Excelente consistência</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500">Pico Calibrado TRI</span>
            <div className="text-3xl font-extrabold text-blue-600 mt-1">
              {melhorNota}
            </div>
            <span className="text-xs text-blue-600 font-semibold">Competitivo para Medicina/Eng.</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500">Histórico de Simulados</span>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
              {totalSimulados}
            </div>
            <span className="text-xs text-slate-400">Provas concluídas</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <BarChart2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* History Table */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Histórico Recente de Simulados Realizados
        </h2>

        {historico.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">
            Nenhum simulado finalizado ainda. Realize seu primeiro teste para ver o histórico aqui!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-300">
                <tr>
                  <th className="py-3 px-4 font-semibold">Simulado / Exame</th>
                  <th className="py-3 px-4 font-semibold">Data</th>
                  <th className="py-3 px-4 font-semibold">Acertos</th>
                  <th className="py-3 px-4 font-semibold">Aproveitamento</th>
                  <th className="py-3 px-4 font-semibold">Nota TRI Estimada</th>
                  <th className="py-3 px-4 font-semibold">Tempo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {historico.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                      {h.exameTitulo}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {new Date(h.dataIso).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">
                      {h.acertos} / {h.totalQuestoes}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">
                      {h.percentualAcerto}%
                    </td>
                    <td className="py-3 px-4 font-bold text-blue-600">
                      {h.notaCalibradaTRI}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {Math.floor(h.tempoSegundos / 60)} min
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
