'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, Calendar, Linkedin, Twitter, Youtube, ArrowRight } from 'lucide-react';
import { doctorInfo } from '@/lib/data';
import { cn } from '@/lib/utils';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const socials = [
  { icon: Linkedin, label: 'LinkedIn',  href: '#' },
  { icon: Twitter,  label: 'Twitter',   href: '#' },
  { icon: Youtube,  label: 'YouTube',   href: '#' },
];

export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    console.log('Form submitted:', data);
    reset();
  };

  return (
    <section id="contact" className="relative py-28 lg:py-36 bg-navy-900 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy-800/30 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-gold-500 font-sans tracking-[0.18em] uppercase font-medium block mb-3">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Begin Your Journey
          </h2>
          <p className="text-white/45 font-sans text-base max-w-xl mx-auto">
            Schedule a consultation or reach out with any questions. Dr. Abdi's team responds within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left — CTA + info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            {/* Appointment CTA */}
            <div className="p-7 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-500/5 border border-gold-500/20">
              <Calendar size={28} className="text-gold-500 mb-4" />
              <h3 className="font-display text-xl font-semibold text-white mb-2">
                Book a Consultation
              </h3>
              <p className="text-sm text-white/55 font-sans leading-relaxed mb-5">
                New patient appointments typically available within 5 business days. Telehealth options available.
              </p>
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-medium font-sans text-sm transition-all duration-200 hover:shadow-gold group">
                Request Appointment
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Contact info */}
            <div className="space-y-5">
              {[
                { icon: Mail,    label: 'Email',   value: doctorInfo.email },
                { icon: Phone,   label: 'Phone',   value: doctorInfo.phone },
                { icon: MapPin,  label: 'Address', value: '[Clinic Name]\nLahore, Pakistan' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg border border-white/8 bg-white/3 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={15} className="text-gold-500/80" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 font-sans uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-sm text-white/65 font-sans whitespace-pre-line leading-relaxed">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="text-xs text-white/30 font-sans uppercase tracking-[0.15em] mb-3">Follow</p>
              <div className="flex items-center gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-gold-500/30 transition-all"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="p-8 rounded-2xl border border-white/8 bg-white/2">
              {isSubmitSuccessful ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mb-5">
                    <Send size={24} className="text-gold-400" />
                  </div>
                  <h3 className="font-display text-xl text-white mb-2">Message Received</h3>
                  <p className="text-sm text-white/50 font-sans">We'll be in touch within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      label="Full Name"
                      placeholder="John Smith"
                      error={errors.name?.message}
                      {...register('name', { required: 'Name is required' })}
                    />
                    <InputField
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      error={errors.email?.message}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Invalid email' },
                      })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      label="Phone (Optional)"
                      type="tel"
                      placeholder="+92 3XX XXXXXXX"
                      {...register('phone')}
                    />
                    <InputField
                      label="Subject"
                      placeholder="New Patient Consultation"
                      error={errors.subject?.message}
                      {...register('subject', { required: 'Subject is required' })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 font-sans uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Please describe your condition or query..."
                      className={cn(
                        'w-full px-4 py-3 rounded-xl bg-white/3 border text-sm text-white/80 font-sans placeholder-white/20 focus:outline-none focus:ring-1 transition-all resize-none',
                        errors.message ? 'border-red-500/40 focus:ring-red-500/30' : 'border-white/8 focus:border-gold-500/40 focus:ring-gold-500/20',
                      )}
                      {...register('message', { required: 'Message is required' })}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400 mt-1 font-sans">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 disabled:opacity-60 disabled:cursor-not-allowed text-navy-950 font-medium font-sans text-sm transition-all duration-200 hover:shadow-gold"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                        Sending…
                      </span>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { forwardRef } from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className, ...props }, ref) => (
    <div>
      <label className="block text-xs text-white/40 font-sans uppercase tracking-wider mb-2">
        {label}
      </label>
      <input
        ref={ref}
        className={cn(
          'w-full px-4 py-3 rounded-xl bg-white/3 border text-sm text-white/80 font-sans placeholder-white/20 focus:outline-none focus:ring-1 transition-all',
          error ? 'border-red-500/40 focus:ring-red-500/30' : 'border-white/8 focus:border-gold-500/40 focus:ring-gold-500/20',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400 mt-1 font-sans">{error}</p>}
    </div>
  ),
);

InputField.displayName = 'InputField';
