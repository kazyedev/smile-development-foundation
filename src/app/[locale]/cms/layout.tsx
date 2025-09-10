import DashboardHeader from "@/components/cms/DahsboardHeader";
import Sidebar from "@/components/cms/DashboardSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CmsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${params.locale}/login`);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.role === "default") {
    redirect(`/${params.locale}`);
  }

  return (
    <div >
    <SidebarProvider>
      <Sidebar userProfile={profile} locale={params.locale} />
      <SidebarInset>
        <DashboardHeader />
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
    </div>
  );
}