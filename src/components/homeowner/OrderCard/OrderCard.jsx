import { Link } from "react-router-dom";

const OrderCard = ({ order, onStatusChange }) => {
  const statusConfig = {
    active: {
      label: "Active",
      className: "bg-blue-100 text-blue-700",
    },
    completed: {
      label: "Completed",
      className: "bg-green-100 text-green-700",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-100 text-red-700",
    },
  };

  const status = statusConfig[order.status];

  return (
    <Link
      to={`/homeowner/orders/${order.id}`}
      className="block overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Service Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={order.service.image}
          alt={order.service.name}
          className="h-full w-full object-cover transition duration-500 hover:scale-110"
        />

        <span
          className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-5">

        {/* Service */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            {order.service.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            #{order.id}
          </p>
        </div>

        {/* Provider */}
        <div className="mb-5 flex items-center gap-3">
          <img
            src={order.provider.avatar}
            alt={order.provider.name}
            className="h-12 w-12 rounded-full object-cover"
          />

          <div>
            <h4 className="font-semibold text-gray-800">
              {order.provider.name}
            </h4>

            <p className="text-sm text-gray-500">
              {order.provider.speciality}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600">

          <div className="flex items-center gap-2">
            <i className="fa-solid fa-location-dot text-[#12376B]"></i>

            <span>{order.location.district}</span>
          </div>

          <div className="flex items-center gap-2">
            <i className="fa-regular fa-clock text-[#12376B]"></i>

            <span>{order.scheduledAt}</span>
          </div>

          <div className="flex items-center justify-between pt-3">

            <span className="font-semibold text-gray-500">
              Price
            </span>

            <span className="text-lg font-bold text-[#12376B]">
              {order.price} {order.currency}
            </span>

          </div>

        </div>

        {/* Action Buttons */}
        {order.status === 'active' && (
          <div className="mt-5 flex gap-3 border-t border-gray-100 pt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onStatusChange) onStatusChange(order.id, 'completed');
              }}
              className="flex-1 rounded-xl bg-green-50 py-2.5 text-sm font-bold text-green-600 transition-colors hover:bg-green-100"
            >
              Complete
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onStatusChange) onStatusChange(order.id, 'cancelled');
              }}
              className="flex-1 rounded-xl bg-red-50 py-2.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-100"
            >
              Cancel
            </button>
          </div>
        )}

      </div>
    </Link>
  );
};

export default OrderCard;
