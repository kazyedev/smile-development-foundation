"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CMSPage() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard since this is the main CMS landing page
    router.replace(`/${locale}/cms/dashboard`);
  }, [locale, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
