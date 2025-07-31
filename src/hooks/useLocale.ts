'use client';

import { useState, useEffect } from 'react';

export function useLocale() {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    // Locale hook logic
  }, []);

  return { locale, setLocale };
}