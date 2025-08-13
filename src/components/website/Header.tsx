'use client';

import { useEffect, useRef, useState } from 'react';
import { LucideSearch, Sun, Moon, Menu, X, Languages } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { mockVideos } from '@/data/mockVideos';
import { mockPhotos } from '@/data/mockPhotos';
import { mockProjects } from '@/data/mockProjects';
import { mockProjectCategories } from '@/data/mockProjectCategories';
import { mockPrograms } from '@/data/mockPrograms';
import { mockStories } from '@/data/mockStories';
import { mockPublications } from '@/data/mockPublications';
import { mockReports } from '@/data/mockReports';

export default function Header() {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [delayedHoveredMenu, setDelayedHoveredMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() ?? '/';
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [showHeader, setShowHeader] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const router = useRouter();

  type Locale = 'en' | 'ar';
  type MenuKey = 'about' | 'projects' | 'media' | 'contact';
  const currentLocale: Locale = pathname.startsWith('/ar') ? 'ar' : 'en';



  const menuLabels: Record<Locale, Record<MenuKey, string>> = {
    en: {
      about: 'About Us',
      projects: 'Projects',
      media: 'Media',
      contact: 'Contact Us',
    },
    ar: {
      about: 'عن المؤسسة',
      projects: 'المشاريع',
      media: 'الوسائط',
      contact: 'تواصل معنا',
    },
  };
  const menuItems = {


    about: [
      { label: 'About Us', labelAr: 'عن المؤسسة', href: `/${currentLocale}/about-us` },
      { label: 'Board of Directors', labelAr: 'مجلس الإدارة', href: `/${currentLocale}/board-of-directors` },
      { label: 'Team Members', labelAr: 'فريق العمل', href: `/${currentLocale}/team-members` },
    ],
    projects: [
      { label: 'All Projects', labelAr: 'جميع المشاريع', href: `/${currentLocale}/projects` },
      { label: 'Categories', labelAr: 'الفئات', href: `/${currentLocale}/projects/categories` },
    ],
    media: [
      { label: 'Images', labelAr: 'الصور', href: `/${currentLocale}/media/images` },
      { label: 'Videos', labelAr: 'الفيديوهات', href: `/${currentLocale}/media/videos` },
      { label: 'Publications', labelAr: 'النشرات', href: `/${currentLocale}/media/publications` },
      { label: 'Reports', labelAr: 'التقارير', href: `/${currentLocale}/media/reports` },
      { label: 'Success Stories', labelAr: 'القصص الناجحة', href: `/${currentLocale}/media/success-stories` },
    ],
    contact: [
      { label: 'Contact Us', labelAr: 'تواصل معنا', href: `/${currentLocale}/contact-us` },
      { label: 'Become a Volunteer', labelAr: 'أصبح متطوعا', href: `/${currentLocale}/become-a-volunteer` },
      { label: 'Work with Us', labelAr: 'العمل معنا', href: `/${currentLocale}/work-with-us` },
    ],
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

  const toggleLocale = () => {
    const newLocale: Locale = currentLocale === 'en' ? 'ar' : 'en';
    const newPath = mapPathToLocale(pathname, currentLocale, newLocale);
    router.push(newPath);
  };

  function mapPathToLocale(path: string, from: Locale, to: Locale): string {
    try {
      const parts = path.split('/'); // ['', locale, ...]
      if (parts.length < 3) {
        parts[1] = to;
        return parts.join('/');
      }
      const section = parts[2];
      const setLocale = (p: string[]) => { p[1] = to; return p.join('/'); };
      const decode = (s: string) => {
        try { return decodeURIComponent(s); } catch { return s; }
      };
      const encode = (s: string) => encodeURIComponent(s);

      if (section === 'projects') {
        if (parts[3] === 'categories' && parts.length >= 5) {
          const slug = decode(parts[4]);
          const found = mockProjectCategories.find(c => c.slugEn === slug || c.slugAr === slug);
          if (found) {
            parts[1] = to;
            parts[4] = encode(to === 'en' ? found.slugEn : found.slugAr);
            return parts.join('/');
          }
        } else if (parts.length >= 4) {
          const slug = decode(parts[3]);
          const found = mockProjects.find(p => p.slugEn === slug || p.slugAr === slug);
          if (found) {
            // availability check
            const available = to === 'en' ? (typeof (found as any).isEnglish === 'boolean' ? (found as any).isEnglish : true)
                                         : (typeof (found as any).isArabic === 'boolean' ? (found as any).isArabic : true);
            if (!available) {
              parts[1] = to;
              parts.splice(3); // go to /:locale/projects
              return parts.join('/');
            }
            parts[1] = to;
            parts[3] = encode(to === 'en' ? found.slugEn : found.slugAr);
            return parts.join('/');
          }
        }
      }

      if (section === 'programs' && parts.length >= 4) {
        const slug = decode(parts[3]);
        const found = mockPrograms.find(p => p.slugEn === slug || p.slugAr === slug);
        if (found) {
          parts[1] = to;
          parts[3] = encode(to === 'en' ? found.slugEn : found.slugAr);
          return parts.join('/');
        }
      }

      if (section === 'media' && parts.length >= 5) {
        const mediaType = parts[3];
        const slug = decode(parts[4]);
        if (mediaType === 'videos') {
          const found = mockVideos.find(v => v.slugEn === slug || v.slugAr === slug);
          if (found) {
            parts[1] = to;
            parts[4] = encode(to === 'en' ? found.slugEn : found.slugAr);
            return parts.join('/');
          }
        } else if (mediaType === 'images') {
          const found = mockPhotos.find(i => i.slugEn === slug || i.slugAr === slug);
          if (found) {
            // If photo has language availability flags in future, respect them. Otherwise assume both.
            parts[1] = to;
            parts[4] = encode(to === 'en' ? found.slugEn : found.slugAr);
            return parts.join('/');
          }
        } else if (mediaType === 'success-stories') {
          const found = mockStories.find(s => s.slugEn === slug || s.slugAr === slug);
          if (found) {
            const available = to === 'en' ? (typeof (found as any).isEnglish === 'boolean' ? (found as any).isEnglish : true)
                                         : (typeof (found as any).isArabic === 'boolean' ? (found as any).isArabic : true);
            if (!available) {
              parts[1] = to;
              parts.splice(4); // /:locale/media/success-stories
              return parts.join('/');
            }
            parts[1] = to;
            parts[4] = encode(to === 'en' ? found.slugEn : found.slugAr);
            return parts.join('/');
          }
        } else if (mediaType === 'publications') {
          const found = mockPublications.find(p => p.slugEn === slug || p.slugAr === slug);
          if (found) {
            const available = to === 'en' ? (typeof (found as any).isEnglish === 'boolean' ? (found as any).isEnglish : true)
                                         : (typeof (found as any).isArabic === 'boolean' ? (found as any).isArabic : true);
            if (!available) {
              parts[1] = to;
              parts.splice(4); // /:locale/media/publications
              return parts.join('/');
            }
            parts[1] = to;
            parts[4] = encode(to === 'en' ? found.slugEn : found.slugAr);
            return parts.join('/');
          }
        } else if (mediaType === 'reports') {
          const found = mockReports.find(p => p.slugEn === slug || p.slugAr === slug);
          if (found) {
            const available = to === 'en' ? (typeof (found as any).isEnglish === 'boolean' ? (found as any).isEnglish : true)
                                         : (typeof (found as any).isArabic === 'boolean' ? (found as any).isArabic : true);
            if (!available) {
              parts[1] = to;
              parts.splice(4); // /:locale/media/reports
              return parts.join('/');
            }
            parts[1] = to;
            parts[4] = encode(to === 'en' ? found.slugEn : found.slugAr);
            return parts.join('/');
          }
        }
      }

      // Fallback: just swap locale segment
      parts[1] = to;
      return parts.join('/');
    } catch {
      const parts = path.split('/');
      parts[1] = to;
      return parts.join('/');
    }
  }

  if (!mounted) return null;

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-transform duration-300  ${showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <div className="bg-[var(--background)] text-[var(--foreground)] border-b border-[var(--border)] shadow-sm">
        <div className="container mx-auto px-8 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${currentLocale}`} className="flex items-center gap-3">
            <Image src="/assets/logo.png" alt="Logo" width={40} height={40} />
            <h1 className="font-bold text-xl text-[var(--brand-primary)]">
              {currentLocale === 'en' ? 'Smile Foundation' : 'مؤسسة ابتسامة التنموية'}
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href={`/${currentLocale}`}
              className={`hover:text-[var(--brand-primary)] ${pathname === `/${currentLocale}` ? 'text-[var(--brand-primary)] font-bold' : ''
                }`}
            >
              {currentLocale === 'en' ? 'Home' : 'الرئيسية'}
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
                    {menuLabels[currentLocale][key as MenuKey]}
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
                        {items.map(({ label, labelAr, href }) => {
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
                                {currentLocale === 'en' ? label : labelAr}
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
            <button className="bg-[var(--brand-primary)] px-4 py-2 text-white rounded-md hidden md:block">
              {currentLocale === 'en' ? 'Donate' : 'تبرع'}
            </button>
            <LucideSearch className="w-5 h-5 cursor-pointer hover:text-[var(--brand-primary)] hidden md:block" />
            <button onClick={toggleTheme} className="p-2 rounded hover:bg-[var(--accent)] hidden md:block">
              {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={toggleLocale} className="p-2 rounded hover:bg-[var(--accent)] hidden md:block" aria-label="Toggle language">
              <Languages className="w-5 h-5" />
            </button>
            <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ x: currentLocale === 'ar' ? 300 : -300 }}
              animate={{ x: 0 }}
              exit={{ x: currentLocale === 'ar' ? 300 : -300 }}
              className={`fixed top-0 ${currentLocale === 'ar' ? 'right-0' : 'left-0'} h-screen w-64 bg-[var(--background)] border-[var(--border)] shadow-lg z-50 p-6`}
            >
              {Object.entries(menuItems).map(([key, items]) => (
                <div key={key} className="mb-6">
                  <p className="font-semibold mb-2">
                    {currentLocale === 'en' ? key.charAt(0).toUpperCase() + key.slice(1) : menuLabels[currentLocale][key as MenuKey]}
                  </p>
                  {items.map(({ label, labelAr, href }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`block py-1 px-2 rounded transition ${pathname === href || pathname.startsWith(href + '/')
                        ? 'bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold'
                        : ''
                        }`}
                    >
                      {currentLocale === 'en' ? label : labelAr}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <button className="bg-[var(--brand-primary)] px-4 py-2 text-white rounded-md">
                  {currentLocale === 'en' ? 'Donate' : 'تبرع'}
                </button>
                <LucideSearch className="w-5 h-5 cursor-pointer hover:text-[var(--brand-primary)]" />
                <button onClick={toggleTheme} className="p-2 rounded hover:bg-[var(--accent)]">
                  {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button onClick={toggleLocale} className="p-2 rounded hover:bg-[var(--accent)]" aria-label="Toggle language">
                  <Languages className="w-5 h-5" />
                </button>
              </div>

            </motion.div>

          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
