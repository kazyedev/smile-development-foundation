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
import { Clock, Eye, Calendar } from "lucide-react";
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
    <Card className="w-full h-full pt-0 overflow-hidden relative hover:shadow-lg transition-shadow duration-200 group">
      <CardHeader className="p-0 relative">
        <Image
          src={news.featuredImageUrl}
          alt={isLocaleEnglish ? news.titleEn : news.titleAr}
          width={600}
          height={300}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      
      <CardContent className="space-y-3 p-4">
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {isLocaleEnglish ? news.titleEn : news.titleAr}
        </CardTitle>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(news.publishedAt)}</span>
        </div>
        
        <CardDescription className="text-sm text-muted-foreground line-clamp-3">
          {isLocaleEnglish ? news.contentEn : news.contentAr}
        </CardDescription>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{isLocaleEnglish ? formatEnglishDuration(news.readTime) : formatArabicDuration(news.readTime)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{formatLargeNumber(news.pageViews, "view", isLocaleEnglish ? "en" : "ar")}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center">
        <div className="flex gap-2 text-xs">
          {isLocaleEnglish 
            ? news.tagsEn.slice(0, 2).map((tag) => (
                <span key={tag} className="bg-muted-foreground/10 px-2 py-1 rounded-md text-muted-foreground">
                  #{tag}
                </span>
              ))
            : news.tagsAr.slice(0, 2).map((tag) => (
                <span key={tag} className="bg-muted-foreground/10 px-2 py-1 rounded-md text-muted-foreground">
                  #{tag}
                </span>
              ))
          }
        </div>
        <Link href={`/news/${isLocaleEnglish ? news.slugEn : news.slugAr}`} className="block">
          <Button variant="outline" size="sm">
            {isLocaleEnglish ? "Read Article" : "قراءة المقال"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}