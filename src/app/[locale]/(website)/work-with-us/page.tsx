"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, DollarSign, Users, Star, ArrowRight, Filter, Search, Building, Calendar, CheckCircle, Mail, Phone, Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Job {
  id: number;
  titleEn: string;
  titleAr: string;
  departmentEn: string;
  departmentAr: string;
  locationEn: string;
  locationAr: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  experience: "entry" | "mid" | "senior";
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  descriptionEn: string;
  descriptionAr: string;
  responsibilitiesEn: string[];
  responsibilitiesAr: string[];
  requirementsEn: string[];
  requirementsAr: string[];
  benefitsEn: string[];
  benefitsAr: string[];
  postedDate: string;
  urgent: boolean;
  isPublished: boolean;
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
  
  // Jobs state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Application form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    yearsOfExperience: "",
    coverLetter: ""
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/jobs');
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setJobs(result.data);
          }
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // CV file validation
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
    const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setSubmitting(true);
    setCvError(null);
    
    try {
      let cvUrl = '';
      
      // Upload CV file to Supabase if provided
      if (cvFile) {
        const fileExt = cvFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('job_applies_attachments')
          .upload(fileName, cvFile, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (uploadError) {
          throw new Error(uploadError.message);
        }
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('job_applies_attachments')
          .getPublicUrl(fileName);
        
        cvUrl = publicUrl;
      }
      
      // Submit application to API
      const response = await fetch('/api/jobs/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: selectedJob.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          yearsOfExperience: parseInt(formData.yearsOfExperience),
          coverLetter: formData.coverLetter,
          cvUrl: cvUrl
        })
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

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
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
    jobs.map(job => isEn ? job.departmentEn : job.departmentAr)
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
            {isEn ? "Application Submitted Successfully!" : "تم إرسال الطلب بنجاح!"}
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            {isEn
              ? "We've received your job application and will review it carefully. We'll contact you within 5 business days if you're selected for an interview."
              : "لقد تلقينا طلب التوظيف الخاص بك وسنراجعه بعناية. سنتواصل معك خلال 5 أيام عمل إذا تم اختيارك للمقابلة."
            }
          </p>
          <Button asChild size="lg">
            <button onClick={() => {
              setSubmitted(false);
              setShowApplication(false);
              setFormData({ name: "", email: "", phone: "", yearsOfExperience: "", coverLetter: "" });
              setCvFile(null);
              setCvError(null);
            }}>
              {isEn ? "Back to Jobs" : "العودة للوظائف"}
            </button>
          </Button>
        </motion.div>
      </div>
    );
  }

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
                      {isEn ? "Years of Experience" : "سنوات الخبرة"} *
                    </label>
                    <Input 
                      type="number" 
                      value={formData.yearsOfExperience}
                      onChange={(e) => setFormData(prev => ({ ...prev, yearsOfExperience: e.target.value }))}
                      placeholder="5" 
                      className="h-12" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isEn ? "Cover Letter" : "خطاب التقديم"} *
                  </label>
                  <textarea
                    rows={6}
                    value={formData.coverLetter}
                    onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground resize-none"
                    placeholder={isEn ? "Tell us why you're perfect for this role..." : "أخبرنا لماذا أنت مناسب لهذه الوظيفة..."}
                    required
                  />
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {isEn ? "Resume/CV (Optional)" : "السيرة الذاتية (اختياري)"}
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
                  disabled={submitting}
                  size="lg"
                  className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      {isEn ? "Submitting..." : "جاري الإرسال..."}
                    </>
                  ) : (
                    <>
                      {isEn ? "Submit Application" : "إرسال الطلب"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
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
                        {selectedJob.salaryMin?.toLocaleString() || 'N/A'} - {selectedJob.salaryMax?.toLocaleString() || 'N/A'} {selectedJob.salaryCurrency || 'YER'}
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
                    {((isEn ? selectedJob.responsibilitiesEn : selectedJob.responsibilitiesAr) || []).map((resp, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{resp}</span>
                      </li>
                    ))}
                  </ul>
                  {(!selectedJob.responsibilitiesEn || selectedJob.responsibilitiesEn.length === 0) && (!selectedJob.responsibilitiesAr || selectedJob.responsibilitiesAr.length === 0) && (
                    <p className="text-muted-foreground italic">
                      {isEn ? "No responsibilities listed" : "لم يتم إدراج مسؤوليات"}
                    </p>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">{isEn ? "Requirements" : "المتطلبات"}</h2>
                  <ul className="space-y-3">
                    {((isEn ? selectedJob.requirementsEn : selectedJob.requirementsAr) || []).map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                  {(!selectedJob.requirementsEn || selectedJob.requirementsEn.length === 0) && (!selectedJob.requirementsAr || selectedJob.requirementsAr.length === 0) && (
                    <p className="text-muted-foreground italic">
                      {isEn ? "No requirements listed" : "لم يتم إدراج متطلبات"}
                    </p>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">{isEn ? "Benefits" : "المزايا"}</h2>
                  <ul className="space-y-3">
                    {((isEn ? selectedJob.benefitsEn : selectedJob.benefitsAr) || []).map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  {(!selectedJob.benefitsEn || selectedJob.benefitsEn.length === 0) && (!selectedJob.benefitsAr || selectedJob.benefitsAr.length === 0) && (
                    <p className="text-muted-foreground italic">
                      {isEn ? "No benefits listed" : "لم يتم إدراج مزايا"}
                    </p>
                  )}
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
              ? `Showing ${filteredJobs.length} of ${jobs.length} jobs`
              : `عرض ${filteredJobs.length} من ${jobs.length} وظيفة`
            }
          </motion.div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
                <span className="text-muted-foreground">
                  {isEn ? "Loading jobs..." : "جاري تحميل الوظائف..."}
                </span>
              </div>
            </div>
          ) : filteredJobs.length === 0 ? (
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
                          <span>{new Date(job.postedDate).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground line-clamp-2">
                        {isEn ? job.descriptionEn : job.descriptionAr}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <div className="text-lg font-bold text-brand-primary">
                          {job.salaryMin?.toLocaleString() || 'N/A'} - {job.salaryMax?.toLocaleString() || 'N/A'} {job.salaryCurrency || 'YER'}
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