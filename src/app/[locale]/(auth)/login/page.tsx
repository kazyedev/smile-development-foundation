"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Shield, Users } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();

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
      ]
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
      ]
    },
  } as const;

  const isArabic = locale === "ar";
  const t = isArabic ? translations.ar : translations.en;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blocked, setBlocked] = useState(false);
  const [alreadyLogged, setAlreadyLogged] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // If already authenticated, redirect to cms (will be guarded by layout)
  useEffect(() => {
    (async () => {
      try {
        const profRes = await fetch("/api/auth/profile", { cache: "no-store" });
        if (profRes.ok) {
          setAlreadyLogged(true);
          router.push(`/${locale}/cms`);
          router.refresh();
        }
      } catch {}
    })();
  }, [locale, router]);

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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t.unknownError);

      // Fetch profile to check role before navigating
      const profRes = await fetch("/api/auth/profile", { cache: "no-store" });
      const prof = await profRes.json();
      if (!profRes.ok) throw new Error(prof.error || t.unknownError);
      if (!prof.profile || prof.profile.role === "default") {
        setBlocked(true);
        setError(t.notAuthorized);
        return;
      }
      router.push(`/${locale}/cms`);
      router.refresh();
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
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-8 h-8 bg-brand-primary/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-brand-primary" />
                </div>
                <span className="text-muted-foreground">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <Card className="w-full max-w-md shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <Lock className="w-8 h-8 text-brand-primary" />
              </motion.div>
              <CardTitle className="text-2xl font-bold">{t.subtitle}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {t.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {t.email}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(null);
                    }}
                    className={`transition-all duration-200 ${
                      emailError ? 'border-destructive focus:border-destructive' : ''
                    }`}
                    required
                  />
                  {emailError && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive"
                    >
                      {emailError}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    {t.password}
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t.passwordPlaceholder}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (passwordError) setPasswordError(null);
                      }}
                      className={`pr-10 transition-all duration-200 ${
                        passwordError ? 'border-destructive focus:border-destructive' : ''
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {passwordError && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive"
                    >
                      {passwordError}
                    </motion.p>
                  )}
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
                  >
                    <p className="text-sm text-destructive text-center" role="alert">
                      {error}
                    </p>
                  </motion.div>
                )}

                {!blocked && (
                  <Button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white py-3 text-lg font-semibold transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        {t.signIn}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}

                {blocked && (
                  <Button 
                    type="button" 
                    className="w-full bg-muted hover:bg-muted/80 text-muted-foreground" 
                    onClick={() => router.push(`/${locale}`)}
                  >
                    {t.backHome}
                  </Button>
                )}

                <div className="space-y-4 pt-4">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => router.push(`/${locale}/reset-password`)}
                      className="text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
                    >
                      {t.forgotPassword}
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-sm text-muted-foreground">{t.createAccount} </span>
                    <button
                      type="button"
                      onClick={() => router.push(`/${locale}/signup`)}
                      className="text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors font-medium"
                    >
                      {t.signUp}
                    </button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}