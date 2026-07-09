import { useMemo, useState } from "react";

import NotificationHeader from "../../Components/NotificationHeader/NotificationHeader";
import NotificationTabs from "../../Components/NotificationTabs/NotificationTabs";
import NotificationList from "../../Components/NotificationList/NotificationList";

import notificationsData from "../../data/notifications";

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);
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
        id: "tracking",
        label: "Tracking",
        count: notifications.filter(
          (item) => item.type === "tracking"
        ).length,
      },

      {
        id: "offer",
        label: "Offers",
        count: notifications.filter(
          (item) => item.type === "offer"
        ).length,
      },

      {
        id: "message",
        label: "Messages",
        count: notifications.filter(
          (item) => item.type === "message"
        ).length,
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

      case "tracking":
        return notifications.filter(
          (item) => item.type === "tracking"
        );

      case "offer":
        return notifications.filter(
          (item) => item.type === "offer"
        );

      case "message":
        return notifications.filter(
          (item) => item.type === "message"
        );

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
    setNotifications((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <main className="min-h-screen bg-gray-50">
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
    </main>
  );
};

export default Notifications;