"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SignupPage() {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const translations = {
    en: {
      title: "Create account",
      description: "Join the foundation",
      email: "Email",
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
      enterSixDigits: "Enter a 6-digit code",
      sendFailed: "Failed to send code",
      incorrectCode: "Incorrect code",
      resend: "Resend",
      sendFirst: "Please send the code first",
    },
    ar: {
      title: "إنشاء حساب",
      description: "انضم إلى المؤسسة",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      role: "الدور",
      create: "إنشاء حساب",
      creating: "جاري الإنشاء...",
      haveAccount: "لديك حساب؟ سجل الدخول",
      unknownError: "فشل إنشاء الحساب",
      emailPlaceholder: "you@example.com",
      otpLabel: "رمز التحقق (OTP)",
      sendCode: "إرسال الرمز",
      resendCode: "إعادة الإرسال",
      verify: "تحقق",
      verified: "تم التحقق",
      verifyOtpFirst: "يرجى التحقق من رمز التحقق أولاً",
      enterSixDigits: "أدخل رمزًا من 6 أرقام",
      sendFailed: "فشل إرسال الرمز",
      incorrectCode: "رمز غير صحيح",
      resend: "إعادة الإرسال",
      sendFirst: "يرجى إرسال الرمز أولاً",
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
  

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phase !== "form") return;
    if (!email || !password) return;
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
      // Supabase already sent OTP on sign up; start countdown immediately
      setOtpStatus("sent");
      startCooldown(60);
    } catch (err: any) {
      setError(err.message);
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
      // dev code removed
    } catch (err: any) {
      setError(err.message);
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
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setOtpLoading(false);
    }
  }

  function onChangeOtpInput(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 6);
    setOtpCode(digits);
    // do not auto-verify; verification happens on submit click
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
                disabled={phase !== "form"}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-medium">{t.password}</label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={phase !== "form"}
              />
            </div>
            {phase === "otp" && (
              <div className="grid gap-2">
                <label htmlFor="otp" className="text-sm font-medium">{t.otpLabel}</label>
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
              </div>
            )}
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            {/* <div className="grid gap-2">
              <label htmlFor="role" className="text-sm font-medium">{t.role}</label>
              <Input
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )} */}
            <Button
              type="submit"
              disabled={loading || (phase === "otp" && otpCode.length !== 6)}
              className="w-full"
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
                  } catch (err: any) {
                    setError(err.message);
                  }
                }
              }}
            >
              {loading ? t.creating : t.create}
            </Button>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => router.push(`/${locale}/login`)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {t.haveAccount}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}