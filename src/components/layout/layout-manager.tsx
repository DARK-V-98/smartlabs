'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function LayoutManager() {
  const pathname = usePathname()

  useEffect(() => {
    const isSpecialLayout = pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password' || pathname === '/welcome' || pathname.startsWith('/payment');

    if (isSpecialLayout) {
      document.body.classList.remove('pt-20');
    } else {
      document.body.classList.add('pt-20');
    }
  }, [pathname]);

  return null;
}
