import { Metadata } from 'next';

export function generateMetadata(title: string, description?: string): Metadata {
  return {
    title,
    description: description || 'Default description',
  };
}

export const defaultMetadata: Metadata = {
  title: 'Smile Foundation',
  description: 'Foundation website',
};