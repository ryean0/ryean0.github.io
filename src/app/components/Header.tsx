/* Filename: src/app/components/Header.tsx */
/* Enhanced Header with Improved Design System */

'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useScrollspy } from '@/hooks/useScrollspy';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = ['about', 'experience', 'projects', 'skills', 'contact'];
  const activeId = useScrollspy(navItems);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled 
            ? 'glass-strong shadow-lg' 
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo / Name */}
            <button
              onClick={() => scrollTo('about')}
              className="text-xl font-bold text-gradient-animated hover:scale-105 transition-transform"
              aria-label="Go to top"
            >
              RP
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <div className="glass rounded-full p-1.5 border border-accent-cyan/20">
                <ul className="flex items-center gap-1">
                  {navItems.map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => scrollTo(item)}
                        className={cn(
                          "relative text-sm font-medium capitalize transition-all duration-300 px-5 py-2.5 rounded-full",
                          activeId === item
                            ? 'text-accent-cyan' 
                            : 'text-text-secondary hover:text-text-primary'
                        )}
                      >
                        {/* Active indicator */}
                        {activeId === item && (
                          <span className="absolute inset-0 bg-accent-cyan/10 rounded-full border border-accent-cyan/30" />
                        )}
                        <span className="relative z-10">{item}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg glass border border-accent-cyan/20 text-text-primary hover:text-accent-cyan transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-deep-space/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <nav 
            className="fixed top-20 right-0 bottom-0 w-64 glass-strong border-l border-accent-cyan/20 z-40 md:hidden overflow-y-auto"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col p-6 space-y-2">
              {navItems.map((item, index) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item)}
                    className={cn(
                      "w-full text-left text-lg font-medium capitalize transition-all duration-300 px-4 py-3 rounded-lg",
                      activeId === item
                        ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30' 
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                    )}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </>
  );
};

export default Header;