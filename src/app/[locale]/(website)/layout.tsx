import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";

export default async function WebsiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  return (
    <div className="overflow-x-hidden">
      <Header />
      <main>{children}</main>
      <Footer locale={locale} />
    </div>
  );
}