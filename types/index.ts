export interface TimelineItem {
  year: string;
  title: string;
  institution: string;
  description: string;
  type: 'education' | 'career' | 'certification';
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  category: 'award' | 'publication' | 'certification' | 'research';
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  condition: string;
  review: string;
  rating: number;
  date: string;
  avatar: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}
