'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Calendar } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [mounted, setMounted]       = useState(false);
  const { theme, setTheme }         = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.4, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-navy-950/80 dark:bg-navy-950/80 backdrop-blur-xl border-b border-white/5 shadow-navy'
            : 'bg-transparent',
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-18 flex items-center justify-between" style={{ height: '72px' }}>
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-navy-700 to-navy-900 border border-gold-500/40 flex items-center justify-center">
              <span className="font-display text-sm font-bold text-gold-500">SJ</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-white/90 text-sm font-medium tracking-wide group-hover:text-gold-400 transition-colors">
                Dr. Syed Shakir Jawad Abdi
              </span>
            </div>
          </button>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200 tracking-wide font-sans relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
                </button>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all"
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}

            <button
              onClick={() => scrollTo('#contact')}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-500 hover:bg-gold-400 text-navy-950 text-sm font-medium font-sans transition-all duration-200 hover:shadow-gold"
            >
              <Calendar size={14} />
              Book Consultation
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-navy-950/95 backdrop-blur-xl border-b border-white/5 lg:hidden"
          >
            <ul className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="w-full text-left py-3 px-4 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm font-sans"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="pt-2"
              >
                <button
                  onClick={() => scrollTo('#contact')}
                  className="w-full py-3 px-4 rounded-lg bg-gold-500 text-navy-950 text-sm font-medium font-sans flex items-center justify-center gap-2"
                >
                  <Calendar size={14} />
                  Book Consultation
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
