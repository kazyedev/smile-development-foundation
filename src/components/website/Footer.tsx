"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Mail, MapPin, Phone, Globe, ArrowRight, Send, Shield, Users, Code2, PhoneCall, MessageCircle, Copy, Check } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";

export default function Footer({ locale }: { locale: string }) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showDevCard, setShowDevCard] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  const isEnglish = locale === "en";

  // Set animation flag when component comes into view
  if (isInView && !hasAnimated) {
    setHasAnimated(true);
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError(isEnglish ? "Please enter your email address" : "يرجى إدخال عنوان بريدك الإلكتروني");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          locale,
        }),
      });

      const data = await response.json();

      // Treat unique constraint conflicts as success (backend should already do this, but this is a safe fallback)
      const errMsg = typeof data?.error === 'string' ? data.error.toLowerCase() : '';
      const isUniqueConflict = response.status === 409 || errMsg.includes('unique') || errMsg.includes('duplicate') || data?.code === '23505';

      if (data.success || isUniqueConflict) {
        setIsSubscribed(true);
        setEmail("");
        // Reset success state after 4 seconds
        setTimeout(() => setIsSubscribed(false), 4000);
        return;
      }

      setError(data.error || (isEnglish ? "Failed to subscribe. Please try again." : "فشل في الاشتراك. يرجى المحاولة مرة أخرى."));
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setError(isEnglish ? "Network error. Please check your connection and try again." : "خطأ في الشبكة. يرجى التحقق من الاتصال والمحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("Khattabz2050@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <footer ref={footerRef} className="relative bg-gradient-to-b from-background to-muted/30 dark:to-muted/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Call to Action Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 text-brand-primary rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" fill="currentColor" />
              {isEnglish ? "Join Our Mission" : "انضم إلى مهمتنا"}
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent">
                {isEnglish ? "Make a difference today." : "إصنع الفرق الآن"}
              </span>
              <br />
              <span className="text-foreground">
                {isEnglish ? "Your impact starts now." : "أثرك يبدأ من هنا"}
              </span>
            </h2>
            
            <p className="text-muted-foreground text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
              {isEnglish 
                ? "Join our mission to create positive change in communities around the world. Every contribution makes a difference."
                : "انضم إلى مهمتنا لإحداث تغيير إيجابي في المجتمعات في جميع أنحاء العالم. كل المساهمة تجعل فرقاً."
              }
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={`/${locale}/donate`}>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group px-8 py-4 text-lg"
                >
                  <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                  {isEnglish ? "Donate Now" : "تبرع الآن"}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              
              <a href={`/${locale}/become-a-volunteer`}>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white group px-8 py-4 text-lg"
                >
                  <Users className="w-5 h-5 mr-2" />
                  {isEnglish ? "Volunteer" : "تطوع"}
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 dark:from-brand-primary/10 dark:to-brand-secondary/10 rounded-3xl p-8 lg:p-12 border border-brand-primary/20 backdrop-blur-sm"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="lg:flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {isEnglish ? "Stay Connected" : "ابقى على تواصل"}
                  </h3>
                </div>
                <p className="text-muted-foreground text-lg">
                  {isEnglish 
                    ? "Subscribe to our newsletter for the latest updates on our programs, success stories, and ways to get involved."
                    : "اشترك في النشرة الإخبارية للحصول على آخر التحديثات عن برامجنا وقصص النجاح وطرق المشاركة."
                  }
                </p>
              </div>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 lg:max-w-md w-full lg:flex-shrink-0">
                <div className="flex-1">
                  <Input 
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null); // Clear error when user types
                    }}
                    placeholder={isEnglish ? "Your email address" : "عنوان بريدك الإلكتروني"}
                    className={`bg-background/80 text-foreground placeholder:text-muted-foreground flex-1 h-12 transition-colors ${
                      error 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-brand-primary/30 focus:border-brand-primary'
                    }`}
                    required
                    disabled={isLoading}
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </p>
                  )}
                </div>
                <Button 
                  type="submit"
                  disabled={isLoading || isSubscribed}
                  className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white px-6 h-12 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {isEnglish ? "Subscribing..." : "جاري الاشتراك..."}
                    </>
                  ) : isSubscribed ? (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {isEnglish ? "Subscribed!" : "تم الاشتراك!"}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      {isEnglish ? "Subscribe" : "اشترك"}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Footer Content */}
      <section className="relative py-16 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Foundation Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {isEnglish ? "Ebtsama Development Foundation" : "مؤسسة ابتسامة للتنمية"}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {isEnglish 
                  ? "Dedicated to creating sustainable positive change in communities through education, healthcare, and social development programs."
                  : "مكرسة لإحداث تغيير إيجابي مستدام في المجتمعات من خلال برامج التعليم والرعاية الصحية والتنمية الاجتماعية."
                }
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-brand-primary flex-shrink-0" />
                  <span>{isEnglish ? "Marib, Yemen" : "مأرب، اليمن"}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5 text-brand-primary flex-shrink-0" />
                  <span>+967 123 456 7890</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-brand-primary flex-shrink-0" />
                  <span>info@Ebtsama.org</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Globe className="w-5 h-5 text-brand-primary flex-shrink-0" />
                  <span>www.Ebtsama.org</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* About */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h4 className="font-bold text-foreground mb-6 text-lg">{isEnglish ? "About" : "عن المؤسسة"}</h4>
                  <nav className="space-y-4">
                    {[
                      { href: "/about-us", en: "About Us", ar: "عن المؤسسة" },
                      { href: "/board-of-directors", en: "Board of Directors", ar: "مجلس الإدارة" },
                      { href: "/team-members", en: "Team Members", ar: "فريق العمل" },
                      { href: "/our-story", en: "Our Story", ar: "قصتنا" },
                    ].map((link) => (
                      <a 
                        key={link.href}
                        href={`/${locale}${link.href}`} 
                        className="block text-muted-foreground hover:text-brand-primary transition-colors duration-300 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                          {isEnglish ? link.en : link.ar}
                        </span>
                      </a>
                    ))}
                  </nav>
                </motion.div>
                
                {/* Initiatives */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h4 className="font-bold text-foreground mb-6 text-lg">{isEnglish ? "Initiatives" : "المبادرات"}</h4>
                  <nav className="space-y-4">
                    {[
                      { href: "/programs", en: "Programs", ar: "البرامج" },
                      { href: "/projects", en: "Projects", ar: "المشاريع" },
                      { href: "/activities", en: "Activities", ar: "الأنشطة" },
                      { href: "/news", en: "News", ar: "الأخبار" },
                    ].map((link) => (
                      <a 
                        key={link.href}
                        href={`/${locale}${link.href}`} 
                        className="block text-muted-foreground hover:text-brand-primary transition-colors duration-300 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                          {isEnglish ? link.en : link.ar}
                        </span>
                      </a>
                    ))}
                  </nav>
                </motion.div>
                
                {/* Get Involved */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h4 className="font-bold text-foreground mb-6 text-lg">{isEnglish ? "Get Involved" : "المشاركة"}</h4>
                  <nav className="space-y-4">
                    {[
                      { href: "/donate", en: "Donate", ar: "تبرع" },
                      { href: "/become-a-volunteer", en: "Volunteer", ar: "متطوع" },
                      { href: "/work-with-us", en: "Work With Us", ar: "العمل معنا" },
                      { href: "/contact-us", en: "Contact Us", ar: "تواصل معنا" },
                    ].map((link) => (
                      <a 
                        key={link.href}
                        href={`/${locale}${link.href}`} 
                        className="block text-muted-foreground hover:text-brand-primary transition-colors duration-300 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                          {isEnglish ? link.en : link.ar}
                        </span>
                      </a>
                    ))}
                  </nav>
                </motion.div>

                {/* Legal & Support */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <h4 className="font-bold text-foreground mb-6 text-lg">{isEnglish ? "Legal & Support" : "القانونية والدعم"}</h4>
                  <nav className="space-y-4">
                    {[
                      { href: "/privacy-policy", en: "Privacy Policy", ar: "سياسة الخصوصية" },
                      { href: "/terms-of-service", en: "Terms of Service", ar: "شروط الخدمة" },
                      { href: "/faqs", en: "FAQs", ar: "الأسئلة الشائعة" },
                      { href: "/contact-us", en: "Support", ar: "الدعم" },
                    ].map((link) => (
                      <a 
                        key={link.href}
                        href={`/${locale}${link.href}`} 
                        className="block text-muted-foreground hover:text-brand-primary transition-colors duration-300 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                          {isEnglish ? link.en : link.ar}
                        </span>
                      </a>
                    ))}
                  </nav>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Bar */}
      <section className="relative border-t border-border/50 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Copyright & Legal */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-col lg:flex-row items-center gap-6 text-muted-foreground text-sm"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-brand-primary" fill="currentColor" />
                <span>© 2025 Ebtsama Development Foundation.</span>
              </div>
              <div className="flex items-center gap-6">
                <a href={`/${locale}/privacy-policy`} className="hover:text-brand-primary transition-colors duration-300 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  {isEnglish ? "Privacy Policy" : "سياسة الخصوصية"}
                </a>
                <a href={`/${locale}/terms-of-service`} className="hover:text-brand-primary transition-colors duration-300">
                  {isEnglish ? "Terms of Service" : "الشروط والأحكام"}
                </a>
              </div>
            </motion.div>
            
            {/* Social Media */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex items-center gap-4"
            >
              {[
                { name: "Facebook", icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" },
                { name: "Twitter", icon: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" },
                { name: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                { name: "Instagram", icon: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.748.099.119.112.224.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" },
              ].map((social) => (
                <a 
                  key={social.name}
                  href="#" 
                  className="w-10 h-10 bg-muted/50 hover:bg-brand-primary/10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-brand-primary transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d={social.icon} clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Developer Credit Section */}
      <section className="relative border-t border-border/50 py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="relative"
              onMouseEnter={() => setShowDevCard(true)}
              onMouseLeave={() => setShowDevCard(false)}
            >
              <div className="flex items-center gap-2 text-muted-foreground text-sm cursor-pointer group">
                <span>{isEnglish ? "Built with" : "صنع بـ"}</span>
                <Heart className="w-4 h-4 text-red-500 fill-red-500 group-hover:scale-110 transition-transform" />
                <span>{isEnglish ? "by" : "بواسطة"}</span>
                <div className="flex items-center gap-1 text-brand-primary group-hover:text-brand-secondary transition-colors">
                  <Code2 className="w-4 h-4" />
                  <span className="font-semibold">Khattab</span>
                </div>
              </div>

              {/* Developer Card */}
              <AnimatePresence>
                {showDevCard && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50"
                  >
                    <div className="relative bg-gradient-to-br from-red-50/50 via-pink-50/30 to-purple-50/20 dark:from-red-950/20 dark:via-pink-950/10 dark:to-purple-950/5 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-brand-primary/10 p-6 w-80">
                      {/* Decorative Elements - Similar to videos page */}
                      <div className="absolute top-2 left-2 w-8 h-6 border border-red-400/30 rounded-md"></div>
                      <div className="absolute top-4 right-4 w-6 h-6 bg-pink-400/20 rounded-full"></div>
                      <div className="absolute bottom-4 left-6 w-8 h-5 border border-purple-400/30 rounded-md rotate-12"></div>
                      
                      {/* Content */}
                      <div className="relative space-y-4">
                        {/* Logo & Name */}
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-full flex items-center justify-center">
                              <Code2 className="w-8 h-8 text-brand-primary" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background"></div>
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-foreground">Khattab Ahmed</h4>
                            <p className="text-sm text-muted-foreground">{isEnglish ? "Software Engineer & Developer" : "مهندس ومطور برمجيات"}</p>
                          </div>
                        </div>

                        {/* Contact Buttons */}
                        <div className="space-y-2">
                          {/* Call Button */}
                          <a
                            href="tel:+967777841140"
                            className="flex items-center gap-3 p-3 bg-background/50 hover:bg-green-500/10 border border-border/30 hover:border-green-500/30 rounded-xl transition-all duration-200 group"
                          >
                            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                              <PhoneCall className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-foreground">{isEnglish ? "Call Now" : "اتصل الآن"}</div>
                              <div className="text-xs text-muted-foreground">+967 777 841 140</div>
                            </div>
                          </a>

                          {/* WhatsApp Button */}
                          <a
                            href={`https://wa.me/967777841140?text=${encodeURIComponent(isEnglish ? "Hi Khattab, I'm interested in your web development services!" : "مرحبا خطاب، أنا مهتم بخدمات تطوير الويب الخاصة بك!")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-background/50 hover:bg-green-500/10 border border-border/30 hover:border-green-500/30 rounded-xl transition-all duration-200 group"
                          >
                            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                              <MessageCircle className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-foreground">WhatsApp</div>
                              <div className="text-xs text-muted-foreground">{isEnglish ? "Send a message" : "أرسل رسالة"}</div>
                            </div>
                          </a>

                          {/* Email Button with Copy */}
                          <div className="flex gap-2">
                            <a
                              href="mailto:Khattabz2050@gmail.com"
                              className="flex-1 flex items-center gap-3 p-3 bg-background/50 hover:bg-blue-500/10 border border-border/30 hover:border-blue-500/30 rounded-xl transition-all duration-200 group"
                            >
                              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                <Mail className="w-5 h-5 text-blue-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-foreground">{isEnglish ? "Email" : "البريد الإلكتروني"}</div>
                                <div className="text-xs text-muted-foreground truncate">Khattabz2050@gmail.com</div>
                              </div>
                            </a>
                            
                            <button
                              onClick={copyEmail}
                              className="w-12 h-12 bg-background/50 hover:bg-brand-primary/10 border border-border/30 hover:border-brand-primary/30 rounded-xl transition-all duration-200 flex items-center justify-center group"
                              title={isEnglish ? "Copy email" : "نسخ البريد"}
                            >
                              {emailCopied ? (
                                <Check className="w-5 h-5 text-green-500" />
                              ) : (
                                <Copy className="w-5 h-5 text-muted-foreground group-hover:text-brand-primary transition-colors" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </footer>
  );
}