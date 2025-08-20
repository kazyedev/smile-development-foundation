"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, DollarSign, Users, Droplets, GraduationCap, Stethoscope, Shield, CreditCard, Building, ArrowRight, CheckCircle, AlertCircle, Gift, Star, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DonatePage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  const isEn = locale === "en";

  const [amount, setAmount] = useState<number | "">(100);
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [method, setMethod] = useState<"card" | "bank" | "paypal">("card");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);
  const [redirecting, setRedirecting] = useState(false);

  const preset = [50, 100, 250, 500, 1000, 2000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!amount || Number(amount) <= 0 || !email) {
      setStatus({ ok: false, msg: isEn ? "Please enter a valid amount and email." : "الرجاء إدخال مبلغ صحيح والبريد الإلكتروني." });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount), currency: 'YER', frequency, name, email, note }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error('Stripe');
      setRedirecting(true);
      window.location.href = data.url as string;
    } catch {
      setStatus({ ok: false, msg: isEn ? "Something went wrong. Please try again." : "حدث خطأ ما. حاول مرة أخرى." });
    } finally {
      setSubmitting(false);
    }
  };

  const getImpactText = (amount: number) => {
    if (amount >= 2000) {
      return isEn 
        ? "Can fund a complete water system for a small community"
        : "يمكن أن يموّل نظام مياه كامل لمجتمع صغير";
    } else if (amount >= 1000) {
      return isEn 
        ? "Can provide educational materials for 20 students"
        : "يمكن أن يوفر مواد تعليمية لـ 20 طالباً";
    } else if (amount >= 500) {
      return isEn 
        ? "Can fund medical care for 10 families"
        : "يمكن أن يموّل الرعاية الطبية لـ 10 عائلات";
    } else if (amount >= 250) {
      return isEn 
        ? "Can provide clean water for 5 families for a month"
        : "يمكن أن يوفر مياه نظيفة لـ 5 عائلات لمدة شهر";
    } else if (amount >= 100) {
      return isEn 
        ? "Can provide clean water for 2 families for a month"
        : "يمكن أن يوفر مياه نظيفة لعائلتين لمدة شهر";
    } else if (amount >= 50) {
      return isEn 
        ? "Can provide clean water for 1 family for 2 weeks"
        : "يمكن أن يوفر مياه نظيفة لعائلة واحدة لمدة أسبوعين";
    } else {
      return isEn 
        ? "Every donation makes a difference"
        : "كل تبرع يحدث فرقاً";
    }
  };

  const impactAreas = [
    {
      icon: Droplets,
      title: isEn ? "Clean Water" : "مياه نظيفة",
      description: isEn ? "50 YER provides clean water for a family for 1 week" : "50 ر.ي توفر مياه نظيفة لعائلة لمدة أسبوع",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: GraduationCap,
      title: isEn ? "Education" : "التعليم",
      description: isEn ? "200 YER equips a student with learning materials for a year" : "200 ر.ي تجهز طالباً بمواد تعليمية لسنة",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: Stethoscope,
      title: isEn ? "Healthcare" : "الرعاية الصحية",
      description: isEn ? "150 YER funds a health outreach visit" : "150 ر.ي تموّل زيارة توعوية صحية",
      color: "text-red-600 dark:text-red-400"
    }
  ];

  const paymentMethods = [
    {
      id: 'card',
      icon: CreditCard,
      title: isEn ? 'Credit/Debit Card' : 'بطاقة ائتمان/خصم',
      subtitle: isEn ? 'Secure payment via Stripe' : 'دفع آمن عبر Stripe',
      recommended: true
    },
    {
      id: 'paypal',
      icon: DollarSign,
      title: isEn ? 'PayPal' : 'باي بال',
      subtitle: isEn ? 'Pay with your PayPal account' : 'ادفع بحساب PayPal الخاص بك',
      recommended: false
    },
    {
      id: 'bank',
      icon: Building,
      title: isEn ? 'Bank Transfer' : 'تحويل بنكي',
      subtitle: isEn ? 'Direct bank transfer' : 'تحويل بنكي مباشر',
      recommended: false
    }
  ];

  const testimonials = [
    {
      name: isEn ? "Ahmed Hassan" : "أحمد حسن",
      location: isEn ? "Mareb, Yemen" : "مأرب، اليمن",
      quote: isEn 
        ? "Seeing my monthly donation help provide clean water to families gives me immense satisfaction."
        : "رؤية تبرعي الشهري يساعد في توفير المياه النظيفة للعائلات يعطيني رضا هائل.",
      amount: "200 YER/month"
    },
    {
      name: isEn ? "Fatima Ali" : "فاطمة علي",
      location: isEn ? "Aden, Yemen" : "الإسكندرية، اليمن",
      quote: isEn 
        ? "I love how transparent they are with their spending. My donations are making a real difference."
        : "أحب مدى شفافيتهم في الإنفاق. تبرعاتي تحدث فرقاً حقيقياً.",
      amount: "500 YER"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/20 dark:from-emerald-950/20 dark:via-teal-950/10 dark:to-cyan-950/5">
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-20 w-8 h-8 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" fill="currentColor" />
              {isEn ? "Make a Difference" : "اصنع فرقاً"}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                {isEn ? "Support Our Mission" : "ادعم مهمتنا"}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              {isEn
                ? "Your generous donation helps us deliver clean water, quality education, and essential healthcare to communities in need across the region."
                : "تبرعكم السخي يساعدنا في توصيل المياه النظيفة والتعليم الجيد والرعاية الصحية الأساسية للمجتمعات المحتاجة عبر المنطقة."
              }
            </p>

            {/* Impact Areas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {impactAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center p-6 bg-background/80 backdrop-blur-sm border border-border rounded-2xl"
                  >
                    <div className={`w-12 h-12 ${area.color} bg-current/10 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-6 h-6 ${area.color}`} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{area.title}</h3>
                    <p className="text-sm text-muted-foreground">{area.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Donation Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-background border border-border rounded-3xl p-8 lg:p-12 shadow-lg">
                <div className="mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-3">
                    {isEn ? "Make Your Donation" : "قم بتبرعك"}
                  </h2>
                  <p className="text-muted-foreground">
                    {isEn
                      ? "Choose your donation amount and see the immediate impact you'll make."
                      : "اختر مبلغ تبرعك وشاهد التأثير الفوري الذي ستحدثه."
                    }
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Amount Selection */}
                  <div>
                    <label className="block text-lg font-semibold mb-4">
                      {isEn ? "Select Amount" : "اختر المبلغ"}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                      {preset.map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setAmount(value)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            amount === value 
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' 
                              : 'border-border hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10'
                          }`}
                        >
                          <div className="font-bold text-lg">{value} {isEn ? 'YER' : 'ر.ي'}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {value >= 500 ? (isEn ? "High Impact" : "تأثير عالي") : 
                             value >= 200 ? (isEn ? "Good Impact" : "تأثير جيد") : 
                             (isEn ? "Helpful" : "مفيد")}
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Custom Amount */}
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min={1}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                        placeholder={isEn ? "Custom amount" : "مبلغ مخصص"}
                        className="h-12 text-lg"
                      />
                      <span className="text-muted-foreground font-medium">{isEn ? 'YER' : 'ر.ي'}</span>
                    </div>
                  </div>

                  {/* Impact Preview */}
                  {amount && Number(amount) > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Gift className="w-6 h-6 text-emerald-600" />
                        <h3 className="font-semibold text-emerald-800 dark:text-emerald-200">
                          {isEn ? "Your Impact" : "تأثيرك"}
                        </h3>
                      </div>
                      <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                        {getImpactText(Number(amount))}
                      </p>
                    </motion.div>
                  )}

                  {/* Frequency */}
                  <div>
                    <label className="block text-lg font-semibold mb-4">
                      {isEn ? "Donation Frequency" : "تكرار التبرع"}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFrequency('once')}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          frequency === 'once' 
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                            : 'border-border hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Gift className="w-5 h-5" />
                          <div className="text-left">
                            <div className="font-semibold">{isEn ? "One-time" : "مرة واحدة"}</div>
                            <div className="text-sm text-muted-foreground">
                              {isEn ? "Single donation" : "تبرع واحد"}
                            </div>
                          </div>
                        </div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setFrequency('monthly')}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 relative ${
                          frequency === 'monthly' 
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                            : 'border-border hover:border-emerald-300'
                        }`}
                      >
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 bg-emerald-500 text-white text-xs rounded-full">
                            {isEn ? "More Impact" : "تأثير أكبر"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5" />
                          <div className="text-left">
                            <div className="font-semibold">{isEn ? "Monthly" : "شهرياً"}</div>
                            <div className="text-sm text-muted-foreground">
                              {isEn ? "Recurring donation" : "تبرع متكرر"}
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Donor Information */}
                  <div>
                    <label className="block text-lg font-semibold mb-4">
                      {isEn ? "Your Information" : "معلوماتك"}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {isEn ? "Full Name" : "الاسم الكامل"} ({isEn ? "optional" : "اختياري"})
                        </label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={isEn ? "Your full name" : "اسمك الكامل"}
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {isEn ? "Email Address" : "البريد الإلكتروني"} *
                        </label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="h-12"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-lg font-semibold mb-4">
                      {isEn ? "Payment Method" : "طريقة الدفع"}
                    </label>
                    <div className="space-y-3">
                      {paymentMethods.map((paymentMethod) => {
                        const Icon = paymentMethod.icon;
                        return (
                          <button
                            key={paymentMethod.id}
                            type="button"
                            onClick={() => setMethod(paymentMethod.id as any)}
                            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left relative ${
                              method === paymentMethod.id 
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                                : 'border-border hover:border-emerald-300'
                            }`}
                          >
                            {paymentMethod.recommended && (
                              <div className="absolute top-3 right-3">
                                <span className="px-2 py-1 bg-emerald-500 text-white text-xs rounded-full">
                                  {isEn ? "Recommended" : "موصى به"}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center gap-4">
                              <Icon className="w-6 h-6 text-emerald-600" />
                              <div>
                                <div className="font-semibold">{paymentMethod.title}</div>
                                <div className="text-sm text-muted-foreground">
                                  {paymentMethod.subtitle}
                                </div>
                              </div>
                              <div className={`ml-auto w-5 h-5 border-2 rounded-full ${
                                method === paymentMethod.id 
                                  ? 'border-emerald-500 bg-emerald-500' 
                                  : 'border-border'
                              }`}>
                                {method === paymentMethod.id && (
                                  <CheckCircle className="w-5 h-5 text-white" />
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    
                    {method === 'bank' && (
                      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          {isEn 
                            ? 'Bank transfer details will be provided after submitting the form. You will receive an email with payment instructions.'
                            : 'سيتم توفير تفاصيل التحويل البنكي بعد إرسال النموذج. ستتلقى بريداً إلكترونياً مع تعليمات الدفع.'
                          }
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Optional Note */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {isEn ? "Message (optional)" : "رسالة (اختياري)"}
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={4}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground resize-none"
                      placeholder={isEn ? "Share why you're supporting our mission..." : "شاركنا لماذا تدعم مهمتنا..."}
                    />
                  </div>

                  {/* Status Message */}
                  {status && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center gap-2 p-4 rounded-lg ${
                        status.ok 
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
                          : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                      }`}
                    >
                      {status.ok ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <AlertCircle className="w-5 h-5" />
                      )}
                      <span className="font-medium">{status.msg}</span>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={submitting || redirecting || !amount || Number(amount) <= 0 || !email}
                    size="lg"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group h-14 text-lg"
                  >
                    {redirecting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                        {isEn ? "Redirecting to Stripe..." : "جاري التحويل إلى Stripe..."}
                      </>
                    ) : submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                        {isEn ? "Processing..." : "جاري المعالجة..."}
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="currentColor" />
                        {isEn ? "Donate Now" : "تبرع الآن"}
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  {/* Security Notice */}
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>
                      {isEn 
                        ? "Secure payment powered by Stripe. Your data is protected."
                        : "دفع آمن مدعوم من Stripe. بياناتك محمية."
                      }
                    </span>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Impact Statistics */}
              <div className="bg-background border border-border rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-6">{isEn ? "Our Impact" : "تأثيرنا"}</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-bold text-2xl text-blue-600">50K+</div>
                      <div className="text-sm text-muted-foreground">
                        {isEn ? "People with clean water access" : "شخص حصل على المياه النظيفة"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-bold text-2xl text-green-600">1,200</div>
                      <div className="text-sm text-muted-foreground">
                        {isEn ? "Students supported" : "طالب تم دعمهم"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <div className="font-bold text-2xl text-red-600">25K+</div>
                      <div className="text-sm text-muted-foreground">
                        {isEn ? "Medical consultations provided" : "استشارة طبية قُدمت"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donor Testimonials */}
              <div className="bg-background border border-border rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-6">{isEn ? "What Donors Say" : "ماذا يقول المتبرعون"}</h3>
                
                <div className="space-y-6">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="border-l-4 border-emerald-500 pl-4">
                      <p className="text-sm text-muted-foreground italic mb-3">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-sm">{testimonial.name}</div>
                          <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                        </div>
                        <div className="text-xs font-medium text-emerald-600">
                          {testimonial.amount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 text-emerald-800 dark:text-emerald-200">
                  {isEn ? "Why Trust Us?" : "لماذا تثق بنا؟"}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-emerald-800 dark:text-emerald-200">
                        {isEn ? "Transparency" : "الشفافية"}
                      </div>
                      <div className="text-sm text-emerald-700 dark:text-emerald-300">
                        {isEn ? "Quarterly financial reports" : "تقارير مالية ربع سنوية"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-emerald-800 dark:text-emerald-200">
                        {isEn ? "Security" : "الأمان"}
                      </div>
                      <div className="text-sm text-emerald-700 dark:text-emerald-300">
                        {isEn ? "Secure payments via Stripe" : "مدفوعات آمنة عبر Stripe"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-emerald-800 dark:text-emerald-200">
                        {isEn ? "Impact Tracking" : "تتبع التأثير"}
                      </div>
                      <div className="text-sm text-emerald-700 dark:text-emerald-300">
                        {isEn ? "Regular updates on your impact" : "تحديثات منتظمة عن تأثيرك"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}