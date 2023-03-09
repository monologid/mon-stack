import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence } from 'framer-motion';

export default function App({ Component, pageProps, router }: AppProps) {
  const { theme }: any = Component
  return (
    <AnimatePresence mode='wait' initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <ThemeProvider attribute={'class'} enableSystem={true} forcedTheme={theme || null}>
        <Component {...pageProps} key={router.asPath} />
      </ThemeProvider>
    </AnimatePresence>
  );
}
