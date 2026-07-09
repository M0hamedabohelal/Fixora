const NotificationEmpty = ({
  title = "No Notifications",
  description = "You're all caught up. New notifications will appear here.",
}) => {
  return (
    <section className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
      {/* Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <i className="fa-solid fa-bell-slash text-4xl text-gray-400"></i>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900">
        {title}
      </h2>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
        {description}
      </p>
    </section>
  );
};

export default NotificationEmpty;
