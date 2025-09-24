"use client";

interface ProgramErrorFallbackProps {
  locale?: string;
}

export default function ProgramErrorFallback({ locale = "en" }: ProgramErrorFallbackProps) {
  const isEn = locale === "en";
  
  const handleReload = () => {
    window.location.reload();
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          {isEn ? "Something went wrong" : "حدث خطأ ما"}
        </h1>
        <p className="text-muted-foreground mb-6">
          {isEn 
            ? "We encountered an error while loading this program. Please try again later."
            : "واجهنا خطأ أثناء تحميل هذا البرنامج. يرجى المحاولة مرة أخرى لاحقاً."
          }
        </p>
        <button 
          onClick={handleReload}
          className="inline-flex items-center px-6 py-3 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90 transition-colors"
        >
          {isEn ? "Try Again" : "حاول مرة أخرى"}
        </button>
      </div>
    </div>
  );
}
