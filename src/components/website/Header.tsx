'use client';

import { useEffect, useRef, useState } from 'react';
import { LucideSearch, Sun, Moon, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';

export default function Header() {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [delayedHoveredMenu, setDelayedHoveredMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [showHeader, setShowHeader] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  const locale = pathname.split('/')[1];

  const menuItems = {
    about: [
      { label: 'About Us', href: `/${locale}/about-us` },
      { label: 'Board of Directors', href: `/${locale}/board-of-directors` },
      { label: 'Team Members', href: `/${locale}/team-members` }
    ],
    projects: [
      { label: 'All Projects', href: `/${locale}/projects` },
      { label: 'Categories', href: `/${locale}/projects/categories` }
    ],
    media: [
      { label: 'Images', href: `/${locale}/media/images` },
      { label: 'Videos', href: `/${locale}/media/videos` },
      { label: 'Publications', href: `/${locale}/media/publications` },
      { label: 'Reports', href: `/${locale}/media/reports` },
      { label: 'Success Stories', href: `/${locale}/media/success-stories` }
    ],
    contact: [
      { label: 'Contact Us', href: `/${locale}/contact-us` },
      { label: 'Become a Volunteer', href: `/${locale}/become-a-volunteer` },
      { label: 'Work with Us', href: `/${locale}/work-with-us` }
    ]
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY.current || currentScrollY < 50);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const handleMouseEnter = (key: string) => {
    clearTimeout(timeoutRef.current!);
    setHoveredMenu(key);
    setDelayedHoveredMenu(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDelayedHoveredMenu(null), 250);
  };

  if (!mounted) return null;

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <div className="bg-[var(--background)] text-[var(--foreground)] border-b border-[var(--border)] shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image src="/assets/logo.png" alt="Logo" width={40} height={40} />
            <h1 className="font-bold text-xl text-[var(--brand-primary)]">Smile Foundation</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href={`/${locale}`}
              className={`hover:text-[var(--brand-primary)] ${pathname === '/' ? 'text-[var(--brand-primary)] font-bold' : ''
                }`}
            >
              Home
            </Link>

            {Object.entries(menuItems).map(([key, items]) => {
              const isActive = items.some(
                (item) => pathname === item.href || pathname.startsWith(item.href + '/')
              );

              return (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`px-2 py-1 w-full flex items-center gap-1 cursor-pointer transition ${isActive ? 'text-[var(--brand-primary)] font-bold' : 'hover:text-[var(--brand-primary)]'
                      }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <svg
                      className={`w-4 h-4 transition-transform ${delayedHoveredMenu === key ? 'rotate-180' : ''
                        }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {delayedHoveredMenu === key && (
                      <motion.ul
                        key={key}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 w-48 bg-[var(--card)] border border-[var(--border)] rounded-md shadow-lg z-50"
                        onMouseEnter={() => handleMouseEnter(key)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {items.map(({ label, href }) => {
                          const isItemActive =
                            pathname === href;

                          return (
                            <motion.li
                              key={href}
                              className={`px-4 py-2 rounded-md transition cursor-pointer
                                  ${isItemActive
                                  ? 'bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold'
                                  : 'hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]'
                                }
                                `}
                                  >
                              <Link href={href} className="block">
                                {label}
                              </Link>
                            </motion.li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button className="bg-[var(--brand-primary)] px-4 py-2 text-white rounded-md">Donate</button>
            <LucideSearch className="w-5 h-5 cursor-pointer hover:text-[var(--brand-primary)]" />
            <button onClick={toggleTheme} className="p-2 rounded hover:bg-[var(--accent)]">
              {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ x: locale === 'ar' ? 300 : -300 }}
              animate={{ x: 0 }}
              exit={{ x: locale === 'ar' ? 300 : -300 }}
              className={`fixed top-0 ${locale === 'ar' ? 'right-0' : 'left-0'} h-screen w-64 bg-[var(--background)] border-[var(--border)] shadow-lg z-50 p-6`}
            >
              {Object.entries(menuItems).map(([key, items]) => (
                <div key={key} className="mb-6">
                  <p className="font-semibold mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                  {items.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`block py-1 px-2 rounded transition ${pathname === href || pathname.startsWith(href + '/')
                        ? 'bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold'
                        : ''
                        }`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
