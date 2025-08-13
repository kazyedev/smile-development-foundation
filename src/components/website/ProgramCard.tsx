"use client";

import { Program } from "@/types/program";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";

export default function ProgramCard({ program, locale }: { program: Program; locale: string }) {
  const isEn = locale === "en";
  return (
    <Card className="w-full h-full pt-0 overflow-hidden relative hover:shadow-lg transition-shadow duration-200 group">
      <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ boxShadow: `inset 0 0 0 2px ${program.color}20` }} />
      <CardHeader className="p-0 relative">
        <Image
          src={program.featuredImageUrl}
          alt={isEn ? program.titleEn : program.titleAr}
          width={600}
          height={300}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="space-y-2 p-4">
        <CardTitle className="text-lg font-semibold">{isEn ? program.titleEn : program.titleAr}</CardTitle>
        <CardDescription className="line-clamp-2 text-muted-foreground">
          {isEn ? program.descriptionEn : program.descriptionAr}
        </CardDescription>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{isEn ? program.implementationLocationEn : program.implementationLocationAr}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto flex justify-end">
        <Link href={`/${locale}/programs/${isEn ? program.slugEn : program.slugAr}`} className="text-[var(--brand-primary)] hover:underline">
          {isEn ? "View Program" : "عرض البرنامج"}
        </Link>
      </CardFooter>
    </Card>
  );
}