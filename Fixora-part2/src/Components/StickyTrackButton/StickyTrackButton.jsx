import { Link } from "react-router-dom";

const StickyTrackButton = ({ order }) => {
  const buttons = {
    active: {
      text: "Track Order",
      icon: "fa-solid fa-location-crosshairs",
      className: "bg-[#12376B] hover:bg-[#0F2F5A]",
      to: `/tracking/${order.id}`,
    },

    completed: {
      text: "Book Again",
      icon: "fa-solid fa-rotate-right",
      className: "bg-green-600 hover:bg-green-700",
      to: "/services",
    },

    cancelled: {
      text: "Create New Request",
      icon: "fa-solid fa-plus",
      className: "bg-red-600 hover:bg-red-700",
      to: "/services",
    },
  };

  const button = buttons[order.status];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-4">

        {/* Price */}
        <div>
          <p className="text-sm text-gray-500">
            Total Price
          </p>

          <h3 className="text-2xl font-bold text-[#12376B]">
            {order.price} {order.currency}
          </h3>
        </div>

        {/* Action */}
        <Link
          to={button.to}
          className={`flex items-center justify-center gap-3 rounded-2xl px-8 py-4 font-semibold text-white transition-all duration-300 ${button.className}`}
        >
          <i className={button.icon}></i>

          {button.text}
        </Link>

      </div>
    </div>
  );
};

export default StickyTrackButton;