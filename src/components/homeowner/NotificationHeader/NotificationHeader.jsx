import BackButton from "../BackButton";

const NotificationHeader = ({
  unreadCount = 0,
  totalCount = 0,
  onMarkAllAsRead,
}) => {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-100 bg-white backdrop-blur rounded-b-3xl md:rounded-3xl md:mt-4 shadow-sm">
      <div className="flex items-center justify-between px-5 py-4">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <BackButton />
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            <i className="fa-solid fa-bell text-xl text-blue-600"></i>
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Notifications
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {unreadCount > 0 ? (
                <>
                  <span className="font-semibold text-blue-600">
                    {unreadCount}
                  </span>{" "}
                  unread from{" "}
                  <span className="font-semibold text-gray-900">
                    {totalCount}
                  </span>
                </>
              ) : (
                "All notifications have been read"
              )}
            </p>
          </div>
        </div>

        {/* Right Side */}
        <button
          type="button"
          onClick={onMarkAllAsRead}
          disabled={!unreadCount}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
            unreadCount
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "cursor-not-allowed bg-gray-100 text-gray-400"
          }`}
        >
          <i className="fa-solid fa-check-double"></i>
          <span>Mark all</span>
        </button>
      </div>
    </header>
  );
};

export default NotificationHeader;
