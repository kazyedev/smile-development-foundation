"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, DollarSign, Users, UtensilsCrossed, GraduationCap, Stethoscope, Shield, CreditCard, Building, ArrowRight, CheckCircle, AlertCircle, Gift, Star, TrendingUp, Calendar, Upload, FileText, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DonatePage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  const isEn = locale === "en";

  const [amount, setAmount] = useState<number | "">(100);
  const [currency, setCurrency] = useState<"USD" | "SAR" | "AED" | "YER">("USD");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [method, setMethod] = useState<"stripe" | "cash_transfer" | "bank_deposit">("stripe");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [transferFile, setTransferFile] = useState<File | null>(null);
  const [depositFile, setDepositFile] = useState<File | null>(null);
  const [selectedBankAccount, setSelectedBankAccount] = useState<number | null>(null);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [loadingBankAccounts, setLoadingBankAccounts] = useState(false);
  const [bankAccountsError, setBankAccountsError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);
  const [redirecting, setRedirecting] = useState(false);

  const preset = [50, 100, 250, 500, 1000, 2000];

  // Fetch bank accounts when currency changes or bank_deposit method is selected
  useEffect(() => {
    if (method === 'bank_deposit') {
      fetchBankAccounts();
    } else {
      setBankAccounts([]);
      setSelectedBankAccount(null);
    }
  }, [currency, method]);

  const fetchBankAccounts = async () => {
    setLoadingBankAccounts(true);
    setBankAccountsError(null);
    try {
      const response = await fetch(`/api/bank-accounts?currency=${currency}`);
      const data = await response.json();
      
      if (data.success) {
        setBankAccounts(data.data || []);
      } else {
        setBankAccountsError(data.error || 'Failed to load bank accounts');
        setBankAccounts([]);
      }
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
      setBankAccountsError('Network error while loading bank accounts');
      setBankAccounts([]);
    } finally {
      setLoadingBankAccounts(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    
    // Validation
    if (!amount || Number(amount) <= 0 || !email) {
      setStatus({ ok: false, msg: isEn ? "Please enter a valid amount and email." : "الرجاء إدخال مبلغ صحيح والبريد الإلكتروني." });
      return;
    }
    
    if (method === 'cash_transfer' && !transferFile) {
      setStatus({ ok: false, msg: isEn ? "Please upload transfer receipt." : "يرجى رفع إيصال التحويل." });
      return;
    }
    
    if (method === 'bank_deposit' && !depositFile) {
      setStatus({ ok: false, msg: isEn ? "Please upload deposit certificate." : "يرجى رفع شهادة الإيداع." });
      return;
    }
    
    if (method === 'bank_deposit' && !selectedBankAccount) {
      setStatus({ ok: false, msg: isEn ? "Please select a bank account." : "يرجى اختيار حساب بنكي." });
      return;
    }
    
    setSubmitting(true);
    
    try {
      if (method === 'stripe') {
        // Handle Stripe payments
        const res = await fetch('/api/donate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: Number(amount), currency, frequency, name, email, note }),
        });
        const data = await res.json();
        if (!res.ok || !data.url) throw new Error('Stripe error');
        setRedirecting(true);
        window.location.href = data.url as string;
      } else {
        // Handle Cash Transfer and Bank Deposit with file uploads
        let transferAttachmentUrl = '';
        let depositAttachmentUrl = '';
        
        // Upload transfer file if provided
        if (transferFile && method === 'cash_transfer') {
          const fileExt = transferFile.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('cash_transfers_attachments')
            .upload(fileName, transferFile, {
              cacheControl: '3600',
              upsert: false
            });
          
          if (uploadError) {
            throw new Error(uploadError.message);
          }
          
          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('cash_transfers_attachments')
            .getPublicUrl(fileName);
          
          transferAttachmentUrl = publicUrl;
        }
        
        // Upload deposit file if provided
        if (depositFile && method === 'bank_deposit') {
          const fileExt = depositFile.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('bank_deposits_attachments')
            .upload(fileName, depositFile, {
              cacheControl: '3600',
              upsert: false
            });
          
          if (uploadError) {
            throw new Error(uploadError.message);
          }
          
          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('bank_deposits_attachments')
            .getPublicUrl(fileName);
          
          depositAttachmentUrl = publicUrl;
        }
        
        // Submit donation data to API
        const donationData = {
          amount: Number(amount),
          currency,
          method,
          frequency,
          donorEmail: email,
          donorName: name || null,
          donorNote: note || null,
          bankAccountId: selectedBankAccount,
          transferAttachmentUrl: transferAttachmentUrl || null,
          depositAttachmentUrl: depositAttachmentUrl || null,
        };
        
        const res = await fetch('/api/donations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(donationData),
        });
        
        const data = await res.json();
        
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to process donation');
        }
        
        // Success - redirect to thank you page
        setRedirecting(true);
        
        // Build query parameters for thank you page
        const params = new URLSearchParams({
          amount: amount.toString(),
          currency,
          method,
          frequency,
          ...(name && { name })
        });
        
        setTimeout(() => {
          window.location.href = `/${locale}/donate/thank-you?${params.toString()}`;
        }, 1500);
      }
    } catch (error) {
      console.error('Donation error:', error);
      setStatus({ 
        ok: false, 
        msg: error instanceof Error ? error.message : (isEn ? "Something went wrong. Please try again." : "حدث خطأ ما. حاول مرة أخرى.") 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getCurrencySymbol = (curr: string) => {
    const symbols = { USD: '$', SAR: 'ر.س', AED: 'د.إ', YER: 'ر.ي' };
    return symbols[curr as keyof typeof symbols] || '$';
  };

  const getImpactText = (amount: number) => {
    const mealsPerAmount = Math.floor(amount / 25); // Assuming 25 currency units per family meal for a week
    
    if (amount >= 2000) {
      return isEn 
        ? "Can provide nutritious meals for an entire community for a month"
        : "يمكن أن يوفر وجبات مغذية لمجتمع كامل لمدة شهر";
    } else if (amount >= 1000) {
      return isEn 
        ? `Can feed ${Math.floor(amount / 25)} families for a week`
        : `يمكن أن يطعم ${Math.floor(amount / 25)} عائلة لمدة أسبوع`;
    } else if (amount >= 500) {
      return isEn 
        ? `Can provide food packages for ${Math.floor(amount / 50)} families`
        : `يمكن أن يوفر طرود غذائية لـ ${Math.floor(amount / 50)} عائلة`;
    } else if (amount >= 250) {
      return isEn 
        ? "Can provide nutritious meals for 10 families for a week"
        : "يمكن أن يوفر وجبات مغذية لـ 10 عائلات لمدة أسبوع";
    } else if (amount >= 100) {
      return isEn 
        ? "Can provide meals for 4 families for a week"
        : "يمكن أن يوفر وجبات لـ 4 عائلات لمدة أسبوع";
    } else if (amount >= 50) {
      return isEn 
        ? "Can provide meals for 2 families for a week"
        : "يمكن أن يوفر وجبات لعائلتين لمدة أسبوع";
    } else {
      return isEn 
        ? "Every donation helps feed families in need"
        : "كل تبرع يساعد في إطعام العائلات المحتاجة";
    }
  };

  const impactAreas = [
    {
      icon: UtensilsCrossed,
      title: isEn ? "Nutritious Meals" : "وجبات مغذية",
      description: isEn ? "25 USD provides nutritious meals for a family for 1 week" : "25 دولار توفر وجبات مغذية لعائلة لمدة أسبوع",
      color: "text-orange-600 dark:text-orange-400"
    },
    {
      icon: GraduationCap,
      title: isEn ? "Education" : "التعليم",
      description: isEn ? "200 USD equips a student with learning materials for a year" : "200 دولار تجهز طالباً بمواد تعليمية لسنة",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: Stethoscope,
      title: isEn ? "Healthcare" : "الرعاية الصحية",
      description: isEn ? "150 USD funds a health outreach visit" : "150 دولار تموّل زيارة توعوية صحية",
      color: "text-red-600 dark:text-red-400"
    }
  ];

  const paymentMethods = [
    {
      id: 'stripe',
      icon: CreditCard,
      title: isEn ? 'Credit/Debit Card' : 'بطاقة ائتمان/خصم',
      subtitle: isEn ? 'Secure payment via Stripe' : 'دفع آمن عبر Stripe',
      recommended: true
    },
    {
      id: 'cash_transfer',
      icon: Banknote,
      title: isEn ? 'Cash Transfer' : 'تحويل نقدي',
      subtitle: isEn ? 'Transfer receipt required' : 'إيصال التحويل مطلوب',
      recommended: false
    },
    {
      id: 'bank_deposit',
      icon: Building,
      title: isEn ? 'Bank Deposit' : 'إيداع بنكي',
      subtitle: isEn ? 'Deposit certificate required' : 'شهادة الإيداع مطلوبة',
      recommended: false
    }
  ];

  const testimonials = [
    {
      name: isEn ? "Ahmed Hassan" : "أحمد حسن",
      location: isEn ? "Marib, Yemen" : "مأرب، اليمن",
      quote: isEn 
        ? "Seeing my monthly donation help provide nutritious meals to families gives me immense satisfaction."
        : "رؤية تبرعي الشهري يساعد في توفير الوجبات المغذية للعائلات يعطيني رضا هائل.",
      amount: "50 USD/month"
    },
    {
      name: isEn ? "Fatima Ali" : "فاطمة علي",
      location: isEn ? "Aden, Yemen" : "عدن، اليمن",
      quote: isEn 
        ? "Knowing my donations help feed hungry families fills my heart with joy. Every meal matters."
        : "معرفة أن تبرعاتي تساعد في إطعام العائلات الجائعة تملأ قلبي بالفرح. كل وجبة مهمة.",
      amount: "100 USD"
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
                ? "Your generous donation helps us provide nutritious meals, quality education, and essential healthcare to families in need across the region."
                : "تبرعكم السخي يساعدنا في توفير الوجبات المغذية والتعليم الجيد والرعاية الصحية الأساسية للعائلات المحتاجة عبر المنطقة."
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
                          <div className="font-bold text-lg">{value} {getCurrencySymbol(currency)}</div>
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
                      <span className="text-muted-foreground font-medium">{getCurrencySymbol(currency)}</span>
                    </div>
                  </div>

                  {/* Currency Selection */}
                  <div>
                    <label className="block text-lg font-semibold mb-4">
                      {isEn ? "Currency" : "العملة"}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["USD", "SAR", "AED", "YER"].map((curr) => (
                        <button
                          key={curr}
                          type="button"
                          onClick={() => setCurrency(curr as any)}
                          className={`p-3 rounded-xl border-2 transition-all duration-300 text-center ${
                            currency === curr 
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' 
                              : 'border-border hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10'
                          }`}
                        >
                          <div className="font-bold text-sm">{curr}</div>
                          <div className="text-xs text-muted-foreground">{getCurrencySymbol(curr)}</div>
                        </button>
                      ))}
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
                    
                    {/* Cash Transfer File Upload */}
                    {method === 'cash_transfer' && (
                      <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                        <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                          {isEn 
                            ? 'Please upload your transfer receipt after completing the payment. We will provide transfer details after form submission.'
                            : 'يرجى رفع إيصال التحويل بعد إتمام الدفع. سنوفر تفاصيل التحويل بعد إرسال النموذج.'
                          }
                        </p>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            {isEn ? "Transfer Receipt" : "إيصال التحويل"} *
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => setTransferFile(e.target.files?.[0] || null)}
                              className="hidden"
                              id="transfer-file"
                            />
                            <label
                              htmlFor="transfer-file"
                              className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                            >
                              <Upload className="w-4 h-4" />
                              {isEn ? "Choose File" : "اختر ملف"}
                            </label>
                            {transferFile && (
                              <span className="text-sm text-muted-foreground">
                                {transferFile.name}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {isEn ? "Supported formats: JPG, PNG, PDF (max 5MB)" : "الصيغ المدعومة: JPG، PNG، PDF (حد أقصى 5 ميجا)"}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Bank Deposit File Upload */}
                    {method === 'bank_deposit' && (
                      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                          {isEn 
                            ? 'Please upload your deposit certificate after making the deposit. Choose from our available bank accounts below.'
                            : 'يرجى رفع شهادة الإيداع بعد القيام بالإيداع. اختر من حساباتنا البنكية المتاحة أدناه.'
                          }
                        </p>
                        <div className="space-y-4">
                          {/* Bank Account Selection */}
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              {isEn ? "Select Bank Account" : "اختر الحساب البنكي"} *
                            </label>
                            
                            {loadingBankAccounts ? (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg">
                                <div className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                                {isEn ? "Loading bank accounts..." : "جاري تحميل الحسابات البنكية..."}
                              </div>
                            ) : bankAccountsError ? (
                              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                <p className="text-sm text-red-700 dark:text-red-300">
                                  {isEn ? "Error loading bank accounts:" : "خطأ في تحميل الحسابات البنكية:"} {bankAccountsError}
                                </p>
                                <button 
                                  onClick={fetchBankAccounts}
                                  className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
                                >
                                  {isEn ? "Try again" : "حاول مرة أخرى"}
                                </button>
                              </div>
                            ) : bankAccounts.length === 0 ? (
                              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                                <p className="text-sm text-amber-700 dark:text-amber-300">
                                  {isEn 
                                    ? `No bank accounts available for ${currency} at the moment. Please try a different currency or contact us.`
                                    : `لا توجد حسابات بنكية متاحة لعملة ${currency} في الوقت الحالي. يرجى تجربة عملة أخرى أو التواصل معنا.`
                                  }
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {bankAccounts.map((account) => (
                                  <button
                                    key={account.id}
                                    type="button"
                                    onClick={() => setSelectedBankAccount(account.id)}
                                    className={`w-full p-3 rounded-lg border-2 transition-all duration-300 text-left ${
                                      selectedBankAccount === account.id
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                        : 'border-border hover:border-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      {account.bankLogo && (
                                        <img 
                                          src={account.bankLogo} 
                                          alt={isEn ? account.bankNameEn : account.bankNameAr}
                                          className="w-8 h-8 object-contain rounded"
                                        />
                                      )}
                                      <div className="flex-1">
                                        <div className="font-semibold text-sm">
                                          {isEn ? account.bankNameEn : account.bankNameAr}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                          {isEn ? account.accountNameEn : account.accountNameAr}
                                        </div>
                                        <div className="text-xs font-mono text-muted-foreground">
                                          {account.accountNumber}
                                        </div>
                                      </div>
                                      <div className="text-xs font-bold text-blue-600">
                                        {account.accountCurrency}
                                      </div>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          {/* File Upload */}
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              {isEn ? "Deposit Certificate" : "شهادة الإيداع"} *
                            </label>
                            <div className="flex items-center gap-3">
                              <input
                                type="file"
                                accept="image/*,.pdf"
                                onChange={(e) => setDepositFile(e.target.files?.[0] || null)}
                                className="hidden"
                                id="deposit-file"
                              />
                              <label
                                htmlFor="deposit-file"
                                className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                              >
                                <Upload className="w-4 h-4" />
                                {isEn ? "Choose File" : "اختر ملف"}
                              </label>
                              {depositFile && (
                                <span className="text-sm text-muted-foreground">
                                  {depositFile.name}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {isEn ? "Supported formats: JPG, PNG, PDF (max 5MB)" : "الصيغ المدعومة: JPG، PNG، PDF (حد أقصى 5 ميجا)"}
                            </p>
                          </div>
                        </div>
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
                    disabled={
                      submitting || 
                      redirecting || 
                      !amount || 
                      Number(amount) <= 0 || 
                      !email ||
                      (method === 'cash_transfer' && !transferFile) ||
                      (method === 'bank_deposit' && (!depositFile || !selectedBankAccount))
                    }
                    size="lg"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group h-14 text-lg"
                  >
                    {redirecting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                        {method === 'stripe' 
                          ? (isEn ? "Redirecting to Stripe..." : "جاري التحويل إلى Stripe...")
                          : (isEn ? "Processing donation..." : "جاري معالجة التبرع...")
                        }
                      </>
                    ) : submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                        {isEn ? "Processing..." : "جاري المعالجة..."}
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="currentColor" />
                        {method === 'stripe'
                          ? (isEn ? "Donate Now" : "تبرع الآن")
                          : method === 'cash_transfer'
                          ? (isEn ? "Submit Cash Transfer" : "إرسال التحويل النقدي")
                          : (isEn ? "Submit Bank Deposit" : "إرسال الإيداع البنكي")
                        }
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
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <UtensilsCrossed className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <div className="font-bold text-2xl text-orange-600">50K+</div>
                      <div className="text-sm text-muted-foreground">
                        {isEn ? "Families received food assistance" : "عائلات حصلت على مساعدات غذائية"}
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