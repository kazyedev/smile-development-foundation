"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Download, 
  Calendar, 
  Eye, 
  Share2, 
  ArrowLeft, 
  Tag, 
  User, 
  FileText,
  Loader2,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Enhanced publication interface
interface Publication {
  id: number;
  titleEn: string | null;
  titleAr: string | null;
  descriptionEn: string | null;
  descriptionAr: string | null;
  contentEn: string | null;
  contentAr: string | null;
  slugEn: string | null;
  slugAr: string | null;
  coverImageUrl: string | null;
  attachmentUrl: string | null;
  authorEn: string | null;
  authorAr: string | null;
  keywordsEn: string[] | null;
  keywordsAr: string[] | null;
  tagsEn: string[] | null;
  tagsAr: string[] | null;
  categoryId: number | null;
  programId: number | null;
  projectId: number | null;
  activityId: number | null;
  publishedAt: Date | null;
  pageViews: number | null;
  downloads: number | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  slug: string;
  tags: string[];
  keywords: string[];
}

export default function MediaPublicationDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = use(params);
  const decoded = decodeURIComponent(slug || '');
  const isEn = (locale || 'en') === 'en';
  
  const [publication, setPublication] = useState<Publication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  // Fetch publication data
  useEffect(() => {
    const fetchPublication = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/publications/${decoded}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            return notFound();
          }
          throw new Error('Failed to fetch publication');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setPublication(data.publication);
        } else {
          throw new Error('Failed to fetch publication');
        }
      } catch (err) {
        console.error('Error fetching publication:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (decoded) {
      fetchPublication();
    }
  }, [decoded]);

  // Handle download
  const handleDownload = async () => {
    if (!publication) return;
    
    try {
      setDownloading(true);
      
      // Track download
      await fetch(`/api/publications/${publication.slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'download' }),
      });
      
      // Open/download the file if URL exists
      if (publication.attachmentUrl) {
        window.open(publication.attachmentUrl, '_blank');
      }
    } catch (error) {
      console.error('Error tracking download:', error);
      // Still allow download even if tracking fails
      if (publication.attachmentUrl) {
        window.open(publication.attachmentUrl, '_blank');
      }
    } finally {
      setDownloading(false);
    }
  };

  // Handle share
  const handleShare = async () => {
    const shareData = {
      title: (isEn ? publication?.titleEn : publication?.titleAr) || '',
      text: (isEn ? publication?.descriptionEn : publication?.descriptionAr) || '',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert(isEn ? 'Link copied to clipboard!' : 'تم نسخ الرابط إلى الحافظة!');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-green-50/20 dark:to-green-950/10">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-green-600" />
            <h2 className="text-2xl font-bold mb-2">
              {isEn ? "Loading publication..." : "جاري تحميل المنشور..."}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (error || !publication) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-green-50/20 dark:to-green-950/10">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-red-600">
              {isEn ? "Publication not found" : "لم يتم العثور على المنشور"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {error || (isEn ? "The publication you're looking for doesn't exist." : "المنشور الذي تبحث عنه غير موجود.")}
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href={`/${locale}/media/publications`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isEn ? "Back to Publications" : "العودة إلى المنشورات"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-green-50/20 dark:to-green-950/10">
      {/* Breadcrumb Navigation */}
      <section className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">
              {isEn ? "Home" : "الرئيسية"}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/media`} className="hover:text-foreground transition-colors">
              {isEn ? "Media" : "إعلام"}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/media/publications`} className="hover:text-foreground transition-colors">
              {isEn ? "Publications" : "منشورات"}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-xs">
              {isEn ? publication.titleEn : publication.titleAr}
            </span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-3 gap-12"
          >
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="space-y-6">
                {/* Back Button */}
                <Button asChild variant="ghost" size="sm" className="-ml-4">
                  <Link href={`/${locale}/media/publications`}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {isEn ? "Back to Publications" : "العودة إلى المنشورات"}
                  </Link>
                </Button>

                {/* Title */}
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
                    {isEn ? publication.titleEn : publication.titleAr}
                  </h1>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                    {publication.authorEn && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{isEn ? publication.authorEn : publication.authorAr}</span>
                      </div>
                    )}
                    {publication.publishedAt && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(publication.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{(publication.pageViews || 0).toLocaleString(isEn ? 'en-US' : 'ar-EG')} {isEn ? 'views' : 'عرض'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>{(publication.downloads || 0).toLocaleString(isEn ? 'en-US' : 'ar-EG')} {isEn ? 'downloads' : 'تحميل'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              {publication.coverImageUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={publication.coverImageUrl}
                    alt={isEn ? publication.titleEn || "Publication" : publication.titleAr || "منشور"}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
              )}

              {/* Description */}
              {(isEn ? publication.descriptionEn : publication.descriptionAr) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10 rounded-3xl p-8 border border-green-200/50 dark:border-green-800/30"
                >
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-green-600" />
                    {isEn ? "About this Publication" : "حول هذا المنشور"}
                  </h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                    {isEn ? publication.descriptionEn : publication.descriptionAr}
                  </div>
                </motion.div>
              )}

              {/* Full Content */}
              {(isEn ? publication.contentEn : publication.contentAr) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-background rounded-3xl p-8 border border-border"
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-green-600" />
                    {isEn ? "Content" : "المحتوى"}
                  </h2>
                  <div 
                    className="prose prose-lg max-w-none text-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: (isEn ? publication.contentEn : publication.contentAr) || '' 
                    }}
                  />
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10 rounded-3xl p-6 border border-green-200/50 dark:border-green-800/30 sticky top-24"
              >
                <h3 className="text-xl font-bold mb-6">
                  {isEn ? "Actions" : "إجراءات"}
                </h3>
                
                <div className="space-y-4">
                  {/* Download Button */}
                  <Button
                    onClick={handleDownload}
                    disabled={downloading || !publication.attachmentUrl}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white h-12 cursor-pointer"
                    size="lg"
                  >
                    {downloading ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-5 h-5 mr-2" />
                    )}
                    {downloading 
                      ? (isEn ? "Downloading..." : "جاري التحميل...") 
                      : (isEn ? "Download PDF" : "تحميل PDF")
                    }
                  </Button>

                  {/* Share Button */}
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="w-full h-12 border-green-300 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-950/30"
                    size="lg"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    {isEn ? "Share" : "مشاركة"}
                  </Button>

                  {/* External Link */}
                  {publication.attachmentUrl && (
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full h-12 hover:bg-green-100 dark:hover:bg-green-950/30"
                      size="lg"
                    >
                      <a href={publication.attachmentUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-5 h-5 mr-2" />
                        {isEn ? "Open in New Tab" : "فتح في تبويب جديد"}
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>

              {/* Tags & Keywords */}
              {(publication.tags.length > 0 || publication.keywords.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-background rounded-3xl p-6 border border-border"
                >
                  {publication.tags.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-green-600" />
                        {isEn ? "Tags" : "علامات"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {publication.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="secondary" 
                            className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {publication.keywords.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-green-600" />
                        {isEn ? "Keywords" : "كلمات مفتاحية"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {publication.keywords.map((keyword) => (
                          <Badge 
                            key={keyword} 
                            variant="outline" 
                            className="border-green-300 text-green-700 dark:border-green-700 dark:text-green-300"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Publication Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-background rounded-3xl p-6 border border-border"
              >
                <h4 className="font-semibold mb-4">
                  {isEn ? "Statistics" : "إحصائيات"}
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      <span>{isEn ? "Views" : "عرض"}</span>
                    </div>
                    <span className="font-medium">
                      {(publication.pageViews || 0).toLocaleString(isEn ? 'en-US' : 'ar-EG')}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Download className="w-4 h-4" />
                      <span>{isEn ? "Downloads" : "تحميل"}</span>
                    </div>
                    <span className="font-medium">
                      {(publication.downloads || 0).toLocaleString(isEn ? 'en-US' : 'ar-EG')}
                    </span>
                  </div>
                  
                  {publication.publishedAt && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{isEn ? "Published" : "تاريخ النشر"}</span>
                      </div>
                      <span className="font-medium text-sm">
                        {new Date(publication.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
