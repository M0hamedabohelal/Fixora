import { useState } from "react";
import initialOrders from "../../../data/orders";

import OrderCard from "../../../components/homeowner/OrderCard/OrderCard";
import OrderTabs from "../../../components/homeowner/OrderTabs/OrderTabs";
import HomeownerBottomNav from "../../../components/homeowner/HomeownerBottomNav";
import FloatingButton from "../../../components/homeowner/FloatingButton/FloatingButton";
import BackButton from "../../../components/homeowner/BackButton";
import RatingModal from "../../../components/homeowner/RatingModal/RatingModal";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [localOrders, setLocalOrders] = useState(initialOrders);
  const [ratingOrder, setRatingOrder] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setLocalOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
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

          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusChange={handleStatusChange}
              onRateClick={(orderToRate) => setRatingOrder(orderToRate)}
            />
          ))}

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
