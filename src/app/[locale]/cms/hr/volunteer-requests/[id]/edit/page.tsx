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
const requestFormSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]),
});

type RequestFormData = z.infer<typeof requestFormSchema>;

interface VolunteerRequest {
  id: number;
  isEnglish: boolean;
  isArabic: boolean;
  name: string;
  email: string;
  phone: string;
  age: string;
  interests: string;
  availability: string;
  experience: string;
  motivation: string;
  cvUrl: string | null;Jobs
  questionsAnswers: any[] | null;
  status: "pending" | "approved" | "rejected";
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
}

export default function EditVolunteerRequestPage() {
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [request, setRequest] = useState<VolunteerRequest | null>(null);

  const form = useForm<RequestFormData>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      status: "pending",
    },
  });

  const { control, handleSubmit, formState: { errors }, reset } = form;

  const t = {
    en: {
      editRequest: "Edit Volunteer Request",
      viewRequest: "View Volunteer Request Details",
      backToRequests: "Back to Requests",
      save: "Save Changes",
      saving: "Saving...",
      loading: "Loading request...",
      updateSuccess: "Request updated successfully",
      updateFailed: "Failed to update request",
      loadFailed: "Failed to load request",
      notFound: "Request not found",
      personalInfo: "Personal Information",
      applicationInfo: "Application Information",
      volunteerInfo: "Volunteer Information",
      name: "Name",
      email: "Email",
      phone: "Phone",
      age: "Age",
      interests: "Interests",
      availability: "Availability",
      experience: "Experience",
      motivation: "Motivation",
      cv: "CV/Resume",
      downloadCv: "Download CV",
      viewCv: "View CV",
      noCv: "No CV uploaded",
      status: "Status",
      appliedDate: "Applied Date",
      createdAt: "Created At",
      updatedAt: "Last Updated",
      questionsAnswers: "Questions & Answers",
      noQuestionsAnswers: "No questions and answers provided",
      statusPending: "Pending",
      statusApproved: "Approved",
      statusRejected: "Rejected",
    },
    ar: {
      editRequest: "تعديل طلب التطوع",
      viewRequest: "عرض تفاصيل طلب التطوع",
      backToRequests: "العودة إلى الطلبات",
      save: "حفظ التغييرات",
      saving: "جاري الحفظ...",
      loading: "جاري تحميل الطلب...",
      updateSuccess: "تم تحديث الطلب بنجاح",
      updateFailed: "فشل في تحديث الطلب",
      loadFailed: "فشل في تحميل الطلب",
      notFound: "الطلب غير موجود",
      personalInfo: "المعلومات الشخصية",
      applicationInfo: "معلومات الطلب",
      volunteerInfo: "معلومات المتطوع",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      age: "العمر",
      interests: "الاهتمامات",
      availability: "التوفر",
      experience: "الخبرة",
      motivation: "الدافع",
      cv: "السيرة الذاتية",
      downloadCv: "تحميل السيرة الذاتية",
      viewCv: "عرض السيرة الذاتية",
      noCv: "لم يتم تحميل سيرة ذاتية",
      status: "الحالة",
      appliedDate: "تاريخ التقديم",
      createdAt: "تاريخ الإنشاء",
      updatedAt: "آخر تحديث",
      questionsAnswers: "الأسئلة والأجوبة",
      noQuestionsAnswers: "لم يتم تقديم أسئلة وأجوبة",
      statusPending: "قيد الانتظار",
      statusApproved: "موافق عليه",
      statusRejected: "مرفوض",
    }
  };

  const text = isArabic ? t.ar : t.en;

  const statusOptions = [
    { value: "pending", label: text.statusPending },
    { value: "approved", label: text.statusApproved },
    { value: "rejected", label: text.statusRejected },
  ];

  // Load request data
  useEffect(() => {
    const loadRequest = async () => {
      try {
        setIsLoading(true);
        
        const response = await fetch(`/api/cms/volunteer-requests/${id}`);
        const result = await response.json();

        if (response.ok && result.data) {
          const reqData = result.data;
          setRequest(reqData);

          // Set form values
          reset({
            status: reqData.status,
          });
        } else {
          toast.error(text.notFound);
          router.push(`/${locale}/cms/hr/volunteer-requests`);
        }
      } catch (error) {
        console.error("Failed to load request:", error);
        toast.error(text.loadFailed);
        router.push(`/${locale}/cms/hr/volunteer-requests`);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadRequest();
    }
  }, [id, reset, router, locale, text.notFound, text.loadFailed]);

  const onSubmit = async (data: RequestFormData) => {
    if (!request) return;

    try {
      setIsSubmitting(true);
      
      const response = await fetch(`/api/cms/volunteer-requests/${id}`, {
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
        setRequest(prev => prev ? { ...prev, status: data.status } : null);
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

  if (!request) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-6xl" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">{text.notFound}</p>
          <Link href={`/${locale}/cms/hr/volunteer-requests`}>
            <Button variant="outline" className="mt-4">
              {text.backToRequests}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{text.editRequest}</h1>
          <p className="text-muted-foreground mt-1">
            {text.viewRequest}
          </p>
        </div>
        <Link href={`/${locale}/cms/hr/volunteer-requests`}>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {text.backToRequests}
          </Button>
        </Link>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Volunteer Information */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">{text.volunteerInfo}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">{text.name}</label>
                <Input value={request.name || ""} disabled className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{text.email}</label>
                <Input value={request.email || ""} disabled className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{text.phone}</label>
                <Input value={request.phone || ""} disabled className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{text.age}</label>
                <Input value={request.age || ""} disabled className="mt-1" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">{text.interests}</label>
              <Input value={request.interests || ""} disabled className="mt-1" />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">{text.availability}</label>
              <Input value={request.availability || ""} disabled className="mt-1" />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">{text.experience}</label>
              <Textarea value={request.experience || ""} disabled className="mt-1 min-h-[100px]" />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">{text.motivation}</label>
              <Textarea value={request.motivation || ""} disabled className="mt-1 min-h-[100px]" />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">{text.cv}</label>
              {request.cvUrl ? (
                <div className="mt-2 flex items-center gap-2">
                  <a 
                    href={request.cvUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{text.viewCv}</span>
                  </a>
                  <span className="text-muted-foreground">|</span>
                  <a 
                    href={request.cvUrl} 
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
                <label className="text-sm font-medium text-muted-foreground">{text.appliedDate}</label>
                <Input 
                  value={new Date(request.appliedAt).toLocaleString()} 
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
                      Update the request status to track the volunteer application process.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Questions & Answers */}
            {request.questionsAnswers && request.questionsAnswers.length > 0 && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">{text.questionsAnswers}</label>
                <div className="mt-2 space-y-3">
                  {request.questionsAnswers.map((qa: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="font-medium mb-2">
                        {isArabic ? qa.question?.questionAr : qa.question?.questionEn}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {isArabic ? qa.answerAr : qa.answerEn}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">{text.createdAt}</label>
                <Input 
                  value={new Date(request.createdAt).toLocaleString()} 
                  disabled 
                  className="mt-1" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{text.updatedAt}</label>
                <Input 
                  value={new Date(request.updatedAt).toLocaleString()} 
                  disabled 
                  className="mt-1" 
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link href={`/${locale}/cms/hr/volunteer-requests`}>
              <Button type="button" variant="outline">
                {text.backToRequests}
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

