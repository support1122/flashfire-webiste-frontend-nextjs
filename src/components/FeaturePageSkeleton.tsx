export default function FeaturePageSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Navbar placeholder */}
      <div className="h-14 bg-gray-100 border-b border-gray-200" />

      {/* Hero section skeleton */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <div className="h-4 w-24 bg-gray-200 rounded mb-6 mx-auto" />
        <div className="h-10 w-3/4 bg-gray-200 rounded mb-4 mx-auto" />
        <div className="h-6 w-1/2 bg-gray-200 rounded mb-8 mx-auto" />
        <div className="h-12 w-48 bg-orange-100 rounded-full mx-auto" />
      </div>

      {/* Feature cards skeleton */}
      <div className="max-w-5xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 bg-gray-100 rounded-xl border border-gray-200" />
        ))}
      </div>
    </div>
  );
}
