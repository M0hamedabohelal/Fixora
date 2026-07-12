import {Link} from "react-router-dom";
const ActionButtons = ({ order, onOpenChat, onOpenRating, onStatusChange }) => {
  const { status, provider } = order;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-5 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">
        Quick Actions
      </h3>

      <div className="grid grid-cols-1 gap-4">

        <button
          onClick={onOpenChat}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
        >
          <i className="fa-regular fa-comment"></i>
          Chat
        </button>

        {status === "active" && (
          <Link
            to="/checkout"
            state={{ price: order.price, serviceType: order.category || order.serviceType || 'General Service', description: order.description || order.title || 'Service booking' }}
            className="col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-[#c9a765] py-4 text-white font-bold transition hover:bg-[#b89551] shadow-lg mt-2"
          >
            <i className="fa-solid fa-credit-card"></i>
            Proceed to Checkout
          </Link>
        )}

        {status === "pending_completion" && onStatusChange && (
          <div className="flex gap-2">
            <button
              onClick={() => onStatusChange(order, 'completed')}
              className="flex-1 items-center justify-center gap-2 rounded-2xl bg-green-500 py-3 text-white font-bold transition hover:bg-green-600 shadow-md shadow-green-500/20"
            >
              Confirm Completion
            </button>
          </div>
        )}

        {status === "completed" && (
          <>
            <button
              className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 text-white font-medium transition hover:bg-blue-700"
            >
              <i className="fa-solid fa-rotate-right"></i>
              Reorder
            </button>
            <button
              onClick={onOpenRating}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#c9a765] py-3 text-white font-medium transition hover:bg-[#b89551]"
            >
              <i className="fa-solid fa-star"></i>
              Rate Provider
            </button>
          </>
        )}

        {status === "cancelled" && (
          <button
            className="flex items-center justify-center gap-2 rounded-2xl bg-red-600 py-3 text-white font-medium transition hover:bg-red-700"
          >
            <i className="fa-solid fa-arrow-rotate-left"></i>
            Book Again
          </button>
        )}

      </div>
    </div>
  );
};

export default ActionButtons;
