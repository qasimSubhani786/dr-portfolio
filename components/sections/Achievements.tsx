'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, BookOpen, Globe, Microscope, FileText, Heart, Shield, FlaskConical } from 'lucide-react';
import { achievements } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Achievement } from '@/types';

const iconMap: Record<string, typeof Trophy> = {
  trophy:     Trophy,
  book:       BookOpen,
  globe:      Globe,
  microscope: Microscope,
  'file-text':FileText,
  heart:      Heart,
  shield:     Shield,
  flask:      FlaskConical,
};

const categoryConfig: Record<Achievement['category'], { label: string; colorClass: string }> = {
  award:         { label: 'Award',         colorClass: 'text-gold-400 bg-gold-500/10 border-gold-500/25' },
  publication:   { label: 'Publication',   colorClass: 'text-blue-400 bg-blue-500/10 border-blue-500/25' },
  certification: { label: 'Certification', colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' },
  research:      { label: 'Research',      colorClass: 'text-violet-400 bg-violet-500/10 border-violet-500/25' },
};

function AchievementCard({ item, index }: { item: Achievement; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = iconMap[item.icon] ?? Trophy;
  const cat = categoryConfig[item.category];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative p-6 rounded-2xl border border-white/8 bg-white/2 hover:bg-white/4 hover:border-white/15 transition-all duration-300 hover:shadow-card cursor-default"
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-2xl pointer-events-none">
        <div className="absolute -top-8 -right-8 w-16 h-16 rotate-45 bg-gradient-to-br from-gold-500/5 to-transparent" />
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/4 flex items-center justify-center group-hover:border-gold-500/30 transition-colors">
          <Icon size={18} className="text-white/50 group-hover:text-gold-400 transition-colors" />
        </div>
        <div className="text-right">
          <span className={cn('text-[10px] font-medium font-sans tracking-wider uppercase px-2 py-0.5 rounded-full border', cat.colorClass)}>
            {cat.label}
          </span>
          <p className="text-xs text-white/30 font-mono mt-1">{item.year}</p>
        </div>
      </div>

      {/* Content */}
      <h3 className="font-display text-base font-semibold text-white mb-1 leading-snug">
        {item.title}
      </h3>
      <p className="text-xs text-gold-500/80 font-sans mb-3">{item.organization}</p>
      <p className="text-xs text-white/45 font-sans leading-relaxed line-clamp-3">
        {item.description}
      </p>

      {/* Bottom border accent on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/0 group-hover:via-gold-500/30 to-transparent transition-all duration-500 rounded-b-2xl" />
    </motion.div>
  );
}

const filterLabels = ['All', 'Award', 'Publication', 'Certification', 'Research'];

export default function Achievements() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="achievements" className="relative py-28 lg:py-36 bg-navy-900 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-navy-500/3 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="text-xs text-gold-500 font-sans tracking-[0.18em] uppercase font-medium block mb-3">
            Qualifications
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Credentials & Memberships
          </h2>
          <p className="text-white/45 font-sans text-base max-w-xl mx-auto">
            Qualifications, licensing, and professional memberships underpinning quality patient care.
          </p>
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-14"
        >
          {filterLabels.map((label) => (
            <button
              key={label}
              className="px-4 py-1.5 rounded-full border border-white/10 text-xs text-white/50 hover:text-white hover:border-gold-500/30 font-sans transition-all duration-200"
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((item, i) => (
            <AchievementCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Summary row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-8 pt-10 border-t border-white/5"
        >
          {[
            { val: '15+', label: 'Years in Practice' },
            { val: '10K+', label: 'Patients Treated' },
            { val: 'PMDC', label: 'Registered' },
            { val: '24h', label: 'Response Time' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl font-bold text-gold-400">{s.val}</p>
              <p className="text-xs text-white/35 font-sans mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
