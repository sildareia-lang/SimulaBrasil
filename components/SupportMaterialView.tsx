'use client';

import React, { useState } from 'react';
import { BookOpen, FileText, CheckCircle2, Award, Lightbulb, Compass, Orbit } from 'lucide-react';

export function SupportMaterialView() {
  const [activeSection, setActiveSection] = useState<'redacao' | 'formulas' | 'saeb' | 'oba'>('redacao');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-2">
        <span className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
          Material de Apoio e Consulta Rápida
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Guias Pedagógicos & Fórmulas Essenciais
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
          Resumos teóricos, descritores oficiais do Inep/SAEB e sínteses conceituais para acelerar seus estudos.
        </p>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveSection('redacao')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeSection === 'redacao'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            Redação ENEM Nota 1000
          </button>
          <button
            onClick={() => setActiveSection('formulas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeSection === 'formulas'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            Formulário de Matemática & Física
          </button>
          <button
            onClick={() => setActiveSection('saeb')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeSection === 'saeb'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            Descritores SAEB (MEC / Inep)
          </button>
          <button
            onClick={() => setActiveSection('oba')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeSection === 'oba'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            Guia Olímpico OBA
          </button>
        </div>
      </div>

      {/* Content Cards */}
      {activeSection === 'redacao' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              As 5 Competências Avaliativas do ENEM
            </h3>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 mt-1">
              <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                <strong>Competência 1 (200 pts):</strong> Domínio da norma padrão da língua escrita.
              </li>
              <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                <strong>Competência 2 (200 pts):</strong> Compreender a proposta e aplicar conceitos das várias áreas do conhecimento.
              </li>
              <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                <strong>Competência 3 (200 pts):</strong> Selecionar, relacionar, organizar e interpretar informações e argumentos.
              </li>
              <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                <strong>Competência 4 (200 pts):</strong> Mecanismos linguísticos necessários para a construção da argumentação (conectivos interparágrafos).
              </li>
              <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                <strong>Competência 5 (200 pts):</strong> Proposta de intervenção completa com os 5 elementos (Agente, Ação, Meio/Modo, Efeito e Detalhamento).
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Fórmula dos 5 Elementos da Intervenção
            </h3>
            <p className="text-xs text-slate-500">
              Para garantir os 200 pontos na Competência 5, o parágrafo conclusivo deve conter obrigatoriamente:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-blue-50 dark:bg-slate-700 rounded-lg">
                <span className="font-bold text-blue-700 dark:text-blue-300">1. Agente:</span> Quem executará a ação (ex: Ministério da Educação, secretarias municipais).
              </div>
              <div className="p-2 bg-emerald-50 dark:bg-slate-700 rounded-lg">
                <span className="font-bold text-emerald-700 dark:text-emerald-300">2. Ação:</span> O que será feito (ex: criação de oficinas extracurriculares).
              </div>
              <div className="p-2 bg-amber-50 dark:bg-slate-700 rounded-lg">
                <span className="font-bold text-amber-700 dark:text-amber-300">3. Meio/Modo:</span> Por meio de quais recursos/ferramentas.
              </div>
              <div className="p-2 bg-purple-50 dark:bg-slate-700 rounded-lg">
                <span className="font-bold text-purple-700 dark:text-purple-300">4. Efeito:</span> Qual o objetivo social a ser alcançado.
              </div>
              <div className="p-2 bg-rose-50 dark:bg-slate-700 rounded-lg">
                <span className="font-bold text-rose-700 dark:text-rose-300">5. Detalhamento:</span> Explicação adicional sobre um dos elementos anteriores.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'formulas' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-2">Termodinâmica</h4>
            <div className="space-y-2 text-slate-600 dark:text-slate-300">
              <p>• 1ª Lei: ΔU = Q - W</p>
              <p>• Trabalho a pressão constante: W = P · ΔV</p>
              <p>• Rendimento Geral: η = W / Q_quente</p>
              <p className="font-bold text-blue-600 dark:text-blue-400">• Rendimento de Carnot: η_máx = 1 - (T_fria / T_quente)</p>
              <p className="text-[10px] text-slate-400">Obs: Temperaturas sempre em Kelvin (K = °C + 273)</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-2">Geometria Espacial</h4>
            <div className="space-y-2 text-slate-600 dark:text-slate-300">
              <p>• Volume Cilindro: V = π · r² · h</p>
              <p>• Volume Cone: V = (1/3) · π · r² · h</p>
              <p>• Volume Esfera: V = (4/3) · π · r³</p>
              <p>• Volume Prisma / Paralelepípedo: V = A_base · h</p>
              <p className="font-bold text-emerald-600 dark:text-emerald-400">• Conversão: 1 m³ = 1.000 Litros</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-2">Mecânica & Gravitação</h4>
            <div className="space-y-2 text-slate-600 dark:text-slate-300">
              <p>• 2ª Lei de Newton: F = m · a</p>
              <p>• Energia Cinética: Ec = (m · v²) / 2</p>
              <p>• Gravitação de Newton: F = G · (M · m) / d²</p>
              <p className="font-bold text-purple-600 dark:text-purple-400">• 3ª Lei de Kepler: T² / a³ = k</p>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'saeb' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-4 text-xs">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Descritores Mais Cobrados no SAEB (Ensino Fundamental e Médio)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl space-y-2">
              <span className="font-bold text-blue-700 dark:text-blue-300 block">Língua Portuguesa</span>
              <p>• <strong>D1:</strong> Localizar informações explícitas em um texto.</p>
              <p>• <strong>D3:</strong> Inferir o sentido de uma palavra ou expressão.</p>
              <p>• <strong>D4:</strong> Inferir uma informação implícita em um texto.</p>
              <p>• <strong>D14:</strong> Distinguir um fato da opinião relativa a esse fato.</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl space-y-2">
              <span className="font-bold text-emerald-700 dark:text-emerald-300">Matemática</span>
              <p>• <strong>D10:</strong> Utilizar relações métricas do triângulo retângulo (Pitágoras).</p>
              <p>• <strong>D12:</strong> Resolver problema envolvendo o cálculo de perímetro de figuras planas.</p>
              <p>• <strong>D20:</strong> Resolver problema com modelo de função exponencial/quadrática.</p>
              <p>• <strong>D28:</strong> Ler e interpretar informações e dados em gráficos e tabelas.</p>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'oba' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-4 text-xs">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Orbit className="w-5 h-5 text-indigo-600" />
            Guia Olímpico OBA (Olimpíada Brasileira de Astronomia)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-amber-50 dark:bg-slate-700 rounded-xl">
              <span className="font-bold text-amber-900 dark:text-amber-300">Eclipses & Fases da Lua</span>
              <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                • <strong>Eclipse Solar:</strong> Lua Nova entre Sol e Terra (Sol - Lua - Terra).
                <br />
                • <strong>Eclipse Lunar:</strong> Terra entre Sol e Lua Cheia (Sol - Terra - Lua).
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-slate-700 rounded-xl">
              <span className="font-bold text-blue-900 dark:text-blue-300">Leis de Kepler</span>
              <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                • 1ª Lei: Órbitas elípticas com Sol em um dos focos.
                <br />
                • 2ª Lei: Velocidade maior no periélio (perto do Sol).
                <br />
                • 3ª Lei: Planetas mais distantes têm anos mais longos (T² = a³).
              </p>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-slate-700 rounded-xl">
              <span className="font-bold text-emerald-900 dark:text-emerald-300">Astronáutica Básica</span>
              <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                • Foguetes de garrafa PET (reação química vinagre + bicarbonato de sódio).
                <br />
                • 3ª Lei de Newton: Ação e Reação nos motores de foguete.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
