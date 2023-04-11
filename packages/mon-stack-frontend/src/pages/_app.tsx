import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence } from 'framer-motion';

export default function App({ Component, pageProps, router }: AppProps) {
  const { theme }: any = Component;

  const animatePresenceProps: any = {
    mode: 'wait',
    initial: false,
    onExitComplete: () => window.scrollTo(0, 0),
  };

  const themeProviderProps: any = {
    attribute: 'class',
    forcedTheme: 'light' || null,
    enableSystem: true,
  };

  return (
    <AnimatePresence {...animatePresenceProps}>
      <ThemeProvider {...themeProviderProps}>
        <Component {...pageProps} key={router.asPath} />
      </ThemeProvider>
    </AnimatePresence>
  );
}
