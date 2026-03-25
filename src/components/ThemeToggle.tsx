import { useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import gsap from 'gsap';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const btnRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!iconRef.current) return;
    gsap.fromTo(iconRef.current,
      { scale: 0, rotate: -180, opacity: 0 },
      { scale: 1, rotate: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
  }, [theme]);

  const handleClick = () => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      scale: 0.85,
      duration: 0.1,
      ease: 'power2.in',
      onComplete: () => {
        toggleTheme();
        gsap.to(btnRef.current, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
      }
    });
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full glass-surface flex items-center justify-center cursor-pointer hover:border-accent/40 transition-colors duration-300 group"
      aria-label="Toggle theme"
    >
      <div ref={iconRef} className="relative">
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
        ) : (
          <Moon className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
        )}
      </div>
    </button>
  );
}
