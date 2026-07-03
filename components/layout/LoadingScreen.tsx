'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let start: number;
    let raf: number;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const p = Math.min(elapsed / 1800, 1);
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setProgress(Math.floor(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setVisible(false), 400);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-navy-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Radial glow */}
          <div className="absolute inset-0 bg-radial-navy pointer-events-none" />

          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative mb-12"
          >
            <div className="relative w-20 h-20 rounded-2xl border border-gold-500/30 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-navy-800/80 to-navy-950/80" />
              <span className="relative font-display text-3xl font-bold tracking-tight text-gold-500">
                SJ
              </span>
            </div>
            <motion.div
              className="absolute -inset-3 rounded-3xl border border-gold-500/15"
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Doctor name */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="font-display text-2xl text-white tracking-wide mb-1">
              Dr. Syed Shakir Jawad Abdi
            </p>
            <p className="text-sm text-white/40 font-sans tracking-[0.18em] uppercase">
              General Physician
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '240px' }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="relative"
          >
            <div className="w-60 h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-300 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <motion.p
              className="text-center mt-3 text-xs text-white/30 font-sans tabular-nums"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {progress}%
            </motion.p>
          </motion.div>

          {/* Corner lines decoration */}
          {[
            'top-8 left-8 border-t border-l',
            'top-8 right-8 border-t border-r',
            'bottom-8 left-8 border-b border-l',
            'bottom-8 right-8 border-b border-r',
          ].map((cls, i) => (
            <motion.div
              key={i}
              className={`absolute w-8 h-8 ${cls} border-gold-500/20`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
