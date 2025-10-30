"use client";

import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Heart, ArrowRight, Share2, Download, Calendar, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const params = useParams<{ locale: string }>();
  const searchParams = useSearchParams();
  const locale = params?.locale || "en";
  const isEn = locale === "en";
  
  const [donationDetails, setDonationDetails] = useState({
    amount: searchParams.get('amount') || '0',
    currency: searchParams.get('currency') || 'USD',
    method: searchParams.get('method') || 'stripe',
    donorName: searchParams.get('name') || '',
    frequency: searchParams.get('frequency') || 'once',
  });

  const getCurrencySymbol = (currency: string) => {
    const symbols = {
      USD: '$',
      SAR: 'ر.س',
      AED: 'د.إ',
      YER: 'ر.ي'
    };
    return symbols[currency as keyof typeof symbols] || '$';
  };

  const getMethodName = (method: string) => {
    const methods = {
      stripe: isEn ? 'Credit/Debit Card' : 'بطاقة ائتمان/خصم',
      cash_transfer: isEn ? 'Cash Transfer' : 'تحويل نقدي',
      bank_deposit: isEn ? 'Bank Deposit' : 'إيداع بنكي'
    };
    return methods[method as keyof typeof methods] || method;
  };

  const shareMessage = isEn 
    ? `I just donated ${getCurrencySymbol(donationDetails.currency)}${donationDetails.amount} to Ebtsama Development Foundation to help provide food for families in need. Join me in making a difference! 🍽️❤️`
    : `لقد تبرعت بمبلغ ${donationDetails.amount} ${getCurrencySymbol(donationDetails.currency)} لمؤسسة ابتسامة التنموية لمساعدة توفير الطعام للعائلات المحتاجة. انضم إلي في إحداث الفرق! 🍽️❤️`;

  const shareOnSocial = (platform: string) => {
    const encodedMessage = encodeURIComponent(shareMessage);
    const url = encodeURIComponent('https://Ebtsama.org');
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedMessage}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${url}`,
      whatsapp: `https://wa.me/?text=${encodedMessage} ${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${encodedMessage}`
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          {/* Thank You Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                {isEn ? "Thank You!" : "شكراً لك!"}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {isEn
                ? "Your generous donation will help us provide nutritious meals to families in need. Together, we're making a real difference in people's lives."
                : "تبرعكم السخي سيساعدنا في توفير وجبات مغذية للعائلات المحتاجة. معاً، نحن نحدث فرقاً حقيقياً في حياة الناس."
              }
            </p>

            {donationDetails.donorName && (
              <p className="text-lg text-foreground font-medium mb-6">
                {isEn ? `Thank you, ${donationDetails.donorName}!` : `شكراً لك، ${donationDetails.donorName}!`}
              </p>
            )}
          </motion.div>

          {/* Donation Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-background border border-border rounded-3xl p-8 mb-12 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">{isEn ? "Donation Summary" : "ملخص التبرع"}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                <Gift className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-bold text-2xl text-green-600">
                  {getCurrencySymbol(donationDetails.currency)}{donationDetails.amount}
                </div>
                <div className="text-sm text-muted-foreground">
                  {isEn ? "Donation Amount" : "مبلغ التبرع"}
                </div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-bold text-lg text-blue-600">
                  {donationDetails.frequency === 'monthly' 
                    ? (isEn ? "Monthly" : "شهرياً")
                    : (isEn ? "One-time" : "مرة واحدة")
                  }
                </div>
                <div className="text-sm text-muted-foreground">
                  {isEn ? "Frequency" : "التكرار"}
                </div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
                <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="font-bold text-lg text-purple-600">
                  {getMethodName(donationDetails.method)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {isEn ? "Payment Method" : "طريقة الدفع"}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Impact Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-3xl p-8 mb-12"
          >
            <h3 className="text-2xl font-bold mb-4 text-amber-800 dark:text-amber-200">
              {isEn ? "Your Impact" : "تأثيرك"}
            </h3>
            <p className="text-amber-700 dark:text-amber-300 text-lg leading-relaxed">
              {isEn
                ? `Your donation of ${getCurrencySymbol(donationDetails.currency)}${donationDetails.amount} can provide nutritious meals for ${Math.floor(Number(donationDetails.amount) / 25)} families for a week, giving them hope and sustenance during difficult times.`
                : `تبرعك بمبلغ ${donationDetails.amount} ${getCurrencySymbol(donationDetails.currency)} يمكن أن يوفر وجبات مغذية لـ ${Math.floor(Number(donationDetails.amount) / 25)} عائلة لمدة أسبوع، مما يمنحهم الأمل والغذاء في الأوقات الصعبة.`
              }
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="space-y-8"
          >
            {/* Share Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">{isEn ? "Share Your Good Deed" : "شارك عملك الخير"}</h3>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  onClick={() => shareOnSocial('facebook')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  onClick={() => shareOnSocial('twitter')}
                  className="bg-sky-500 hover:bg-sky-600 text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button
                  onClick={() => shareOnSocial('whatsapp')}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`/${locale}`}>
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
                  <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                  {isEn ? "Back to Home" : "العودة للرئيسية"}
                </Button>
              </Link>
              
              <Link href={`/${locale}/donate`}>
                <Button variant="outline" size="lg" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                  <Gift className="w-5 h-5 mr-2" />
                  {isEn ? "Donate Again" : "تبرع مرة أخرى"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
