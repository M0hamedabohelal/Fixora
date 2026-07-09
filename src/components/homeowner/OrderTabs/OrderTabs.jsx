const OrderTabs = ({ activeTab, setActiveTab, orders }) => {
  const tabs = [
    {
      id: "all",
      label: "All Orders",
      count: orders.length,
    },
    {
      id: "active",
      label: "Active",
      count: orders.filter((order) => order.status === "active").length,
    },
    {
      id: "completed",
      label: "Completed",
      count: orders.filter((order) => order.status === "completed").length,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      count: orders.filter((order) => order.status === "cancelled").length,
    },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex w-max gap-3 rounded-2xl bg-white p-2 shadow-sm">

        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 rounded-xl px-5 py-3
                text-sm font-semibold transition-all duration-300

                ${
                  active
                    ? "bg-[#12376B] text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              <span>{tab.label}</span>

              <span
                className={`
                  flex h-6 min-w-[24px] items-center justify-center
                  rounded-full px-2 text-xs

                  ${
                    active
                      ? "bg-white text-[#12376B]"
                      : "bg-white text-[#12376B]"
                  }
                `}
              >
                {tab.count}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
};

export default OrderTabs;
