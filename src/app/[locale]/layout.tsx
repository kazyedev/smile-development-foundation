import { ProgressBar } from "@/app/ProgressBar";

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
      <ProgressBar />
      {children}
    </div>
  );
}