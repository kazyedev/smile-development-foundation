import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default async function WebsiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  return (
    <div className="overflow-x-hidden mt-10">
      <Header />
      <main>{children}</main>
      <ScrollToTop />

      <Footer locale={locale} />
    </div>
  );
}