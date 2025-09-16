"use client";

import ProgramCard from "@/components/website/ProgramCard";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Target, Sparkles, Filter, Search, Grid3X3, List, Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ProgramCardSkeletonGrid } from "@/components/ui/program-card-skeleton";
import { useState, useEffect } from "react";
import { Program } from "@/types/program";

export default function ProgramsPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || "en";
  const isEn = locale === "en";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [allPrograms, setAllPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayedCount, setDisplayedCount] = useState(6);

  const INITIAL_DISPLAY_COUNT = 6;
  const LOAD_MORE_COUNT = 3;

  // Fetch all programs once on component mount
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/programs');
        if (!response.ok) {
          throw new Error('Failed to fetch programs');
        }
        
        const data = await response.json();
        setAllPrograms(data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching programs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Client-side filtering
  const filteredPrograms = allPrograms.filter(program => {
    const title = isEn ? program.titleEn : program.titleAr;
    const description = isEn ? program.descriptionEn : program.descriptionAr;
    const location = isEn ? program.implementationLocationEn : program.implementationLocationAr;
    
    const searchLower = searchQuery.toLowerCase();
    return title.toLowerCase().includes(searchLower) ||
           description.toLowerCase().includes(searchLower) ||
           location.toLowerCase().includes(searchLower);
  });

  // Reset displayed count when search changes
  useEffect(() => {
    setDisplayedCount(INITIAL_DISPLAY_COUNT);
  }, [searchQuery]);

  // Programs to display (with pagination)
  const displayedPrograms = filteredPrograms.slice(0, displayedCount);
  const hasMorePrograms = filteredPrograms.length > displayedCount;

  const handleShowMore = () => {
    setDisplayedCount(prev => Math.min(prev + LOAD_MORE_COUNT, filteredPrograms.length));
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background with brand colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-brand-secondary/5 to-background" />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-brand-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-brand-secondary rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl" />
        </div>

        {/* Floating icons */}
        <motion.div
          className="absolute top-1/4 left-1/4 text-brand-primary/20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Target className="w-8 h-8" />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-1/4 text-brand-secondary/20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            {/* Icon */}
            <motion.div 
              className="flex justify-center mb-6"
              variants={fadeInUp}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-full flex items-center justify-center">
                <Target className="w-10 h-10 text-brand-primary" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent leading-tight"
              variants={fadeInUp}
            >
              {isEn ? "Our Programs" : "برامجنا"}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              {isEn 
                ? "Explore our comprehensive initiatives driving sustainable impact across communities. Each program is designed to create lasting positive change through innovative approaches and community collaboration."
                : "استكشف مبادراتنا الشاملة التي تحقق تأثيرًا مستدامًا في المجتمعات. كل برنامج مصمم لخلق تغيير إيجابي دائم من خلال نهج مبتكرة والتعاون المجتمعي."
              }
            </motion.p>

            {/* Stats */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mb-8"
              variants={fadeInUp}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-primary">
                  {loading ? <Skeleton className="h-9 w-8 mx-auto" /> : allPrograms.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  {isEn ? "Active Programs" : "برامج نشطة"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-secondary">
                  {loading ? <Skeleton className="h-9 w-12 mx-auto" /> : "25+"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {isEn ? "Communities Served" : "مجتمع تم خدمته"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">
                  {loading ? <Skeleton className="h-9 w-14 mx-auto" /> : "10K+"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {isEn ? "Beneficiaries" : "مستفيد"}
                </div>
              </div>
            </motion.div>

            {/* Decorative line */}
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full"
              variants={fadeInUp}
            />
          </motion.div>
        </div>
      </section>

      {/* Search and Controls Section */}
      <section className="py-12 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Search and View Controls */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8 p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/30 shadow-lg">
              {/* Search */}
              <div className="flex-1 max-w-md w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={isEn ? "Search programs..." : "البحث في البرامج..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 bg-background/80 border-border/50 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                  />
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-background/80 rounded-xl p-1 border border-border/30">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`${viewMode === "grid" ? 'bg-brand-primary text-white shadow-md' : 'hover:bg-muted'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`${viewMode === "list" ? 'bg-brand-primary text-white shadow-md' : 'hover:bg-muted'}`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Results Count */}
              <div className="text-sm text-muted-foreground">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isEn ? "Loading programs..." : "جاري تحميل البرامج..."}
                  </span>
                ) : (
                  isEn 
                    ? `Showing ${displayedPrograms.length} of ${filteredPrograms.length} programs`
                    : `عرض ${displayedPrograms.length} من ${filteredPrograms.length} برنامج`
                )}
              </div>
            </div>

            {/* Programs Grid/List */}
            {error ? (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-red-600 mb-2">
                  {isEn ? "Error loading programs" : "خطأ في تحميل البرامج"}
                </h3>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                  {isEn ? "Try Again" : "حاول مرة أخرى"}
                </Button>
              </motion.div>
            ) : loading ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <ProgramCardSkeletonGrid count={INITIAL_DISPLAY_COUNT} />
              </motion.div>
            ) : filteredPrograms.length > 0 ? (
              <>
                <motion.div 
                  className={`${
                    viewMode === "grid" 
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  }`}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={staggerChildren}
                >
                  {displayedPrograms.map((program, idx) => (
                    <motion.div
                      key={program.slugEn}
                      variants={fadeInUp}
                      className={viewMode === "list" ? "w-full" : ""}
                    >
                      <ProgramCard program={program} locale={locale} />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Show More Button */}
                {hasMorePrograms && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex justify-center mt-12"
                  >
                    <Button
                      onClick={handleShowMore}
                      variant="outline"
                      size="lg"
                      className="group hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300"
                    >
                      <ChevronDown className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                      {isEn 
                        ? `Show More Programs (${filteredPrograms.length - displayedCount} remaining)`
                        : `عرض المزيد من البرامج (${filteredPrograms.length - displayedCount} متبقي)`
                      }
                    </Button>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {isEn ? "No programs found" : "لم يتم العثور على برامج"}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {isEn 
                    ? "Try adjusting your search terms or browse all our programs to discover what we offer."
                    : "حاول تعديل مصطلحات البحث أو تصفح جميع برامجنا لاكتشاف ما نقدمه."
                  }
                </p>
                <Button 
                  onClick={() => setSearchQuery("")}
                  className="mt-4 bg-brand-primary hover:bg-brand-primary/90"
                >
                  {isEn ? "Clear Search" : "مسح البحث"}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {isEn ? "Ready to Get Involved?" : "مستعد للمشاركة؟"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {isEn 
                ? "Join our mission to create sustainable change. Whether through volunteering, partnerships, or support, every contribution makes a difference."
                : "انضم إلى مهمتنا لخلق تغيير مستدام. سواء من خلال التطوع أو الشراكات أو الدعم، كل مساهمة تحدث فرقاً."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-3">
                {isEn ? "Become a Volunteer" : "أصبح متطوعاً"}
              </Button>
              <Button variant="outline" className="border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white px-8 py-3">
                {isEn ? "Partner With Us" : "شراكة معنا"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}