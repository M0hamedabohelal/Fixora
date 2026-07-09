const NotificationSkeleton = () => {
  return (
    <article className="animate-pulse rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="h-12 w-12 flex-shrink-0 rounded-2xl bg-gray-200" />

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-3 flex items-center justify-between">
            <div className="h-4 w-40 rounded-full bg-gray-200" />
            <div className="h-3 w-16 rounded-full bg-gray-200" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-3 w-full rounded-full bg-gray-200" />
            <div className="h-3 w-5/6 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <div className="h-9 w-9 rounded-xl bg-gray-200" />
          <div className="h-9 w-9 rounded-xl bg-gray-200" />
        </div>
      </div>
    </article>
  );
};

export default NotificationSkeleton;
