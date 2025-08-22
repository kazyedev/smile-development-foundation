"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Shield, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

export default function ResetPasswordPage() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();

  const translations = {
    en: {
      title: "Reset Your Password",
      subtitle: "Forgot your password?",
      description: "Enter your email address and we'll send you a secure link to reset your password",
      email: "Email Address",
      send: "Send Reset Link",
      sending: "Sending...",
      success: "Reset email sent successfully!",
      successDescription: "Check your inbox and follow the instructions to reset your password",
      unknownError: "Failed to send reset email",
      emailPlaceholder: "Enter your email address",
      backToLogin: "Back to Login",
      emailRequired: "Email is required",
      invalidEmail: "Please enter a valid email address",
      features: [
        "Secure password reset process",
        "Link expires in 24 hours",
        "No password sharing",
        "Immediate email delivery"
      ]
    },
    ar: {
      title: "إعادة تعيين كلمة المرور",
      subtitle: "نسيت كلمة المرور؟",
      description: "أدخل عنوان بريدك الإلكتروني وسنرسل لك رابطًا آمنًا لإعادة تعيين كلمة المرور",
      email: "البريد الإلكتروني",
      send: "إرسال رابط إعادة التعيين",
      sending: "جاري الإرسال...",
      success: "تم إرسال رسالة إعادة التعيين بنجاح!",
      successDescription: "تحقق من بريدك واتبع التعليمات لإعادة تعيين كلمة المرور",
      unknownError: "فشل إرسال رسالة إعادة التعيين",
      emailPlaceholder: "أدخل عنوان بريدك الإلكتروني",
      backToLogin: "العودة لتسجيل الدخول",
      emailRequired: "البريد الإلكتروني مطلوب",
      invalidEmail: "يرجى إدخال عنوان بريد إلكتروني صحيح",
      features: [
        "عملية إعادة تعيين كلمة مرور آمنة",
        "ينتهي الرابط خلال 24 ساعة",
        "لا يتم مشاركة كلمة المرور",
        "تسليم فوري للبريد الإلكتروني"
      ]
    },
  } as const;

  const isArabic = locale === "ar";
  const t = isArabic ? translations.ar : translations.en;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (!email.trim()) {
      setEmailError(t.emailRequired);
      return false;
    } else if (!validateEmail(email)) {
      setEmailError(t.invalidEmail);
      return false;
    } else {
      setEmailError(null);
      return true;
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t.unknownError);
      setMessage(t.success);
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
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                </div>
                <span className="text-muted-foreground">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Reset Form */}
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
                <Shield className="w-8 h-8 text-brand-primary" />
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

                {/* Success Message */}
                {message && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-green-800 dark:text-green-200">
                          {t.success}
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                          {t.successDescription}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Error Message */}
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
                  disabled={loading || !!message} 
                  className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white py-3 text-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      {message ? t.success : t.send}
                      {!message && <ArrowRight className="w-4 h-4 ml-2" />}
                    </>
                  )}
                </Button>

                {/* Back to Login */}
                <div className="text-center pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.push(`/${locale}/login`)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t.backToLogin}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}