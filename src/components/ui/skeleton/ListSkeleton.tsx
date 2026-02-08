import { Skeleton } from "../skeleton";

export const ListSkeleton = () => (
  <div className="flex flex-col px-4">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="grid grid-cols-[minmax(280px,1fr)_120px_180px_48px]
                   items-center gap-4 py-3 border-b"
      >
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-4 w-48" />
        </div>

        <Skeleton className="h-4 w-16 justify-self-end" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-6 justify-self-end" />
      </div>
    ))}
  </div>
);