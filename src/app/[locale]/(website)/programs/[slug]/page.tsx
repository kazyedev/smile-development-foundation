"use client";

import ProgramDetailClient from "@/components/website/programs/ProgramDetailClient";
import { notFound } from "next/navigation";
import { useState, useEffect, use } from "react";
import { Program } from "@/types/program";
import { Project } from "@/types/project";
import { Loader2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProgramDetailPageProps {
  params: Promise<{ 
    slug: string; 
    locale: string 
  }>;
}

export default function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const { slug, locale } = use(params);
  const decodedSlug = decodeURIComponent(slug);
  const isEn = locale === 'en';
  
  const [program, setProgram] = useState<Program | null>(null);
  const [linkedProjects, setLinkedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch program
        const programResponse = await fetch(`/api/programs/${encodeURIComponent(decodedSlug)}`);
        
        if (programResponse.status === 404) {
          notFound();
          return;
        }
        
        if (!programResponse.ok) {
          const errorData = await programResponse.json().catch(() => ({}));
          const errorMessage = errorData.error || `Failed to fetch program (${programResponse.status})`;
          console.error('Program fetch failed:', {
            status: programResponse.status,
            statusText: programResponse.statusText,
            error: errorData
          });
          throw new Error(errorMessage);
        }
        
        const programData = await programResponse.json();
        
        if (!programData || !programData.titleEn || !programData.titleAr) {
          console.error('Incomplete program data received:', programData);
          throw new Error('Program data is incomplete');
        }
        
        setProgram(programData);
        
        // Fetch linked projects
        try {
          const projectsResponse = await fetch(`/api/programs/${encodeURIComponent(decodedSlug)}/projects`);
          if (projectsResponse.ok) {
            const projectsData = await projectsResponse.json();
            setLinkedProjects(projectsData.items || []);
          }
        } catch (projectError) {
          console.error('Error fetching projects:', projectError);
          // Continue without projects
        }
        
      } catch (err) {
        console.error('Error fetching program:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    if (decodedSlug) {
      fetchData();
    }
  }, [decodedSlug]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-brand-primary mx-auto mb-4 animate-spin" />
          <h3 className="text-2xl font-bold mb-2">
            {isEn ? 'Loading program...' : 'جاري تحميل البرنامج...'}
          </h3>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <Target className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-red-600 mb-2">
            {isEn ? 'Error loading program' : 'خطأ في تحميل البرنامج'}
          </h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-brand-primary hover:bg-brand-primary/90"
          >
            {isEn ? 'Try Again' : 'حاول مرة أخرى'}
          </Button>
        </div>
      </div>
    );
  }
  
  if (!program) {
    notFound();
  }

  // Use the directly linked projects (already filtered by program_id in the API)
  const relatedProjects = linkedProjects.slice(0, 6); // Limit to 6 related projects

  // For now, we'll use empty stories array since we don't have stories in the database yet
  const relatedStories: any[] = [];

  return (
    <ProgramDetailClient 
      program={program} 
      relatedProjects={relatedProjects} 
      relatedStories={relatedStories} 
      locale={locale} 
    />
  );
}