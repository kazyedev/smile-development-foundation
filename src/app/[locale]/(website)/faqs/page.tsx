'use client';

import { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ } from '@/types/faq';
import { 
  HelpCircle, Search, Filter, ChevronDown, ChevronUp, Users, 
  MessageCircle, Clock, Eye, Sparkles, BookOpen, ArrowRight,
  Plus, Minus, Mail, Phone, MessageSquare, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface FAQsPageProps {
  params: Promise<{ locale: string }>;
}

export default function FAQsPage({ params }: FAQsPageProps) {
  // Unwrap the params promise using React.use()
  const { locale } = use(params);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [allFAQs, setAllFAQs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isEn = locale === 'en';

  // Fetch FAQs from API
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/faqs?published=true&orderBy=views&order=desc');
        if (!response.ok) {
          throw new Error('Failed to fetch FAQs');
        }
        
        const data = await response.json();
        setAllFAQs(data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);
  
  // Filter FAQs based on search (client-side filtering for better UX)
  const filteredFAQs = allFAQs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      (isEn ? faq.questionEn : faq.questionAr).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (isEn ? faq.answerEn : faq.answerAr).toLowerCase().includes(searchQuery.toLowerCase());
    
    // For now, we'll show all FAQs regardless of category since we don't have categories yet
    const matchesCategory = selectedCategory === 'all';
    
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const scrollToFAQ = (id: number) => {
    // First expand the FAQ if it's not already expanded
    if (expandedFAQ !== id) {
      setExpandedFAQ(id);
    }
    
    // Wait a moment for the expansion animation to complete, then scroll
    setTimeout(() => {
      const element = document.getElementById(`faq-${id}`);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 100);
  };

  // Get popular FAQs (top 3 by views)
  const popularFAQs = [...allFAQs]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--brand-secondary)]/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, var(--brand-primary) 10px, var(--brand-primary) 20px, transparent 20px, transparent 30px, var(--brand-secondary) 30px, var(--brand-secondary) 40px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/5 right-1/5 w-72 h-72 bg-[var(--brand-primary)]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.7, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/5 left-1/5 w-96 h-96 bg-[var(--brand-secondary)]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.4, 1, 1.4],
            opacity: [0.7, 0.3, 0.7],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 18, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-8">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--brand-primary)]/10 to-[var(--brand-secondary)]/10 border border-[var(--brand-primary)]/20 rounded-full px-6 py-2 mb-6">
                <HelpCircle className="w-5 h-5 text-[var(--brand-primary)]" />
                <span className="text-sm font-semibold text-[var(--brand-primary)]">
                  {isEn ? 'Help & Support' : 'المساعدة والدعم'}
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="text-[var(--foreground)]">
                  {isEn ? 'Frequently' : 'الأسئلة'}
                </span>{' '}
                <span className="bg-gradient-to-r from-[var(--brand-primary)] via-[var(--brand-secondary)] to-[var(--brand-primary)] bg-clip-text text-transparent">
                  {isEn ? 'Asked Questions' : 'الشائعة'}
                </span>
              </h1>

              <p className="text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto leading-relaxed">
                {isEn
                  ? 'Find answers to common questions about our foundation, donation process, volunteer opportunities, and how we make a difference in communities.'
                  : 'اعثر على إجابات للأسئلة الشائعة حول مؤسستنا وعملية التبرع وفرص التطوع وكيف نحدث فرقاً في المجتمعات.'
                }
              </p>

              {/* Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
              >
                {[
                  { icon: MessageCircle, value: loading ? '...' : allFAQs.length.toString(), label: isEn ? 'Questions Answered' : 'سؤال مجاب' },
                  { icon: Users, value: loading ? '...' : (allFAQs.reduce((sum, faq) => sum + faq.views, 0) > 1000 ? `${Math.round(allFAQs.reduce((sum, faq) => sum + faq.views, 0) / 1000)}K+` : allFAQs.reduce((sum, faq) => sum + faq.views, 0).toString()), label: isEn ? 'Total Views' : 'إجمالي المشاهدات' },
                  { icon: Clock, value: '24/7', label: isEn ? 'Support Available' : 'دعم متاح' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-2xl mb-4">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-[var(--foreground)] mb-2">{stat.value}</div>
                    <div className="text-[var(--muted-foreground)]">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="pb-12 px-8">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[var(--card)]/80 backdrop-blur-sm border border-[var(--border)]/50 rounded-3xl p-8 shadow-lg"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isEn ? 'Search questions or keywords...' : 'البحث في الأسئلة أو الكلمات المفتاحية...'}
                      className="w-full pl-12 pr-4 py-4 bg-[var(--background)]/50 border border-[var(--border)] rounded-2xl focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Category Filter - Hidden for now since we don't have categories */}
                {false && (
                  <div className="flex items-center gap-3">
                    <Filter className="w-5 h-5 text-[var(--muted-foreground)]" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-4 bg-[var(--background)]/50 border border-[var(--border)] rounded-2xl focus:border-[var(--brand-primary)] outline-none"
                    >
                      <option value="all">{isEn ? 'All Categories' : 'جميع الفئات'}</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Results Summary */}
              <div className="mt-6 pt-6 border-t border-[var(--border)]/30">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--muted-foreground)]">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {isEn ? 'Loading FAQs...' : 'جاري تحميل الأسئلة...'}
                      </span>
                    ) : (
                      isEn 
                        ? `Showing ${filteredFAQs.length} of ${allFAQs.length} questions`
                        : `عرض ${filteredFAQs.length} من ${allFAQs.length} سؤال`
                    )}
                  </span>
                  {(searchQuery || selectedCategory !== 'all') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="text-sm text-[var(--brand-primary)] hover:text-[var(--brand-secondary)] transition-colors"
                    >
                      {isEn ? 'Clear Filters' : 'مسح المرشحات'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-20 px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* FAQ List */}
              <div className="lg:col-span-2">
                {error ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                  >
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HelpCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-red-600">
                      {isEn ? "Error loading FAQs" : "خطأ في تحميل الأسئلة"}
                    </h3>
                    <p className="text-muted-foreground mb-4">{error}</p>
                    <Button onClick={() => window.location.reload()}>
                      {isEn ? "Try Again" : "حاول مرة أخرى"}
                    </Button>
                  </motion.div>
                ) : loading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Card key={idx} className="bg-[var(--card)]/80 p-6">
                        <Skeleton className="h-6 w-3/4 mb-3" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                      </Card>
                    ))}
                  </div>
                ) : (
                  <AnimatePresence>
                    {filteredFAQs.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center py-20"
                    >
                      <Sparkles className="w-16 h-16 text-[var(--muted-foreground)] mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                        {isEn ? 'No questions found' : 'لم يتم العثور على أسئلة'}
                      </h3>
                      <p className="text-[var(--muted-foreground)] mb-6">
                        {isEn 
                          ? 'Try adjusting your search or browse all categories'
                          : 'حاول تعديل البحث أو تصفح جميع الفئات'
                        }
                      </p>
                      <Button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                        }}
                        className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white"
                      >
                        {isEn ? 'View All Questions' : 'عرض جميع الأسئلة'}
                      </Button>
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      {filteredFAQs.map((faq, index) => (
                        <motion.div
                          key={faq.id}
                          id={`faq-${faq.id}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.05 }}
                        >
                          <Card className="bg-[var(--card)]/80 backdrop-blur-sm border-[var(--border)]/50 overflow-hidden hover:shadow-xl transition-all duration-300">
                            <button
                              onClick={() => toggleFAQ(faq.id)}
                              className="w-full p-6 text-left flex items-center justify-between group"
                            >
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">
                                  {isEn ? faq.questionEn : faq.questionAr}
                                </h3>
                                <div className="flex items-center gap-4 mt-2 text-sm text-[var(--muted-foreground)]">
                                  <span className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    {faq.views.toLocaleString()} {isEn ? 'views' : 'مشاهدة'}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {new Date(faq.updatedAt).toLocaleDateString(isEn ? 'en-US' : 'ar-EG')}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                {expandedFAQ === faq.id ? (
                                  <Minus className="w-6 h-6 text-[var(--brand-primary)]" />
                                ) : (
                                  <Plus className="w-6 h-6 text-[var(--muted-foreground)] group-hover:text-[var(--brand-primary)] transition-colors" />
                                )}
                              </div>
                            </button>
                            
                            <AnimatePresence>
                              {expandedFAQ === faq.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-6 pb-6 border-t border-[var(--border)]/30">
                                    <div className="pt-4">
                                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                                        {isEn ? faq.answerEn : faq.answerAr}
                                      </p>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                    )}
                  </AnimatePresence>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Popular Questions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-[var(--card)]/80 backdrop-blur-sm border-[var(--border)]/50 shadow-xl sticky top-8">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-xl">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--foreground)]">
                          {isEn ? 'Popular Questions' : 'الأسئلة الشائعة'}
                        </h3>
                      </div>
                      
                      <div className="space-y-4">
                        {popularFAQs.map((faq, index) => (
                          <button
                            key={faq.id}
                            onClick={() => scrollToFAQ(faq.id)}
                            className="w-full text-left p-3 rounded-xl bg-[var(--background)]/50 hover:bg-[var(--accent)] transition-all group"
                          >
                            <h4 className="font-medium text-sm text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors line-clamp-2">
                              {isEn ? faq.questionEn : faq.questionAr}
                            </h4>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {faq.views.toLocaleString()}
                              </span>
                              <ArrowRight className="w-3 h-3 text-[var(--muted-foreground)] group-hover:text-[var(--brand-primary)] group-hover:translate-x-1 transition-all" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Contact Support */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="bg-gradient-to-br from-[var(--brand-primary)]/10 to-[var(--brand-secondary)]/10 border-[var(--brand-primary)]/20 backdrop-blur-sm">
                    <div className="p-6">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-xl mb-4">
                          <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">
                          {isEn ? 'Still need help?' : 'لا تزال بحاجة للمساعدة؟'}
                        </h3>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          {isEn 
                            ? 'Can\'t find what you\'re looking for? Get in touch with our support team.'
                            : 'لا تجد ما تبحث عنه؟ تواصل مع فريق الدعم لدينا.'
                          }
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <Button className="w-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white">
                          <Mail className="w-4 h-4 mr-2" />
                          {isEn ? 'Send Email' : 'إرسال بريد إلكتروني'}
                        </Button>
                        <Button variant="outline" className="w-full border-[var(--brand-primary)]/30 hover:bg-[var(--brand-primary)]/10">
                          <Phone className="w-4 h-4 mr-2" />
                          {isEn ? 'Call Us' : 'اتصل بنا'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
