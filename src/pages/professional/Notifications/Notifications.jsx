import { useMemo, useState, useEffect } from "react";

import NotificationHeader from "../../../components/homeowner/NotificationHeader/NotificationHeader";
import NotificationTabs from "../../../components/homeowner/NotificationTabs/NotificationTabs";
import NotificationList from "../../../components/homeowner/NotificationList/NotificationList";
import ProfessionalBottomNav from "../../../components/professional/ProfessionalBottomNav";

import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } from "../../../services/api";
import toast from "react-hot-toast";

const ProfessionalNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        setLoading(true);
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        toast.error("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };
    fetchNotifs();
  }, []);

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

  const handleRead = async (id) => {
    try {
      const updated = await markNotificationAsRead(id);
      setNotifications(updated);
    } catch (error) {
      toast.error("Failed to update notification");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const updated = await markAllNotificationsAsRead();
      setNotifications(updated);
      toast.success("All caught up!");
    } catch (error) {
      toast.error("Failed to update notifications");
    }
  };

  const handleDelete = async (id) => {
    try {
      const updated = await deleteNotification(id);
      setNotifications(updated);
      toast.success("Notification deleted");
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  // ==============================
  // Delete All Notifications
  // ==============================

  const handleClearAll = async () => {
    if (!window.confirm("Are you sure you want to clear all notifications?")) return;
    try {
      await Promise.all(notifications.map(n => deleteNotification(n.id)));
      toast.success("All notifications cleared");
    } catch (error) {
      console.warn("Could not clear all", error);
      toast.error("Failed to clear some notifications");
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F5F2] pb-32">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <NotificationHeader
          unreadCount={unreadCount}
          totalCount={notifications.length}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClearAll={handleClearAll}
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
