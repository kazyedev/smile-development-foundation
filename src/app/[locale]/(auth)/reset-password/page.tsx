"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Shield, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

export default function ResetPasswordPage() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const { resetPassword, isLoading: authLoading } = useAuth();

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
      const result = await resetPassword(email);
      
      if (result.success) {
        setMessage(t.success);
        setError(null);
      } else {
        setError(result.error || t.unknownError);
        setMessage(null);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setMessage(null);
    } finally {
      setLoading(false);
    }
  }

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
            {t.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 text-muted-foreground"
              >
                <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Reset Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-0 shadow-2xl bg-background/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-brand-primary" />
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

                {message && (
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <p className="text-sm font-medium">{message}</p>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      {t.successDescription}
                    </p>
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <AlertCircle className="w-4 h-4" />
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 h-4 border-b-2 border-white"></div>
                      {t.sending}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {t.send}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="text-center pt-4">
                <a
                  href={`/${locale}/login`}
                  className="inline-flex items-center gap-2 text-sm text-brand-primary hover:text-brand-primary/80 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t.backToLogin}
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}