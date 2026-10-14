'use client';

import React, { useState, useEffect } from 'react';
import { AppHeader } from '@/components/AppHeader';
import { DashboardView } from '@/components/DashboardView';
import { ExamArenaView } from '@/components/ExamArenaView';
import { ResultReportView } from '@/components/ResultReportView';
import { CatalogView } from '@/components/CatalogView';
import { PerformanceView } from '@/components/PerformanceView';
import { SupportMaterialView } from '@/components/SupportMaterialView';
import { CadernoErrosView } from '@/components/CadernoErrosView';
import { AppFooter } from '@/components/AppFooter';
import {
  StudyStorage,
  PerfilEstudante,
  PreferenciasVisuais,
  MetaDiaria,
  SimuladoFinalizado,
  DEFAULT_PERFIL,
  DEFAULT_PREFS,
} from '@/lib/studyStorage';
import { EXAMES_CATALOGO, ExameConfig } from '@/lib/examsData';
import { QUESTOES_MOCK, Questao, getQuestoesParaExame } from '@/lib/questionsData';

export default function Home() {
  // Navigation states
  const [activeTab, setActiveTab] = useState<'inicio' | 'provas' | 'desempenho' | 'material'>('inicio');
  const [subView, setSubView] = useState<'normal' | 'exam_arena' | 'result_report' | 'caderno_erros'>('normal');

  // Study states
  const [perfil, setPerfil] = useState<PerfilEstudante>(() => StudyStorage.getPerfil());
  const [prefs, setPrefs] = useState<PreferenciasVisuais>(() => StudyStorage.getPreferencias());
  const [metas, setMetas] = useState<MetaDiaria[]>(() => StudyStorage.getMetas());
  const [historico, setHistorico] = useState<SimuladoFinalizado[]>(() => StudyStorage.getHistorico());
  const [cadernoErrosCount, setCadernoErrosCount] = useState<number>(() => StudyStorage.getCadernoErros().length);

  // Active exam session state
  const [activeExame, setActiveExame] = useState<ExameConfig | null>(null);
  const [activeQuestoes, setActiveQuestoes] = useState<Questao[]>([]);
  const [examStudyMode, setExamStudyMode] = useState<'simulado' | 'treino_rapido'>('simulado');

  // Result state
  const [lastExamResult, setLastExamResult] = useState<{
    exame: ExameConfig;
    questoes: Questao[];
    respostas: Record<string, string>;
    tempoSegundos: number;
    marcadasRevisao: string[];
  } | null>(null);

  const refreshAllData = () => {
    setPerfil(StudyStorage.getPerfil());
    setPrefs(StudyStorage.getPreferencias());
    setMetas(StudyStorage.getMetas());
    setHistorico(StudyStorage.getHistorico());
    setCadernoErrosCount(StudyStorage.getCadernoErros().length);
  };

  // Sync theme class to document element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'mode-sepia', 'mode-conforto');

    if (prefs.tema === 'dark') {
      root.classList.add('dark');
    } else if (prefs.tema === 'sepia') {
      root.classList.add('mode-sepia');
    } else if (prefs.tema === 'conforto') {
      root.classList.add('mode-conforto');
    }
  }, [prefs.tema]);

  // Handle start exam with EXACT question count
  const handleStartExam = (exameId: string, modo: 'simulado' | 'treino_rapido' = 'simulado') => {
    const foundExame = EXAMES_CATALOGO.find((e) => e.id === exameId) || EXAMES_CATALOGO[0];
    
    // Obter o conjunto COMPLETO de questões correspondente ao tamanho anunciado da prova
    const questoesForExam = getQuestoesParaExame(foundExame.id);

    setActiveExame(foundExame);
    setActiveQuestoes(questoesForExam);
    setExamStudyMode(modo);
    setSubView('exam_arena');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter directly by single subject
  const handleFilterBySubject = (materia: string) => {
    const matched = QUESTOES_MOCK.filter(
      (q) => q.materia.toLowerCase().includes(materia.toLowerCase()) || q.disciplinaGeral.toLowerCase().includes(materia.toLowerCase())
    );
    const pool = matched.length > 0 ? matched : QUESTOES_MOCK.slice(0, 4);

    const tempExame: ExameConfig = {
      id: `filtro-${Date.now()}`,
      titulo: `Treino Específico: ${materia}`,
      subtitulo: `Questões selecionadas da disciplina de ${materia}`,
      categoria: 'ENEM',
      nivel: 'Médio',
      badgePill: 'Filtro por Disciplina',
      badgePillColor: 'bg-blue-100 text-blue-800',
      tagExtra: 'Treino Focado',
      imagemUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZsTb0BZ1qYPmxCLPZ3MkSkkqNhjmZxFhBBmuQGh4U9EXJ-1whGul02RggBGcMUBDsVXu64v0RrjSlZHSBqFkuvAR3674y6GoZzcHR0qR9s-FYEdUvsemgEzVYdo38OLix6iO3Z4OCBSpCJ-EtMk2Xueye0xQpuuHFK3G_fGF8ir7Db4317NSIJtH2vxXJh2aNyp4hXpPiRVKRSc-jAJAu7x0mRsX__pkyxTSIg2_hFaYUbGir0---Iw',
      imagemAlt: 'Treino por disciplina',
      badgeImagem: 'Focado',
      totalQuestoes: pool.length,
      tempoSugeridoMinutos: pool.length * 3,
      dificuldade: 'Média Balanceada',
      dificuldadePorcentagem: 50,
      dificuldadeCor: 'bg-blue-600',
      questoesIds: pool.map((q) => q.id),
    };

    setActiveExame(tempExame);
    setActiveQuestoes(pool);
    setExamStudyMode('treino_rapido');
    setSubView('exam_arena');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle finish exam
  const handleFinishExam = (
    respostasDadas: Record<string, string>,
    tempoSegundos: number,
    marcadasRevisao: string[]
  ) => {
    if (!activeExame) return;

    let acertos = 0;
    activeQuestoes.forEach((q) => {
      if (respostasDadas[q.id] === q.respostaCorreta) {
        acertos++;
      }
    });

    const percentual = Math.round((acertos / activeQuestoes.length) * 100);
    const notaTRI = Math.min(1000, Math.round(450 + (acertos / activeQuestoes.length) * 450 + 20));

    // Save to studyStorage
    const finalizado: SimuladoFinalizado = {
      id: `sim-${Date.now()}`,
      exameId: activeExame.id,
      exameTitulo: activeExame.titulo,
      dataIso: new Date().toISOString(),
      tempoSegundos,
      totalQuestoes: activeQuestoes.length,
      totalRespondidas: Object.keys(respostasDadas).length,
      acertos,
      percentualAcerto: percentual,
      notaCalibradaTRI: notaTRI,
      respostas: respostasDadas,
      marcadasRevisao,
    };

    StudyStorage.salvarSimuladoFinalizado(finalizado);
    refreshAllData();

    setLastExamResult({
      exame: activeExame,
      questoes: activeQuestoes,
      respostas: respostasDadas,
      tempoSegundos,
      marcadasRevisao,
    });

    setSubView('result_report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset entire local progress
  const handleResetProgress = () => {
    StudyStorage.resetarProgressoGeral();
    refreshAllData();
    setSubView('normal');
    setActiveTab('inicio');
  };

  // Preferences update
  const handleUpdatePrefs = (newPrefs: PreferenciasVisuais) => {
    setPrefs(newPrefs);
    StudyStorage.setPreferencias(newPrefs);
  };

  // Toggle comfort mode
  const handleToggleComfort = () => {
    const nextTema = prefs.tema === 'conforto' ? 'normal' : 'conforto';
    handleUpdatePrefs({ ...prefs, tema: nextTema });
  };

  // Toggle daily goal
  const handleToggleMeta = (metaId: string) => {
    StudyStorage.toggleMeta(metaId);
    setMetas(StudyStorage.getMetas());
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors">
      {/* Universal Sticky Header (Hidden only inside active live exam for distraction-free mode if requested, or present for seamless tab switching) */}
      {subView !== 'exam_arena' && (
        <AppHeader
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setSubView('normal');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          perfil={perfil}
          prefs={prefs}
          onChangePrefs={handleUpdatePrefs}
          onResetProgress={handleResetProgress}
          onUpdatePerfil={(p) => {
            setPerfil(p);
            StudyStorage.setPerfil(p);
          }}
        />
      )}

      {/* Main Container */}
      <div className={subView !== 'exam_arena' ? 'pt-20 flex-1' : 'flex-1'}>
        {/* Subview 1: Active Exam Arena */}
        {subView === 'exam_arena' && activeExame && (
          <ExamArenaView
            exame={activeExame}
            questoes={activeQuestoes}
            modo={examStudyMode}
            prefs={prefs}
            onChangePrefs={handleUpdatePrefs}
            onFinishExam={handleFinishExam}
            onExit={() => {
              setSubView('normal');
              setActiveTab('inicio');
            }}
          />
        )}

        {/* Subview 2: Post-exam Result Report */}
        {subView === 'result_report' && lastExamResult && (
          <ResultReportView
            exame={lastExamResult.exame}
            questoes={lastExamResult.questoes}
            respostas={lastExamResult.respostas}
            tempoSegundos={lastExamResult.tempoSegundos}
            marcadasRevisao={lastExamResult.marcadasRevisao}
            onRetry={() => {
              handleStartExam(lastExamResult.exame.id, examStudyMode);
            }}
            onGoHome={() => {
              setSubView('normal');
              setActiveTab('inicio');
            }}
            onOpenCadernoErros={() => {
              setSubView('caderno_erros');
            }}
          />
        )}

        {/* Subview 3: Caderno de Erros */}
        {subView === 'caderno_erros' && (
          <CadernoErrosView
            onBack={() => setSubView('normal')}
            onRefreshStats={refreshAllData}
          />
        )}

        {/* Subview 4: Normal Tab Navigation */}
        {subView === 'normal' && (
          <>
            {activeTab === 'inicio' && (
              <DashboardView
                perfil={perfil}
                metas={metas}
                onToggleMeta={handleToggleMeta}
                prefs={prefs}
                onToggleComfort={handleToggleComfort}
                onStartExam={handleStartExam}
                onOpenCadernoErros={() => setSubView('caderno_erros')}
                onSelectTab={setActiveTab}
                cadernoErrosCount={cadernoErrosCount}
              />
            )}

            {activeTab === 'provas' && (
              <CatalogView
                onStartExam={handleStartExam}
                onFilterBySubject={handleFilterBySubject}
              />
            )}

            {activeTab === 'desempenho' && (
              <PerformanceView
                historico={historico}
                perfil={perfil}
                onResetProgress={handleResetProgress}
                onOpenCadernoErros={() => setSubView('caderno_erros')}
              />
            )}

            {activeTab === 'material' && <SupportMaterialView />}
          </>
        )}
      </div>

      {/* Global Accessible Footer (shown on all normal screens and reports) */}
      {subView !== 'exam_arena' && <AppFooter />}
    </div>
  );
}
