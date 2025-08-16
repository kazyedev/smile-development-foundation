"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ResetPasswordPage() {
  const { locale } = useParams<{ locale: string }>();

  const translations = {
    en: {
      title: "Reset password",
      description: "We will email you a reset link",
      email: "Email",
      send: "Send reset link",
      sending: "Sending...",
      success: "Reset email sent. Check your inbox.",
      unknownError: "Failed to send reset email",
      emailPlaceholder: "you@example.com",
    },
    ar: {
      title: "إعادة تعيين كلمة المرور",
      description: "سنرسل إليك رابط إعادة التعيين عبر البريد الإلكتروني",
      email: "البريد الإلكتروني",
      send: "إرسال رابط إعادة التعيين",
      sending: "جاري الإرسال...",
      success: "تم إرسال رسالة إعادة التعيين. تحقق من بريدك.",
      unknownError: "فشل إرسال رسالة إعادة التعيين",
      emailPlaceholder: "you@example.com",
    },
  } as const;
  const isArabic = locale === "ar";
  const t = isArabic ? translations.ar : translations.en;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
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