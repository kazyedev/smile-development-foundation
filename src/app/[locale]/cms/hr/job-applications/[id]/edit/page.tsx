"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2, ExternalLink, Download } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// Form schema - only status is updated
const applicationFormSchema = z.object({
  status: z.enum(["pending", "reviewing", "shortlisted", "rejected", "hired"]),
});

type ApplicationFormData = z.infer<typeof applicationFormSchema>;

interface JobApplication {
  id: number;
  jobId: number;
  name: string;
  email: string;
  phone: string;
  yearsOfExperience: number;
  coverLetter: string;
  cvUrl: string | null;
  status: "pending" | "reviewing" | "shortlisted" | "rejected" | "hired";
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
  job: {
    id: number;
    titleEn: string | null;
    titleAr: string | null;
    departmentEn: string | null;
    departmentAr: string | null;
  } | null;
}

export default function EditJobApplicationPage() {
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [application, setApplication] = useState<JobApplication | null>(null);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      status: "pending",
    },
  });

  const { control, handleSubmit, formState: { errors }, reset } = form;

  const t = {
    en: {
      editApplication: "Edit Job Application",
      viewApplication: "View Job Application Details",
      backToApplications: "Back to Applications",
      save: "Save Changes",
      saving: "Saving...",
      loading: "Loading application...",
      updateSuccess: "Application updated successfully",
      updateFailed: "Failed to update application",
      loadFailed: "Failed to load application",
      notFound: "Application not found",
      personalInfo: "Personal Information",
      applicationInfo: "Application Information",
      candidateInfo: "Candidate Information",
      name: "Name",
      email: "Email",
      phone: "Phone",
      yearsOfExperience: "Years of Experience",
      coverLetter: "Cover Letter",
      cv: "CV/Resume",
      downloadCv: "Download CV",
      viewCv: "View CV",
      noCv: "No CV uploaded",
      status: "Status",
      appliedDate: "Applied Date",
      createdAt: "Created At",
      updatedAt: "Last Updated",
      jobTitle: "Job Title",
      viewJob: "View Job",
      statusPending: "Pending",
      statusReviewing: "Reviewing",
      statusShortlisted: "Shortlisted",
      statusRejected: "Rejected",
      statusHired: "Hired",
    },
    ar: {
      editApplication: "تعديل طلب التوظيف",
      viewApplication: "عرض تفاصيل طلب التوظيف",
      backToApplications: "العودة إلى الطلبات",
      save: "حفظ التغييرات",
      saving: "جاري الحفظ...",
      loading: "جاري تحميل الطلب...",
      updateSuccess: "تم تحديث الطلب بنجاح",
      updateFailed: "فشل في تحديث الطلب",
      loadFailed: "فشل في تحميل الطلب",
      notFound: "الطلب غير موجود",
      personalInfo: "المعلومات الشخصية",
      applicationInfo: "معلومات الطلب",
      candidateInfo: "معلومات المرشح",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      yearsOfExperience: "سنوات الخبرة",
      coverLetter: "خطاب التقديم",
      cv: "السيرة الذاتية",
      downloadCv: "تحميل السيرة الذاتية",
      viewCv: "عرض السيرة الذاتية",
      noCv: "لم يتم تحميل سيرة ذاتية",
      status: "الحالة",
      appliedDate: "تاريخ التقديم",
      createdAt: "تاريخ الإنشاء",
      updatedAt: "آخر تحديث",
      jobTitle: "المسمى الوظيفي",
      viewJob: "عرض الوظيفة",
      statusPending: "قيد الانتظار",
      statusReviewing: "قيد المراجعة",
      statusShortlisted: "قائمة المرشحين",
      statusRejected: "مرفوض",
      statusHired: "تم التوظيف",
    }
  };

  const text = isArabic ? t.ar : t.en;

  const statusOptions = [
    { value: "pending", label: text.statusPending },
    { value: "reviewing", label: text.statusReviewing },
    { value: "shortlisted", label: text.statusShortlisted },
    { value: "rejected", label: text.statusRejected },
    { value: "hired", label: text.statusHired },
  ];

  // Load application data
  useEffect(() => {
    const loadApplication = async () => {
      try {
        setIsLoading(true);
        
        const response = await fetch(`/api/cms/job-applications/${id}`);
        const result = await response.json();

        if (response.ok && result.data) {
          const appData = result.data;
          setApplication(appData);

          // Set form values
          reset({
            status: appData.status,
          });
        } else {
          toast.error(text.notFound);
          router.push(`/${locale}/cms/hr/job-applications`);
        }
      } catch (error) {
        console.error("Failed to load application:", error);
        toast.error(text.loadFailed);
        router.push(`/${locale}/cms/hr/job-applications`);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadApplication();
    }
  }, [id, reset, router, locale, text.notFound, text.loadFailed]);

  const onSubmit = async (data: ApplicationFormData) => {
    if (!application) return;

    try {
      setIsSubmitting(true);
      
      const response = await fetch(`/api/cms/job-applications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(text.updateSuccess);
        // Update local state
        setApplication(prev => prev ? { ...prev, status: data.status } : null);
      } else {
        toast.error(result.error || text.updateFailed);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(text.updateFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-6xl" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{text.loading}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-6xl" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">{text.notFound}</p>
          <Link href={`/${locale}/cms/hr/job-applications`}>
            <Button variant="outline" className="mt-4">
              {text.backToApplications}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const jobTitle = application.job 
    ? (isArabic ? application.job.titleAr : application.job.titleEn) || 
      (isArabic ? application.job.titleEn : application.job.titleAr) || 
      `Job #${application.job.id}`
    : `Job #${application.jobId}`;

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{text.editApplication}</h1>
          <p className="text-muted-foreground mt-1">
            {text.viewApplication}
          </p>
        </div>
        <Link href={`/${locale}/cms/hr/job-applications`}>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {text.backToApplications}
          </Button>
        </Link>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Candidate Information */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">{text.candidateInfo}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">{text.name}</label>
                <Input value={application.name} disabled className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{text.email}</label>
                <Input value={application.email} disabled className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{text.phone}</label>
                <Input value={application.phone} disabled className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{text.yearsOfExperience}</label>
                <Input value={application.yearsOfExperience} disabled className="mt-1" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">{text.coverLetter}</label>
              <Textarea value={application.coverLetter} disabled className="mt-1 min-h-[150px]" />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">{text.cv}</label>
              {application.cvUrl ? (
                <div className="mt-2 flex items-center gap-2">
                  <a 
                    href={application.cvUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{text.viewCv}</span>
                  </a>
                  <span className="text-muted-foreground">|</span>
                  <a 
                    href={application.cvUrl} 
                    download
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Download className="w-4 h-4" />
                    <span>{text.downloadCv}</span>
                  </a>
                </div>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">{text.noCv}</p>
              )}
            </div>
          </div>

          {/* Application Information */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">{text.applicationInfo}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">{text.jobTitle}</label>
                <div className="mt-1 flex items-center gap-2">
                  <Input value={jobTitle} disabled className="flex-1" />
                  {application.job && (
                    <Link href={`/${locale}/cms/jobs/${application.job.id}/edit`}>
                      <Button variant="outline" size="sm" type="button">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {text.viewJob}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{text.appliedDate}</label>
                <Input 
                  value={new Date(application.appliedAt).toLocaleString()} 
                  disabled 
                  className="mt-1" 
                />
              </div>
            </div>

            <div>
              <FormField
                control={control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{text.status}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={text.status} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Update the application status to track the hiring process.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">{text.createdAt}</label>
                <Input 
                  value={new Date(application.createdAt).toLocaleString()} 
                  disabled 
                  className="mt-1" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{text.updatedAt}</label>
                <Input 
                  value={new Date(application.updatedAt).toLocaleString()} 
                  disabled 
                  className="mt-1" 
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link href={`/${locale}/cms/hr/job-applications`}>
              <Button type="button" variant="outline">
                {text.backToApplications}
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {text.saving}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {text.save}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

