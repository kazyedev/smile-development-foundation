'use client';

import { useState, useEffect } from 'react';

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // User hook logic
    setLoading(false);
  }, []);

  return { user, loading };
}