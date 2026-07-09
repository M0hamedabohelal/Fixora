import { useState } from "react";
import { useParams } from "react-router-dom";

import orders from "../../data/orders";
import chatData from "../../data/chatData";

import OrderHero from "../../Components/OrderHero/OrderHero";
import ProviderCard from "../../Components/ProviderCard/ProviderCard";
import OrderInfo from "../../Components/OrderInfo/OrderInfo";
import Gallery from "../../Components/Gallery/Gallery";
import OrderTimeline from "../../Components/OrderTimeline/OrderTimeline";
import OrderMap from "../../Components/OrderMap/OrderMap";
import ActionButtons from "../../Components/ActionButtons/ActionButtons";
import StickyTrackButton from "../../Components/StickyTrackButton/StickyTrackButton";
import ChatDrawer from "../../components/ChatDrawer/ChatDrawer";

const OrderDetails = () => {
  const { id } = useParams();

  const order = orders.find((item) => item.id === id);

  const [openChat, setOpenChat] = useState(false);

  const [messages, setMessages] = useState(
    chatData[id] || []
  );

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-red-500">
          Order Not Found
        </h2>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5F2] pb-28">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <OrderHero order={order} />

        <ProviderCard
            order={order}
            onOpenChat={() => setOpenChat(true)}
        />

        <OrderInfo order={order} />

        <Gallery order={order} />

        <OrderTimeline order={order} />

        <OrderMap order={order} />

        <ActionButtons
          order={order}
          onOpenChat={() => setOpenChat(true)}
        />
      </div>

      <StickyTrackButton order={order} />

      <ChatDrawer
        isOpen={openChat}
        onClose={() => setOpenChat(false)}
        order={order}
        messages={messages}
        setMessages={setMessages}
      />
    </main>
  );
};

export default OrderDetails;