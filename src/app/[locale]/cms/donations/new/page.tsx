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
import { DonationFields } from "@/components/cms/donations/DonationFields";
import Link from "next/link";

// Form schema
const donationFormSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  currency: z.enum(["USD", "SAR", "AED", "YER"]),
  method: z.enum(["stripe", "cash_transfer", "bank_deposit"]),
  frequency: z.enum(["once", "monthly"]),
  status: z.enum(["pending", "completed", "failed", "cancelled"]),
  donorName: z.string().max(200).optional().or(z.literal("")),
  donorEmail: z.string().email("Invalid email address"),
  donorNote: z.string().max(5000).optional().or(z.literal("")),
  transferAttachmentUrl: z.string().url().optional().or(z.literal("")),
  depositAttachmentUrl: z.string().url().optional().or(z.literal("")),
});

type DonationFormData = z.infer<typeof donationFormSchema>;

export default function NewDonationPage() {
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      amount: 0,
      currency: "USD",
      method: "stripe",
      frequency: "once",
      status: "pending",
      donorName: "",
      donorEmail: "",
      donorNote: "",
      transferAttachmentUrl: "",
      depositAttachmentUrl: "",
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  const t = {
    en: {
      newDonation: "New Donation",
      createDonation: "Record a new donation",
      backToDonations: "Back to Donations",
      save: "Save Donation",
      saving: "Saving...",
      createSuccess: "Donation recorded successfully",
      createFailed: "Failed to record donation",
      requiredFields: "Please fill in all required fields",
    },
    ar: {
      newDonation: "تبرع جديد",
      createDonation: "تسجيل تبرع جديد",
      backToDonations: "العودة إلى التبرعات",
      save: "حفظ التبرع",
      saving: "جاري الحفظ...",
      createSuccess: "تم تسجيل التبرع بنجاح",
      createFailed: "فشل في تسجيل التبرع",
      requiredFields: "يرجى ملء جميع الحقول المطلوبة",
    }
  };

  const text = isArabic ? t.ar : t.en;

  const onSubmit = async (data: DonationFormData) => {
    try {
      setIsSubmitting(true);
      
      // Clean up empty strings for optional fields
      const submitData = {
        ...data,
        donorName: data.donorName || undefined,
        donorNote: data.donorNote || undefined,
        transferAttachmentUrl: data.transferAttachmentUrl || undefined,
        depositAttachmentUrl: data.depositAttachmentUrl || undefined,
      };
      
      const response = await fetch("/api/cms/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(text.createSuccess);
        router.push(`/${locale}/cms/donations`);
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
          <h1 className="text-3xl font-bold text-foreground">{text.newDonation}</h1>
          <p className="text-muted-foreground mt-1">
            {text.createDonation}
          </p>
        </div>
        <Link href={`/${locale}/cms/donations`}>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {text.backToDonations}
          </Button>
        </Link>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <DonationFields 
            control={control} 
            errors={errors} 
            isArabic={isArabic} 
          />

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link href={`/${locale}/cms/donations`}>
              <Button type="button" variant="outline">
                {text.backToDonations}
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

