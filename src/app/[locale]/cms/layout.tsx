import DashboardHeader from "@/components/cms/DahsboardHeader";
import Sidebar from "@/components/cms/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function CmsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SidebarProvider>
      <DashboardHeader />
        <Sidebar />
        {children}
      </SidebarProvider>
    </div>
  );
}