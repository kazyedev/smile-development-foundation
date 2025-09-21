'use client';

// Projects Section Skeleton
export function ProjectsSkeletonSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-brand-primary/5 to-brand-secondary/10">
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full h-8 w-32 mb-6 animate-pulse" />
          <div className="h-12 bg-gray-200 rounded-lg w-72 mx-auto mb-6 animate-pulse" />
          <div className="h-5 bg-gray-200 rounded w-96 mx-auto mb-2 animate-pulse" />
          <div className="h-5 bg-gray-200 rounded w-80 mx-auto animate-pulse" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-4 animate-pulse" />
              <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-24 mx-auto animate-pulse" />
            </div>
          ))}
        </div>

        {/* Projects Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Skeleton */}
        <div className="text-center">
          <div className="h-12 bg-gray-200 rounded w-48 mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// Activities Section Skeleton
export function ActivitiesSkeletonSection() {
  return (
    <section className="relative py-20 bg-background">
      <div className="container mx-auto px-4 relative">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full h-8 w-32 mb-6 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-80 mx-auto mb-4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
        </div>

        {/* Timeline Skeleton */}
        <div className="relative max-w-6xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 animate-pulse" />
          <div className="space-y-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center lg:flex-row flex-col lg:gap-16 gap-8">
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse" />
                  <div className="h-7 bg-gray-200 rounded w-3/4 mb-3 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 animate-pulse" />
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" />
                  </div>
                  <div className="h-9 bg-gray-200 rounded w-28 animate-pulse" />
                </div>
                <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
                <div className="flex-1">
                  <div className="h-64 bg-gray-200 rounded-2xl animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Skeleton */}
        <div className="text-center mt-20">
          <div className="h-12 bg-gray-200 rounded w-48 mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// Success Stories Section Skeleton
export function SuccessStoriesSkeletonSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-red-50/20">
      <div className="container mx-auto px-4 relative">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full h-8 w-32 mb-6 animate-pulse" />
          <div className="h-12 bg-gray-200 rounded w-72 mx-auto mb-6 animate-pulse" />
          <div className="h-5 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
        </div>

        {/* Main Story Display Skeleton */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="aspect-[4/3] bg-gray-200 rounded-3xl animate-pulse" />
            <div className="flex flex-col justify-center">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-6 animate-pulse" />
              <div className="h-9 bg-gray-200 rounded w-3/4 mb-6 animate-pulse" />
              <div className="space-y-3 mb-6">
                <div className="h-5 bg-gray-200 rounded w-48 animate-pulse" />
                <div className="h-5 bg-gray-200 rounded w-56 animate-pulse" />
              </div>
              <div className="h-20 bg-gray-200 rounded mb-8 animate-pulse" />
              <div className="flex gap-2 mb-8">
                <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" />
              </div>
              <div className="h-10 bg-gray-200 rounded w-40 animate-pulse" />
            </div>
          </div>

          {/* Navigation Skeleton */}
          <div className="flex justify-center gap-4 mb-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-20 h-20 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>

        {/* CTA Skeleton */}
        <div className="text-center">
          <div className="h-12 bg-gray-200 rounded w-52 mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// Videos Section Skeleton
export function VideosSkeletonSection() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-background to-black/5">
      <div className="container mx-auto px-4 relative">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full h-8 w-32 mb-6 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
        </div>

        {/* Main Video Skeleton */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-gray-800 p-8 rounded-3xl">
            <div className="aspect-video bg-gray-600 rounded-2xl mb-6 animate-pulse" />
            <div className="text-white">
              <div className="h-7 bg-gray-600 rounded w-3/4 mb-3 animate-pulse" />
              <div className="h-4 bg-gray-600 rounded w-full mb-2 animate-pulse" />
              <div className="h-4 bg-gray-600 rounded w-2/3 mb-4 animate-pulse" />
              <div className="flex gap-4">
                <div className="h-4 bg-gray-600 rounded w-20 animate-pulse" />
                <div className="h-4 bg-gray-600 rounded w-24 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Video Playlist Skeleton */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="h-6 bg-gray-200 rounded w-40 mx-auto mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="aspect-video bg-gray-200 rounded-xl mb-4 animate-pulse" />
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Skeleton */}
        <div className="text-center">
          <div className="h-12 bg-gray-200 rounded w-48 mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// News Section Skeleton
export function NewsSkeletonSection() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 relative">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full h-8 w-32 mb-6 animate-pulse" />
          <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
          <div className="flex justify-center gap-4 mb-6">
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-28 animate-pulse" />
          </div>
          <div className="h-5 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
        </div>

        {/* News Layout Skeleton */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Featured Article Skeleton */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="aspect-[16/10] bg-gray-200 animate-pulse" />
                <div className="p-6">
                  <div className="flex gap-4 mb-3">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-3 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded w-40 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Side News Skeleton */}
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-md">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                      <div className="flex gap-3">
                        <div className="h-3 bg-gray-200 rounded w-12 animate-pulse" />
                        <div className="h-3 bg-gray-200 rounded w-10 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Skeleton */}
        <div className="text-center">
          <div className="h-12 bg-gray-200 rounded w-44 mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}
