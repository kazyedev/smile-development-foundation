'use client';

import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Theme hook logic
  }, []);

  return { theme, setTheme };
}