'use client';

import React, { useState } from 'react';
import { Accessibility, HelpCircle, Shield, FileText, Keyboard, X } from 'lucide-react';

export function AppFooter() {
  const [modalContent, setModalContent] = useState<string | null>(null);

  return (
    <footer className="w-full bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Accessibility className="w-5 h-5 text-blue-600 shrink-0" />
            <span className="text-xs text-slate-600 dark:text-slate-400">
              SimulaBrasil • Espaço de aprendizado acessível focado no ENEM, SAEB, Prova Paulista e vestibulares.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <button
              onClick={() => setModalContent('atalhos')}
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
            >
              Atalhos & Acessibilidade
            </button>
            <button
              onClick={() => setModalContent('termos')}
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
            >
              Termos de Uso
            </button>
            <button
              onClick={() => setModalContent('privacidade')}
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
            >
              Privacidade (100% Local)
            </button>
            <button
              onClick={() => setModalContent('ajuda')}
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
            >
              Ajuda
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            © 2025 SimulaBrasil. Todos os direitos reservados. Preparação focada, gratuita e com ergonomia cognitiva para estudantes do Ensino Fundamental e Médio.
          </p>
        </div>
      </div>

      {/* Info Modals */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 capitalize">
                {modalContent === 'atalhos' && 'Atalhos de Teclado & Acessibilidade'}
                {modalContent === 'termos' && 'Termos de Uso Gratuito'}
                {modalContent === 'privacidade' && 'Política de Privacidade Local'}
                {modalContent === 'ajuda' && 'Central de Ajuda SimulaBrasil'}
              </h3>
              <button
                onClick={() => setModalContent(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 text-xs text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
              {modalContent === 'atalhos' && (
                <>
                  <p>Durante os simulados e treinos, você pode usar os seguintes atalhos:</p>
                  <ul className="space-y-1.5 pl-2">
                    <li>• <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded border font-mono">1 a 5</kbd> ou <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded border font-mono">A a E</kbd>: Selecionar alternativa.</li>
                    <li>• <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded border font-mono">Seta Direita (→)</kbd>: Próxima questão.</li>
                    <li>• <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded border font-mono">Seta Esquerda (←)</kbd>: Questão anterior.</li>
                    <li>• Botões <kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded border font-mono">A- / A+</kbd>: Ajustam o tamanho do texto para leitura confortável.</li>
                  </ul>
                </>
              )}

              {modalContent === 'termos' && (
                <p>
                  O SimulaBrasil é um projeto educacional 100% gratuito voltado para a universalização do acesso a simulados de alta qualidade no Brasil. Não há cobrança de taxas, planos pagos ou restrição de conteúdo.
                </p>
              )}

              {modalContent === 'privacidade' && (
                <p>
                  Respeitamos sua privacidade: <strong>não exigimos login nem cadastro</strong>. Todas as respostas marcadas, anotações de rascunho e notas históricas ficam armazenadas unicamente no <code>localStorage</code> do seu navegador.
                </p>
              )}

              {modalContent === 'ajuda' && (
                <p>
                  Para tirar dúvidas pedagógicas, revisar questões ou sugerir novas bancas, entre em contato com nosso time comunitário. Lembre-se que você pode reiniciar seu progresso a qualquer momento no botão &quot;Resetar meu progresso local&quot;.
                </p>
              )}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setModalContent(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
