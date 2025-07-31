import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  // Format date logic
  return new Date(date).toLocaleDateString();
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-');
}