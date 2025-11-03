"use client";

import { useState, useEffect } from "react";
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
import type { NewsletterMember } from "@/lib/db/schema/newsletterMembers";

// Form schema
const newsletterMemberFormSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required").max(200),
  isEnglish: z.boolean().default(false),
  isArabic: z.boolean().default(false),
});

type NewsletterMemberFormData = z.infer<typeof newsletterMemberFormSchema>;

export default function EditNewsletterMemberPage() {
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [member, setMember] = useState<NewsletterMember | null>(null);

  const form = useForm<NewsletterMemberFormData>({
    resolver: zodResolver(newsletterMemberFormSchema),
    defaultValues: {
      email: "",
      isEnglish: false,
      isArabic: false,
    },
  });

  const { control, handleSubmit, formState: { errors }, reset } = form;

  const t = {
    en: {
      editMember: "Edit Newsletter Member",
      updateMember: "Update newsletter member information",
      backToMembers: "Back to Members",
      save: "Save Changes",
      saving: "Saving...",
      loading: "Loading member...",
      updateSuccess: "Member updated successfully",
      updateFailed: "Failed to update member",
      loadFailed: "Failed to load member",
      notFound: "Member not found",
    },
    ar: {
      editMember: "تعديل عضو النشرة الإخبارية",
      updateMember: "تحديث معلومات عضو النشرة الإخبارية",
      backToMembers: "العودة إلى الأعضاء",
      save: "حفظ التغييرات",
      saving: "جاري الحفظ...",
      loading: "جاري تحميل العضو...",
      updateSuccess: "تم تحديث العضو بنجاح",
      updateFailed: "فشل في تحديث العضو",
      loadFailed: "فشل في تحميل العضو",
      notFound: "العضو غير موجود",
    }
  };

  const text = isArabic ? t.ar : t.en;

  // Load member data
  useEffect(() => {
    const loadMember = async () => {
      try {
        setIsLoading(true);
        
        const response = await fetch(`/api/cms/newsletter-members/${id}`);
        const result = await response.json();

        if (response.ok && result.data) {
          const memberData = result.data;
          setMember(memberData);

          // Transform database fields to form fields
          const formData: NewsletterMemberFormData = {
            email: memberData.email || "",
            isEnglish: memberData.is_english || false,
            isArabic: memberData.is_arabic || false,
          };

          reset(formData);
        } else {
          toast.error(text.notFound);
          router.push(`/${locale}/cms/news/newsletter-members`);
        }
      } catch (error) {
        console.error("Failed to load member:", error);
        toast.error(text.loadFailed);
        router.push(`/${locale}/cms/news/newsletter-members`);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadMember();
    }
  }, [id, reset, router, locale, text.notFound, text.loadFailed]);

  const onSubmit = async (data: NewsletterMemberFormData) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch(`/api/cms/newsletter-members/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(text.updateSuccess);
        router.push(`/${locale}/cms/news/newsletter-members`);
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

  if (!member) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-6xl" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">{text.notFound}</p>
          <Link href={`/${locale}/cms/news/newsletter-members`}>
            <Button variant="outline" className="mt-4">
              {text.backToMembers}
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
          <h1 className="text-3xl font-bold text-foreground">{text.editMember}</h1>
          <p className="text-muted-foreground mt-1">
            {text.updateMember}
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

