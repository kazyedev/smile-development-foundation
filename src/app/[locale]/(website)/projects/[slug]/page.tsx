"use client";

import { Target, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Project } from "@/types/project";
import {
  ProjectHeroSection,
  ProjectOverviewSection,
  ProjectVideoSection,
  ProjectGoalsAndImpactSection,
  ProjectStakeholdersSection,
  ProjectDeliverablesSection,
  ProjectKeywordsSection,
  ProjectRelatedSection
} from "@/components/website/projects";

export default function ProjectDetailPage({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const decoded = decodeURIComponent(slug);
  const isEn = locale === 'en';
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/projects/${decoded}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Project not found');
          }
          throw new Error('Failed to fetch project');
        }
        
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [decoded]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-brand-primary" />
          <h2 className="text-2xl font-bold mb-2">
            {isEn ? 'Loading project...' : 'جاري تحميل المشروع...'}
          </h2>
          <p className="text-muted-foreground">
            {isEn ? 'Please wait while we fetch the project details' : 'يرجى الانتظار بينما نقوم بتحميل تفاصيل المشروع'}
          </p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{isEn ? 'Project not found' : 'المشروع غير موجود'}</h2>
          <p className="text-muted-foreground mb-6">
            {error || (isEn ? 'The project you are looking for does not exist.' : 'المشروع الذي تبحث عنه غير موجود.')}
          </p>
          <Button asChild>
            <Link href={`/${locale}/projects`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isEn ? 'Back to Projects' : 'العودة للمشاريع'}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <ProjectHeroSection project={project} locale={locale} isEn={isEn} />

      {/* Content Sections */}
      <div className="container mx-auto px-6 py-16 space-y-16">
        {/* Overview Section */}
        <ProjectOverviewSection project={project} isEn={isEn} />

        {/* Video Section */}
        <ProjectVideoSection project={project} isEn={isEn} />

        {/* Project Goals and Impact Combined Section */}
        <ProjectGoalsAndImpactSection project={project} isEn={isEn} />

        {/* Stakeholders Section (Funding Providers, Donors, Partners) */}
        <ProjectStakeholdersSection project={project} isEn={isEn} />

        {/* Deliverables and Resources Section */}
        <ProjectDeliverablesSection project={project} isEn={isEn} />

        {/* Keywords and Tags Section */}
        <ProjectKeywordsSection project={project} isEn={isEn} />
      </div>

      {/* Related Projects Section */}
      <ProjectRelatedSection project={project} locale={locale} isEn={isEn} />
    </div>
  );
}