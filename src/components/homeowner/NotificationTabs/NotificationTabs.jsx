const NotificationTabs = ({
  tabs = [],
  activeTab = "all",
  onTabChange,
}) => {
  return (
    <div className="sticky top-[89px] z-10 bg-white backdrop-blur-md">
      <div className="flex gap-3 overflow-x-auto px-5 py-4 scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "border-blue-600 bg-blue-600 text-white shadow-md"
                  : "border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <span>{tab.label}</span>

              {typeof tab.count === "number" && (
                <span
                  className={`flex h-6 min-w-[24px] items-center justify-center rounded-full px-2 text-xs font-semibold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationTabs;
