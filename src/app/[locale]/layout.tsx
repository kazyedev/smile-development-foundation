import { ProgressBar } from "@/app/ProgressBar";
import { Suspense } from "react";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Suspense fallback={null}>
        <ProgressBar />
      </Suspense>
      {children}
    </div>
  );
}