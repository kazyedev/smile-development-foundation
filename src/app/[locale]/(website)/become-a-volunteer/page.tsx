"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Users, Calendar, Clock, MapPin, Mail, Phone, ArrowRight, CheckCircle, Star, Award, Globe, HandHeart, Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cvError, setCvError] = useState<string | null>(null);

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

  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.oasis.opendocument.text',
    'application/rtf',
    'text/plain',
    'text/html',
    'text/markdown',
    'application/vnd.ms-works',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.oasis.opendocument.presentation',
    'image/jpeg',
    'image/png',
    'application/zip',
    'application/x-rar-compressed',
    'application/x-7z-compressed'
  ];

  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCvError(null);

    if (!file) {
      setCvFile(null);
      return;
    }

    // Validate file type
    if (!allowedMimeTypes.includes(file.type)) {
      setCvError(isEn 
        ? 'Please upload a valid document file (PDF, Word, etc.)'
        : 'يرجى تحميل ملف وثيقة صالح (PDF، Word، إلخ)'
      );
      return;
    }

    // Validate file size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      setCvError(isEn 
        ? 'File size must be less than 5MB'
        : 'يجب أن يكون حجم الملف أقل من 5 ميجابايت'
      );
      return;
    }

    setCvFile(file);
  };

  const removeCvFile = () => {
    setCvFile(null);
    setCvError(null);
    // Reset file input
    const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setCvError(null);
    
    try {
      let cvUrl = '';
      
      // Upload CV file to Supabase if provided
      if (cvFile) {
        const fileExt = cvFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('volunteer_request_attachments')
          .upload(fileName, cvFile, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (uploadError) {
          throw new Error(uploadError.message);
        }
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('volunteer_request_attachments')
          .getPublicUrl(fileName);
        
        cvUrl = publicUrl;
      }
      
      // Prepare form data for API
      const requestData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: parseInt(formData.age),
        interests: formData.interests,
        availability: formData.availability,
        experience: formData.experience,
        motivation: formData.motivation,
        cvUrl: cvUrl,
        isEnglish: isEn,
        isArabic: !isEn
      };
      
      // Submit to API
      const response = await fetch('/api/volunteer-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      setCvError(error instanceof Error ? error.message : 'An error occurred while submitting your application');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl"
          viewport={{once:true}}
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            {isEn ? "Thank You for Volunteering!" : "شكراً لك على التطوع!"}
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            {isEn
              ? "We've received your application and will contact you within 48 hours. Welcome to the Ebtsama family!"
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
            viewport={{once:true}}
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
                viewport={{once:true}}
              >
                <div className="text-3xl font-bold text-amber-600 mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
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
            viewport={{once:true}}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {isEn ? "Why Volunteer with Us?" : "لماذا التطوع معنا؟"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isEn
                ? "Volunteering with Ebtsama offers you meaningful opportunities to grow personally and professionally."
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
                  viewport={{once:true}}
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
            viewport={{once:true}}
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
            viewport={{once:true}}
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

                {/* Volunteer Areas Cards - moved inside form */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {volunteerAreas.map((area, index) => (
                    <motion.div
                      key={area.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-background border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                      onClick={() => handleInterestToggle(area.id)}
                      viewport={{once:true}}
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

              {/* CV Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isEn ? "Upload CV (Optional)" : "رفع السيرة الذاتية (اختياري)"}
                </label>
                <p className="text-muted-foreground text-xs mb-3">
                  {isEn
                    ? "Accepted formats: PDF, Word documents, images, archives, text files. Maximum size: 5MB"
                    : "الصيغ المقبولة: PDF، ملفات Word، الصور، الأرشيف، الملفات النصية. الحد الأقصى للحجم: 5 ميجابايت"
                  }
                </p>
                <div className={`border-2 border-dashed border-border rounded-lg p-6 transition-all duration-300 hover:border-amber-500 ${
                  cvError ? 'border-red-500 bg-red-50 dark:bg-red-950' : ''
                } ${
                  cvFile ? 'border-amber-500 bg-amber-50 dark:bg-amber-950' : ''
                }`}>
                  {cvFile ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-amber-500" />
                        <div>
                          <p className="font-medium">{cvFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(cvFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeCvFile}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <div>
                        <label htmlFor="cv-upload" className="cursor-pointer">
                          <span className="text-amber-600 hover:text-amber-700 font-medium">
                            {isEn ? "Click to browse" : "انقر للتصفح"}
                          </span>
                          <span className="text-muted-foreground ml-1">
                            {isEn ? "or drag and drop your CV here" : "أو اسحب وأفلت سيرتك الذاتية هنا"}
                          </span>
                        </label>
                        <input
                          id="cv-upload"
                          type="file"
                          className="hidden"
                          onChange={handleCvFileChange}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.zip,.rar,.txt,.rtf"
                        />
                      </div>
                    </div>
                  )}
                </div>
                {cvError && (
                  <p className="text-red-600 text-sm mt-2">{cvError}</p>
                )}
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