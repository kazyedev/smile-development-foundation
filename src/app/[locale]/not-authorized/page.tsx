"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ShieldX, Home, Mail, AlertCircle } from "lucide-react";

export default function NotAuthorizedPage() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();

  const translations = {
    en: {
      title: "Access Not Authorized",
      subtitle: "Account Created Successfully",
      description: "Your account has been created, but you don't have permission to access the CMS dashboard.",
      signedOut: "You have been automatically signed out for security reasons.",
      requestAccess: "To request access to the CMS, please contact your administrator:",
      contactAdmin: "Contact Administrator",
      adminEmail: "admin@example.com",
      whatNext: "What happens next?",
      nextSteps: [
        "Your administrator will review your request",
        "They will assign the appropriate role to your account",
        "You'll receive an email confirmation when access is granted",
        "You can then sign in again with full CMS access"
      ],
      backHome: "Back to Home",
      tryAgain: "Try Signing In Again",
      accountInfo: "Account Information",
      roleRequired: "CMS access requires an admin, super admin, or content manager role.",
      securityNote: "This is a security measure to protect sensitive system areas."
    },
    ar: {
      title: "غير مصرح بالدخول",
      subtitle: "تم إنشاء الحساب بنجاح",
      description: "تم إنشاء حسابك، ولكن ليس لديك إذن للوصول إلى لوحة تحكم نظام إدارة المحتوى.",
      signedOut: "تم تسجيل خروجك تلقائياً لأسباب أمنية.",
      requestAccess: "لطلب الوصول إلى نظام إدارة المحتوى، يرجى التواصل مع المدير:",
      contactAdmin: "التواصل مع المدير",
      adminEmail: "admin@example.com",
      whatNext: "ما الخطوات التالية؟",
      nextSteps: [
        "سيقوم المدير بمراجعة طلبك",
        "سيتم تعيين الدور المناسب لحسابك",
        "ستتلقى بريد إلكتروني بالتأكيد عند منح الوصول",
        "يمكنك بعدها تسجيل الدخول مرة أخرى مع الوصول الكامل للنظام"
      ],
      backHome: "العودة للرئيسية",
      tryAgain: "المحاولة مرة أخرى",
      accountInfo: "معلومات الحساب",
      roleRequired: "الوصول لنظام إدارة المحتوى يتطلب دور مدير أو مدير عام أو مدير محتوى.",
      securityNote: "هذا إجراء أمني لحماية المناطق الحساسة في النظام."
    },
  } as const;

  const isArabic = locale === "ar";
  const t = isArabic ? translations.ar : translations.en;

  // Auto-logout on page load to ensure user is signed out
  useEffect(() => {
    const performLogout = async () => {
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
      } catch (error) {
        console.log('Logout attempt (may already be logged out):', error);
      }
    };
    
    performLogout();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Side - Information */}
        <motion.div 
          className="space-y-6"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.div variants={fadeInUp} className="text-center lg:text-left">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-red-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto lg:mx-0">
              <ShieldX className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {t.description}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">{t.signedOut}</p>
                <p className="text-amber-700 dark:text-amber-300">{t.securityNote}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t.whatNext}</h3>
            <div className="space-y-3">
              {t.nextSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <div className="w-6 h-6 bg-brand-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-brand-primary">{index + 1}</span>
                  </div>
                  <span>{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Action Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <Card className="border-0 shadow-xl bg-background/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-brand-primary" />
              </div>
              <CardTitle className="text-xl font-bold mb-2">{t.subtitle}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {t.roleRequired}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">{t.requestAccess}</p>
                
                <Button
                  onClick={() => window.open(`mailto:${t.adminEmail}?subject=CMS Access Request&body=Hello, I would like to request access to the CMS dashboard. Please assign the appropriate role to my account.`)}
                  className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {t.contactAdmin}
                </Button>

                <div className="text-xs text-muted-foreground">
                  {t.adminEmail}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button
                  onClick={() => router.push(`/${locale}`)}
                  variant="outline"
                  className="w-full"
                >
                  <Home className="w-4 h-4 mr-2" />
                  {t.backHome}
                </Button>
                
                <Button
                  onClick={() => router.push(`/${locale}/login`)}
                  variant="outline"
                  className="w-full"
                >
                  {t.tryAgain}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
