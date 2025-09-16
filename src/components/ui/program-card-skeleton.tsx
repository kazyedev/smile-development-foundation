import { Skeleton } from "@/components/ui/skeleton";

export function ProgramCardSkeleton() {
  return (
    <div className="bg-background border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Header with icon and color */}
      <div className="p-6 pb-0">
        <div className="flex items-center gap-4 mb-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <Skeleton className="h-8 w-16 mx-auto mb-1" />
            <Skeleton className="h-3 w-20 mx-auto" />
          </div>
          <div className="text-center">
            <Skeleton className="h-8 w-16 mx-auto mb-1" />
            <Skeleton className="h-3 w-20 mx-auto" />
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
        
        {/* Button */}
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}

export function ProgramCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProgramCardSkeleton key={index} />
      ))}
    </div>
  );
}
