'use client';

import React, { useState } from 'react';
import {
  Flame,
  Eye,
  Bell,
  Sun,
  Moon,
  Coffee,
  RotateCcw,
  BookOpen,
  User,
  CheckCircle2,
  X,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';
import { PerfilEstudante, PreferenciasVisuais, StudyStorage } from '@/lib/studyStorage';

interface Props {
  activeTab: 'inicio' | 'provas' | 'desempenho' | 'material';
  onSelectTab: (tab: 'inicio' | 'provas' | 'desempenho' | 'material') => void;
  perfil: PerfilEstudante;
  prefs: PreferenciasVisuais;
  onChangePrefs: (newPrefs: PreferenciasVisuais) => void;
  onResetProgress: () => void;
  onUpdatePerfil: (perfil: PerfilEstudante) => void;
}

export function AppHeader({
  activeTab,
  onSelectTab,
  perfil,
  prefs,
  onChangePrefs,
  onResetProgress,
  onUpdatePerfil,
}: Props) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  // Edit profile state
  const [editNome, setEditNome] = useState(perfil.nome);
  const [editMeta, setEditMeta] = useState(perfil.meta);

  const notificationsList = [
    {
      id: 1,
      titulo: 'Maratona Nacional ao Vivo',
      desc: 'Simulado geral de Matemática e Redação neste domingo às 13h.',
      tempo: 'Há 2 horas',
      novo: true,
    },
    {
      id: 2,
      titulo: 'Meta Semanal Concluída!',
      desc: 'Você atingiu 100% da meta semanal de exercícios do ENEM.',
      tempo: 'Ontem',
      novo: false,
    },
    {
      id: 3,
      titulo: 'Novo Simulado Adicionado',
      desc: 'Edição comentada Fuvest 2025 - 1ª Fase disponível no catálogo.',
      tempo: 'Há 3 dias',
      novo: false,
    },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...perfil,
      nome: editNome.trim() || 'Estudante',
      meta: editMeta.trim() || 'Vestibulando 2025',
    };
    onUpdatePerfil(updated);
    setShowProfileModal(false);
  };

  const cycleTheme = () => {
    const sequence: Array<'normal' | 'conforto' | 'sepia' | 'dark'> = ['conforto', 'sepia', 'dark', 'normal'];
    const nextIdx = (sequence.indexOf(prefs.tema) + 1) % sequence.length;
    onChangePrefs({
      ...prefs,
      tema: sequence[nextIdx],
    });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#F8F9FF]/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="h-20 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => onSelectTab('inicio')}
            className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg group text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-blue-700 dark:text-blue-400 tracking-tight leading-tight">
                SimulaBrasil
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                100% Gratuito & Aberto
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => onSelectTab('inicio')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'inicio'
                  ? 'bg-blue-100/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900'
              }`}
            >
              Início
            </button>
            <button
              onClick={() => onSelectTab('provas')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'provas'
                  ? 'bg-blue-100/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900'
              }`}
            >
              Provas & Simulados
            </button>
            <button
              onClick={() => onSelectTab('desempenho')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'desempenho'
                  ? 'bg-blue-100/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900'
              }`}
            >
              Desempenho
            </button>
            <button
              onClick={() => onSelectTab('material')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'material'
                  ? 'bg-blue-100/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900'
              }`}
            >
              Material de Apoio
            </button>
          </nav>
        </div>

        {/* Right: Streak, Theme, Notifications & Student Info */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Streak Badge */}
          <button
            onClick={() => setShowStreakModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-full hover:bg-amber-100 transition-all cursor-pointer group"
            title="Sua ofensiva de estudos"
          >
            <Flame className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-amber-900 dark:text-amber-300 font-bold">
              {perfil.diasSeguidos} Dias Seguidos
            </span>
          </button>

          {/* Theme Quick Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
              title="Ajustar conforto visual e tema"
            >
              {prefs.tema === 'dark' ? (
                <Moon className="w-5 h-5 text-indigo-400" />
              ) : prefs.tema === 'sepia' ? (
                <Coffee className="w-5 h-5 text-amber-700" />
              ) : prefs.tema === 'conforto' ? (
                <Eye className="w-5 h-5 text-emerald-600" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500" />
              )}
            </button>

            {/* Theme dropdown */}
            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50 text-xs">
                <div className="px-3 py-1.5 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">
                  Modo de Leitura / Tela
                </div>
                <button
                  onClick={() => {
                    onChangePrefs({ ...prefs, tema: 'conforto' });
                    setShowThemeMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 ${
                    prefs.tema === 'conforto' ? 'text-blue-600 font-bold' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Eye className="w-4 h-4 text-emerald-600" />
                  <span>Conforto Visual (Padrão)</span>
                </button>
                <button
                  onClick={() => {
                    onChangePrefs({ ...prefs, tema: 'sepia' });
                    setShowThemeMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 ${
                    prefs.tema === 'sepia' ? 'text-amber-700 font-bold' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Coffee className="w-4 h-4 text-amber-700" />
                  <span>Modo Sépia Suave</span>
                </button>
                <button
                  onClick={() => {
                    onChangePrefs({ ...prefs, tema: 'dark' });
                    setShowThemeMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 ${
                    prefs.tema === 'dark' ? 'text-blue-400 font-bold' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Moon className="w-4 h-4 text-indigo-400" />
                  <span>Modo Noturno Fosco</span>
                </button>
                <button
                  onClick={() => {
                    onChangePrefs({ ...prefs, tema: 'normal' });
                    setShowThemeMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 ${
                    prefs.tema === 'normal' ? 'text-blue-600 font-bold' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Branco Padrão</span>
                </button>
              </div>
            )}
          </div>

          {/* Notifications button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              title="Notificações"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            </button>

            {/* Notification popup */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Notificações</span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700 mt-2 max-h-72 overflow-y-auto">
                  {notificationsList.map((n) => (
                    <div key={n.id} className="py-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{n.titulo}</span>
                        {n.novo && (
                          <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold">
                            Novo
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{n.desc}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.tempo}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Student Profile Pill */}
          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-2 pl-1 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors focus:outline-none"
            title="Configurações do Estudante & Reset"
          >
            <img
              src={perfil.fotoUrl}
              alt={perfil.nome}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-200 dark:ring-blue-700"
            />
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs text-slate-800 dark:text-slate-200 leading-tight font-semibold">
                {perfil.nome}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                {perfil.meta}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Streak modal */}
      {showStreakModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200 dark:border-slate-700">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
              <Flame className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 dark:text-slate-100">
              {perfil.diasSeguidos} Dias Seguidos!
            </h3>
            <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-1">
              Você está mantendo sua regularidade de estudos ativa todos os dias. O segredo da aprovação no ENEM e vestibulares é a constância!
            </p>
            <div className="grid grid-cols-7 gap-1 mt-4 p-2 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((dia, idx) => (
                <div key={dia} className="flex flex-col items-center">
                  <span className="text-[10px] text-slate-400">{dia}</span>
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-[11px] mt-1 shadow-sm">
                    ✓
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowStreakModal(false)}
              className="w-full mt-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Continuar Estudando
            </button>
          </div>
        </div>
      )}

      {/* Profile & Reset Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">Perfil do Estudante</h3>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Seu Nome ou Apelido
                </label>
                <input
                  type="text"
                  value={editNome}
                  onChange={(e) => setEditNome(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Seu Objetivo / Prova de Foco
                </label>
                <input
                  type="text"
                  value={editMeta}
                  onChange={(e) => setEditMeta(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Ex: ENEM 2025, SAEB 9º Ano, Fuvest Medicina..."
                />
              </div>

              <div className="p-3 bg-blue-50 dark:bg-slate-700/60 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-900 dark:text-blue-300">
                    {perfil.nivelLabel}
                  </span>
                  <p className="text-[11px] text-blue-700 dark:text-blue-400">
                    {perfil.xpAtual} / {perfil.xpProximo} XP acumulados
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-600">{perfil.diasSeguidos} dias</span>
                  <p className="text-[10px] text-slate-500">Ofensiva ativa</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(true)}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Resetar meu progresso local
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(false)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-rose-200 dark:border-rose-900">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              Resetar meu progresso local?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Isso limpará todas as respostas marcadas, simulados salvos e estatísticas salvas no seu navegador (`localStorage`). Essa ação não pode ser desfeita.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setShowResetConfirm(false);
                  setShowProfileModal(false);
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-sm"
              >
                Sim, Limpar Tudo
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
