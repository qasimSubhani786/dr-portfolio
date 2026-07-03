'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Circle } from 'lucide-react';
import { timelineItems } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { TimelineItem } from '@/types';

const typeConfig: Record<TimelineItem['type'], { icon: typeof GraduationCap; color: string; bg: string }> = {
  education:    { icon: GraduationCap, color: 'text-blue-400',  bg: 'bg-blue-500/10 border-blue-500/20' },
  career:       { icon: Briefcase,     color: 'text-gold-400',  bg: 'bg-gold-500/10 border-gold-500/20' },
  certification:{ icon: Award,         color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
};

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isLeft = index % 2 === 0;
  const { icon: Icon, color, bg } = typeConfig[item.type];

  return (
    <div ref={ref} className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 lg:gap-8 items-start">

      {/* Left card (even) */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 0 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          'lg:text-right',
          isLeft ? 'lg:col-start-1' : 'lg:col-start-3 lg:text-left',
          !isLeft && 'hidden lg:block opacity-0 pointer-events-none',
        )}
      >
        {isLeft && (
          <TimelineCardContent item={item} Icon={Icon} color={color} bg={bg} align="right" />
        )}
      </motion.div>

      {/* Center dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="hidden lg:flex flex-col items-center self-start pt-4"
      >
        <div className={cn('w-4 h-4 rounded-full border-2 border-gold-500 bg-navy-950 relative z-10', color)} />
        <div className="w-px flex-1 bg-gradient-to-b from-gold-500/40 to-transparent mt-1 min-h-[60px]" />
      </motion.div>

      {/* Right card (odd) + mobile all */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 0 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          !isLeft ? 'lg:col-start-3' : 'lg:col-start-1',
        )}
      >
        {/* Mobile: always show; Desktop: only odd */}
        <div className={cn('lg:hidden')}>
          <TimelineCardContent item={item} Icon={Icon} color={color} bg={bg} align="left" />
        </div>
        {!isLeft && (
          <div className="hidden lg:block">
            <TimelineCardContent item={item} Icon={Icon} color={color} bg={bg} align="left" />
          </div>
        )}
      </motion.div>
    </div>
  );
}

function TimelineCardContent({
  item, Icon, color, bg, align,
}: {
  item: TimelineItem;
  Icon: typeof GraduationCap;
  color: string;
  bg: string;
  align: 'left' | 'right';
}) {
  return (
    <div
      className={cn(
        'group relative p-5 rounded-2xl border border-white/8 bg-white/2 hover:bg-white/4 hover:border-white/15 transition-all duration-300 hover:shadow-card',
        align === 'right' ? 'text-right' : 'text-left',
      )}
    >
      {/* Year */}
      <div className={cn('flex items-center gap-2 mb-3', align === 'right' ? 'justify-end' : 'justify-start')}>
        <span className="text-xs font-mono text-gold-500/80 tracking-wider">{item.year}</span>
        <div className={cn('w-5 h-5 rounded-md border flex items-center justify-center', bg)}>
          <Icon size={11} className={color} />
        </div>
      </div>
      <h3 className="font-display text-base font-semibold text-white mb-1 leading-snug">{item.title}</h3>
      <p className={cn('text-xs font-medium mb-2', color)}>{item.institution}</p>
      <p className="text-xs text-white/45 font-sans leading-relaxed">{item.description}</p>
    </div>
  );
}

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const headerInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="timeline" className="relative py-28 lg:py-36 bg-navy-950 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs text-gold-500 font-sans tracking-[0.18em] uppercase font-medium block mb-3">
            Journey
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Education & Career
          </h2>
          <p className="text-white/45 font-sans text-base max-w-xl mx-auto">
            A dedicated path through medical training and clinical practice.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-6 mb-16"
        >
          {Object.entries(typeConfig).map(([type, cfg]) => {
            const { icon: Icon, color } = cfg;
            return (
              <div key={type} className="flex items-center gap-2">
                <Icon size={12} className={color} />
                <span className="text-xs text-white/40 font-sans capitalize">{type}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical center line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/20 via-gold-500/10 to-transparent -translate-x-px" />

          <div className="space-y-6 lg:space-y-10">
            {timelineItems.map((item, i) => (
              <TimelineCard key={item.year + item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
