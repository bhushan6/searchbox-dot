export const Skeleton = () => (
  <div className="flex items-center gap-3 p-3">
    <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
      <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
    </div>
  </div>
);
