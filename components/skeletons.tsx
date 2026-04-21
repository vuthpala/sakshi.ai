"use client";

export function DocumentCardSkeleton() {
  return (
    <div className="p-6 bg-white border border-slate-200 rounded-2xl animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-14 w-14 bg-slate-200 rounded-xl"></div>
        <div className="flex-1">
          <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-6 bg-slate-200 rounded w-16"></div>
        <div className="h-4 bg-slate-200 rounded w-20"></div>
      </div>
    </div>
  );
}

export function LawyerCardSkeleton() {
  return (
    <div className="p-4 bg-white border border-slate-200 rounded-xl animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-12 w-12 bg-slate-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-slate-200 rounded w-24 mb-1"></div>
          <div className="h-3 bg-slate-200 rounded w-16"></div>
        </div>
      </div>
      <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
      <div className="h-3 bg-slate-200 rounded w-2/3"></div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-1/2 mb-8"></div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-slate-200 rounded w-24"></div>
          <div className="h-12 bg-slate-200 rounded-xl"></div>
        </div>
      ))}
      <div className="h-12 bg-slate-200 rounded-xl w-full mt-8"></div>
    </div>
  );
}

export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl">
          <div className="h-8 bg-slate-200 rounded w-16 mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-20"></div>
        </div>
      ))}
    </div>
  );
}

export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-slate-200 rounded w-full"></div>
        </td>
      ))}
    </tr>
  );
}

export function DocumentPreviewSkeleton() {
  return (
    <div className="p-8 bg-white border-2 border-slate-200 rounded-lg animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-3/4 mx-auto mb-6"></div>
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        <div className="h-4 bg-slate-200 rounded w-4/5"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
      </div>
      <div className="mt-8 pt-8 border-t border-slate-200">
        <div className="flex justify-between">
          <div className="h-16 w-32 bg-slate-200 rounded"></div>
          <div className="h-16 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function StepIndicatorSkeleton() {
  return (
    <div className="flex items-center justify-between animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center">
          <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
          {i < 4 && <div className="h-1 w-12 md:w-24 bg-slate-200 mx-2"></div>}
        </div>
      ))}
    </div>
  );
}
