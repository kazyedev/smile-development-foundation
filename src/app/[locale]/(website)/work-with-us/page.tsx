"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, DollarSign, Users, Star, ArrowRight, Filter, Search, Building, Calendar, CheckCircle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Job {
  id: string;
  titleEn: string;
  titleAr: string;
  departmentEn: string;
  departmentAr: string;
  locationEn: string;
  locationAr: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  experience: "entry" | "mid" | "senior";
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  descriptionEn: string;
  descriptionAr: string;
  responsibilitiesEn: string[];
  responsibilitiesAr: string[];
  requirementsEn: string[];
  requirementsAr: string[];
  benefitsEn: string[];
  benefitsAr: string[];
  postedDate: Date;
  urgent: boolean;
}

export default function WorkWithUsPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  const isEn = locale === "en";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplication, setShowApplication] = useState(false);

  const mockJobs: Job[] = [
    {
      id: "1",
      titleEn: "Project Manager",
      titleAr: "مدير مشروع",
      departmentEn: "Operations",
      departmentAr: "العمليات",
      locationEn: "Mareb, Yemen",
      locationAr: "مأرب، اليمن",
      type: "full-time",
      experience: "mid",
      salary: { min: 15000, max: 25000, currency: "YER" },
      descriptionEn: "Lead and manage development projects from conception to completion, ensuring timely delivery and quality outcomes for our community initiatives.",
      descriptionAr: "قيادة وإدارة مشاريع التنمية من المفهوم إلى الانتهاء، مما يضمن التسليم في الوقت المناسب ونتائج عالية الجودة لمبادراتنا المجتمعية.",
      responsibilitiesEn: [
        "Oversee project planning and execution",
        "Coordinate with team members and stakeholders",
        "Monitor project progress and budget",
        "Ensure quality deliverables"
      ],
      responsibilitiesAr: [
        "الإشراف على تخطيط المشاريع وتنفيذها",
        "التنسيق مع أعضاء الفريق وأصحاب المصلحة",
        "مراقبة تقدم المشروع والميزانية",
        "ضمان المخرجات عالية الجودة"
      ],
      requirementsEn: [
        "Bachelor's degree in Project Management or related field",
        "3+ years of project management experience",
        "Strong leadership and communication skills",
        "Proficiency in project management tools"
      ],
      requirementsAr: [
        "درجة البكالوريوس في إدارة المشاريع أو مجال ذي صلة",
        "خبرة 3+ سنوات في إدارة المشاريع",
        "مهارات قيادية وتواصل قوية",
        "إتقان أدوات إدارة المشاريع"
      ],
      benefitsEn: [
        "Competitive salary",
        "Health insurance",
        "Professional development opportunities",
        "Flexible working hours"
      ],
      benefitsAr: [
        "راتب تنافسي",
        "تأمين صحي",
        "فرص التطوير المهني",
        "ساعات عمل مرنة"
      ],
      postedDate: new Date("2024-01-15"),
      urgent: true
    },
    {
      id: "2",
      titleEn: "Social Media Manager",
      titleAr: "مدير وسائل التواصل الاجتماعي",
      departmentEn: "Marketing",
      departmentAr: "التسويق",
      locationEn: "Remote",
      locationAr: "عن بُعد",
      type: "full-time",
      experience: "entry",
      salary: { min: 8000, max: 12000, currency: "YER" },
      descriptionEn: "Manage our social media presence and create engaging content to promote our mission and connect with our community.",
      descriptionAr: "إدارة حضورنا على وسائل التواصل الاجتماعي وإنشاء محتوى جذاب للترويج لمهمتنا والتواصل مع مجتمعنا.",
      responsibilitiesEn: [
        "Create and curate social media content",
        "Manage social media accounts",
        "Engage with followers and community",
        "Analyze social media metrics"
      ],
      responsibilitiesAr: [
        "إنشاء وتنسيق محتوى وسائل التواصل الاجتماعي",
        "إدارة حسابات وسائل التواصل الاجتماعي",
        "التفاعل مع المتابعين والمجتمع",
        "تحليل مقاييس وسائل التواصل الاجتماعي"
      ],
      requirementsEn: [
        "Bachelor's degree in Marketing or Communications",
        "1+ years of social media experience",
        "Creative content creation skills",
        "Knowledge of social media platforms"
      ],
      requirementsAr: [
        "درجة البكالوريوس في التسويق أو الاتصالات",
        "خبرة سنة+ في وسائل التواصل الاجتماعي",
        "مهارات إبداعية في إنشاء المحتوى",
        "معرفة بمنصات وسائل التواصل الاجتماعي"
      ],
      benefitsEn: [
        "Remote work flexibility",
        "Creative freedom",
        "Training opportunities",
        "Health insurance"
      ],
      benefitsAr: [
        "مرونة العمل عن بُعد",
        "حرية إبداعية",
        "فرص التدريب",
        "تأمين صحي"
      ],
      postedDate: new Date("2024-01-10"),
      urgent: false
    },
    {
      id: "3",
      titleEn: "Program Coordinator",
      titleAr: "منسق برنامج",
      departmentEn: "Programs",
      departmentAr: "البرامج",
      locationEn: "Mareb, Yemen",
      locationAr: "مأرب، اليمن",
      type: "full-time",
      experience: "mid",
      salary: { min: 12000, max: 18000, currency: "YER" },
      descriptionEn: "Coordinate and support program implementation activities, working closely with beneficiaries and partner organizations.",
      descriptionAr: "تنسيق ودعم أنشطة تنفيذ البرامج، والعمل بشكل وثيق مع المستفيدين والمنظمات الشريكة.",
      responsibilitiesEn: [
        "Coordinate program activities",
        "Support beneficiaries and partners",
        "Monitor program progress",
        "Prepare reports and documentation"
      ],
      responsibilitiesAr: [
        "تنسيق أنشطة البرنامج",
        "دعم المستفيدين والشركاء",
        "مراقبة تقدم البرنامج",
        "إعداد التقارير والوثائق"
      ],
      requirementsEn: [
        "Bachelor's degree in Social Work or related field",
        "2+ years of program coordination experience",
        "Strong organizational skills",
        "Fluency in Arabic and English"
      ],
      requirementsAr: [
        "درجة البكالوريوس في الخدمة الاجتماعية أو مجال ذي صلة",
        "خبرة 2+ سنوات في تنسيق البرامج",
        "مهارات تنظيمية قوية",
        "إتقان اللغة العربية والإنجليزية"
      ],
      benefitsEn: [
        "Meaningful work",
        "Professional development",
        "Health insurance",
        "Team collaboration"
      ],
      benefitsAr: [
        "عمل ذو معنى",
        "التطوير المهني",
        "تأمين صحي",
        "تعاون الفريق"
      ],
      postedDate: new Date("2024-01-08"),
      urgent: false
    },
    {
      id: "4",
      titleEn: "Finance Intern",
      titleAr: "متدرب مالية",
      departmentEn: "Finance",
      departmentAr: "المالية",
      locationEn: "Mareb, Yemen",
      locationAr: "مأرب، اليمن",
      type: "internship",
      experience: "entry",
      salary: { min: 3000, max: 5000, currency: "YER" },
      descriptionEn: "Support the finance team with daily operations, reporting, and analysis while gaining valuable experience in non-profit financial management.",
      descriptionAr: "دعم فريق المالية في العمليات اليومية والتقارير والتحليل مع اكتساب خبرة قيمة في الإدارة المالية للمنظمات غير الربحية.",
      responsibilitiesEn: [
        "Assist with financial data entry",
        "Support budget preparation",
        "Help with financial reporting",
        "Learn financial analysis techniques"
      ],
      responsibilitiesAr: [
        "المساعدة في إدخال البيانات المالية",
        "دعم إعداد الميزانية",
        "المساعدة في التقارير المالية",
        "تعلم تقنيات التحليل المالي"
      ],
      requirementsEn: [
        "Currently pursuing degree in Finance or Accounting",
        "Basic knowledge of Excel",
        "Attention to detail",
        "Eagerness to learn"
      ],
      requirementsAr: [
        "يدرس حاليًا درجة في المالية أو المحاسبة",
        "معرفة أساسية بـ Excel",
        "الاهتمام بالتفاصيل",
        "حرص على التعلم"
      ],
      benefitsEn: [
        "Learning opportunity",
        "Mentorship",
        "Certificate of completion",
        "Networking"
      ],
      benefitsAr: [
        "فرصة التعلم",
        "الإرشاد",
        "شهادة إتمام",
        "التشبيك"
      ],
      postedDate: new Date("2024-01-12"),
      urgent: false
    }
  ];

  // Filter jobs
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = searchTerm === "" || 
      (isEn ? job.titleEn : job.titleAr).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (isEn ? job.departmentEn : job.departmentAr).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === "all" || 
      (isEn ? job.departmentEn : job.departmentAr).toLowerCase() === selectedDepartment.toLowerCase();
    
    const matchesType = selectedType === "all" || job.type === selectedType;
    
    return matchesSearch && matchesDepartment && matchesType;
  });

  // Get unique departments
  const departments = Array.from(new Set(
    mockJobs.map(job => isEn ? job.departmentEn : job.departmentAr)
  ));

  const getJobTypeLabel = (type: string) => {
    const types: Record<string, { en: string; ar: string }> = {
      "full-time": { en: "Full Time", ar: "دوام كامل" },
      "part-time": { en: "Part Time", ar: "دوام جزئي" },
      "contract": { en: "Contract", ar: "عقد" },
      "internship": { en: "Internship", ar: "تدريب" }
    };
    return isEn ? types[type]?.en || type : types[type]?.ar || type;
  };

  const getExperienceLabel = (exp: string) => {
    const levels: Record<string, { en: string; ar: string }> = {
      "entry": { en: "Entry Level", ar: "مبتدئ" },
      "mid": { en: "Mid Level", ar: "متوسط" },
      "senior": { en: "Senior Level", ar: "متقدم" }
    };
    return isEn ? levels[exp]?.en || exp : levels[exp]?.ar || exp;
  };

  if (showApplication && selectedJob) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              onClick={() => setShowApplication(false)}
              variant="outline"
              className="mb-8"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              {isEn ? "Back to Jobs" : "العودة للوظائف"}
            </Button>

            <div className="bg-background border border-border rounded-3xl p-8 lg:p-12 shadow-lg">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-4">
                  {isEn ? "Apply for" : "تقدم لوظيفة"} {isEn ? selectedJob.titleEn : selectedJob.titleAr}
                </h1>
                <p className="text-muted-foreground">
                  {isEn ? "Fill out the form below to apply for this position" : "املأ النموذج أدناه للتقدم لهذه الوظيفة"}
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {isEn ? "Full Name" : "الاسم الكامل"} *
                    </label>
                    <Input placeholder={isEn ? "Your full name" : "اسمك الكامل"} className="h-12" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {isEn ? "Email Address" : "البريد الإلكتروني"} *
                    </label>
                    <Input type="email" placeholder="name@example.com" className="h-12" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {isEn ? "Phone Number" : "رقم الهاتف"} *
                    </label>
                    <Input placeholder="+967 7X XXX XXXX" className="h-12" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {isEn ? "Years of Experience" : "سنوات الخبرة"} *
                    </label>
                    <Input type="number" placeholder="5" className="h-12" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isEn ? "Cover Letter" : "خطاب التقديم"} *
                  </label>
                  <textarea
                    rows={6}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground resize-none"
                    placeholder={isEn ? "Tell us why you're perfect for this role..." : "أخبرنا لماذا أنت مناسب لهذه الوظيفة..."}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isEn ? "Resume/CV" : "السيرة الذاتية"} *
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <div className="text-muted-foreground">
                      <Briefcase className="w-12 h-12 mx-auto mb-4" />
                      <p>{isEn ? "Click to upload your resume or drag and drop" : "انقر لتحميل سيرتك الذاتية أو اسحبها وأفلتها"}</p>
                      <p className="text-sm mt-2">{isEn ? "PDF, DOC, or DOCX (max 5MB)" : "PDF، DOC، أو DOCX (حد أقصى 5 ميجابايت)"}</p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12"
                >
                  {isEn ? "Submit Application" : "إرسال الطلب"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (selectedJob) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              onClick={() => setSelectedJob(null)}
              variant="outline"
              className="mb-8"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              {isEn ? "Back to Jobs" : "العودة للوظائف"}
            </Button>

            <div className="bg-background border border-border rounded-3xl p-8 lg:p-12 shadow-lg">
              {/* Job Header */}
              <div className="border-b border-border pb-8 mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <h1 className="text-3xl font-bold">{isEn ? selectedJob.titleEn : selectedJob.titleAr}</h1>
                      {selectedJob.urgent && (
                        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
                          {isEn ? "Urgent" : "عاجل"}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        <span>{isEn ? selectedJob.departmentEn : selectedJob.departmentAr}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{isEn ? selectedJob.locationEn : selectedJob.locationAr}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{getJobTypeLabel(selectedJob.type)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span>{getExperienceLabel(selectedJob.experience)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-brand-primary">
                        {selectedJob.salary.min.toLocaleString()} - {selectedJob.salary.max.toLocaleString()} {selectedJob.salary.currency}
                      </div>
                      <div className="text-sm text-muted-foreground">{isEn ? "per month" : "شهرياً"}</div>
                    </div>
                    <Button
                      onClick={() => setShowApplication(true)}
                      size="lg"
                      className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white"
                    >
                      {isEn ? "Apply Now" : "تقدم الآن"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-4">{isEn ? "Job Description" : "وصف الوظيفة"}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {isEn ? selectedJob.descriptionEn : selectedJob.descriptionAr}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">{isEn ? "Responsibilities" : "المسؤوليات"}</h2>
                  <ul className="space-y-3">
                    {(isEn ? selectedJob.responsibilitiesEn : selectedJob.responsibilitiesAr).map((resp, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">{isEn ? "Requirements" : "المتطلبات"}</h2>
                  <ul className="space-y-3">
                    {(isEn ? selectedJob.requirementsEn : selectedJob.requirementsAr).map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">{isEn ? "Benefits" : "المزايا"}</h2>
                  <ul className="space-y-3">
                    {(isEn ? selectedJob.benefitsEn : selectedJob.benefitsAr).map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/20 dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-purple-950/5">
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-20 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
              <Briefcase className="w-4 h-4" />
              {isEn ? "Join Our Team" : "انضم إلى فريقنا"}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                {isEn ? "Work With Us" : "اعمل معنا"}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {isEn
                ? "Build a meaningful career with purpose. Join our dedicated team and help create lasting positive change in communities across the region."
                : "ابن مسيرة مهنية ذات معنى وهدف. انضم إلى فريقنا المتفاني وساعد في خلق تغيير إيجابي دائم في المجتمعات عبر المنطقة."
              }
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { number: "50+", label: isEn ? "Team Members" : "عضو فريق" },
              { number: "15+", label: isEn ? "Departments" : "قسم" },
              { number: "98%", label: isEn ? "Employee Satisfaction" : "رضا الموظفين" },
              { number: "25+", label: isEn ? "Countries Served" : "دولة خدمناها" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-background/80 backdrop-blur-sm border border-border rounded-2xl"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 px-6 border-b border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-6 items-center justify-between"
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={isEn ? "Search jobs..." : "البحث في الوظائف..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-border bg-background text-foreground h-12"
                >
                  <option value="all">{isEn ? "All Departments" : "جميع الأقسام"}</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground h-12"
              >
                <option value="all">{isEn ? "All Types" : "جميع الأنواع"}</option>
                <option value="full-time">{getJobTypeLabel("full-time")}</option>
                <option value="part-time">{getJobTypeLabel("part-time")}</option>
                <option value="contract">{getJobTypeLabel("contract")}</option>
                <option value="internship">{getJobTypeLabel("internship")}</option>
              </select>
            </div>
          </motion.div>

          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-sm text-muted-foreground"
          >
            {isEn 
              ? `Showing ${filteredJobs.length} of ${mockJobs.length} jobs`
              : `عرض ${filteredJobs.length} من ${mockJobs.length} وظيفة`
            }
          </motion.div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isEn ? "No jobs found" : "لم يتم العثور على وظائف"}
              </h3>
              <p className="text-muted-foreground">
                {isEn 
                  ? "Try adjusting your search terms or filters"
                  : "جرب تعديل مصطلحات البحث أو المرشحات"
                }
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-background border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold group-hover:text-brand-primary transition-colors">
                          {isEn ? job.titleEn : job.titleAr}
                        </h3>
                        {job.urgent && (
                          <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-medium">
                            {isEn ? "Urgent" : "عاجل"}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          <span>{isEn ? job.departmentEn : job.departmentAr}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{isEn ? job.locationEn : job.locationAr}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{getJobTypeLabel(job.type)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{job.postedDate.toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground line-clamp-2">
                        {isEn ? job.descriptionEn : job.descriptionAr}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <div className="text-lg font-bold text-brand-primary">
                          {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                        </div>
                        <div className="text-sm text-muted-foreground">{isEn ? "per month" : "شهرياً"}</div>
                      </div>
                      
                      <Button
                        variant="outline"
                        className="group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-colors"
                      >
                        {isEn ? "View Details" : "عرض التفاصيل"}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}