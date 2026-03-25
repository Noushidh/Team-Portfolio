import { useEffect } from 'react';

// Global scroll value accessible inside R3F (0-1 normalized)
export let globalScroll = 0;

export function useScrollValue() {
  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      globalScroll = docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
