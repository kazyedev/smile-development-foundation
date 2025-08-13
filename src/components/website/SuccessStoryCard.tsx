import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Story } from "@/types/successStory";
import Image from "next/image";
import Link from "next/link";
import { User, MapPin, Clock, Eye, Play } from "lucide-react";
import { formatArabicDuration } from "@/utils/formatArabicDuration";
import { formatEnglishDuration } from "@/utils/formatEnglishDuration";
import { formatLargeNumber } from "@/utils/formatLargeNumber";

export default function SuccessStoryCard({ story, locale }: { story: Story, locale: string }) {
  const isLocaleEnglish = locale === "en";
  const isLocaleArabic = locale === "ar";

  return (
    <Card className="w-full h-full pt-0 overflow-hidden relative hover:shadow-lg transition-shadow duration-200 group">
      <CardHeader className="p-0 relative">
        <Image
          src={story.featuredImageUrl}
          alt={isLocaleEnglish ? story.titleEn : story.titleAr}
          width={600}
          height={300}
          className="w-full h-48 object-cover"
        />
        {story.video && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="w-12 h-12 text-white drop-shadow-lg" />
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-3 p-4">
        <CardTitle className="text-lg font-semibold line-clamp-2">{isLocaleEnglish ? story.titleEn : story.titleAr}</CardTitle>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          <span>{isLocaleEnglish ? story.personNameEn : story.personNameAr}, {story.personAge}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{isLocaleEnglish ? story.cityEn : story.cityAr}, {isLocaleEnglish ? story.personLocationEn : story.personLocationAr}</span>
        </div>
        
        <CardDescription className="text-sm text-muted-foreground line-clamp-3">
          {isLocaleEnglish ? story.contentEn : story.contentAr}
        </CardDescription>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{isLocaleEnglish ? formatEnglishDuration(story.readTime) : formatArabicDuration(story.readTime)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{formatLargeNumber(story.pageViews, "read", isLocaleEnglish ? "en" : "ar")}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center">
        <div className="flex gap-2 text-xs">
          {isLocaleEnglish ? story.tagsEn.slice(0, 2).map((tag) => (
              <span key={tag} className="bg-muted-foreground/10 px-2 py-1 rounded-md text-muted-foreground">
              #{tag}
            </span>
          )) : story.tagsAr.slice(0, 2).map((tag) => (
            <span key={tag} className="bg-muted-foreground/10 px-2 py-1 rounded-md text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>
        <Link href={`/${locale}/media/success-stories/${isLocaleEnglish ? story.slugEn : story.slugAr}`} className="block">
          <Button variant="outline" size="sm">
            {isLocaleEnglish ? "Read Story" : "قراءة القصة"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}