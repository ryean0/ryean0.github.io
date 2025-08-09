/* Filename: src/app/components/Header.tsx */
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useScrollspy } from '@/hooks/useScrollspy'; // Import the new hook
import { siteConfig } from '@/data/siteConfig';

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
        <div className="flex justify-between items-center h-16">
          {/* NEW: Name on the left for balance */}
          <button onClick={() => scrollTo('about')} className="text-lg font-bold text-gray-100 hover:text-blue-400 transition-colors">
            {siteConfig.name}
          </button>
          
          <nav>
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item)}
                    className={cn(
                      "text-sm font-medium capitalize transition-colors duration-300",
                      activeId === item ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
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