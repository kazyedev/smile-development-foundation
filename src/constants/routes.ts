// Application routes constants
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about-us',
  PROGRAMS: '/programs',
  PROJECTS: '/projects',
  NEWS: '/news',
  CONTACT: '/contact-us',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
} as const;

export const API_ROUTES = {
  NEWSLETTER: '/api/newsletter/subscribe',
  CONTACT: '/api/contact/send',
} as const;