"use client";

import { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
    } catch (err: unknown) {
      setError(err.message);
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
    } catch (err: unknown) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setLoading(true);
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
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
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
                  } catch (err: unknown) {
                    setError(err instanceof Error ? err.message : 'Unknown error');
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