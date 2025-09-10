"use client";

import { useParams } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  FolderOpen, 
  Newspaper, 
  Video, 
  Activity, 
  TrendingUp,
  Settings,
  LogOut
} from "lucide-react";

export default function CMSPage() {
  const { locale } = useParams<{ locale: string }>();
  const { user, logout } = useAuth();
  
  const isEnglish = locale === "en";

  const translations = {
    en: {
      title: "Dashboard",
      subtitle: "Welcome to your CMS dashboard",
      stats: {
        users: "Total Users",
        projects: "Active Projects",
        news: "Published News",
        videos: "Video Content",
        activities: "Activities",
        impact: "Community Impact"
      },
      quickActions: "Quick Actions",
      manageUsers: "Manage Users",
      createProject: "Create Project",
      publishNews: "Publish News",
      uploadVideo: "Upload Video",
      settings: "Settings",
      logout: "Logout"
    },
    ar: {
      title: "لوحة التحكم",
      subtitle: "مرحباً بك في لوحة تحكم CMS",
      stats: {
        users: "إجمالي المستخدمين",
        projects: "المشاريع النشطة",
        news: "الأخبار المنشورة",
        videos: "محتوى الفيديو",
        activities: "الأنشطة",
        impact: "التأثير المجتمعي"
      },
      quickActions: "إجراءات سريعة",
      manageUsers: "إدارة المستخدمين",
      createProject: "إنشاء مشروع",
      publishNews: "نشر خبر",
      uploadVideo: "رفع فيديو",
      settings: "الإعدادات",
      logout: "تسجيل الخروج"
    }
  };

  const t = isEnglish ? translations.en : translations.ar;

  const stats = [
    { label: t.stats.users, value: "1,234", icon: Users, color: "text-blue-600" },
    { label: t.stats.projects, value: "56", icon: FolderOpen, color: "text-green-600" },
    { label: t.stats.news, value: "89", icon: Newspaper, color: "text-purple-600" },
    { label: t.stats.videos, value: "23", icon: Video, color: "text-red-600" },
    { label: t.stats.activities, value: "45", icon: Activity, color: "text-orange-600" },
    { label: t.stats.impact, value: "12.5K", icon: TrendingUp, color: "text-indigo-600" },
  ];

  const quickActions = [
    { label: t.manageUsers, icon: Users, href: "#" },
    { label: t.createProject, icon: FolderOpen, href: "#" },
    { label: t.publishNews, icon: Newspaper, href: "#" },
    { label: t.uploadVideo, icon: Video, href: "#" },
    { label: t.settings, icon: Settings, href: "#" },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ProtectedRoute redirectTo={`/${locale}/login`}>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Header */}
        <div className="bg-background/80 backdrop-blur-md border-b border-border/40">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {t.subtitle}, {user?.email}
                </p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t.logout}
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-muted/50 ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t.quickActions}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-brand-primary/10 text-brand-primary">
                        <action.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-medium">{action.label}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* User Info */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-foreground">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <p className="text-foreground capitalize">{user?.role}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                  <p className="text-foreground">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Login</label>
                  <p className="text-foreground">
                    {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}


