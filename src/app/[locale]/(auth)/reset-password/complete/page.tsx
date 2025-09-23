"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, ArrowRight, Shield, CheckCircle2 } from "lucide-react";
import { supabaseClient } from "@/lib/supabase/client";

export default function ResetPasswordCompletePage() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();

  const translations = {
    en: {
      title: "Set New Password",
      subtitle: "Create your new password",
      description: "Enter a strong password to secure your account",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      update: "Update Password",
      updating: "Updating...",
      success: "Password updated successfully!",
      successDescription: "You can now sign in with your new password",
      signIn: "Sign In",
      passwordMismatch: "Passwords don't match",
      passwordRequired: "Password is required",
      confirmRequired: "Password confirmation is required",
      weakPassword: "Password must be at least 8 characters long",
      unknownError: "Failed to update password",
      newPasswordPlaceholder: "Enter your new password",
      confirmPasswordPlaceholder: "Confirm your new password",
      requirements: [
        "At least 8 characters long",
        "Contains uppercase and lowercase letters", 
        "Includes numbers and special characters",
        "Different from your previous password"
      ]
    },
    ar: {
      title: "تعيين كلمة مرور جديدة",
      subtitle: "أنشئ كلمة مرورك الجديدة",
      description: "أدخل كلمة مرور قوية لتأمين حسابك",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور",
      update: "تحديث كلمة المرور",
      updating: "جاري التحديث...",
      success: "تم تحديث كلمة المرور بنجاح!",
      successDescription: "يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة",
      signIn: "تسجيل الدخول",
      passwordMismatch: "كلمات المرور غير متطابقة",
      passwordRequired: "كلمة المرور مطلوبة",
      confirmRequired: "تأكيد كلمة المرور مطلوب",
      weakPassword: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
      unknownError: "فشل تحديث كلمة المرور",
      newPasswordPlaceholder: "أدخل كلمة المرور الجديدة",
      confirmPasswordPlaceholder: "أكد كلمة المرور الجديدة",
      requirements: [
        "8 أحرف على الأقل",
        "يحتوي على أحرف كبيرة وصغيرة",
        "يشمل أرقام ورموز خاصة",
        "مختلفة عن كلمة المرور السابقة"
      ]
    },
  } as const;

  const isArabic = locale === "ar";
  const t = isArabic ? translations.ar : translations.en;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  const validateForm = () => {
    let isValid = true;
    
    if (!password.trim()) {
      setPasswordError(t.passwordRequired);
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError(t.weakPassword);
      isValid = false;
    } else {
      setPasswordError(null);
    }

    if (!confirmPassword.trim()) {
      setConfirmError(t.confirmRequired);
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmError(t.passwordMismatch);
      isValid = false;
    } else {
      setConfirmError(null);
    }

    return isValid;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const supabase = supabaseClient();
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push(`/${locale}/login?message=password_updated`);
        }, 2000);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t.unknownError);
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
            {t.requirements.map((requirement, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-center gap-3 text-muted-foreground"
              >
                <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                <span>{requirement}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Password Reset Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-0 shadow-2xl bg-background/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-brand-primary" />
              </div>
              <CardTitle className="text-2xl font-bold mb-2">{t.subtitle}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {t.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-600 mb-2">{t.success}</h3>
                    <p className="text-sm text-muted-foreground">{t.successDescription}</p>
                  </div>
                  <Button
                    onClick={() => router.push(`/${locale}/login`)}
                    className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-center gap-2">
                      {t.signIn}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-foreground">
                      {t.newPassword}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t.newPasswordPlaceholder}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`pl-10 pr-10 ${passwordError ? 'border-red-500' : ''}`}
                        disabled={loading}
                        required
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
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                      {t.confirmPassword}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t.confirmPasswordPlaceholder}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`pl-10 pr-10 ${confirmError ? 'border-red-500' : ''}`}
                        disabled={loading}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        disabled={loading}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {confirmError && (
                      <p className="text-sm text-red-500">{confirmError}</p>
                    )}
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {t.updating}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {t.update}
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
