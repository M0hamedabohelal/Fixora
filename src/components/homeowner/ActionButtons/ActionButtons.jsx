import {Link} from "react-router-dom";
const ActionButtons = ({ order, onOpenChat }) => {
  const { status, provider } = order;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-5 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-4">

        <Link
          to={`tel:${provider.phone}`}
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#12376B] py-3 text-white font-medium transition hover:bg-[#0F2F5A]"
        >
          <i className="fa-solid fa-phone"></i>
          Call
        </Link>

        <button
          onClick={onOpenChat}
          className="flex items-center justify-center gap-2 rounded-2xl border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
        >
          <i className="fa-regular fa-comment"></i>
          Chat
        </button>

        {status === "active" && (
          <>
            <button
              className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 py-3 text-white font-medium transition hover:bg-green-700"
            >
              <i className="fa-solid fa-location-crosshairs"></i>
              Track Order
            </button>
            <Link
              to="/checkout"
              className="col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-[#c9a765] py-4 text-white font-bold transition hover:bg-[#b89551] shadow-lg mt-2"
            >
              <i className="fa-solid fa-credit-card"></i>
              Proceed to Checkout
            </Link>
          </>
        )}

        {status === "completed" && (
          <button
            className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 text-white font-medium transition hover:bg-blue-700"
          >
            <i className="fa-solid fa-rotate-right"></i>
            Reorder
          </button>
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
