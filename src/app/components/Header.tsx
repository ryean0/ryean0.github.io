/* Filename: src/app/components/Header.tsx */
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useScrollspy } from '@/hooks/useScrollspy';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navItems = ['about', 'experience', 'projects', 'skills'];
  const activeId = useScrollspy(navItems);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? 'bg-slate-900/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
    )}>
      <div className="container mx-auto max-w-4xl px-6">
        {/* --- MODIFIED: The flex container now pushes the nav to the right --- */}
        <div className="flex justify-end items-center h-20">
          {/* --- MODIFIED: Bounded navigation container --- */}
          <nav className="bg-slate-800/60 border border-slate-700/80 rounded-full p-1 backdrop-blur-sm">
            <ul className="flex items-center">
              {navItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item)}
                    className={cn(
                      "text-sm font-medium capitalize transition-colors duration-300 px-4 py-1.5 rounded-full",
                      activeId === item
                        ? 'bg-slate-700 text-cyan-300' // Active state
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-slate-100' // Inactive state
                    )}
                  >
                    {item}
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