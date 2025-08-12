"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();

  const translations = {
    en: {
      title: "Sign in",
      description: "Access your account",
      email: "Email",
      password: "Password",
      signIn: "Sign in",
      signingIn: "Signing in...",
      forgotPassword: "Forgot password?",
      createAccount: "Create an account",
      unknownError: "Failed to login",
      emailPlaceholder: "you@example.com",
      notAuthorized: "Not authorized. Please contact your admin to set a role.",
      backHome: "Back to home",
    },
    ar: {
      title: "تسجيل الدخول",
      description: "ادخل إلى حسابك",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      signIn: "تسجيل الدخول",
      signingIn: "جاري تسجيل الدخول...",
      forgotPassword: "هل نسيت كلمة المرور؟",
      createAccount: "إنشاء حساب",
      unknownError: "فشل تسجيل الدخول",
      emailPlaceholder: "you@example.com",
      notAuthorized: "غير مخول. يرجى التواصل مع المسؤول لتعيين دور.",
      backHome: "عودة للصفحة الرئيسية",
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

  // If already authenticated, redirect to cms (will be guarded by layout)
  // Do a quick check on mount
  useState(() => {
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
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
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
    } catch (err: any) {
      setError(err.message);
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
            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-medium">{t.password}</label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            {!blocked && (
              <Button type="submit" disabled={loading} className="w-full">
              {loading ? t.signingIn : t.signIn}
              </Button>
            )}
            {blocked && (
              <Button type="button" className="w-full" onClick={() => router.push(`/${locale}`)}>
                {t.backHome}
              </Button>
            )}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => router.push(`/${locale}/reset-password`)}
                className="text-sm text-primary underline-offset-4 hover:underline"
              >
                {t.forgotPassword}
              </button>
              <button
                type="button"
                onClick={() => router.push(`/${locale}/signup`)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {t.createAccount}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}