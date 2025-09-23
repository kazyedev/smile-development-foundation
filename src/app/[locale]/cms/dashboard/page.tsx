"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  FileText, 
  Image, 
  BarChart3, 
  TrendingUp, 
  Eye,
  Calendar,
  Globe,
  Activity,
  ArrowUpRight
} from "lucide-react";

export default function DashboardPage() {
  const { locale } = useParams<{ locale: string }>();
  const isArabic = locale === "ar";

  const translations = {
    en: {
      welcome: "Welcome to CMS Dashboard",
      subtitle: "Manage your content and monitor your foundation's digital presence",
      overview: "Overview",
      quickStats: "Quick Statistics",
      recentActivity: "Recent Activity",
      users: "Users",
      totalUsers: "Total Users",
      content: "Content",
      totalPosts: "Total Posts",
      media: "Media",
      totalImages: "Total Images",
      analytics: "Analytics",
      pageViews: "Page Views",
      viewAll: "View All",
      manageUsers: "Manage Users",
      createContent: "Create Content",
      uploadMedia: "Upload Media",
      viewAnalytics: "View Analytics",
      noActivity: "No recent activity",
      getStarted: "Get Started",
      quickActions: "Quick Actions"
    },
    ar: {
      welcome: "مرحباً بك في لوحة تحكم نظام إدارة المحتوى",
      subtitle: "إدارة المحتوى ومراقبة الحضور الرقمي للمؤسسة",
      overview: "نظرة عامة",
      quickStats: "إحصائيات سريعة",
      recentActivity: "النشاط الأخير",
      users: "المستخدمين",
      totalUsers: "إجمالي المستخدمين",
      content: "المحتوى",
      totalPosts: "إجمالي المنشورات",
      media: "الوسائط",
      totalImages: "إجمالي الصور",
      analytics: "التحليلات",
      pageViews: "مشاهدات الصفحة",
      viewAll: "عرض الكل",
      manageUsers: "إدارة المستخدمين",
      createContent: "إنشاء محتوى",
      uploadMedia: "رفع وسائط",
      viewAnalytics: "عرض التحليلات",
      noActivity: "لا يوجد نشاط حديث",
      getStarted: "البدء",
      quickActions: "إجراءات سريعة"
    }
  };

  const t = isArabic ? translations.ar : translations.en;

  // Mock data for demonstration
  const stats = [
    {
      title: t.totalUsers,
      value: "152",
      change: "+12%",
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: t.totalPosts,
      value: "89",
      change: "+5%",
      icon: FileText,
      color: "from-green-500 to-green-600"
    },
    {
      title: t.totalImages,
      value: "234",
      change: "+18%",
      icon: Image,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: t.pageViews,
      value: "12.4K",
      change: "+23%",
      icon: Eye,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const quickActions = [
    {
      title: t.manageUsers,
      description: "Add, edit, or remove user accounts",
      icon: Users,
      href: `/${locale}/cms/users`,
      color: "bg-blue-500"
    },
    {
      title: t.createContent,
      description: "Create new blog posts and articles",
      icon: FileText,
      href: `/${locale}/cms/content`,
      color: "bg-green-500"
    },
    {
      title: t.uploadMedia,
      description: "Upload and manage images and videos",
      icon: Image,
      href: `/${locale}/cms/media`,
      color: "bg-purple-500"
    },
    {
      title: t.viewAnalytics,
      description: "View detailed analytics and reports",
      icon: BarChart3,
      href: `/${locale}/cms/analytics`,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          {t.welcome}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t.subtitle}
        </p>
      </div>

      {/* Statistics Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t.quickStats}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change} from last month
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              {t.quickActions}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.location.href = action.href}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {t.recentActivity}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">New article published</div>
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">New user registered</div>
                  <div className="text-xs text-muted-foreground">5 hours ago</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <Image className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Media uploaded</div>
                  <div className="text-xs text-muted-foreground">1 day ago</div>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              {t.viewAll}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Welcome Message */}
      <Card className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border-brand-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">{t.getStarted}</h3>
              <p className="text-muted-foreground">
                {isArabic 
                  ? "مرحباً بك في نظام إدارة المحتوى. يمكنك البدء بإدارة المستخدمين أو إنشاء محتوى جديد."
                  : "Welcome to your content management system. You can start by managing users or creating new content."
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
