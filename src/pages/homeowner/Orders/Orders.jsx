import { useState, useEffect } from "react";
import { getOrders, updateOrderStatus } from "../../../services/api";
import toast from "react-hot-toast";

import OrderCard from "../../../components/homeowner/OrderCard/OrderCard";
import OrderTabs from "../../../components/homeowner/OrderTabs/OrderTabs";
import HomeownerBottomNav from "../../../components/homeowner/HomeownerBottomNav";
import FloatingButton from "../../../components/homeowner/FloatingButton/FloatingButton";
import BackButton from "../../../components/homeowner/BackButton";
import RatingModal from "../../../components/homeowner/RatingModal/RatingModal";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [localOrders, setLocalOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingOrder, setRatingOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrders();
        setLocalOrders(data);
      } catch (error) {
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      setLocalOrders(prev => prev.map(order => String(order.id) === String(id) ? { ...order, status: newStatus } : order));
      toast.success("Order status updated!");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const filteredOrders =
    activeTab === "all"
      ? localOrders
      : localOrders.filter((order) => order.status === activeTab);

  return (
    <main className="min-h-screen bg-[#F7F5F2] pb-32">

      {/* Header */}
      <section className="bg-white rounded-b-3xl shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">

          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-3xl font-bold text-[#12376B]">
              My Orders
            </h1>
          </div>

          <p className="mt-2 text-gray-500">
            Track and manage all your service requests.
          </p>

        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 py-8">

        <OrderTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          orders={localOrders}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

          {loading ? (
            // Loading Skeletons
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
                <div className="flex justify-between mb-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-20 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
                onRateClick={(orderToRate) => setRatingOrder(orderToRate)}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              No orders found.
            </div>
          )}

        </div>

      </section>

      <FloatingButton />

      <HomeownerBottomNav />

      <RatingModal
        isOpen={!!ratingOrder}
        onClose={() => setRatingOrder(null)}
        providerName={ratingOrder?.provider?.name}
        onSubmit={(data) => {
          console.log("Rating submitted from Orders page", data);
        }}
      />
    </main>
  );
};

export default Orders;
