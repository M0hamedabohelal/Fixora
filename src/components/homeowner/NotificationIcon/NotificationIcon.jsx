const notificationTypes = {
  order: {
    icon: "fa-briefcase",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },

  tracking: {
    icon: "fa-truck",
    bgColor: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },

  offer: {
    icon: "fa-hand-holding-dollar",
    bgColor: "bg-amber-100",
    iconColor: "text-amber-600",
  },

  message: {
    icon: "fa-message",
    bgColor: "bg-violet-100",
    iconColor: "text-violet-600",
  },

  completed: {
    icon: "fa-circle-check",
    bgColor: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },

  rating: {
    icon: "fa-star",
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },

  warning: {
    icon: "fa-triangle-exclamation",
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },

  request: {
    icon: "fa-clipboard-list",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },

  payment: {
    icon: "fa-file-invoice-dollar",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },

  system: {
    icon: "fa-gear",
    bgColor: "bg-gray-200",
    iconColor: "text-gray-700",
  },

  default: {
    icon: "fa-bell",
    bgColor: "bg-gray-100",
    iconColor: "text-gray-600",
  },
};

const NotificationIcon = ({ type = "default" }) => {
  const config = notificationTypes[type] || notificationTypes.default;

  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${config.bgColor}`}
    >
      <i
        className={`fa-solid ${config.icon} text-xl ${config.iconColor}`}
      ></i>
    </div>
  );
};

export default NotificationIcon;
