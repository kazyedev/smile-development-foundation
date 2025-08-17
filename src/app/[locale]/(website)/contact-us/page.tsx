"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle, AlertCircle, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactUsPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  const isEn = locale === "en";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!name || !email || !message) {
      setStatus({ ok: false, msg: isEn ? "Please fill in required fields." : "يرجى ملء الحقول المطلوبة." });
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message, locale }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus({ ok: true, msg: isEn ? "Thanks! We received your message." : "شكراً! تم استلام رسالتك." });
      setName(""); setEmail(""); setPhone(""); setSubject(""); setMessage("");
    } catch {
      setStatus({ ok: false, msg: isEn ? "Something went wrong. Please try again." : "حدث خطأ ما. حاول مرة أخرى." });
    } finally {
      setSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: isEn ? "Email Us" : "راسلنا",
      description: isEn ? "Get in touch via email" : "تواصل معنا عبر البريد الإلكتروني",
      value: "info@ibtisama.org",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Phone,
      title: isEn ? "Call Us" : "اتصل بنا",
      description: isEn ? "Speak directly with our team" : "تحدث مباشرة مع فريقنا",
      value: "+20 123 456 7890",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: MapPin,
      title: isEn ? "Visit Us" : "زرنا",
      description: isEn ? "Come to our office" : "تعال إلى مكتبنا",
      value: isEn ? "Cairo, Egypt" : "القاهرة، مصر",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Clock,
      title: isEn ? "Office Hours" : "ساعات العمل",
      description: isEn ? "Monday - Friday" : "الإثنين - الجمعة",
      value: isEn ? "9:00 AM - 6:00 PM" : "9:00 ص - 6:00 م",
      color: "text-orange-600 dark:text-orange-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-brand-primary/5 via-background to-brand-secondary/5">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, var(--brand-primary) 1px, transparent 1px), radial-gradient(circle at 80% 20%, var(--brand-secondary) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 text-brand-primary rounded-full text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              {isEn ? "Get in Touch" : "تواصل معنا"}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                {isEn ? "Contact Us" : "تواصل معنا"}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {isEn
                ? "We'd love to hear from you. Whether you have questions about our projects, want to get involved, or need support, our team is here to help."
                : "يسعدنا تواصلكم معنا. سواء كانت لديكم أسئلة حول مشاريعنا، أو تريدون المشاركة، أو تحتاجون الدعم، فريقنا هنا للمساعدة."
              }
            </p>
          </motion.div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 bg-background/80 backdrop-blur-sm border border-border rounded-2xl hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 ${method.color} bg-current/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${method.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                  <p className="font-medium text-foreground">{method.value}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-background border border-border rounded-3xl p-8 lg:p-12 shadow-lg">
                <div className="mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-3">
                    {isEn ? "Send us a Message" : "أرسل لنا رسالة"}
                  </h2>
                  <p className="text-muted-foreground">
                    {isEn
                      ? "Fill out the form below and we'll get back to you as soon as possible."
                      : "املأ النموذج أدناه وسنعود إليك في أقرب وقت ممكن."
                    }
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {isEn ? "Full Name" : "الاسم الكامل"} *
                      </label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={isEn ? "Your full name" : "اسمك الكامل"}
                        className="h-12"
                        required
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {isEn ? "Phone Number" : "رقم الهاتف"} ({isEn ? "optional" : "اختياري"})
                      </label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={isEn ? "+20 1X XXX XXXX" : "+20 1X XXX XXXX"}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {isEn ? "Subject" : "الموضوع"}
                      </label>
                      <Input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder={isEn ? "How can we help?" : "كيف يمكننا المساعدة؟"}
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {isEn ? "Message" : "الرسالة"} *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none"
                      placeholder={isEn ? "Write your message here..." : "اكتب رسالتك هنا..."}
                      required
                    />
                  </div>

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

                  <Button
                    type="submit"
                    disabled={submitting}
                    size="lg"
                    className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group h-12"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        {isEn ? "Sending..." : "جاري الإرسال..."}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        {isEn ? "Send Message" : "إرسال الرسالة"}
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Office Info */}
              <div className="bg-background border border-border rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-6">{isEn ? "Office Information" : "معلومات المكتب"}</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{isEn ? "Address" : "العنوان"}</h4>
                      <p className="text-sm text-muted-foreground">
                        {isEn ? "123 Foundation Street, Heliopolis" : "١٢٣ شارع المؤسسة، مصر الجديدة"}
                        <br />
                        {isEn ? "Cairo, Egypt 11341" : "القاهرة، مصر ١١٣٤١"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-brand-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{isEn ? "Email" : "البريد الإلكتروني"}</h4>
                      <p className="text-sm text-muted-foreground">info@ibtisama.org</p>
                      <p className="text-sm text-muted-foreground">support@ibtisama.org</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{isEn ? "Phone" : "الهاتف"}</h4>
                      <p className="text-sm text-muted-foreground">+20 123 456 7890</p>
                      <p className="text-sm text-muted-foreground">+20 123 456 7891 (Fax)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{isEn ? "Office Hours" : "ساعات العمل"}</h4>
                      <p className="text-sm text-muted-foreground">
                        {isEn ? "Sunday - Thursday: 9:00 AM - 6:00 PM" : "الأحد - الخميس: 9:00 ص - 6:00 م"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isEn ? "Friday: 9:00 AM - 2:00 PM" : "الجمعة: 9:00 ص - 2:00 م"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border border-border rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">{isEn ? "Quick Stats" : "إحصائيات سريعة"}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-brand-primary" />
                      <span className="text-sm">{isEn ? "Response Time" : "وقت الاستجابة"}</span>
                    </div>
                    <span className="text-sm font-semibold">{isEn ? "24 hours" : "24 ساعة"}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-brand-secondary" />
                      <span className="text-sm">{isEn ? "Languages" : "اللغات"}</span>
                    </div>
                    <span className="text-sm font-semibold">{isEn ? "Arabic, English" : "العربية، الإنجليزية"}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{isEn ? "Support Level" : "مستوى الدعم"}</span>
                    </div>
                    <span className="text-sm font-semibold">{isEn ? "24/7" : "24/7"}</span>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-lg">
                <div className="w-full h-64 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground font-medium">
                      {isEn ? "Interactive Map" : "خريطة تفاعلية"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isEn ? "Cairo, Egypt" : "القاهرة، مصر"}
                    </p>
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