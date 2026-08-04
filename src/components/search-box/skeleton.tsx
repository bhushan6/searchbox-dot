export const Skeleton = () => (
  <div className="flex items-center gap-3 p-3">
    <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse dark:bg-gray-700" />
    <div className="flex-1 space-y-2">
      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);
