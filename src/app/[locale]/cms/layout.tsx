import CMSHeader from "@/components/cms/CMSHeader";
import Sidebar from "@/components/cms/Sidebar";

export default function CmsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CMSHeader />
      <Sidebar />
      {children}
    </div>
  );
}