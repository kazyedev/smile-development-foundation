"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Shield, Users } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

export default function LoginPage() {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const { login, isLoading: authLoading } = useAuth();

  const translations = {
    en: {
      title: "Welcome Back",
      subtitle: "Sign in to your account",
      description: "Access your personalized dashboard and continue making a difference",
      email: "Email Address",

      password: "Password",
      signIn: "Sign In",
      signingIn: "Signing In...",
      forgotPassword: "Forgot your password?",
      createAccount: "Don't have an account?",
      signUp: "Sign up",

      unknownError: "Failed to login",
      emailPlaceholder: "Enter your email",
      passwordPlaceholder: "Enter your password",

      notAuthorized: "Not authorized. Please contact your admin to set a role.",
      backHome: "Back to Home",
      emailRequired: "Email is required",
      passwordRequired: "Password is required",
      invalidEmail: "Please enter a valid email address",
      features: [
        "Access to exclusive content",
        "Personalized dashboard",
        "Track your contributions",
        "Connect with community"
      ],

    },
    ar: {
      title: "مرحباً بعودتك",
      subtitle: "سجل دخولك إلى حسابك",
      description: "احصل على لوحة التحكم الشخصية واستمر في إحداث فرق",

      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      signIn: "تسجيل الدخول",
      signingIn: "جاري تسجيل الدخول...",
      forgotPassword: "نسيت كلمة المرور؟",
      createAccount: "ليس لديك حساب؟",
      signUp: "سجل الآن",

      unknownError: "فشل تسجيل الدخول",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      passwordPlaceholder: "أدخل كلمة المرور",

      notAuthorized: "غير مخول. يرجى التواصل مع المسؤول لتعيين دور.",
      backHome: "العودة للرئيسية",
      emailRequired: "البريد الإلكتروني مطلوب",
      passwordRequired: "كلمة المرور مطلوبة",
      invalidEmail: "يرجى إدخال عنوان بريد إلكتروني صحيح",
      features: [
        "الوصول إلى محتوى حصري",
        "لوحة تحكم شخصية",
        "تتبع مساهماتك",
        "تواصل مع المجتمع"
      ],

    },
  } as const;

  const isArabic = locale === "ar";
  const t = isArabic ? translations.ar : translations.en;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [alreadyLogged, setAlreadyLogged] = useState(false);


  // If already authenticated, redirect to cms (will be guarded by layout)
  useEffect(() => {
    (async () => {
      try {
        const profRes = await fetch("/api/auth/profile", { cache: "no-store" });
        if (profRes.ok) {
          const profileData = await profRes.json();
          // Only redirect if user has admin role
          if (profileData.profile && profileData.profile.role !== "default") {
            setAlreadyLogged(true);
            if (locale && typeof locale === 'string') {
              router.push(`/${locale}/cms`);
              router.refresh();
            }
          }
        }
      } catch {}
    })();
  }, [locale, router]);

  // If user is already logged in and has admin role, redirect to CMS
  if (alreadyLogged) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg animate-pulse"></div>
          </div>
          <h2 className="text-xl font-semibold mb-2">Redirecting to CMS...</h2>
          <p className="text-muted-foreground">You are already logged in</p>
        </div>
      </div>
    );
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;
    
    if (!email.trim()) {
      setEmailError(t.emailRequired);
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError(t.invalidEmail);
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (!password.trim()) {
      setPasswordError(t.passwordRequired);
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        // Login successful, redirect to CMS
        router.push(`/${locale}/cms`);
        router.refresh();
      } else {
        setError(result.error || t.unknownError);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

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

  // Show loading state while auth is initializing
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Features */}
        <motion.div 
          className="hidden lg:block"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-brand-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t.description}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4">
            {t.features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-center gap-3 text-muted-foreground"
              >
                <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-0 shadow-2xl bg-background/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-brand-primary" />
              </div>
              <CardTitle className="text-2xl font-bold mb-2">{t.subtitle}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {t.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    {t.email}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 ${emailError ? 'border-red-500' : ''}`}
                      disabled={loading}
                    />
                  </div>
                  {emailError && (
                    <p className="text-sm text-red-500">{emailError}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    {t.password}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t.passwordPlaceholder}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 pr-10 ${passwordError ? 'border-red-500' : ''}`}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-sm text-red-500">{passwordError}</p>
                  )}
                </div>

                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {t.signingIn}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {t.signIn}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="text-center space-y-4">
                <div>
                  <a
                    href={`/${locale}/reset-password`}
                    className="text-sm text-brand-primary hover:text-brand-primary/80 transition-colors"
                  >
                    {t.forgotPassword}
                  </a>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {t.createAccount}{" "}
                  <a
                    href={`/${locale}/signup`}
                    className="text-brand-primary hover:text-brand-primary/80 font-medium transition-colors"
                  >
                    {t.signUp}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}