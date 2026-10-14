import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SimulaBrasil - Simulados Gratuitos ENEM, SAEB e Vestibulares',
  description: 'Plataforma gratuita e universal de simulados e treino para estudantes do Ensino Fundamental e Médio (ENEM, SAEB, Prova Paulista, OBA e Vestibulares) sem necessidade de login.',
  openGraph: {
    title: 'SimulaBrasil - Simulados Gratuitos ENEM, SAEB e Vestibulares',
    description: 'Plataforma gratuita e universal de simulados e treino para estudantes do Ensino Fundamental e Médio sem necessidade de login.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SimulaBrasil - Simulados Gratuitos ENEM, SAEB e Vestibulares',
    description: 'Plataforma gratuita e universal de simulados e treino para estudantes do Ensino Fundamental e Médio sem necessidade de login.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased text-slate-800 bg-[#F8F9FF]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
