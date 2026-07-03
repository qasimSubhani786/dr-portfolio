'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Quote, CheckCircle2 } from 'lucide-react';
import { doctorInfo, stats } from '@/lib/data';
import { useCountUp } from '@/hooks/useScrollAnimation';

function StatCounter({ value, label, suffix }: { value: string; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const numericValue = parseInt(value.replace(/\D/g, ''), 10);
  const count = useCountUp(numericValue, 1800, inView);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-3xl lg:text-4xl font-bold text-gold-400 mb-1">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-xs text-white/40 font-sans uppercase tracking-wider">{label}</p>
    </div>
  );
}

const expertise = [
  'General & Internal Medicine',
  'Hypertension Management',
  'Diabetes Care',
  'Acute & Chronic Infections',
  'Preventive Health & Check-ups',
  'Chronic Disease Management',
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section id="about" className="relative py-28 lg:py-36 bg-navy-900 overflow-hidden">
      {/* Subtle divider gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            {/* Photo placeholder */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-navy-800 to-navy-950 border border-white/8">
              <Image
                src="/images/dr-shakir-jawad.jpeg"
                alt={doctorInfo.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
                priority
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />

              {/* Credential badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-navy-950/80 backdrop-blur-md rounded-xl border border-white/10 p-4">
                  <p className="font-display text-white font-semibold text-lg">{doctorInfo.name}</p>
                  <p className="text-gold-500 text-xs font-sans mt-0.5">{doctorInfo.credentials}</p>
                  <p className="text-white/40 text-xs font-sans mt-1">{doctorInfo.title}</p>
                </div>
              </div>
            </div>

            {/* Floating accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl border border-gold-500/15 bg-navy-950/30 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-gold-400">15</p>
                <p className="text-[9px] text-white/40 font-sans uppercase tracking-wider">Years</p>
              </div>
            </div>
          </motion.div>

          {/* Right — text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <motion.div variants={itemVariants} className="mb-3">
              <span className="text-xs text-gold-500 font-sans tracking-[0.18em] uppercase font-medium">
                About
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-8"
            >
              A Career Built on
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-300">
                Compassionate Care
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/65 font-sans text-base leading-relaxed mb-6"
            >
              Dr. Syed Shakir Jawad Abdi is a Consultant General Physician based in Lahore, dedicated to comprehensive primary and internal medicine care. Through years of clinical practice, he has cared for patients across a wide range of acute and chronic conditions — combining sound medical judgement with patient education and compassionate, accessible care.
            </motion.p>

            {/* Mission quote */}
            <motion.div
              variants={itemVariants}
              className="relative pl-5 mb-8 border-l-2 border-gold-500/50"
            >
              <Quote size={16} className="text-gold-500/40 mb-2" />
              <p className="text-white/55 font-sans text-sm leading-relaxed italic">
                "{doctorInfo.mission}"
              </p>
            </motion.div>

            {/* Expertise list */}
            <motion.div variants={itemVariants} className="mb-10">
              <p className="text-xs text-white/30 font-sans uppercase tracking-[0.15em] mb-4">
                Areas of Expertise
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {expertise.map((e) => (
                  <div key={e} className="flex items-center gap-2.5">
                    <CheckCircle2 size={13} className="text-gold-500/70 shrink-0" />
                    <span className="text-sm text-white/60 font-sans">{e}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl border border-white/8 bg-white/2"
            >
              {stats.map((s) => (
                <StatCounter key={s.label} value={s.value} label={s.label} suffix={s.suffix} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
