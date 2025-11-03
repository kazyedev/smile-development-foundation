/**
 * Maps CMS route paths to section names from the userSectionEnum
 * Returns null for routes that should always be visible (like dashboard)
 */
export function routeToSection(href: string): string | null {
  // Remove locale prefix if present (e.g., /en/cms/dashboard -> /cms/dashboard)
  const path = href.replace(/^\/[a-z]{2}\//, '/').replace(/\/$/, '');
  
  // Dashboard is always visible
  if (path === '/cms/dashboard' || path === '/cms') {
    return null;
  }

  // Map routes to section names
  const routeMap: Record<string, string> = {
    // Programs & Projects
    '/cms/programs': 'programs',
    '/cms/projects': 'projects',
    '/cms/project-categories': 'project_categories',
    '/cms/Initiatives/programs': 'programs',
    '/cms/Initiatives/projects': 'projects',
    '/cms/Initiatives/activities': 'activities',
    
    // Media sections
    '/cms/media/videos': 'videos',
    '/cms/media/images': 'images',
    '/cms/media/photo': 'photos',
    '/cms/media/publications': 'publications',
    '/cms/media/reports': 'reports',
    '/cms/media/activities': 'activities',
    '/cms/media/success-stories': 'success_stories',
    '/cms/media/categories': 'statics', // Media categories fall under statics
    
    // News sections
    '/cms/news/news': 'news',
    '/cms/content/news': 'news',
    '/cms/news/categories': 'news_categories',
    '/cms/content/news-categories': 'news_categories',
    '/cms/news/newsletters': 'email_newsletters',
    '/cms/content/email-newsletters': 'email_newsletters',
    '/cms/news/newsletter-members': 'newsletter_members',
    
    // Identity sections
    '/cms/identity/foundation-profile': 'foundation_profile',
    '/cms/identity/admin-accounts': 'admin_accounts',
    '/cms/identity/partners': 'partners',
    '/cms/identity/contact-info': 'foundation_profile', // Contact info is part of foundation profile
    '/cms/identity/donations-info': 'donations',
    '/cms/identity/faqs': 'faqs',
    
    // HR sections
    '/cms/hr/jobs': 'jobs',
    '/cms/hr/job-applications': 'job_applications',
    '/cms/hr/volunteer-requests': 'volunteer_requests',
    
    // Website data
    '/cms/website-data/home-slides': 'home_slides',
    '/cms/website-data/faqs': 'faqs',
    
    // Foundation info
    '/cms/foundation-info/team': 'team_members',
    
    // Other sections
    '/cms/donations': 'donations',
    '/cms/statistics': 'statistics',
  };

  // Check exact match first
  if (routeMap[path]) {
    return routeMap[path];
  }

  // Check if path starts with any mapped route (for nested routes)
  for (const [route, section] of Object.entries(routeMap)) {
    if (path.startsWith(route)) {
      return section;
    }
  }

  // Unknown route - return null to allow access (fallback)
  // In production, you might want to return a specific value or log a warning
  return null;
}

/**
 * Checks if a user has access to a section based on their role and allowed sections
 */
export function hasSectionAccess(
  section: string | null,
  userRole: string,
  allowedSections: string[] = []
): boolean {
  // Dashboard and null sections are always visible
  if (section === null) {
    return true;
  }

  // Super admins, admins, and content managers see everything
  if (['super_admin', 'admin', 'content_manager'].includes(userRole)) {
    return true;
  }

  // Author role always has access to news-related sections
  if (userRole === 'author') {
    const newsSections = ['news', 'news_categories', 'email_newsletters', 'newsletter_members'];
    if (newsSections.includes(section)) {
      return true;
    }
  }

  // For viewer and author roles, check if section is in allowedSections
  if (['viewer', 'author'].includes(userRole)) {
    return allowedSections.includes(section);
  }

  // Default role or unknown role - no access
  return false;
}

/**
 * Extracts section names from allowedSections array
 * allowedSections is an array of objects: [{ section: "programs", actions: ["read", "create"] }, ...]
 */
export function extractSectionNames(allowedSections: any[]): string[] {
  if (!Array.isArray(allowedSections)) {
    return [];
  }
  
  return allowedSections
    .map(item => {
      if (typeof item === 'object' && item !== null && 'section' in item) {
        return item.section;
      }
      return null;
    })
    .filter((section): section is string => section !== null);
}

