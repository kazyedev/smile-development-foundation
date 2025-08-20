import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { News } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import { Clock, Eye, Calendar, ArrowRight, Newspaper, TrendingUp } from "lucide-react";
import { formatArabicDuration } from "@/utils/formatArabicDuration";
import { formatEnglishDuration } from "@/utils/formatEnglishDuration";
import { formatLargeNumber } from "@/utils/formatLargeNumber";

export default function NewsCard({ news, locale }: { news: News, locale: string }) {
  const isLocaleEnglish = locale === "en";
  
  const formatDate = (date: Date) => {
    if (isLocaleEnglish) {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } else {
      return date.toLocaleDateString('ar-EG', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  return (
    <Card className="group w-full h-full overflow-hidden relative hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-background to-muted/30 border-0 shadow-lg hover:shadow-xl">
      {/* Enhanced header with better image handling */}
      <CardHeader className="p-0 relative overflow-hidden">
        <div className="relative">
          <Image
            src={news.featuredImageUrl}
            alt={isLocaleEnglish ? news.titleEn : news.titleAr}
            width={600}
            height={300}
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* News badge overlay */}
          <div className="absolute top-3 right-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20 font-medium">
            {isLocaleEnglish ? "News" : "أخبار"}
          </div>
          
          {/* Date badge overlay */}
          <div className="absolute bottom-3 left-3 bg-black/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              <span className="font-medium">
                {formatDate(news.publishedAt).split(' ').slice(0, 2).join(' ')}
              </span>
            </div>
          </div>
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </CardHeader>
      
      {/* Enhanced content with better spacing and typography */}
      <CardContent className="space-y-4 p-6 relative z-20">
        <div className="space-y-3">
          <CardTitle className="text-xl font-bold text-foreground group-hover:text-brand-primary transition-colors duration-300 line-clamp-2">
            {isLocaleEnglish ? news.titleEn : news.titleAr}
          </CardTitle>
          
          {/* Enhanced date display with better styling */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors duration-300">
              <Calendar className="w-4 h-4 text-brand-primary" />
            </div>
            <span className="font-medium">{formatDate(news.publishedAt)}</span>
          </div>
          
          <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300">
            {isLocaleEnglish ? news.contentEn : news.contentAr}
          </CardDescription>
        </div>
        
        {/* Enhanced stats display */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg group-hover:bg-muted/80 transition-colors duration-300">
            <Clock className="w-4 h-4 text-brand-primary" />
            <span className="font-medium text-foreground">
              {isLocaleEnglish ? formatEnglishDuration(news.readTime) : formatArabicDuration(news.readTime)}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg group-hover:bg-muted/80 transition-colors duration-300">
            <Eye className="w-4 h-4 text-brand-secondary" />
            <span className="font-medium text-foreground">
              {formatLargeNumber(news.pageViews, "view", isLocaleEnglish ? "en" : "ar")}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Enhanced footer with better button styling */}
      <CardFooter className="p-6 pt-0 flex justify-between items-center relative z-20">
        {/* Enhanced tags with brand colors */}
        <div className="flex gap-2 text-xs">
          {(isLocaleEnglish ? news.tagsEn : news.tagsAr).slice(0, 2).map((tag, index) => (
            <span 
              key={tag} 
              className="bg-brand-primary/10 text-brand-primary px-3 py-1.5 rounded-full text-xs font-medium border border-brand-primary/20 hover:bg-brand-primary/20 transition-colors duration-300"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        {/* Enhanced button with icon */}
        <Link href={`/news/${isLocaleEnglish ? news.slugEn : news.slugAr}`} className="block">
          <Button 
            variant="outline" 
            size="sm"
            className="group/btn border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 hover:shadow-lg"
          >
            <span className="mr-2">
              {isLocaleEnglish ? "Read Article" : "قراءة المقال"}
            </span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </CardFooter>

      {/* Enhanced hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
      
      {/* Subtle border effect */}
      <div className="absolute inset-0 border border-transparent group-hover:border-brand-primary/20 rounded-lg transition-colors duration-500 pointer-events-none" />
      
      {/* Floating news indicators */}
      <div className="absolute top-4 left-4 w-6 h-6 text-brand-primary opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
        <Newspaper className="w-full h-full" />
      </div>
      <div className="absolute bottom-4 right-4 w-5 h-5 text-brand-secondary opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100" style={{ transitionDelay: '0.1s' }}>
        <TrendingUp className="w-full h-full" />
      </div>
    </Card>
  );
}