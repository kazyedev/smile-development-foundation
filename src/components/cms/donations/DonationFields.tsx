"use client";

import { Control, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CURRENCIES } from "@/lib/db/schema/donations";

interface DonationFieldsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  isArabic: boolean;
}

export function DonationFields({ control, errors, isArabic }: DonationFieldsProps) {
  const t = {
    en: {
      donationDetails: "Donation Details",
      amount: "Amount",
      amountPlaceholder: "Enter donation amount...",
      currency: "Currency",
      method: "Payment Method",
      frequency: "Frequency",
      status: "Status",
      donorInfo: "Donor Information",
      donorName: "Donor Name",
      donorNamePlaceholder: "Enter donor name...",
      donorEmail: "Donor Email",
      donorEmailPlaceholder: "Enter donor email...",
      donorNote: "Donor Note",
      donorNotePlaceholder: "Enter a note from the donor...",
      paymentDetails: "Payment Details",
      transferAttachmentUrl: "Transfer Attachment URL",
      transferAttachmentPlaceholder: "URL to transfer receipt...",
      depositAttachmentUrl: "Deposit Attachment URL",
      depositAttachmentPlaceholder: "URL to deposit certificate...",
      once: "One-time",
      monthly: "Monthly",
      pending: "Pending",
      completed: "Completed",
      failed: "Failed",
      cancelled: "Cancelled",
      stripe: "Stripe",
      cashTransfer: "Cash Transfer",
      bankDeposit: "Bank Deposit",
    },
    ar: {
      donationDetails: "تفاصيل التبرع",
      amount: "المبلغ",
      amountPlaceholder: "أدخل مبلغ التبرع...",
      currency: "العملة",
      method: "طريقة الدفع",
      frequency: "التكرار",
      status: "الحالة",
      donorInfo: "معلومات المانح",
      donorName: "اسم المانح",
      donorNamePlaceholder: "أدخل اسم المانح...",
      donorEmail: "بريد المانح الإلكتروني",
      donorEmailPlaceholder: "أدخل بريد المانح الإلكتروني...",
      donorNote: "ملاحظة المانح",
      donorNotePlaceholder: "أدخل ملاحظة من المانح...",
      paymentDetails: "تفاصيل الدفع",
      transferAttachmentUrl: "رابط مرفق التحويل",
      transferAttachmentPlaceholder: "رابط إيصال التحويل...",
      depositAttachmentUrl: "رابط مرفق الإيداع",
      depositAttachmentPlaceholder: "رابط شهادة الإيداع...",
      once: "مرة واحدة",
      monthly: "شهري",
      pending: "قيد الانتظار",
      completed: "مكتمل",
      failed: "فشل",
      cancelled: "ملغي",
      stripe: "سترايب",
      cashTransfer: "تحويل نقدي",
      bankDeposit: "إيداع بنكي",
    }
  };

  const text = isArabic ? t.ar : t.en;

  return (
    <>
      {/* Donation Details Card */}
      <Card>
        <CardHeader>
          <CardTitle>{text.donationDetails}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.amount}</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder={text.amountPlaceholder} 
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : "")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.currency}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={text.currency} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(CURRENCIES).map(([code, info]) => (
                        <SelectItem key={code} value={code}>
                          {info.symbol} - {info.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.method}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={text.method} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="stripe">{text.stripe}</SelectItem>
                      <SelectItem value="cash_transfer">{text.cashTransfer}</SelectItem>
                      <SelectItem value="bank_deposit">{text.bankDeposit}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.frequency}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={text.frequency} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="once">{text.once}</SelectItem>
                      <SelectItem value="monthly">{text.monthly}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      <SelectItem value="pending">{text.pending}</SelectItem>
                      <SelectItem value="completed">{text.completed}</SelectItem>
                      <SelectItem value="failed">{text.failed}</SelectItem>
                      <SelectItem value="cancelled">{text.cancelled}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Donor Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>{text.donorInfo}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="donorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.donorName}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={text.donorNamePlaceholder} 
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="donorEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{text.donorEmail}</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder={text.donorEmailPlaceholder} 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="donorNote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.donorNote}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={text.donorNotePlaceholder}
                    className="min-h-[100px]"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Payment Details Card */}
      <Card>
        <CardHeader>
          <CardTitle>{text.paymentDetails}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={control}
            name="transferAttachmentUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.transferAttachmentUrl}</FormLabel>
                <FormControl>
                  <Input 
                    type="url"
                    placeholder={text.transferAttachmentPlaceholder} 
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  {isArabic ? "لطريقة التحويل النقدي" : "For cash transfer method"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="depositAttachmentUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.depositAttachmentUrl}</FormLabel>
                <FormControl>
                  <Input 
                    type="url"
                    placeholder={text.depositAttachmentPlaceholder} 
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  {isArabic ? "لطريقة الإيداع البنكي" : "For bank deposit method"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </>
  );
}

