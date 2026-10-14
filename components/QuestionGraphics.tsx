'use client';

import React from 'react';
import { BarChart3, Orbit, Compass, Flame, TrendingUp } from 'lucide-react';

interface Props {
  tipo: 'demografia' | 'astronomia_eclipses' | 'geometria_rampa' | 'termodinamica' | 'oba_kepler' | 'cadeia_trofica';
}

export function QuestionGraphics({ tipo }: Props) {
  if (tipo === 'demografia') {
    return (
      <div className="bg-blue-50/50 dark:bg-slate-800/60 rounded-xl p-4 border border-blue-100 dark:border-slate-700/60 flex flex-col gap-2 my-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Brasil: Transição Demográfica Urbana vs. Rural (1950 – 2010)
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Fonte: IBGE / Censos Demográficos</span>
        </div>

        {/* High quality clean data chart */}
        <div className="w-full h-44 py-1 flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 540 140">
            <defs>
              <linearGradient id="urbanGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines */}
            <line stroke="#E2E8F0" strokeDasharray="3 3" x1="40" x2="520" y1="20" y2="20" />
            <line stroke="#E2E8F0" strokeDasharray="3 3" x1="40" x2="520" y1="65" y2="65" />
            <line stroke="#E2E8F0" strokeDasharray="3 3" x1="40" x2="520" y1="110" y2="110" />

            {/* Y Axis Labels */}
            <text className="text-[10px] font-sans" fill="#737686" textAnchor="end" x="32" y="24">85%</text>
            <text className="text-[10px] font-sans" fill="#737686" textAnchor="end" x="32" y="69">50%</text>
            <text className="text-[10px] font-sans" fill="#737686" textAnchor="end" x="32" y="114">15%</text>

            {/* Urban Growth Area & Line */}
            <polygon fill="url(#urbanGrad)" points="50,105 140,88 235,62 330,38 425,27 510,22 510,120 50,120" />
            <path d="M50 105 Q 140 88, 235 62 T 425 27 T 510 22" fill="none" stroke="#2563EB" strokeLinecap="round" strokeWidth="2.5" />

            {/* Rural Decline Line */}
            <path d="M50 35 Q 140 52, 235 78 T 425 113 T 510 118" fill="none" stroke="#D97706" strokeDasharray="4 3" strokeLinecap="round" strokeWidth="2" />

            {/* Interactive Nodes */}
            <circle cx="50" cy="105" fill="#FFFFFF" r="4" stroke="#2563EB" strokeWidth="2" />
            <circle cx="235" cy="62" fill="#FFFFFF" r="4" stroke="#2563EB" strokeWidth="2" />
            <circle cx="510" cy="22" fill="#2563EB" r="4" />

            <circle cx="50" cy="35" fill="#FFFFFF" r="3.5" stroke="#D97706" strokeWidth="1.5" />
            <circle cx="510" cy="118" fill="#D97706" r="3.5" />

            {/* Decade Labels */}
            <text className="text-[10px] font-sans" fill="#737686" textAnchor="middle" x="50" y="134">1950</text>
            <text className="text-[10px] font-sans" fill="#737686" textAnchor="middle" x="140" y="134">1960</text>
            <text className="text-[10px] font-sans" fill="#737686" textAnchor="middle" x="235" y="134">1975</text>
            <text className="text-[10px] font-sans" fill="#737686" textAnchor="middle" x="330" y="134">1990</text>
            <text className="text-[10px] font-sans" fill="#737686" textAnchor="middle" x="425" y="134">2000</text>
            <text className="text-[10px] font-sans" fill="#737686" textAnchor="middle" x="510" y="134">2010</text>
          </svg>
        </div>

        <div className="flex items-center justify-center gap-6 pt-1 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
            <span className="w-3.5 h-1 bg-blue-600 inline-block rounded-full" />
            População Urbana (%)
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
            <span className="w-3.5 h-1 bg-amber-600 inline-block rounded-full border-t border-dashed" />
            População Rural (%)
          </div>
        </div>
      </div>
    );
  }

  if (tipo === 'astronomia_eclipses') {
    return (
      <div className="bg-indigo-50/50 dark:bg-slate-800/60 rounded-xl p-4 border border-indigo-100 dark:border-slate-700/60 flex flex-col gap-2 my-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Orbit className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Geometria Celeste: Alinhamento Sol, Lua e Terra
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Esquema Didático OBA</span>
        </div>

        <div className="w-full h-40 py-2 flex items-center justify-center">
          <svg className="w-full h-full max-w-lg" viewBox="0 0 500 130">
            {/* Raio Solar Cone de Luz */}
            <polygon fill="#FEF3C7" fillOpacity="0.4" points="70,65 260,40 430,25 430,105 260,90" />
            
            {/* Sol */}
            <circle cx="50" cy="65" r="34" fill="#F59E0B" />
            <circle cx="50" cy="65" r="42" fill="#FBBF24" fillOpacity="0.3" />
            <text x="50" y="70" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">SOL</text>

            {/* Linha orbital da Lua ao redor da Terra */}
            <ellipse cx="400" cy="65" rx="55" ry="35" fill="none" stroke="#94A3B8" strokeDasharray="3 3" />

            {/* Cone de sombra da Lua projetando na Terra */}
            <polygon fill="#334155" fillOpacity="0.35" points="260,65 400,56 400,74" />

            {/* Lua no Eclipse Solar (Posição Nova entre Sol e Terra) */}
            <circle cx="260" cy="65" r="12" fill="#475569" stroke="#E2E8F0" strokeWidth="1" />
            <text x="260" y="93" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="600">LUA (Nova)</text>

            {/* Terra */}
            <circle cx="400" cy="65" r="24" fill="#2563EB" />
            <circle cx="400" cy="65" r="24" fill="#10B981" fillOpacity="0.4" />
            <text x="400" y="69" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">TERRA</text>

            {/* Setas de raios */}
            <path d="M 95 65 L 235 65" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 2" />
          </svg>
        </div>

        <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
          No Eclipse Solar, a Lua Nova interpõe-se diretamente na trajetória dos raios solares, projetando a umbra sobre uma faixa da superfície terrestre.
        </p>
      </div>
    );
  }

  if (tipo === 'geometria_rampa') {
    return (
      <div className="bg-emerald-50/50 dark:bg-slate-800/60 rounded-xl p-4 border border-emerald-100 dark:border-slate-700/60 flex flex-col gap-2 my-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Esquema Métrico da Rampa de Acessibilidade
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Modelo de Triângulo Retângulo</span>
        </div>

        <div className="w-full h-36 flex items-center justify-center">
          <svg className="w-full max-w-sm h-full" viewBox="0 0 340 120">
            {/* Solo */}
            <line x1="20" y1="100" x2="310" y2="100" stroke="#64748B" strokeWidth="2" />
            
            {/* Triângulo rampa */}
            <polygon points="60,100 260,100 260,30" fill="#E2E8F0" fillOpacity="0.4" stroke="#059669" strokeWidth="2.5" />
            
            {/* Ângulo reto */}
            <rect x="245" y="85" width="15" height="15" fill="none" stroke="#64748B" strokeWidth="1.5" />
            <circle cx="252" cy="92" r="1.5" fill="#64748B" />

            {/* Dimensão vertical */}
            <text x="275" y="70" fill="#047857" fontSize="12" fontWeight="bold">h = 1,2 m</text>
            
            {/* Dimensão horizontal */}
            <text x="140" y="115" fill="#047857" fontSize="12" fontWeight="bold">b = 1,6 m</text>
            
            {/* Hipotenusa (rampa) */}
            <text x="130" y="55" fill="#2563EB" fontSize="13" fontWeight="bold">Rampa (c) = ?</text>
          </svg>
        </div>
      </div>
    );
  }

  if (tipo === 'termodinamica') {
    return (
      <div className="bg-amber-50/50 dark:bg-slate-800/60 rounded-xl p-4 border border-amber-100 dark:border-slate-700/60 flex flex-col gap-2 my-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Esquema Térmico: Motor Térmico Operando entre Fontes
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Ciclo Ideal de Carnot</span>
        </div>

        <div className="w-full h-36 flex items-center justify-center">
          <svg className="w-full max-w-md h-full" viewBox="0 0 380 120">
            {/* Fonte Quente */}
            <rect x="30" y="10" width="120" height="34" rx="8" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
            <text x="90" y="31" textAnchor="middle" fill="#991B1B" fontSize="11" fontWeight="bold">Fonte Quente: 600 K</text>

            {/* Máquina Térmica Central */}
            <circle cx="190" cy="60" r="26" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
            <text x="190" y="58" textAnchor="middle" fill="#1E40AF" fontSize="10" fontWeight="bold">MOTOR</text>
            <text x="190" y="70" textAnchor="middle" fill="#1E40AF" fontSize="9">TÉRMICO</text>

            {/* Trabalho Realizado W */}
            <path d="M 216 60 L 290 60" stroke="#059669" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="325" y="64" textAnchor="middle" fill="#065F46" fontSize="11" fontWeight="bold">Trabalho (W)</text>

            {/* Fluxos de calor */}
            <path d="M 90 44 L 90 60 L 164 60" stroke="#DC2626" strokeWidth="2" fill="none" />
            <path d="M 190 86 L 190 100 L 120 100" stroke="#2563EB" strokeWidth="2" fill="none" />

            {/* Fonte Fria */}
            <rect x="30" y="80" width="120" height="34" rx="8" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
            <text x="90" y="101" textAnchor="middle" fill="#075985" fontSize="11" fontWeight="bold">Fonte Fria: 300 K</text>
          </svg>
        </div>
      </div>
    );
  }

  if (tipo === 'cadeia_trofica') {
    return (
      <div className="bg-teal-50/50 dark:bg-slate-800/60 rounded-xl p-4 border border-teal-100 dark:border-slate-700/60 flex flex-col gap-2 my-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            Pirâmide de Magnificação Trófica de Metais Pesados
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Concentração / Nível Trófico</span>
        </div>

        <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs">
          <div className="p-2.5 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="font-bold text-slate-700 dark:text-slate-200">1. Fitoplâncton</div>
            <div className="text-[11px] text-slate-500">Produtores</div>
            <div className="mt-2 text-xs font-semibold text-emerald-600">0.02 ppm</div>
          </div>
          <div className="p-2.5 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="font-bold text-slate-700 dark:text-slate-200">2. Zooplâncton</div>
            <div className="text-[11px] text-slate-500">Consumidor 1º</div>
            <div className="mt-2 text-xs font-semibold text-emerald-600">0.15 ppm</div>
          </div>
          <div className="p-2.5 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="font-bold text-slate-700 dark:text-slate-200">3. Peixes Menores</div>
            <div className="text-[11px] text-slate-500">Consumidor 2º</div>
            <div className="mt-2 text-xs font-semibold text-amber-600">2.80 ppm</div>
          </div>
          <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-lg border border-rose-300 dark:border-rose-800">
            <div className="font-bold text-rose-800 dark:text-rose-300">4. Predador de Topo</div>
            <div className="text-[11px] text-rose-600 dark:text-rose-400">Aves & Grandes Peixes</div>
            <div className="mt-2 text-xs font-bold text-rose-700 dark:text-rose-300">▲ 64.0 ppm (Máximo)</div>
          </div>
        </div>
      </div>
    );
  }

  // Kepler
  return (
    <div className="bg-purple-50/50 dark:bg-slate-800/60 rounded-xl p-4 border border-purple-100 dark:border-slate-700/60 flex flex-col gap-2 my-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Orbit className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          Terceira Lei de Kepler: Comparação de Semieixos e Períodos
        </span>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">T² / a³ = k</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-2 text-xs">
        <div className="p-3 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 flex flex-col items-center">
          <span className="font-bold text-blue-600">Planeta Terra</span>
          <span className="text-slate-500">Distância média: a = 1 UA</span>
          <span className="text-slate-500">Período de translação: T = 1 ano</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200 mt-1">1² / 1³ = 1</span>
        </div>
        <div className="text-slate-400 font-bold text-lg">vs</div>
        <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-300 dark:border-purple-700 flex flex-col items-center">
          <span className="font-bold text-purple-700 dark:text-purple-300">Exoplaneta Rochoso</span>
          <span className="text-slate-600 dark:text-slate-300">Distância média: a = 4 UA</span>
          <span className="font-semibold text-purple-700 dark:text-purple-300 mt-1">T² = 4³ = 64 ⇒ T = 8 anos</span>
        </div>
      </div>
    </div>
  );
}
