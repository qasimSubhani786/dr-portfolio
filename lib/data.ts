import type { TimelineItem, Achievement, Testimonial, Stat, NavLink } from '@/types';

// ─────────────────────────────────────────────────────────────────────────────
// PLACEHOLDER CONTENT
// Verified from public web: name, specialty (General Physician), city (Lahore).
// Everything else below is realistic placeholder — NO fabricated awards or real
// institution names. Bracketed [..] fields need Dr. Abdi's real details filled in.
// ─────────────────────────────────────────────────────────────────────────────

export const doctorInfo = {
  name: 'Dr. Syed Shakir Jawad Abdi',
  nameShort: 'Dr. Shakir Jawad',
  initials: 'SJ',
  credentials: 'MBBS', // [verify — e.g. MBBS, FCPS (Medicine)]
  specialization: 'General Physician & Internal Medicine',
  title: 'Consultant General Physician',
  institution: '[Clinic / Hospital Name]',
  location: 'Lahore, Pakistan',
  yearsExperience: 15, // [verify]
  bio: `Dr. Syed Shakir Jawad Abdi is a General Physician based in Lahore, Pakistan, dedicated to comprehensive primary and internal medicine care. He focuses on accurate diagnosis, evidence-based treatment, and building lasting relationships with his patients.

Through years of clinical practice, he has cared for patients across a wide range of acute and chronic conditions — combining sound medical judgement with patient education and compassionate, accessible care.`,
  mission: `To deliver attentive, evidence-based general medical care to every patient — listening first, explaining clearly, and treating each person with dignity and respect.`,
  email: 'contact@example.com', // [verify]
  phone: '+92 3XX XXXXXXX', // [verify]
  address: 'Lahore, Pakistan', // [verify clinic address]
};

export const stats: Stat[] = [
  { value: '15', label: 'Years of Practice', suffix: '+' },
  { value: '10000', label: 'Patients Treated', suffix: '+' },
  { value: '95', label: 'Patient Satisfaction', suffix: '%' },
  { value: '24', label: 'Hour Response', suffix: 'h' },
];

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#timeline' },
  { label: 'Credentials', href: '#achievements' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export const timelineItems: TimelineItem[] = [
  {
    year: '[year]',
    title: 'MBBS — Bachelor of Medicine & Surgery',
    institution: '[Medical College]',
    description: 'Completed undergraduate medical education and training in general medicine and surgery.',
    type: 'education',
  },
  {
    year: '[year]',
    title: 'House Job — Internal Medicine',
    institution: '[Teaching Hospital]',
    description: 'Completed clinical house officer rotations across medicine, surgery, and allied specialties.',
    type: 'career',
  },
  {
    year: '[year]',
    title: 'Medical Officer',
    institution: '[Hospital / Clinic]',
    description: 'Provided front-line outpatient and inpatient care, managing a broad range of acute and chronic conditions.',
    type: 'career',
  },
  {
    year: '[year]',
    title: 'Postgraduate Training in Medicine',
    institution: '[Institution]',
    description: 'Advanced clinical training focused on internal medicine and patient management. [Verify diploma / FCPS details].',
    type: 'education',
  },
  {
    year: '[year]',
    title: 'PMDC Registered Medical Practitioner',
    institution: 'Pakistan Medical & Dental Council',
    description: 'Licensed and registered to practice medicine in Pakistan. [Verify registration number].',
    type: 'certification',
  },
  {
    year: '[year]',
    title: 'Consultant General Physician',
    institution: '[Current Clinic / Hospital]',
    description: 'Provides comprehensive general medical and internal medicine consultation, diagnosis, and ongoing patient care in Lahore.',
    type: 'career',
  },
];

export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'MBBS — Medical Degree',
    organization: '[Medical College]',
    year: '[year]',
    description: 'Bachelor of Medicine and Bachelor of Surgery. [Verify institution and year].',
    category: 'certification',
    icon: 'book',
  },
  {
    id: '2',
    title: 'PMDC Registration',
    organization: 'Pakistan Medical & Dental Council',
    year: '[year]',
    description: 'Licensed medical practitioner registered with the PMDC. [Verify registration details].',
    category: 'certification',
    icon: 'shield',
  },
  {
    id: '3',
    title: 'Postgraduate Qualification',
    organization: '[Institution]',
    year: '[year]',
    description: 'Advanced qualification in internal medicine. [Verify — e.g. FCPS / Diploma].',
    category: 'certification',
    icon: 'trophy',
  },
  {
    id: '4',
    title: 'Professional Membership',
    organization: '[Medical Association]',
    year: '[year]',
    description: 'Member of a recognised professional medical body. [Verify membership].',
    category: 'award',
    icon: 'globe',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ahmed R.',
    age: 52,
    condition: 'Hypertension Management',
    review: 'Dr. Abdi took the time to understand my full history and adjusted my blood pressure medication carefully. He explained everything clearly and follows up regularly. My readings have been stable for months now.',
    rating: 5,
    date: 'March 2026',
    avatar: 'AR',
  },
  {
    id: '2',
    name: 'Fatima K.',
    age: 45,
    condition: 'Type 2 Diabetes',
    review: 'A very patient and knowledgeable doctor. He helped me bring my sugar levels under control with a clear diet and medication plan, and never rushes the consultation. Highly recommended.',
    rating: 5,
    date: 'January 2026',
    avatar: 'FK',
  },
  {
    id: '3',
    name: 'Imran S.',
    age: 38,
    condition: 'Persistent Fever & Infection',
    review: 'I had a fever that would not settle. Dr. Abdi diagnosed the cause quickly, ordered the right tests, and started treatment that worked. Genuinely caring and thorough.',
    rating: 5,
    date: 'December 2025',
    avatar: 'IS',
  },
  {
    id: '4',
    name: 'Nadia H.',
    age: 60,
    condition: 'General Health Check-up',
    review: 'I visit Dr. Abdi for my routine check-ups. He is attentive, explains my reports in simple terms, and gives practical advice. My whole family trusts him as our physician.',
    rating: 5,
    date: 'October 2025',
    avatar: 'NH',
  },
  {
    id: '5',
    name: 'Bilal A.',
    age: 41,
    condition: 'Acid Reflux & Digestion',
    review: 'After months of discomfort, Dr. Abdi identified the issue and prescribed a treatment plan that finally gave me relief. He listens carefully and treats you like a person, not a number.',
    rating: 5,
    date: 'August 2025',
    avatar: 'BA',
  },
];
