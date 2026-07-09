import NotificationIcon from "../NotificationIcon/NotificationIcon";

const NotificationCard = ({
  notification,
  onDelete,
  onRead,
}) => {
  const {
    id,
    title,
    description,
    type,
    time,
    isRead,
  } = notification;

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        isRead
          ? "border-gray-100"
          : "border-blue-200 bg-blue-50/40"
      }`}
    >
      {/* Unread Indicator */}
      {!isRead && (
        <span className="absolute left-0 top-0 h-full w-1 bg-blue-600" />
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <NotificationIcon type={type} />

        {/* Content */}
        <div
          className="flex-1 cursor-pointer"
          onClick={() => onRead?.(id)}
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-gray-900">
              {title}
            </h3>

            <span className="shrink-0 text-xs text-gray-400">
              {time}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(id)}
            className="rounded-xl p-2 text-red-500 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-red-50"
          >
            <i className="fa-solid fa-trash text-base"></i>
          </button>
        </div>
      </div>
    </article>
  );
};

export default NotificationCard;
