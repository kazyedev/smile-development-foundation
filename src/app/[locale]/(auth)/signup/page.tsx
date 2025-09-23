"use client";

import React, { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Shield, Users, UserPlus } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

export default function SignupPage() {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const { signup, sendOTP, verifyOTP, confirmOTP } = useAuth();
  const translations = {
    en: {
      title: "Join Our Mission",
      subtitle: "Create your account",
      description: "Start your journey with us and help create sustainable change in communities",
      email: "Email Address",
      password: "Password",
      role: "Role",
      create: "Create account",
      creating: "Creating...",
      haveAccount: "Have an account? Sign in",
      unknownError: "Failed to sign up",
      emailPlaceholder: "you@example.com",
      otpLabel: "Verification code (OTP)",
      sendCode: "Send code",
      resendCode: "Resend code",
      verify: "Verify",
      verified: "Verified",
      verifyOtpFirst: "Please verify the OTP code first",
      enterSixDigits: "Please enter a 6-digit code",
      sendFailed: "Failed to send verification code",
      incorrectCode: "Incorrect verification code",
      resend: "Resend",
      sendFirst: "Please send the verification code first",
      passwordRequirements: [
        "At least 8 characters long",
        "Contains uppercase and lowercase letters",
        "Includes numbers and special characters"
      ],
      benefits: [
        "Access to exclusive programs",
        "Personalized dashboard",
        "Track your impact",
        "Connect with community leaders"
      ]
    },
    ar: {
      title: "انضم إلى مهمتنا",
      subtitle: "أنشئ حسابك",
      description: "ابدأ رحلتك معنا وساعد في خلق تغيير مستدام في المجتمعات",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      create: "إنشاء حساب",
      creating: "جاري الإنشاء...",
      haveAccount: "لديك حساب؟ سجل الدخول",
      unknownError: "فشل إنشاء الحساب",
      emailPlaceholder: "you@example.com",
      otpLabel: "رمز التحقق (OTP)",
      sendCode: "إرسال الرمز",
      resendCode: "إعادة إرسال الرمز",
      verify: "تحقق وإنشاء الحساب",
      verified: "✓ تم التحقق",
      verifyOtpFirst: "يرجى التحقق من رمز التحقق أولاً",
      enterSixDigits: "يرجى إدخال رمز من 6 أرقام",
      sendFailed: "فشل إرسال رمز التحقق",
      incorrectCode: "رمز تحقق غير صحيح",
      resend: "إعادة الإرسال",
      sendFirst: "يرجى إرسال رمز التحقق أولاً",
      passwordRequirements: [
        "8 أحرف على الأقل",
        "يحتوي على أحرف كبيرة وصغيرة",
        "يشمل أرقام ورموز خاصة"
      ],
      benefits: [
        "الوصول إلى برامج حصرية",
        "لوحة تحكم شخصية",
        "تتبع تأثيرك",
        "تواصل مع قادة المجتمع"
      ]
    },
  } as const;

  const isArabic = locale === "ar";
  const t = isArabic ? translations.ar : translations.en;
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"form" | "otp" | "done">("form");
  const [otpCode, setOtpCode] = useState("");
  const [otpStatus, setOtpStatus] = useState<"idle" | "sent" | "verified">("idle");
  const [otpLoading, setOtpLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef<number | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alreadyLogged, setAlreadyLogged] = useState(false);

  // If already authenticated, redirect appropriately
  React.useEffect(() => {
    (async () => {
      try {
        const profRes = await fetch("/api/auth/profile", { cache: "no-store" });
        if (profRes.ok) {
          const profileData = await profRes.json();
          // Redirect if user is already confirmed and has an account
          if (profileData.profile && profileData.profile.is_active) {
            setAlreadyLogged(true);
            if (locale && typeof locale === 'string') {
              // Redirect based on user role
              if (profileData.profile.role === 'admin' || profileData.profile.role === 'super_admin' || profileData.profile.role === 'content_manager') {
                router.push(`/${locale}/cms`);
                router.refresh();
              } else {
                try { await fetch('/api/auth/logout', { method: 'POST' }); } catch {}
                router.push(`/${locale}/not-authorized`);
                router.refresh();
              }
            }
          }
        }
      } catch {}
    })();
  }, [locale, router]);
  
  // Utility functions
  const startCooldown = (seconds: number) => {
    setCooldown(seconds);
    cooldownRef.current = window.setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          if (cooldownRef.current) {
            clearInterval(cooldownRef.current);
            cooldownRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatMMSS = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const sendOtp = async () => {
    if (!email || cooldown > 0) return;
    
    setOtpLoading(true);
    setOtpError(null);
    
    try {
      const result = await sendOTP(email);
      if (result.success) {
        setOtpStatus("sent");
        startCooldown(60);
      } else {
        setOtpError(result.error || t.sendFailed);
      }
    } catch (err) {
      setOtpError(t.sendFailed);
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOtp = async (code: string) => {
    if (!code || code.length !== 6) {
      setOtpError(t.enterSixDigits);
      return false;
    }

    setLoading(true);
    setOtpError(null);
    
    try {
      const result = await verifyOTP(email, code);
      if (result.success) {
        setOtpVerified(true);
        setOtpError(null);
        return true;
      } else {
        setOtpError(result.error || t.incorrectCode);
        return false;
      }
    } catch (err) {
      setOtpError(t.incorrectCode);
      return false;
    } finally {
      setLoading(false);
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phase !== "form") return;
    if (!email || !password) return;
    setLoading(true);
    setError(null);
    
    try {
      const result = await signup(email, password, role);
      if (result.success) {
        setPhase("otp");
        setOtpStatus("sent");
        startCooldown(60);
      } else {
        setError(result.error || t.unknownError);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t.unknownError);
    } finally {
      setLoading(false);
    }
  };

  // Clean up on unmount
  React.useEffect(() => {
    return () => {
      if (cooldownRef.current) {
        clearInterval(cooldownRef.current);
      }
    };
  }, []);

  function onChangeOtpInput(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 6);
    setOtpCode(digits);
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

  // If user is already logged in, show redirect message
  if (alreadyLogged) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg animate-pulse"></div>
          </div>
          <h2 className="text-xl font-semibold mb-2">Already signed in</h2>
          <p className="text-muted-foreground">Redirecting to your dashboard...</p>
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
            {t.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-center gap-3 text-muted-foreground"
              >
                <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                <span>{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Signup Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-0 shadow-2xl bg-background/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <UserPlus className="w-8 h-8 text-brand-primary" />
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
                      className="pl-10"
                      disabled={loading || phase !== "form"}
                      required
                    />
                  </div>
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
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      disabled={loading || phase !== "form"}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={loading || phase !== "form"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {phase === "otp" && (
                  <div className="space-y-2">
                    <label htmlFor="otp" className="text-sm font-medium text-foreground">
                      {t.otpLabel}
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="otp"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        placeholder="______"
                        className="text-center tracking-[0.5em]"
                        value={otpCode}
                        onChange={(e) => onChangeOtpInput(e.target.value)}
                        disabled={otpStatus === "verified"}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={sendOtp}
                        disabled={otpLoading || !email || cooldown > 0 || otpStatus === "verified"}
                      >
                        {cooldown > 0 ? formatMMSS(cooldown) : (otpStatus === "idle" ? t.sendCode : t.resend)}
                      </Button>
                    </div>
                    
                    {otpStatus === "verified" && (
                      <span className="text-xs text-green-600">{t.verified}</span>
                    )}
                    {otpError && (
                      <p className="text-xs text-destructive">{otpError}</p>
                    )}
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  disabled={loading || (phase === "otp" && otpCode.length !== 6)}
                  onClick={async (e) => {
                    if (phase !== "otp") return;
                    e.preventDefault();
                    setError(null);
                    const ok = await verifyOtp(otpCode);
                    if (ok) {
                      try {
                        const res = await fetch("/api/auth/otp/confirm", { method: "POST" });
                        const data = await res.json();
                        if (!res.ok) throw new Error(data.error || "Failed to confirm OTP");
                        setPhase("done");
                        
                        // Check user role and redirect appropriately
                        try {
                          const profRes = await fetch("/api/auth/profile", { cache: "no-store" });
                          if (profRes.ok) {
                            const profileData = await profRes.json();
                            if (profileData.profile && profileData.profile.is_active) {
                              if (profileData.profile.role === 'admin' || profileData.profile.role === 'super_admin' || profileData.profile.role === 'content_manager') {
                                router.push(`/${locale}/cms`);
                              } else {
                                // User is not authorized, logout and redirect
                                try { await fetch('/api/auth/logout', { method: 'POST' }); } catch {}
                                router.push(`/${locale}/not-authorized`);
                              }
                            } else {
                              try { await fetch('/api/auth/logout', { method: 'POST' }); } catch {}
                              router.push(`/${locale}/not-authorized`);
                            }
                          } else {
                            try { await fetch('/api/auth/logout', { method: 'POST' }); } catch {}
                            router.push(`/${locale}/not-authorized`);
                          }
                        } catch {
                          try { await fetch('/api/auth/logout', { method: 'POST' }); } catch {}
                          router.push(`/${locale}/not-authorized`);
                        }
                        router.refresh();
                      } catch (err: unknown) {
                        setError(err instanceof Error ? err.message : 'Unknown error');
                      }
                    }
                  }}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {t.creating}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {phase === "otp" ? t.verify : t.create}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="text-center">
                <div className="text-sm text-muted-foreground">
                  {t.haveAccount}{" "}
                  <a
                    href={`/${locale}/login`}
                    className="text-brand-primary hover:text-brand-primary/80 font-medium transition-colors"
                  >
                    Sign in
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
