"use client";

"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Report } from "@/lib/db/schema/reports";
import { Calendar, Download, FileText, ExternalLink, Tag, Loader2, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MediaReportDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = use(params);
  const decodedSlug = decodeURIComponent(slug || '');
  const isEn = (locale || 'en') === 'en';
  
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`/api/reports/${decodedSlug}`);
        
        if (response.status === 404) {
          notFound();
          return;
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch report');
        }
        
        const data = await response.json();
        
        if (!data.success || !data.item) {
          throw new Error(data.error || 'Report not found');
        }
        
        setReport(data.item);
        setError(null);
      } catch (err) {
        console.error('Error fetching report:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    if (decodedSlug) {
      fetchReport();
    }
  }, [decodedSlug]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isEn ? 'en-US' : 'ar-EG');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-slate-50/20 dark:to-slate-950/10 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-slate-600 mx-auto mb-4 animate-spin" />
          <h3 className="text-2xl font-bold mb-2">
            {isEn ? 'Loading report...' : 'جاري تحميل التقرير...'}
          </h3>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-slate-50/20 dark:to-slate-950/10 flex items-center justify-center">
        <div className="text-center">
          <TrendingUp className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-red-600 mb-2">
            {isEn ? 'Error loading report' : 'خطأ في تحميل التقرير'}
          </h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-slate-500 to-gray-500 text-white"
          >
            {isEn ? 'Try Again' : 'حاول مرة أخرى'}
          </Button>
        </div>
      </div>
    );
  }
  
  if (!report) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-50/20 dark:to-slate-950/10">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <div className="mb-8">
              <Button asChild variant="outline" className="mb-4">
                <Link href={`/${locale}/media/reports`}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  {isEn ? 'Back to Reports' : 'العودة للتقارير'}
                </Link>
              </Button>
            </div>

            {/* Report Header */}
            <div className="bg-gradient-to-br from-slate-50/50 to-gray-50/30 dark:from-slate-950/20 dark:to-gray-950/10 rounded-3xl p-8 border border-slate-200/50 dark:border-slate-800/30">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="inline-flex items-center gap-2 bg-slate-600/10 text-slate-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <FileText className="w-4 h-4" />
                    {isEn ? 'Research Report' : 'تقرير بحثي'}
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                    {isEn ? report.titleEn : report.titleAr}
                  </h1>
                  
                  {(isEn ? report.descriptionEn : report.descriptionAr) && (
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      {isEn ? report.descriptionEn : report.descriptionAr}
                    </p>
                  )}
                  
                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                    {report.publishedAt && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(report.publishedAt)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>{report.downloads || 0} {isEn ? 'downloads' : 'تحميل'}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild size="lg" className="bg-gradient-to-r from-slate-500 to-gray-500 hover:from-slate-600 hover:to-gray-600 text-white">
                      <a href={report.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {isEn ? 'Open Report' : 'فتح التقرير'}
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <a href={report.url} target="_blank" rel="noopener noreferrer" download>
                        <Download className="w-4 h-4 mr-2" />
                        {isEn ? 'Download PDF' : 'تحميل PDF'}
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                    {report.featuredImageUrl ? (
                      <Image 
                        src={report.featuredImageUrl} 
                        alt={isEn ? report.titleEn : report.titleAr} 
                        fill 
                        className="object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-900/30 dark:to-gray-900/30 flex items-center justify-center">
                        <BarChart3 className="w-16 h-16 text-slate-600/50" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Report Details */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Keywords */}
            {report.keywords && report.keywords.length > 0 && (
              <div className="bg-gradient-to-br from-background to-slate-50/30 dark:to-slate-950/10 rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-slate-600/10 rounded-xl">
                    <Tag className="w-5 h-5 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-bold">{isEn ? 'Keywords' : 'الكلمات المفتاحية'}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {report.keywords.map(keyword => (
                    <span key={keyword} className="px-3 py-1 bg-slate-600/10 text-slate-600 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tags */}
            {report.tags && report.tags.length > 0 && (
              <div className="bg-gradient-to-br from-background to-slate-50/30 dark:to-slate-950/10 rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gray-600/10 rounded-xl">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-bold">{isEn ? 'Categories' : 'الفئات'}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {report.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-600/10 text-gray-600 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
