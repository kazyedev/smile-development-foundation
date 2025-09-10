"use client";

import { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Shield, Users, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

export default function SignupPage() {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const { signup, sendOTP, verifyOTP, confirmOTP, isLoading: authLoading } = useAuth();
  
  const translations = {
    en: {
      title: "Join Our Mission",
      subtitle: "Create your account",
      description: "Start your journey with us and help create sustainable change in communities",
      email: "Email Address",
      password: "Password",
      create: "Create Account",
      creating: "Creating Account...",
      sending: "Sending...",
      haveAccount: "Already have an account?",
      signIn: "Sign in",
      unknownError: "Failed to sign up",
      emailRequired: "Email is required",
      invalidEmail: "Please enter a valid email address",
      passwordRequired: "Password is required",
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
      sending: "جاري الإرسال...",
      haveAccount: "لديك حساب بالفعل؟",
      signIn: "سجل دخولك",
      unknownError: "فشل إنشاء الحساب",
      emailRequired: "البريد الإلكتروني مطلوب",
      invalidEmail: "يرجى إدخال عنوان بريد إلكتروني صحيح",
      passwordRequired: "كلمة المرور مطلوبة",
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
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const otpInputRef = useRef<HTMLInputElement>(null);

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
    } else if (!validatePassword(password)) {
      setPasswordError(t.passwordRequirements[0]);
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  const handleSendOTP = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    
    try {
      const result = await sendOTP(email);
      if (result.success) {
        setOtpSent(true);
        setPhase("otp");
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setError(result.error || t.sendFailed);
      }
    } catch (err) {
      setError(t.sendFailed);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otpCode.trim() || otpCode.length !== 6) {
      setOtpError(t.enterSixDigits);
      return;
    }

    setLoading(true);
    setOtpError(null);
    
    try {
      const result = await verifyOTP(email, otpCode);
      if (result.success) {
        setOtpVerified(true);
        setOtpError(null);
      } else {
        setOtpError(result.error || t.incorrectCode);
      }
    } catch (err) {
      setOtpError(t.incorrectCode);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    if (!otpVerified) {
      setError(t.verifyOtpFirst);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await signup(email, password, role);
      if (result.success) {
        setPhase("done");
        // Redirect to CMS after successful signup
        setTimeout(() => {
          router.push(`/${locale}/cms`);
        }, 2000);
      } else {
        setError(result.error || t.unknownError);
      }
    } catch (err) {
      setError(t.unknownError);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await sendOTP(email);
      if (result.success) {
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setError(result.error || t.sendFailed);
      }
    } catch (err) {
      setError(t.sendFailed);
    } finally {
      setLoading(false);
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

  if (phase === "done") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center border-0 shadow-2xl bg-background/80 backdrop-blur-sm">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-green-600">Account Created Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              Your account has been created and verified. Redirecting you to the dashboard...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Benefits */}
        <motion.div 
          className="hidden lg:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-brand-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t.description}
            </p>
          </div>

          <div className="space-y-4">
            {t.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 text-muted-foreground"
              >
                <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>
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
                <Users className="w-8 h-8 text-brand-primary" />
              </div>
              <CardTitle className="text-2xl font-bold mb-2">{t.subtitle}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {t.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {phase === "form" && (
                <div className="space-y-4">
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
                    
                    <div className="text-xs text-muted-foreground space-y-1">
                      {t.passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            validatePassword(password) ? 'bg-green-500' : 'bg-muted-foreground'
                          }`}></div>
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full p-3 border border-input rounded-lg bg-background text-foreground"
                      disabled={loading}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                  )}

                  <Button
                    type="button"
                    onClick={handleSendOTP}
                    className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {t.sending}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {t.sendCode}
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </div>
              )}

              {phase === "otp" && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold mb-2">{t.otpLabel}</h3>
                    <p className="text-sm text-muted-foreground">{t.otpDescription}</p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="otp" className="text-sm font-medium text-foreground">
                      {t.otpLabel}
                    </label>
                    <Input
                      ref={otpInputRef}
                      id="otp"
                      type="text"
                      placeholder="000000"
                      value={otpCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setOtpCode(value);
                        if (otpError) setOtpError(null);
                      }}
                      className="text-center text-lg tracking-widest"
                      maxLength={6}
                      disabled={loading}
                    />
                    {otpError && (
                      <p className="text-sm text-red-500">{otpError}</p>
                    )}
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Button
                      type="button"
                      onClick={handleVerifyOTP}
                      className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      disabled={loading || otpCode.length !== 6}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Verifying...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          {otpVerified ? t.verified : t.verify}
                          {otpVerified && <CheckCircle className="w-4 h-4" />}
                        </div>
                      )}
                    </Button>

                    {otpVerified && (
                      <Button
                        type="button"
                        onClick={handleCreateAccount}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            {t.creating}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {t.create}
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    )}
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={countdown > 0 || loading}
                      className="text-sm text-brand-primary hover:text-brand-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {countdown > 0 ? `${t.resend} (${countdown}s)` : t.resendCode}
                    </button>
                  </div>
                </div>
              )}

              <div className="text-center pt-4">
                <div className="text-sm text-muted-foreground">
                  {t.haveAccount}{" "}
                  <a
                    href={`/${locale}/login`}
                    className="text-brand-primary hover:text-brand-primary/80 font-medium transition-colors"
                  >
                    {t.signIn}
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