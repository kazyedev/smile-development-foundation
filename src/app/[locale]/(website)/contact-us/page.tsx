"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function ContactUsPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  const isEn = locale === "en";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!name || !email || !message) {
      setStatus({ ok: false, msg: isEn ? "Please fill in required fields." : "يرجى ملء الحقول المطلوبة." });
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message, locale }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus({ ok: true, msg: isEn ? "Thanks! We received your message." : "شكراً! تم استلام رسالتك." });
      setName(""); setEmail(""); setPhone(""); setSubject(""); setMessage("");
    } catch {
      setStatus({ ok: false, msg: isEn ? "Something went wrong. Please try again." : "حدث خطأ ما. حاول مرة أخرى." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 px-4 py-10 border-t border-b border-[var(--secondary)]">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold">{isEn ? "Contact Us" : "تواصل معنا"}</h1>
        <p className="text-muted-foreground mt-2">
          {isEn
            ? "We'd love to hear from you. Fill out the form and our team will get back to you."
            : "يسعدنا تواصلكم. املأ النموذج وسيتواصل فريقنا معكم قريباً."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl w-full mx-auto">
        <div className="lg:col-span-2 rounded-xl border p-6 bg-[var(--card)]">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm mb-1">{isEn ? "Full Name" : "الاسم الكامل"} *</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border bg-transparent px-3 py-2" placeholder={isEn ? "Your name" : "اسمك"} />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm mb-1">{isEn ? "Email" : "البريد الإلكتروني"} *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border bg-transparent px-3 py-2" placeholder="name@example.com" />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm mb-1">{isEn ? "Phone (optional)" : "الهاتف (اختياري)"}</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-md border bg-transparent px-3 py-2" placeholder={isEn ? "+20 1X XXX XXXX" : "+20 1X XXX XXXX"} />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm mb-1">{isEn ? "Subject" : "الموضوع"}</label>
              <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full rounded-md border bg-transparent px-3 py-2" placeholder={isEn ? "How can we help?" : "كيف يمكننا المساعدة؟"} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">{isEn ? "Message" : "الرسالة"} *</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} className="w-full rounded-md border bg-transparent px-3 py-2" placeholder={isEn ? "Write your message here..." : "اكتب رسالتك هنا..."} />
            </div>
            {status && (
              <div className={`md:col-span-2 text-sm ${status.ok ? 'text-emerald-600' : 'text-red-600'}`}>{status.msg}</div>
            )}
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" disabled={submitting} className="px-5 py-2 rounded-md bg-[var(--brand-primary)] text-white disabled:opacity-60">
                {submitting ? (isEn ? "Sending..." : "إرسال...") : (isEn ? "Send Message" : "إرسال الرسالة")}
              </button>
            </div>
          </form>
        </div>
        <div className="rounded-xl border p-6 bg-[var(--card)] flex flex-col gap-4">
          <div>
            <p className="font-semibold">{isEn ? "Address" : "العنوان"}</p>
            <p className="text-sm text-muted-foreground">{isEn ? "123 Foundation St., Cairo, Egypt" : "١٢٣ شارع المؤسسة، القاهرة، مصر"}</p>
          </div>
          <div>
            <p className="font-semibold">{isEn ? "Email" : "البريد الإلكتروني"}</p>
            <p className="text-sm text-muted-foreground">hello@smile.org</p>
          </div>
          <div>
            <p className="font-semibold">{isEn ? "Phone" : "الهاتف"}</p>
            <p className="text-sm text-muted-foreground">+20 100 000 0000</p>
          </div>
          <div className="rounded-lg overflow-hidden border">
            <div className="w-full h-48 bg-muted flex items-center justify-center text-muted-foreground text-sm">
              {isEn ? "Map placeholder" : "خريطة"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}