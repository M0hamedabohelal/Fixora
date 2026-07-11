import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import NotificationHeader from "../../../components/homeowner/NotificationHeader/NotificationHeader";
import NotificationTabs from "../../../components/homeowner/NotificationTabs/NotificationTabs";
import NotificationList from "../../../components/homeowner/NotificationList/NotificationList";
import HomeownerBottomNav from "../../../components/homeowner/HomeownerBottomNav";

import { 
  markNotificationAsRead, 
  markAllNotificationsAsRead, 
  deleteNotification 
} from "../../../services/api";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../../firebase/config";

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;
    
    setLoading(true);
    const q = query(
      collection(db, "notifications"), 
      where("targetUserId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        let timeStr = 'Just now';
        if (data.createdAt) {
          const seconds = Math.floor((new Date() - data.createdAt.toDate()) / 1000);
          if (seconds > 86400) timeStr = Math.floor(seconds / 86400) + ' days ago';
          else if (seconds > 3600) timeStr = Math.floor(seconds / 3600) + ' hrs ago';
          else if (seconds > 60) timeStr = Math.floor(seconds / 60) + ' mins ago';
        }
        notifs.push({ id: doc.id, ...data, time: timeStr });
      });
      
      // Sort descending by time
      notifs.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });
      
      setNotifications(notifs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to load notifications");
      setLoading(false);
    });

    return () => unsubscribe();
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

  const handleRead = async (id) => {
    const clickedNotif = notifications.find(n => String(n.id) === String(id));
    
    try {
      await markNotificationAsRead(id);
    } catch (error) {
      console.warn("Could not mark as read, continuing...", error);
    }

    if (clickedNotif && clickedNotif.type === 'offer' && clickedNotif.requestId) {
      navigate(`/dashboard`);
    }
  };

  // ==============================
  // Mark All As Read
  // ==============================

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      toast.success("All caught up!");
    } catch (error) {
      console.warn("Could not mark all as read", error);
      toast.error("Failed to update some notifications");
    }
  };

  // ==============================
  // Delete Notification
  // ==============================

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      toast.success("Notification deleted");
    } catch (error) {
      console.warn("Could not delete", error);
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
      <HomeownerBottomNav />
    </main>
  );
};

export default Notifications;
