import { Heart, Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from 'lucide-react';
import { doctorInfo, navLinks } from '@/lib/data';

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter,  href: '#', label: 'Twitter' },
  { icon: Youtube,  href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 border border-gold-500/40 flex items-center justify-center">
                <span className="font-display text-sm font-bold text-gold-500">SJ</span>
              </div>
              <div>
                <p className="font-display text-white/90 font-medium">{doctorInfo.name}</p>
                <p className="text-xs text-white/40">{doctorInfo.credentials}</p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs mb-6">
              Consultant General Physician in Lahore. Dedicated to comprehensive, evidence-based medical care delivered with compassion.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-gold-500/40 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-medium text-white/30 uppercase tracking-[0.15em] mb-5">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-medium text-white/30 uppercase tracking-[0.15em] mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={14} className="mt-0.5 text-gold-500 shrink-0" />
                <span className="text-sm text-white/50">{doctorInfo.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={14} className="mt-0.5 text-gold-500 shrink-0" />
                <span className="text-sm text-white/50">{doctorInfo.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 text-gold-500 shrink-0" />
                <span className="text-sm text-white/50 leading-relaxed">
                  [Clinic Name]<br />Lahore, Pakistan
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25 font-sans">
            © 2026 {doctorInfo.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/20 flex items-center gap-1.5">
            Crafted with <Heart size={11} className="text-gold-500/60" /> in Lahore
          </p>
        </div>
      </div>
    </footer>
  );
}
