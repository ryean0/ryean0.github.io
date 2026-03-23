/* Filename: src/app/components/Header.tsx */

/**
 * Header Component — Redesigned
 *
 * Changes:
 * 1. Added personal logo/brand mark (monogram "RP") on the left
 * 2. Refined glassmorphism nav pill with tighter padding
 * 3. Active indicator uses a bottom-bar accent instead of bg fill
 * 4. Smoother scroll-based opacity transition
 * 5. Improved semantic structure and a11y
 */

'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useScrollspy } from '@/hooks/useScrollspy';
import { Terminal } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  const navItems = ['about', 'education', 'skills', 'experience', 'projects'];

  const activeId = useScrollspy(navItems);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? 'bg-[#030712]/80 backdrop-blur-md border-b border-white/[0.04] shadow-lg shadow-black/10'
          : 'bg-transparent'
      )}
      role="banner"
    >
      <div className="container mx-auto max-w-5xl px-6">
        <div className="flex justify-between items-center h-16">
          {/* Brand mark */}
          <button
            onClick={() => scrollTo('about')}
            className="flex items-center gap-2 text-slate-300 hover:text-sky-400 transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <Terminal className="h-5 w-5" />
            <span className="font-mono text-sm font-semibold tracking-tight">
              ryan<span className="text-sky-400">phua</span>
            </span>
          </button>

          {/* Navigation pill */}
          <nav
            className="bg-white/[0.04] border border-white/[0.06] rounded-full px-1 py-1 backdrop-blur-md"
            role="navigation"
            aria-label="Main navigation"
          >
            <ul className="flex items-center gap-0.5">
              {navItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item)}
                    className={cn(
                      "relative text-sm font-medium capitalize transition-all duration-300 px-4 py-1.5 rounded-full",
                      activeId === item
                        ? 'text-sky-300 bg-sky-400/[0.08]'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                    )}
                    aria-label={`Navigate to ${item} section`}
                    aria-current={activeId === item ? 'page' : undefined}
                  >
                    {item}
                    {/* Active bottom indicator */}
                    {activeId === item && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-sky-400 rounded-full" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;