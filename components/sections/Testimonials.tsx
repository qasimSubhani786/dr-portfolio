'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';
import { cn } from '@/lib/utils';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={12}
          className={i < rating ? 'text-gold-500 fill-gold-500' : 'text-white/15'}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const total = testimonials.length;

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 5500);
    return () => clearInterval(id);
  }, [paused, go]);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="relative py-28 lg:py-36 bg-navy-950 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Atmospheric glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-navy-600/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-gold-500 font-sans tracking-[0.18em] uppercase font-medium block mb-3">
            Patient Stories
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Voices of Recovery
          </h2>
          <p className="text-white/45 font-sans text-base max-w-xl mx-auto">
            Real outcomes. Real lives changed. The trust of our patients is our greatest achievement.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative"
        >
          {/* Main card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-white/2 min-h-[340px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full px-8 sm:px-14 py-12"
              >
                {/* Quote icon */}
                <Quote size={32} className="text-gold-500/20 mb-6" />

                {/* Review */}
                <p className="font-sans text-lg sm:text-xl text-white/75 leading-relaxed mb-8 max-w-3xl">
                  "{t.review}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-navy-600 to-navy-800 border border-gold-500/30 flex items-center justify-center">
                    <span className="font-display text-sm font-bold text-gold-400">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white font-sans">{t.name}, {t.age}</p>
                    <p className="text-xs text-gold-500/70 font-sans">{t.condition}</p>
                  </div>
                  <div className="ml-auto flex flex-col items-end gap-1">
                    <StarRating rating={t.rating} />
                    <p className="text-xs text-white/25 font-sans">{t.date}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Side gradients */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-navy-950/20 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-navy-950/20 to-transparent pointer-events-none" />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={cn(
                    'rounded-full transition-all duration-300',
                    i === current ? 'w-6 h-1.5 bg-gold-500' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/35',
                  )}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-14 pt-10 border-t border-white/5"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((t) => (
                <div key={t.id} className="w-7 h-7 rounded-full bg-gradient-to-br from-navy-600 to-navy-800 border border-navy-950 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-gold-400">{t.avatar}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-white/50 font-sans">10,000+ patients treated</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={13} className="text-gold-500 fill-gold-500" />
              ))}
            </div>
            <p className="text-sm text-white/50 font-sans">4.9 / 5.0 average rating</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
