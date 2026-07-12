import { Link, useNavigate } from "react-router-dom";

const OrderCard = ({ order, onStatusChange, onRateClick }) => {
  const statusConfig = {
    active: {
      label: "Active",
      className: "bg-blue-100 text-blue-700",
    },
    completed: {
      label: "Completed",
      className: "bg-green-100 text-green-700",
    },
    in_progress: {
      label: "In Progress",
      className: "bg-purple-100 text-purple-700",
    },
    pending_completion: {
      label: "Pending Approval",
      className: "bg-amber-100 text-amber-700",
    },
    awaiting_payment: {
      label: "Awaiting Payment",
      className: "bg-orange-100 text-orange-800",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-100 text-red-700",
    },
  };

  const status = statusConfig[order.status] || statusConfig.active;
  const navigate = useNavigate();

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

          <div className="flex flex-col gap-1 text-right">
            {order.priceType === 'range' ? (
              <>
                <div className="flex items-baseline gap-1 text-[#1f3b6c] justify-end">
                  <span className="text-xl font-black">{order.minPrice}</span>
                  <span className="text-sm font-bold text-gray-400 mx-0.5">-</span>
                  <span className="text-xl font-black">{order.maxPrice}</span>
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Price Range (EGP)</div>
                {order.finalPrice && (
                  <div className="text-sm font-bold text-green-600 mt-1">Final: {order.finalPrice} EGP</div>
                )}
              </>
            ) : (
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-[#1f3b6c]">{order.finalPrice || order.price}</span>
                <span className="text-sm font-bold text-gray-400">EGP</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-3">

            <span className="font-semibold text-gray-500">
              Price
            </span>

            <span className="text-lg font-bold text-[#12376B]">
              {order.price} EGP
            </span>

          </div>

        </div>

        {/* Action Buttons */}
        {order.status === 'awaiting_payment' && (
          <div className="mt-5 flex gap-3 border-t border-gray-100 pt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate('/checkout', { 
                  state: { 
                    price: order.finalPrice, 
                    orderId: order.id,
                    serviceType: order.service?.name || 'General Service',
                    description: 'Final payment for range service' 
                  } 
                });
              }}
              className="flex-1 rounded-xl bg-[#1f3b6c] py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#152a4d] shadow-md shadow-[#1f3b6c]/20"
            >
              Pay Final Price
            </button>
          </div>
        )}

        {order.status === 'pending_completion' && (
          <div className="mt-5 flex gap-3 border-t border-gray-100 pt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onStatusChange) onStatusChange(order, 'completed');
              }}
              className="flex-1 rounded-xl bg-green-500 py-2.5 text-sm font-bold text-white transition-colors hover:bg-green-600 shadow-md shadow-green-500/20"
            >
              Confirm Completion
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                // A feature for the future: Dispute/Reject Completion
                alert("If you disagree with the completion or price, please contact Support.");
              }}
              className="px-4 rounded-xl bg-red-50 py-2.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-100"
            >
              Dispute
            </button>
          </div>
        )}
        
        {order.status === 'active' && (
          <div className="mt-5 flex gap-3 border-t border-gray-100 pt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onStatusChange) onStatusChange(order, 'cancelled');
              }}
              className="flex-1 rounded-xl bg-red-50 py-2.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-100"
            >
              Cancel Order
            </button>
          </div>
        )}

        {order.status === 'completed' && !order.hasReview && (
          <div className="mt-5 flex gap-3 border-t border-gray-100 pt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onRateClick) onRateClick(order);
              }}
              className="flex-1 rounded-xl bg-[#c9a765] py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#b89551] flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-star"></i>
              Rate Provider
            </button>
          </div>
        )}
        {order.status === 'completed' && order.hasReview && (
          <div className="mt-5 flex gap-3 border-t border-gray-100 pt-4">
            <div className="flex-1 rounded-xl bg-slate-50 py-2.5 text-sm font-bold text-slate-400 flex items-center justify-center gap-2 border border-slate-100 cursor-default">
              <i className="fa-solid fa-check text-green-500"></i>
              Reviewed
            </div>
          </div>
        )}

      </div>
    </Link>
  );
};

export default OrderCard;
