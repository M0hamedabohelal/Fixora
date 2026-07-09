import NotificationCard from "../NotificationCard/NotificationCard";
import NotificationEmpty from "../NotificationEmpty/NotificationEmpty";
import NotificationSkeleton from "../NotificationSkeleton/NotificationSkeleton";

const NotificationList = ({
  notifications = [],
  loading = false,
  onDelete,
  onRead,
}) => {
  if (loading) {
    return (
      <section className="space-y-4 px-5 py-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <NotificationSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (!notifications.length) {
    return (
      <section className="px-5 py-10">
        <NotificationEmpty />
      </section>
    );
  }

  return (
    <section className="space-y-4 px-5 py-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onDelete={onDelete}
          onRead={onRead}
        />
      ))}
    </section>
  );
};

export default NotificationList;
