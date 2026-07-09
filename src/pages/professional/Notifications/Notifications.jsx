import { useMemo, useState } from "react";

import NotificationHeader from "../../../components/homeowner/NotificationHeader/NotificationHeader";
import NotificationTabs from "../../../components/homeowner/NotificationTabs/NotificationTabs";
import NotificationList from "../../../components/homeowner/NotificationList/NotificationList";
import ProfessionalBottomNav from "../../../components/professional/ProfessionalBottomNav";

const initialNotifications = [
  {
    id: 1,
    type: "request",
    title: "New Plumbing Request",
    description: "John Doe needs help with a leaking pipe in Al Nuzha.",
    time: "2 mins ago",
    isRead: false,
  },
  {
    id: 2,
    type: "payment",
    title: "Payment Received",
    description: "You have received $120.00 for the completed job #1042.",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: 3,
    type: "system",
    title: "Profile Approved",
    description: "Your verification documents have been approved successfully.",
    time: "1 day ago",
    isRead: true,
  },
];

const ProfessionalNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState("all");
  const [loading] = useState(false);

  // ==============================
  // Unread Count
  // ==============================

  const unreadCount = useMemo(() => {
    return notifications.filter((item) => !item.isRead).length;
  }, [notifications]);

  // ==============================
  // Tabs
  // ==============================

  const tabs = useMemo(
    () => [
      {
        id: "all",
        label: "All",
        count: notifications.length,
      },
      {
        id: "unread",
        label: "Unread",
        count: unreadCount,
      },
      {
        id: "request",
        label: "Requests",
        count: notifications.filter((item) => item.type === "request").length,
      },
      {
        id: "payment",
        label: "Payments",
        count: notifications.filter((item) => item.type === "payment").length,
      },
      {
        id: "system",
        label: "System",
        count: notifications.filter((item) => item.type === "system").length,
      },
    ],
    [notifications, unreadCount]
  );

  // ==============================
  // Filter Notifications
  // ==============================

  const filteredNotifications = useMemo(() => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((item) => !item.isRead);

      case "request":
        return notifications.filter((item) => item.type === "request");

      case "payment":
        return notifications.filter((item) => item.type === "payment");

      case "system":
        return notifications.filter((item) => item.type === "system");

      default:
        return notifications;
    }
  }, [notifications, activeTab]);

  // ==============================
  // Mark As Read
  // ==============================

  const handleRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isRead: true,
            }
          : item
      )
    );
  };

  // ==============================
  // Mark All As Read
  // ==============================

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        isRead: true,
      }))
    );
  };

  // ==============================
  // Delete Notification
  // ==============================

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen bg-[#F7F5F2] pb-32">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <NotificationHeader
          unreadCount={unreadCount}
          totalCount={notifications.length}
          onMarkAllAsRead={handleMarkAllAsRead}
        />

        <NotificationTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <NotificationList
          notifications={filteredNotifications}
          loading={loading}
          onDelete={handleDelete}
          onRead={handleRead}
        />
      </div>
      <ProfessionalBottomNav />
    </main>
  );
};

export default ProfessionalNotifications;
