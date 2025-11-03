"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { NewsletterMemberFields } from "@/components/cms/newsletter-members/NewsletterMemberFields";
import Link from "next/link";

// Form schema
const newsletterMemberFormSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required").max(200),
  isEnglish: z.boolean().default(false),
  isArabic: z.boolean().default(false),
});

type NewsletterMemberFormData = z.infer<typeof newsletterMemberFormSchema>;

export default function NewNewsletterMemberPage() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewsletterMemberFormData>({
    resolver: zodResolver(newsletterMemberFormSchema),
    defaultValues: {
      email: "",
      isEnglish: false,
      isArabic: false,
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  const t = {
    en: {
      newMember: "New Newsletter Member",
      createMember: "Add a new newsletter subscriber",
      backToMembers: "Back to Members",
      save: "Save Member",
      saving: "Saving...",
      createSuccess: "Member added successfully",
      createFailed: "Failed to add member",
      requiredFields: "Please fill in all required fields",
    },
    ar: {
      newMember: "عضو نشرة إخبارية جديد",
      createMember: "إضافة مشترك جديد في النشرة الإخبارية",
      backToMembers: "العودة إلى الأعضاء",
      save: "حفظ العضو",
      saving: "جاري الحفظ...",
      createSuccess: "تم إضافة العضو بنجاح",
      createFailed: "فشل في إضافة العضو",
      requiredFields: "يرجى ملء جميع الحقول المطلوبة",
    }
  };

  const text = isArabic ? t.ar : t.en;

  const onSubmit = async (data: NewsletterMemberFormData) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch("/api/cms/newsletter-members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(text.createSuccess);
        router.push(`/${locale}/cms/news/newsletter-members`);
      } else {
        toast.error(result.error || text.createFailed);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(text.createFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{text.newMember}</h1>
          <p className="text-muted-foreground mt-1">
            {text.createMember}
          </p>
        </div>
        <Link href={`/${locale}/cms/news/newsletter-members`}>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {text.backToMembers}
          </Button>
        </Link>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <NewsletterMemberFields 
            control={control} 
            errors={errors} 
            isArabic={isArabic} 
          />

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link href={`/${locale}/cms/news/newsletter-members`}>
              <Button type="button" variant="outline">
                {text.backToMembers}
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

