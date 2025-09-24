'use client';

import { useEffect, useRef, useState } from 'react';
import { LucideSearch, Sun, Moon, Menu, X, Languages, Heart, Globe, ChevronDown, Sparkles, Shield } from 'lucide-react';
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
import { mockNews } from '@/data/mockNews';
import { mockNewsCategories } from '@/data/mockNewsCategories';

export default function Header() {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [delayedHoveredMenu, setDelayedHoveredMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() ?? '/';
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [showHeader, setShowHeader] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const lastScrollY = useRef(0);
  const router = useRouter();

  type Locale = 'en' | 'ar';
  type MenuKey = 'about' | 'projects' | 'media' | 'news' | 'contact';
  const currentLocale: Locale = pathname.startsWith('/ar') ? 'ar' : 'en';



  const menuLabels: Record<Locale, Record<MenuKey, string>> = {
    en: {
      about: 'About Us',
      projects: 'Projects',
      media: 'Media',
      contact: 'Contact Us',
      news: 'News',
    },
    ar: {
      about: 'عن المؤسسة',
      projects: 'المشاريع',
      media: 'الوسائط',
      contact: 'تواصل معنا',
      news: 'الأخبار',
    },
  };
  const menuItems = {


    about: [
      { label: 'About Us', labelAr: 'عن المؤسسة', href: `/${currentLocale}/about-us` },
      { label: 'Board of Directors', labelAr: 'مجلس الإدارة', href: `/${currentLocale}/board-of-directors` },
      { label: 'Team Members', labelAr: 'فريق العمل', href: `/${currentLocale}/team-members` },
    ],
    projects: [
      { label: 'Programs', labelAr: 'البرامج', href: `/${currentLocale}/programs` },
      { label: 'All Projects', labelAr: 'جميع المشاريع', href: `/${currentLocale}/projects` },
      { label: 'Categories', labelAr: 'فئات المشاريع', href: `/${currentLocale}/projects/categories` },
    ],
    media: [
      { label: 'Images', labelAr: 'الصور', href: `/${currentLocale}/media/images` },
      { label: 'Videos', labelAr: 'الفيديوهات', href: `/${currentLocale}/media/videos` },
      { label: 'Activities', labelAr: 'الأنشطة', href: `/${currentLocale}/activities` },
      { label: 'Publications', labelAr: 'النشرات', href: `/${currentLocale}/media/publications` },
      { label: 'Reports', labelAr: 'التقارير', href: `/${currentLocale}/media/reports` },
      { label: 'Success Stories', labelAr: 'قصص النجاح', href: `/${currentLocale}/media/success-stories` },
    ],
    news: [
      { label: 'All News', labelAr: 'كل الأخبار', href: `/${currentLocale}/news` },
      { label: 'Categories', labelAr: 'الفئات', href: `/${currentLocale}/news/categories` },
    ],
    contact: [
      { label: 'Contact Us', labelAr: 'تواصل معنا', href: `/${currentLocale}/contact-us` },
      { label: 'Become a Volunteer', labelAr: 'تطوع معنا', href: `/${currentLocale}/become-a-volunteer` },
      { label: 'Work with Us', labelAr: ' الوظائف', href: `/${currentLocale}/work-with-us` },
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => {
      const el = document.getElementById('global-search-input') as HTMLInputElement | null;
      el?.focus();
    }, 0);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return setSearchOpen(false);
    router.push(`/${currentLocale}/search-result?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
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

      if (section === 'news') {
        if (parts[3] === 'categories' && parts.length >= 5) {
          const slug = decode(parts[4]);
          const found = mockNewsCategories.find(c => c.slugEn === slug || c.slugAr === slug);
          if (found) {
            parts[1] = to;
            parts[4] = encode(to === 'en' ? found.slugEn : found.slugAr);
            return parts.join('/');
          }
        } else if (parts.length >= 4) {
          const slug = decode(parts[3]);
          const found = mockNews.find(n => n.slugEn === slug || n.slugAr === slug);
          if (found) {
            const available = to === 'en' ? (found.isEnglish ?? true) : (found.isArabic ?? true);
            if (!available) {
              parts[1] = to;
              parts.splice(3);
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
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      {/* Navigation Background with Gradient */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)]/5 via-transparent to-[var(--brand-secondary)]/5"></div>
        <div className="absolute inset-0 bg-[var(--background)]/95 backdrop-blur-xl"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]"></div>
        <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-[var(--brand-primary)] to-[var(--brand-secondary)]"></div>
        
        <div className="relative border-b border-[var(--border)]/50 shadow-lg shadow-[var(--brand-primary)]/5">
          <div className="container mx-auto px-8 py-4">
            {/* Main Navigation Row */}
            <div className="flex items-center justify-between">
              {/* Enhanced Logo Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link href={`/${currentLocale}`} className="flex items-center gap-4 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <Image src="/assets/logo.svg" alt="Logo" width={44} height={44} className="relative z-10 rounded-full" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--brand-secondary)] rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-bold text-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                      {currentLocale === 'en' ? 'Ebtsama Foundation' : 'مؤسسة ابتسامة التنموية'}
                    </h1>
                    <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                      <Sparkles className="w-3 h-3 text-[var(--brand-secondary)]" />
                      <span>{currentLocale === 'en' ? 'Building Better Futures' : 'نبني مستقبلاً أفضل'}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Enhanced Desktop Navigation */}
              <motion.nav 
                className="hidden lg:flex items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center bg-[var(--card)]/50 backdrop-blur-sm rounded-full px-2 py-1 shadow-md border border-[var(--border)]/30">
                  {/* Home Link */}
                  <Link
                    href={`/${currentLocale}`}
                    className={`px-4 py-2 rounded-full transition-all duration-300 font-medium ${
                      pathname === `/${currentLocale}` 
                        ? 'bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white shadow-lg' 
                        : 'hover:bg-[var(--accent)] text-[var(--foreground)] hover:text-[var(--brand-primary)]'
                    }`}
                  >
                    {currentLocale === 'en' ? 'Home' : 'الرئيسية'}
                  </Link>

                  {/* Navigation Menu Items */}
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
                          className={`px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer transition-all duration-300 font-medium ${
                            isActive 
                              ? 'bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white shadow-lg' 
                              : 'hover:bg-[var(--accent)] text-[var(--foreground)] hover:text-[var(--brand-primary)]'
                          }`}
                        >
                          {menuLabels[currentLocale][key as MenuKey]}
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform duration-300 ${
                              delayedHoveredMenu === key ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {delayedHoveredMenu === key && (
                            <motion.ul
                              key={key}
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full mt-3 w-56 bg-[var(--card)]/95 backdrop-blur-xl border border-[var(--border)]/50 rounded-2xl shadow-2xl shadow-[var(--brand-primary)]/10 z-50 overflow-hidden"
                              onMouseEnter={() => handleMouseEnter(key)}
                              onMouseLeave={handleMouseLeave}
                            >
                              <div className="p-2">
                                {items.map(({ label, labelAr, href }, index) => {
                                  const isItemActive = pathname === href;

                                  return (
                                    <motion.li
                                      key={href}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.05 }}
                                      className={`rounded-xl transition-all duration-200 ${
                                        isItemActive
                                          ? 'bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white shadow-md'
                                          : 'hover:bg-[var(--accent)] hover:shadow-sm'
                                      }`}
                                    >
                                      <Link href={href} className="flex items-center px-4 py-3 text-sm font-medium">
                                        <div className={`w-2 h-2 rounded-full mr-3 ${
                                          isItemActive ? 'bg-white' : 'bg-[var(--brand-secondary)]'
                                        }`}></div>
                                        {currentLocale === 'en' ? label : labelAr}
                                      </Link>
                                    </motion.li>
                                  );
                                })}
                              </div>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.nav>

              {/* Enhanced Action Controls */}
              <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Donate Button */}
                <Link 
                  href={`/${currentLocale}/donate`}
                  className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] hover:from-[var(--brand-secondary)] hover:to-[var(--brand-primary)] px-6 py-2.5 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Heart className="w-4 h-4" />
                  {currentLocale === 'en' ? 'Donate' : 'تبرع'}
                </Link>

                {/* Desktop Utility Controls */}
                <div className="hidden md:flex items-center bg-[var(--card)]/50 backdrop-blur-sm rounded-full px-2 py-1 shadow-md border border-[var(--border)]/30">
                  {/* Search Button */}
                  <button 
                    onClick={openSearch} 
                    className="p-2.5 rounded-full hover:bg-[var(--accent)] transition-all duration-200 group" 
                    aria-label="Search"
                  >
                    <LucideSearch className="w-5 h-5 group-hover:text-[var(--brand-primary)] transition-colors" />
                  </button>

                  {/* Theme Toggle */}
                  <button 
                    onClick={toggleTheme} 
                    className="p-2.5 rounded-full hover:bg-[var(--accent)] transition-all duration-200 group"
                    aria-label="Toggle theme"
                  >
                    <div className="relative">
                      {resolvedTheme === 'dark' ? (
                        <Sun className="w-5 h-5 group-hover:text-[var(--brand-secondary)] transition-colors" />
                      ) : (
                        <Moon className="w-5 h-5 group-hover:text-[var(--brand-primary)] transition-colors" />
                      )}
                    </div>
                  </button>

                  {/* Language Toggle */}
                  <button 
                    onClick={toggleLocale} 
                    className="p-2.5 rounded-full hover:bg-[var(--accent)] transition-all duration-200 group" 
                    aria-label="Toggle language"
                  >
                    <div className="flex items-center gap-1">
                      <Globe className="w-5 h-5 group-hover:text-[var(--brand-primary)] transition-colors" />
                      <span className="text-xs font-medium group-hover:text-[var(--brand-primary)] transition-colors">
                        {currentLocale.toUpperCase()}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                  className="md:hidden relative p-2.5 rounded-full bg-[var(--card)]/50 backdrop-blur-sm border border-[var(--border)]/30 shadow-md" 
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="Toggle mobile menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
              onClick={() => setMobileOpen(false)}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: currentLocale === 'ar' ? 400 : -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: currentLocale === 'ar' ? 400 : -400, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed top-0 ${currentLocale === 'ar' ? 'right-0' : 'left-0'} h-screen w-80 bg-[var(--background)]/95 backdrop-blur-xl border-${currentLocale === 'ar' ? 'l' : 'r'} border-[var(--border)]/50 shadow-2xl z-[70] overflow-y-auto`}
            >
              {/* Mobile Header */}
              <div className="p-6 border-b border-[var(--border)]/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image src="/assets/logo.svg" alt="Logo" width={40} height={40} className="rounded-full" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--brand-secondary)] rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] bg-clip-text text-transparent">
                        {currentLocale === 'en' ? 'Ebtsama Foundation' : 'مؤسسة ابتسامة التنموية'}
                      </h2>
                      <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        {currentLocale === 'en' ? 'Trusted by communities' : 'موثوق من المجتمعات'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Close Button */}
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-xl hover:bg-[var(--accent)] transition-all"
                    aria-label="Close mobile menu"
                  >
                    <X className="w-6 h-6 text-[var(--brand-primary)]" />
                  </button>
                </div>
              </div>

              {/* Mobile Navigation Menu */}
              <div className="p-6">
                {/* Home Link */}
                <Link
                  href={`/${currentLocale}`}
                  className={`flex items-center gap-3 p-4 rounded-2xl mb-4 transition-all duration-200 ${
                    pathname === `/${currentLocale}`
                      ? 'bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white shadow-lg'
                      : 'hover:bg-[var(--accent)] text-[var(--foreground)]'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    pathname === `/${currentLocale}` ? 'bg-white' : 'bg-[var(--brand-primary)]'
                  }`}></div>
                  <span className="font-semibold">
                    {currentLocale === 'en' ? 'Home' : 'الرئيسية'}
                  </span>
                </Link>

                {/* Menu Sections */}
                {Object.entries(menuItems).map(([key, items]) => (
                  <div key={key} className="mb-6">
                    <h3 className="font-bold text-sm text-[var(--brand-primary)] mb-3 flex items-center gap-2">
                      <div className="w-1 h-4 bg-gradient-to-b from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-full"></div>
                      {currentLocale === 'en' ? key.charAt(0).toUpperCase() + key.slice(1) : menuLabels[currentLocale][key as MenuKey]}
                    </h3>
                    <div className="space-y-1">
                      {items.map(({ label, labelAr, href }) => {
                        const isActive = pathname === href || pathname.startsWith(href + '/');
                        return (
                          <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                              isActive
                                ? 'bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white shadow-md'
                                : 'hover:bg-[var(--accent)] text-[var(--foreground)]'
                            }`}
                            onClick={() => setMobileOpen(false)}
                          >
                            <div className={`w-2 h-2 rounded-full ${
                              isActive ? 'bg-white' : 'bg-[var(--brand-secondary)]'
                            }`}></div>
                            <span className="text-sm font-medium">
                              {currentLocale === 'en' ? label : labelAr}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Footer Controls */}
              <div className="p-6 border-t border-[var(--border)]/30 mt-auto">
                {/* Donate Button */}
                <Link
                  href={`/${currentLocale}/donate`}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white py-3 rounded-2xl font-semibold mb-4 shadow-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  <Heart className="w-5 h-5" />
                  {currentLocale === 'en' ? 'Donate Now' : 'تبرع الآن'}
                </Link>

                {/* Utility Controls */}
                <div className="flex items-center justify-center gap-2">
                  <button 
                    onClick={openSearch} 
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[var(--card)] border border-[var(--border)]/30 hover:bg-[var(--accent)] transition-all"
                    aria-label="Search"
                  >
                    <LucideSearch className="w-4 h-4" />
                    <span className="text-sm">{currentLocale === 'en' ? 'Search' : 'بحث'}</span>
                  </button>
                  
                  <button 
                    onClick={toggleTheme} 
                    className="p-3 rounded-xl bg-[var(--card)] border border-[var(--border)]/30 hover:bg-[var(--accent)] transition-all"
                    aria-label="Toggle theme"
                  >
                    {resolvedTheme === 'dark' ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </button>
                  
                  <button 
                    onClick={toggleLocale} 
                    className="p-3 rounded-xl bg-[var(--card)] border border-[var(--border)]/30 hover:bg-[var(--accent)] transition-all"
                    aria-label="Toggle language"
                  >
                    <Globe className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Enhanced Search Dialog */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-md flex items-start justify-center pt-32 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl bg-[var(--card)]/95 backdrop-blur-xl text-[var(--foreground)] border border-[var(--border)]/50 rounded-3xl shadow-2xl shadow-[var(--brand-primary)]/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Header */}
              <div className="p-6 border-b border-[var(--border)]/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-xl">
                    <LucideSearch className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {currentLocale === 'en' ? 'Search Foundation' : 'البحث في المؤسسة'}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {currentLocale === 'en' ? 'Find projects, news, media and more...' : 'ابحث عن المشاريع والأخبار والوسائط والمزيد...'}
                    </p>
                  </div>
                </div>

                {/* Search Form */}
                <form onSubmit={submitSearch}>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <LucideSearch className="w-5 h-5 text-[var(--muted-foreground)]" />
                    </div>
                    <input
                      id="global-search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={currentLocale === 'en' ? 'Search for projects, news, media, or reports...' : 'ابحث عن المشاريع والأخبار والوسائط أو التقارير...'}
                      className="w-full pl-12 pr-4 py-4 bg-[var(--background)]/50 border border-[var(--border)]/30 rounded-2xl outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 transition-all placeholder:text-[var(--muted-foreground)]"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[var(--brand-secondary)]" />
                      <span className="text-xs text-[var(--muted-foreground)]">
                        {currentLocale === 'en' ? 'Try: "water project", "education", "sustainability"' : 'جرب: "مشروع المياه"، "التعليم"، "الاستدامة"'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => setSearchOpen(false)} 
                        className="px-4 py-2 rounded-xl text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)] transition-all"
                      >
                        {currentLocale === 'en' ? 'Cancel' : 'إلغاء'}
                      </button>
                      <button 
                        type="submit" 
                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                      >
                        <LucideSearch className="w-4 h-4" />
                        {currentLocale === 'en' ? 'Search' : 'بحث'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Search Suggestions */}
              <div className="p-6">
                <h4 className="font-semibold text-sm text-[var(--brand-primary)] mb-3">
                  {currentLocale === 'en' ? 'Quick Searches' : 'البحث السريع'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { en: 'Latest Projects', ar: 'أحدث المشاريع' },
                    { en: 'Success Stories', ar: 'قصص النجاح' },
                    { en: 'Annual Reports', ar: 'التقارير السنوية' },
                    { en: 'Community Impact', ar: 'التأثير المجتمعي' }
                  ].map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setSearchQuery(currentLocale === 'en' ? item.en : item.ar);
                        document.getElementById('global-search-input')?.focus();
                      }}
                      className="px-3 py-1.5 text-xs bg-[var(--background)]/50 hover:bg-[var(--accent)] border border-[var(--border)]/30 rounded-full transition-all hover:border-[var(--brand-primary)]/30"
                    >
                      {currentLocale === 'en' ? item.en : item.ar}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
