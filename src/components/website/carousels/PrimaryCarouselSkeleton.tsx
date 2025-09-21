'use client';

export default function PrimaryCarouselSkeleton({ locale }: { locale: string }) {
  const isRTL = locale !== "en";

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {/* Background skeleton */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-slate-700/50 animate-pulse" />
      
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Content container */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between p-4 md:p-8 lg:p-12">
        
        {/* Main content area skeleton */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl px-4 md:px-8">
          <div className="space-y-4 md:space-y-6">
            {/* Title skeleton */}
            <div className="space-y-3">
              <div className="h-12 md:h-16 lg:h-20 xl:h-24 bg-white/20 rounded-lg animate-pulse" />
              <div className="h-8 md:h-12 lg:h-16 xl:h-20 bg-white/15 rounded-lg animate-pulse w-3/4" />
            </div>
            
            {/* Description skeleton */}
            <div className="space-y-2">
              <div className="h-5 md:h-6 lg:h-7 bg-white/15 rounded animate-pulse" />
              <div className="h-5 md:h-6 lg:h-7 bg-white/15 rounded animate-pulse w-5/6" />
              <div className="h-5 md:h-6 lg:h-7 bg-white/15 rounded animate-pulse w-4/5" />
            </div>
            
            {/* Location skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
              <div className="h-4 md:h-5 bg-white/15 rounded animate-pulse w-48" />
            </div>
            
            {/* Button skeleton */}
            <div className="h-12 md:h-14 w-32 md:w-40 bg-white/20 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Card thumbnails and controls skeleton */}
        <div className="flex flex-col items-center md:items-end gap-6 md:gap-8">
          
          {/* Card thumbnails skeleton */}
          <div className="relative flex items-center justify-center h-40 md:h-52 lg:h-60 w-72 md:w-80 lg:w-96 overflow-visible">
            {/* Main card skeleton */}
            <div className="absolute w-20 h-28 md:w-32 md:h-40 lg:w-40 lg:h-52 bg-white/20 rounded-lg animate-pulse z-30 border-2 border-white/30" />
            
            {/* Side cards skeleton */}
            <div className="absolute -translate-x-16 md:-translate-x-20 lg:-translate-x-24 scale-85 w-16 h-24 md:w-24 md:h-32 lg:w-28 lg:h-36 bg-white/15 rounded-lg animate-pulse z-20 border-2 border-white/20" />
            <div className="absolute translate-x-16 md:translate-x-20 lg:translate-x-24 scale-85 w-16 h-24 md:w-24 md:h-32 lg:w-28 lg:h-36 bg-white/15 rounded-lg animate-pulse z-20 border-2 border-white/20" />
          </div>

          {/* Navigation controls skeleton */}
          <div className="flex items-center gap-4">
            {/* Previous button skeleton */}
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 animate-pulse border border-white/30" />

            {/* Progress indicator skeleton */}
            <div className="relative w-16 md:w-20 h-1 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white/50 rounded-full w-1/3 animate-pulse" />
            </div>

            {/* Card counter skeleton */}
            <div className="h-4 md:h-5 w-12 bg-white/20 rounded animate-pulse" />

            {/* Next button skeleton */}
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 animate-pulse border border-white/30" />
          </div>
        </div>
      </div>

      {/* Floating dots animation (deterministic positions to avoid hydration mismatch) */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => {
          // Deterministic pseudo positions based on index
          const top = 20 + ((i * 9) % 60);
          const left = 10 + ((i * 17) % 80);
          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full animate-ping"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s',
              }}
            />
          );
        })}
      </div>

      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer pointer-events-none" />
      
      {/* Custom shimmer animation styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
