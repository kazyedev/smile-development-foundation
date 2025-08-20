"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Users, Calendar, Clock, MapPin, Mail, Phone, ArrowRight, CheckCircle, Star, Award, Globe, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BecomeAVolunteerPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  const isEn = locale === "en";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    interests: [] as string[],
    availability: "",
    experience: "",
    motivation: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const volunteerAreas = [
    {
      id: "education",
      title: isEn ? "Education & Training" : "التعليم والتدريب",
      description: isEn ? "Help teach and mentor in our educational programs" : "ساعد في التدريس والإرشاد في برامجنا التعليمية",
      icon: "📚",
      spots: 15
    },
    {
      id: "healthcare",
      title: isEn ? "Healthcare Support" : "الدعم الصحي",
      description: isEn ? "Assist in medical missions and health awareness campaigns" : "المساعدة في البعثات الطبية وحملات التوعية الصحية",
      icon: "🏥",
      spots: 8
    },
    {
      id: "community",
      title: isEn ? "Community Development" : "تنمية المجتمع",
      description: isEn ? "Participate in community building and social initiatives" : "المشاركة في بناء المجتمع والمبادرات الاجتماعية",
      icon: "🏘️",
      spots: 20
    },
    {
      id: "events",
      title: isEn ? "Event Management" : "إدارة الفعاليات",
      description: isEn ? "Help organize and run foundation events and fundraisers" : "المساعدة في تنظيم وإدارة فعاليات وحملات جمع التبرعات",
      icon: "🎪",
      spots: 12
    },
    {
      id: "marketing",
      title: isEn ? "Marketing & Media" : "التسويق والإعلام",
      description: isEn ? "Support our digital presence and awareness campaigns" : "دعم حضورنا الرقمي وحملات التوعية",
      icon: "📱",
      spots: 6
    },
    {
      id: "admin",
      title: isEn ? "Administrative Support" : "الدعم الإداري",
      description: isEn ? "Assist with office tasks and organizational activities" : "المساعدة في المهام المكتبية والأنشطة التنظيمية",
      icon: "📋",
      spots: 10
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: isEn ? "Make a Real Impact" : "أحدث تأثيراً حقيقياً",
      description: isEn ? "Directly contribute to positive change in communities" : "ساهم مباشرة في التغيير الإيجابي في المجتمعات"
    },
    {
      icon: Users,
      title: isEn ? "Build Connections" : "بناء العلاقات",
      description: isEn ? "Meet like-minded people and build lasting friendships" : "التقي أشخاص يشاركونك التفكير وابني صداقات دائمة"
    },
    {
      icon: Award,
      title: isEn ? "Gain Experience" : "اكتساب الخبرة",
      description: isEn ? "Develop new skills and enhance your professional profile" : "تطوير مهارات جديدة وتعزيز ملفك المهني"
    },
    {
      icon: Star,
      title: isEn ? "Recognition" : "التقدير",
      description: isEn ? "Receive certificates and letters of recommendation" : "احصل على شهادات وخطابات توصية"
    }
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            {isEn ? "Thank You for Volunteering!" : "شكراً لك على التطوع!"}
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            {isEn
              ? "We've received your application and will contact you within 48 hours. Welcome to the Ibtisama family!"
              : "لقد تلقينا طلبك وسنتواصل معك خلال 48 ساعة. أهلاً بك في عائلة ابتسامة!"
            }
          </p>
          <Button asChild size="lg">
            <a href={`/${locale}`}>
              {isEn ? "Back to Home" : "العودة للرئيسية"}
            </a>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-red-50/20 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-red-950/5">
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-10 left-10 w-16 h-16 bg-heart-gradient rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-12 h-12 bg-heart-gradient rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-20 w-8 h-8 bg-heart-gradient rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium mb-6">
              <HandHeart className="w-4 h-4" />
              {isEn ? "Join Our Mission" : "انضم إلى مهمتنا"}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
                {isEn ? "Become a Volunteer" : "كن متطوعاً"}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {isEn
                ? "Join our passionate community of volunteers and help create positive change in the lives of those who need it most. Every contribution matters."
                : "انضم إلى مجتمعنا المتحمس من المتطوعين وساعد في خلق تغيير إيجابي في حياة من هم في أمس الحاجة إليه. كل مساهمة مهمة."
              }
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { number: "500+", label: isEn ? "Active Volunteers" : "متطوع نشط" },
              { number: "25K+", label: isEn ? "Lives Impacted" : "حياة تأثرت" },
              { number: "50+", label: isEn ? "Ongoing Projects" : "مشروع جاري" },
              { number: "15", label: isEn ? "Communities Served" : "مجتمع خدمناه" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-background/80 backdrop-blur-sm border border-border rounded-2xl"
              >
                <div className="text-3xl font-bold text-amber-600 mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Areas */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {isEn ? "Volunteer Opportunities" : "فرص التطوع"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isEn
                ? "Choose the area that matches your interests and skills. We have opportunities for everyone!"
                : "اختر المجال الذي يناسب اهتماماتك ومهاراتك. لدينا فرص للجميع!"
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {volunteerAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                onClick={() => handleInterestToggle(area.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{area.icon}</div>
                  <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-colors ${
                    formData.interests.includes(area.id)
                      ? 'bg-amber-500 border-amber-500'
                      : 'border-border group-hover:border-amber-500'
                  }`}>
                    {formData.interests.includes(area.id) && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{area.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{area.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-amber-600 font-medium">
                    {area.spots} {isEn ? "spots available" : "مكان متاح"}
                  </span>
                  <span className="text-muted-foreground">
                    {isEn ? "Click to select" : "انقر للاختيار"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-950/10 dark:to-orange-950/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {isEn ? "Why Volunteer with Us?" : "لماذا التطوع معنا؟"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isEn
                ? "Volunteering with Ibtisama offers you meaningful opportunities to grow personally and professionally."
                : "التطوع مع ابتسامة يوفر لك فرصاً مفيدة للنمو شخصياً ومهنياً."
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-background border border-border rounded-2xl"
                >
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {isEn ? "Ready to Get Started?" : "مستعد للبدء؟"}
            </h2>
            <p className="text-muted-foreground">
              {isEn
                ? "Fill out the application form below and we'll get in touch with you soon!"
                : "املأ نموذج الطلب أدناه وسنتواصل معك قريباً!"
              }
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background border border-border rounded-3xl p-8 lg:p-12 shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isEn ? "Full Name" : "الاسم الكامل"} *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="name@example.com"
                    className="h-12"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isEn ? "Phone Number" : "رقم الهاتف"} *
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+967 7X XXX XXXX"
                    className="h-12"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isEn ? "Age" : "العمر"} *
                  </label>
                  <Input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="25"
                    className="h-12"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isEn ? "Areas of Interest" : "مجالات الاهتمام"} *
                </label>
                <p className="text-sm text-muted-foreground mb-4">
                  {isEn ? "Select the areas you'd like to volunteer in (you can choose multiple)" : "اختر المجالات التي تود التطوع فيها (يمكنك اختيار عدة مجالات)"}
                </p>
                <div className="text-sm text-amber-600 mb-2">
                  {formData.interests.length > 0 && 
                    `${isEn ? 'Selected:' : 'مختار:'} ${formData.interests.map(id => 
                      volunteerAreas.find(area => area.id === id)?.title
                    ).join(', ')}`
                  }
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isEn ? "Availability" : "مدى التوفر"} *
                </label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                  className="w-full h-12 rounded-lg border border-border bg-background px-4 text-foreground"
                  required
                >
                  <option value="">{isEn ? "Select your availability" : "اختر مدى توفرك"}</option>
                  <option value="weekdays">{isEn ? "Weekdays" : "أيام الأسبوع"}</option>
                  <option value="weekends">{isEn ? "Weekends" : "عطلة نهاية الأسبوع"}</option>
                  <option value="both">{isEn ? "Both weekdays and weekends" : "أيام الأسبوع وعطلة نهاية الأسبوع"}</option>
                  <option value="flexible">{isEn ? "Flexible schedule" : "جدول مرن"}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isEn ? "Previous Experience" : "الخبرة السابقة"}
                </label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  rows={4}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground resize-none"
                  placeholder={isEn ? "Tell us about any relevant experience or skills you have..." : "أخبرنا عن أي خبرة أو مهارات ذات صلة لديك..."}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isEn ? "Why do you want to volunteer?" : "لماذا تريد أن تتطوع؟"} *
                </label>
                <textarea
                  value={formData.motivation}
                  onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                  rows={4}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground resize-none"
                  placeholder={isEn ? "Share your motivation for volunteering with us..." : "شاركنا دافعك للتطوع معنا..."}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={submitting || formData.interests.length === 0}
                size="lg"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group h-12"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    {isEn ? "Submitting..." : "جاري الإرسال..."}
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" />
                    {isEn ? "Submit Application" : "إرسال الطلب"}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}