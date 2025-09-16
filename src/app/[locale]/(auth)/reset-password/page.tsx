"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ResetPasswordPage() {
  const { locale } = useParams<{ locale: string }>();

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

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="mx-auto flex min-h-[70svh] w-full max-w-md items-center px-4 py-10 sm:max-w-lg">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">{t.email}</label>
              <Input
                id="email"
                type="email"
                placeholder={t.emailPlaceholder}
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {message && <p className="text-sm text-green-600">{message}</p>}
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? t.sending : t.send}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}