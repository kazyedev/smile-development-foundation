'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import  NProgress  from 'nprogress';
import 'nprogress/nprogress.css'; // style file

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300); // adjust as needed

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, searchParams]);

  return null;
}
