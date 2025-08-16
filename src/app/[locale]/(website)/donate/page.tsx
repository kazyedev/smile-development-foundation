"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function DonatePage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  const isEn = locale === "en";

  const [amount, setAmount] = useState<number | "">(100);
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [method, setMethod] = useState<"card" | "bank" | "paypal">("card");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);
  const [redirecting, setRedirecting] = useState(false);

  const preset = [50, 100, 250, 500];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!amount || Number(amount) <= 0 || !email) {
      setStatus({ ok: false, msg: isEn ? "Please enter a valid amount and email." : "الرجاء إدخال مبلغ صحيح والبريد الإلكتروني." });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount), currency: 'egp', frequency, name, email, note }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error('Stripe');
      setRedirecting(true);
      window.location.href = data.url as string;
    } catch {
      setStatus({ ok: false, msg: isEn ? "Something went wrong. Please try again." : "حدث خطأ ما. حاول مرة أخرى." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 px-4 py-10 border-t border-b border-[var(--secondary)]">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold">{isEn ? "Support Our Mission" : "ادعم رسالتنا"}</h1>
        <p className="text-muted-foreground mt-2">
          {isEn
            ? "Your donation helps us deliver clean water, education, and healthcare to communities in need."
            : "تساهم تبرعاتكم في إيصال المياه النظيفة والتعليم والرعاية الصحية إلى المجتمعات المحتاجة."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl w-full mx-auto">
        {/* Form */}
        <div className="lg:col-span-2 rounded-xl border p-6 bg-[var(--card)] flex flex-col gap-6">
          {/* Calculator */}
          <div className="rounded-md border p-4 bg-[var(--background)]">
            <p className="font-semibold mb-2">{isEn ? 'Donation Calculator' : 'حاسبة التبرعات'}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div>
                <label className="block mb-1">{isEn ? 'Amount' : 'المبلغ'}</label>
                <input type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))} className="w-full rounded-md border bg-transparent px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1">{isEn ? 'Frequency' : 'التكرار'}</label>
                <select value={frequency} onChange={(e) => setFrequency(e.target.value as 'once' | 'monthly')} className="w-full rounded-md border bg-transparent px-3 py-2">
                  <option value="once">{isEn ? 'One-time' : 'مرة واحدة'}</option>
                  <option value="monthly">{isEn ? 'Monthly' : 'شهرياً'}</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">{isEn ? 'Estimated Impact' : 'الأثر التقديري'}</label>
                <div className="rounded-md border px-3 py-2 text-muted-foreground">
                  {amount && Number(amount) > 0 ? (
                    <span>{isEn ? `${Number(amount) / 50} weeks of water for a family` : `${Number(amount) / 50} أسابيع من المياه لعائلة`}</span>
                  ) : (
                    <span>{isEn ? '—' : '—'}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Amount */}
          <div>
            <p className="font-semibold mb-3">{isEn ? "Choose Amount" : "اختر المبلغ"}</p>
            <div className="flex flex-wrap gap-2">
              {preset.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAmount(v)}
                  className={`px-4 py-2 rounded-md border ${amount === v ? 'bg-[var(--brand-primary)] text-white' : 'hover:bg-[var(--accent)]'}`}
                >
                  {v} {isEn ? 'EGP' : 'ج.م'}
                </button>
              ))}
              <div className="flex items-center gap-2 border rounded-md px-2">
                <input
                  type="number"
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-28 bg-transparent outline-none py-2"
                  placeholder={isEn ? "Custom" : "مخصص"}
                />
                <span className="text-sm text-muted-foreground">{isEn ? 'EGP' : 'ج.م'}</span>
              </div>
            </div>
          </div>

          {/* Frequency */}
          <div>
            <p className="font-semibold mb-3">{isEn ? "Frequency" : "التكرار"}</p>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="freq" checked={frequency === 'once'} onChange={() => setFrequency('once')} />
                <span>{isEn ? 'One-time' : 'مرة واحدة'}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="freq" checked={frequency === 'monthly'} onChange={() => setFrequency('monthly')} />
                <span>{isEn ? 'Monthly' : 'شهرياً'}</span>
              </label>
            </div>
          </div>

          {/* Donor Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">{isEn ? 'Full Name' : 'الاسم الكامل'}</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border bg-transparent px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1">{isEn ? 'Email' : 'البريد الإلكتروني'}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border bg-transparent px-3 py-2" />
            </div>
          </div>

          {/* Method */}
          <div>
            <p className="font-semibold mb-3">{isEn ? "Payment Method" : "طريقة الدفع"}</p>
            <div className="flex gap-3 flex-wrap">
              {([
                { k: 'card', en: 'Credit/Debit Card', ar: 'بطاقة ائتمان/خصم' },
                { k: 'paypal', en: 'PayPal', ar: 'باي بال' },
                { k: 'bank', en: 'Bank Transfer', ar: 'تحويل بنكي' },
              ] as const).map((m) => (
                <label key={m.k} className={`px-3 py-2 rounded-md border cursor-pointer ${method === m.k ? 'bg-[var(--accent)]' : 'hover:bg-[var(--accent)]'}`}>
                  <input type="radio" name="method" className="mr-2" checked={method === m.k} onChange={() => setMethod(m.k)} />
                  {isEn ? m.en : m.ar}
                </label>
              ))}
            </div>
            {method === 'bank' && (
              <div className="mt-3 text-sm text-muted-foreground">
                {isEn ? 'Bank transfer details will be shared after submitting the form.' : 'سيتم مشاركة تفاصيل التحويل البنكي بعد إرسال النموذج.'}
              </div>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm mb-1">{isEn ? 'Note (optional)' : 'ملاحظة (اختياري)'} </label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} className="w-full rounded-md border bg-transparent px-3 py-2" />
          </div>

          {status && (
            <div className={`text-sm ${status.ok ? 'text-emerald-600' : 'text-red-600'}`}>{status.msg}</div>
          )}

          <div className="flex justify-end">
            <button onClick={handleSubmit} disabled={submitting || redirecting} className="px-6 py-2 rounded-md bg-[var(--brand-primary)] text-white disabled:opacity-60">
              {redirecting ? (isEn ? 'Redirecting…' : 'جاري التحويل…') : submitting ? (isEn ? 'Processing…' : 'جاري المعالجة…') : (isEn ? 'Donate Now' : 'تبرع الآن')}
            </button>
          </div>
        </div>

        {/* Impact blurb */}
        <div className="rounded-xl border p-6 bg-[var(--card)] flex flex-col gap-4">
          <div>
            <p className="font-semibold">{isEn ? 'Your Impact' : 'أثرك'}</p>
            <ul className="text-sm text-muted-foreground list-disc ms-5 mt-2">
              <li>{isEn ? '150 EGP can provide safe water to a family for a week.' : '150 ج.م يمكن أن توفر مياهاً آمنة لعائلة لمدة أسبوع.'}</li>
              <li>{isEn ? '500 EGP equips a student with learning materials.' : '500 ج.م تجهز طالباً بمواد تعليمية.'}</li>
              <li>{isEn ? '1000 EGP funds a health outreach visit.' : '1000 ج.م تموّل زيارة توعوية صحية.'}</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">{isEn ? 'Transparency' : 'الشفافية'}</p>
            <p className="text-sm text-muted-foreground">{isEn ? 'We issue quarterly reports on spending and outcomes.' : 'نصدر تقارير ربع سنوية حول المصروفات والنتائج.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}