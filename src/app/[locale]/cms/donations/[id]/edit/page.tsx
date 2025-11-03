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
import { DonationFields } from "@/components/cms/donations/DonationFields";
import Link from "next/link";
import type { Donation } from "@/lib/db/schema/donations";

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

export default function EditDonationPage() {
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [donation, setDonation] = useState<Donation | null>(null);

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

  const { control, handleSubmit, formState: { errors }, reset } = form;

  const t = {
    en: {
      editDonation: "Edit Donation",
      updateDonation: "Update donation information",
      backToDonations: "Back to Donations",
      save: "Save Changes",
      saving: "Saving...",
      loading: "Loading donation...",
      updateSuccess: "Donation updated successfully",
      updateFailed: "Failed to update donation",
      loadFailed: "Failed to load donation",
      notFound: "Donation not found",
    },
    ar: {
      editDonation: "تعديل التبرع",
      updateDonation: "تحديث معلومات التبرع",
      backToDonations: "العودة إلى التبرعات",
      save: "حفظ التغييرات",
      saving: "جاري الحفظ...",
      loading: "جاري تحميل التبرع...",
      updateSuccess: "تم تحديث التبرع بنجاح",
      updateFailed: "فشل في تحديث التبرع",
      loadFailed: "فشل في تحميل التبرع",
      notFound: "التبرع غير موجود",
    }
  };

  const text = isArabic ? t.ar : t.en;

  // Load donation data
  useEffect(() => {
    const loadDonation = async () => {
      try {
        setIsLoading(true);
        
        const response = await fetch(`/api/cms/donations/${id}`);
        const result = await response.json();

        if (response.ok && result.data) {
          const donationData = result.data;
          setDonation(donationData);

          // Transform database fields to form fields
          const formData: DonationFormData = {
            amount: parseFloat(donationData.amount || "0"),
            currency: donationData.currency || "USD",
            method: donationData.method || "stripe",
            frequency: donationData.frequency || "once",
            status: donationData.status || "pending",
            donorName: donationData.donor_name || "",
            donorEmail: donationData.donor_email || "",
            donorNote: donationData.donor_note || "",
            transferAttachmentUrl: donationData.transfer_attachment_url || "",
            depositAttachmentUrl: donationData.deposit_attachment_url || "",
          };

          reset(formData);
        } else {
          toast.error(text.notFound);
          router.push(`/${locale}/cms/donations`);
        }
      } catch (error) {
        console.error("Failed to load donation:", error);
        toast.error(text.loadFailed);
        router.push(`/${locale}/cms/donations`);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadDonation();
    }
  }, [id, reset, router, locale, text.notFound, text.loadFailed]);

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
      
      const response = await fetch(`/api/cms/donations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(text.updateSuccess);
        router.push(`/${locale}/cms/donations`);
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

  if (!donation) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-6xl" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">{text.notFound}</p>
          <Link href={`/${locale}/cms/donations`}>
            <Button variant="outline" className="mt-4">
              {text.backToDonations}
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
          <h1 className="text-3xl font-bold text-foreground">{text.editDonation}</h1>
          <p className="text-muted-foreground mt-1">
            {text.updateDonation}
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

