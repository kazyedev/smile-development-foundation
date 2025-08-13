import { mockPrograms } from "@/data/mockPrograms";
import { Project } from "@/types/project";
import { Story } from "@/types/successStory";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Target, CheckCircle, Users, HandCoins, Building2 } from "lucide-react";
import CountUp from "@/components/website/programs/CountUp";
import AutoCarousel from "@/components/website/programs/AutoCarousel";
import ProgramDetailClient from "@/components/website/programs/ProgramDetailClient";
import { mockProjects } from "@/data/mockProjects";
import { mockStories } from "@/data/mockStories";

// Minimal mock projects and stories for demo; in real app, import shared mocks


export default function ProgramDetailPage({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const decodedSlug = decodeURIComponent(slug);
  const isEn = locale === "en";
  const program = mockPrograms.find((p) => p.slugEn === decodedSlug || p.slugAr === decodedSlug);
  if (!program) {
    return (
      <div className="px-4 py-10">
        <p className="text-center text-muted-foreground">{isEn ? "Program not found." : "البرنامج غير موجود."}</p>
      </div>
    );
  }

  const relatedProjects = mockProjects.filter((p) => p.programId === program.id);
  const relatedStories = mockStories.filter((s) => s.programId === program.id);

  return <ProgramDetailClient program={program} relatedProjects={relatedProjects} relatedStories={relatedStories} locale={locale} />;
}

// Deprecated local components were replaced by shared client components