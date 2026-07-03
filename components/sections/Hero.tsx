'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, Award, Shield } from 'lucide-react';
import { doctorInfo } from '@/lib/data';

const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
    </div>
  ),
});

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 2.5 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
};

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-navy-950"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-radial-navy pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gold pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gold horizontal rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-[calc(100vh-96px)]">

          {/* Left — text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center"
          >
            {/* Badge */}
            <motion.div variants={item} className="mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/8 backdrop-blur-sm">
                <Shield size={12} className="text-gold-500" />
                <span className="text-xs text-gold-400 font-sans tracking-[0.12em] uppercase font-medium">
                  Consultant General Physician · Lahore
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={item}
              className="font-display text-5xl sm:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-4"
            >
              Dr. Syed Shakir
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-500 to-gold-300">
                Jawad Abdi
              </span>
            </motion.h1>

            {/* Credentials */}
            <motion.p
              variants={item}
              className="text-base text-white/40 font-sans tracking-widest uppercase mb-2"
            >
              {doctorInfo.credentials}
            </motion.p>

            {/* Specialization */}
            <motion.p
              variants={item}
              className="text-lg sm:text-xl text-white/70 font-sans leading-relaxed mb-8 max-w-md"
            >
              {doctorInfo.specialization}
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={item}
              className="flex items-center gap-6 sm:gap-8 mb-10 pb-10 border-b border-white/8"
            >
              {[
                { value: '15+', label: 'Years' },
                { value: '10K+', label: 'Patients' },
                { value: '95%', label: 'Satisfaction' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-gold-400">{s.value}</p>
                  <p className="text-xs text-white/40 font-sans uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo('#contact')}
                className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-medium font-sans text-sm transition-all duration-200 hover:shadow-gold-lg"
              >
                <Calendar size={16} />
                Book Consultation
                <span className="ml-1 group-hover:translate-x-0.5 transition-transform">→</span>
              </button>

              <button
                onClick={() => scrollTo('#about')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-white/15 text-white/80 hover:text-white hover:border-white/30 font-medium font-sans text-sm transition-all duration-200 backdrop-blur-sm hover:bg-white/5"
              >
                View Portfolio
              </button>
            </motion.div>

            {/* Award badges */}
            <motion.div variants={item} className="flex items-center gap-3 mt-10">
              <Award size={13} className="text-gold-500/60" />
              <p className="text-xs text-white/30 font-sans">
                MBBS · PMDC Registered · Internal Medicine
              </p>
            </motion.div>
          </motion.div>

          {/* Right — 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 2.7, ease: 'easeOut' }}
            className="relative h-[520px] lg:h-[680px] w-full"
          >
            {/* Glow behind canvas */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full bg-navy-500/10 blur-3xl animate-pulse-glow" />
              <div className="absolute w-48 h-48 rounded-full bg-gold-500/5 blur-2xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
            </div>

            {/* Frame decoration */}
            {[
              'top-4 right-4 border-t border-r',
              'bottom-4 left-4 border-b border-l',
            ].map((cls, i) => (
              <div key={i} className={`absolute w-12 h-12 ${cls} border-gold-500/20 pointer-events-none`} />
            ))}

            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="text-[10px] text-white/25 font-sans tracking-[0.2em] uppercase">Scroll</p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={16} className="text-white/25" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
