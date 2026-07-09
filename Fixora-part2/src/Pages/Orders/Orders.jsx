import { useState } from "react";
import orders from "../../data/orders";

import OrderCard from "../../Components/OrderCard/OrderCard";
import OrderTabs from "../../Components/OrderTabs/OrderTabs";
import BottomNav from "../../Components/BottomNav/BottomNav";
import FloatingButton from "../../Components/FloatingButton/FloatingButton";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  return (
    <main className="min-h-screen bg-[#F7F5F2] pb-28">

      {/* Header */}
      <section className="bg-white rounded-b-3xl shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">

          <h1 className="text-3xl font-bold text-[#12376B]">
            My Orders
          </h1>

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
          orders={orders}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))}

        </div>

      </section>

      <FloatingButton />

      <BottomNav />

    </main>
  );
};

export default Orders;