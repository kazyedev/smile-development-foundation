"use client";

import { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Shield, Users, CheckCircle, AlertCircle } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  
  const translations = {
    en: {
      title: "Join Our Mission",
      subtitle: "Create your account",
      description: "Start your journey with us and help create sustainable change in communities",
      email: "Email Address",
      password: "Password",
      create: "Create Account",
      creating: "Creating Account...",
      haveAccount: "Already have an account?",
      signIn: "Sign in",
      unknownError: "Failed to sign up",
      emailPlaceholder: "Enter your email",
      passwordPlaceholder: "Create a strong password",
      otpLabel: "Verification Code",
      otpDescription: "Enter the 6-digit code sent to your email",
      sendCode: "Send Code",
      resendCode: "Resend Code",
      verify: "Verify & Create Account",
      verified: "✓ Verified",
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
      creating: "جاري إنشاء الحساب...",
      haveAccount: "لديك حساب بالفعل؟",
      signIn: "سجل دخولك",
      unknownError: "فشل إنشاء الحساب",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      passwordPlaceholder: "أنشئ كلمة مرور قوية",
      otpLabel: "رمز التحقق",
      otpDescription: "أدخل الرمز المكون من 6 أرقام المرسل إلى بريدك",
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
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const cooldownRef = useRef<number | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 && 
           /[a-z]/.test(password) && 
           /[A-Z]/.test(password) && 
           /\d/.test(password) && 
           /[!@#$%^&*(),.?":{}|<>]/.test(password);
  };

  const validateForm = () => {
    let isValid = true;
    
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError("Password must meet all requirements");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phase !== "form") return;
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t.unknownError);
      setPhase("otp");
      setOtpStatus("sent");
      startCooldown(60);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  function startCooldown(seconds: number) {
    setCooldown(seconds);
    if (cooldownRef.current) window.clearInterval(cooldownRef.current);
    const id = window.setInterval(() => {
      setCooldown((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          cooldownRef.current = null;
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    cooldownRef.current = id;
  }

  function formatMMSS(total: number) {
    const m = Math.floor(total / 60).toString();
    const s = (total % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  async function sendOtp() {
    setOtpLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t.sendFailed);
      setOtpStatus("sent");
      startCooldown(60);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setOtpLoading(false);
    }
  }

  async function verifyOtp(code: string): Promise<boolean> {
    if (code.length !== 6) {
      setError(t.enterSixDigits);
      return false;
    }
    if (otpStatus !== "sent") {
      setError(t.sendFirst);
      return false;
    }
    setOtpLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t.incorrectCode);
      setOtpStatus("verified");
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setOtpLoading(false);
    }
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Benefits */}
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
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-8 h-8 bg-brand-primary/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                </div>
                <span className="text-muted-foreground">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Signup Form */}
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
                <Users className="w-8 h-8 text-brand-primary" />
              </motion.div>
              <CardTitle className="text-2xl font-bold">{t.subtitle}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {t.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Email Field */}
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
                    disabled={phase !== "form"}
                  />
                  {emailError && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {emailError}
                    </motion.p>
                  )}
                </div>

                {/* Password Field */}
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
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (passwordError) setPasswordError(null);
                      }}
                      className={`pr-10 transition-all duration-200 ${
                        passwordError ? 'border-destructive focus:border-destructive' : ''
                      }`}
                      required
                      disabled={phase !== "form"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {/* Password Requirements */}
                  <div className="space-y-2">
                    {t.passwordRequirements.map((requirement, index) => {
                      const isMet = password.length >= 8 && 
                        /[a-z]/.test(password) && 
                        /[A-Z]/.test(password) && 
                        /\d/.test(password) && 
                        /[!@#$%^&*(),.?":{}|<>]/.test(password);
                      
                      return (
                        <motion.div
                          key={index}
                          className="flex items-center gap-2 text-xs"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className={`w-3 h-3 rounded-full flex items-center justify-center ${
                            isMet ? 'bg-green-500' : 'bg-muted'
                          }`}>
                            {isMet && <CheckCircle className="w-2 h-2 text-white" />}
                          </div>
                          <span className={isMet ? 'text-green-600' : 'text-muted-foreground'}>
                            {requirement}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {passwordError && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {passwordError}
                    </motion.p>
                  )}
                </div>

                {/* OTP Section */}
                {phase === "otp" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border/30"
                  >
                    <div className="text-center">
                      <h3 className="font-semibold mb-2">{t.otpLabel}</h3>
                      <p className="text-sm text-muted-foreground">{t.otpDescription}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Input
                          id="otp"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={6}
                          placeholder="______"
                          className="text-center tracking-[0.5em] text-lg font-mono"
                          value={otpCode}
                          onChange={(e) => onChangeOtpInput(e.target.value)}
                          disabled={otpStatus === "verified"}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={sendOtp}
                          disabled={otpLoading || !email || cooldown > 0 || otpStatus === "verified"}
                          className="whitespace-nowrap"
                        >
                          {cooldown > 0 ? formatMMSS(cooldown) : (otpStatus === "idle" ? t.sendCode : t.resend)}
                        </Button>
                      </div>
                      
                      {otpStatus === "verified" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center justify-center gap-2 text-green-600 text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          {t.verified}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
                  >
                    <p className="text-sm text-destructive text-center flex items-center justify-center gap-2" role="alert">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading || (phase === "otp" && otpCode.length !== 6)}
                  className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white py-3 text-lg font-semibold transition-all duration-200 transform hover:scale-[1.02]"
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
                        router.push(`/${locale}`);
                        router.refresh();
                      } catch (err: unknown) {
                        setError(err instanceof Error ? err.message : 'Unknown error');
                      }
                    }
                  }}
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      {phase === "otp" ? t.verify : t.create}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                {/* Sign In Link */}
                <div className="text-center pt-4">
                  <span className="text-sm text-muted-foreground">{t.haveAccount} </span>
                  <button
                    type="button"
                    onClick={() => router.push(`/${locale}/login`)}
                    className="text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors font-medium"
                  >
                    {t.signIn}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}