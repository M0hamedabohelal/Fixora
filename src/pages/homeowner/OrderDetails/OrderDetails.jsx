import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getOrderById, subscribeToChat, sendChatMessage } from "../../../services/api";

import OrderHero from "../../../components/homeowner/OrderHero/OrderHero";
import ProviderCard from "../../../components/homeowner/ProviderCard/ProviderCard";
import OrderInfo from "../../../components/homeowner/OrderInfo/OrderInfo";
import Gallery from "../../../components/homeowner/Gallery/Gallery";
import OrderTimeline from "../../../components/homeowner/OrderTimeline/OrderTimeline";
import ActionButtons from "../../../components/homeowner/ActionButtons/ActionButtons";
import ChatDrawer from "../../../components/homeowner/ChatDrawer/ChatDrawer";
import HomeownerBottomNav from "../../../components/homeowner/HomeownerBottomNav";
import RatingModal from "../../../components/homeowner/RatingModal/RatingModal";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openChat, setOpenChat] = useState(false);
  const [openRating, setOpenRating] = useState(false);

  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const orderData = await getOrderById(id);
        setOrder(orderData);
      } catch (error) {
        toast.error("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!order) return;
    // Subscribe to real-time chat messages
    const unsubscribe = subscribeToChat(order, (chatData) => {
      setMessages(chatData);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [order]);

  const handleSendMessage = async (text) => {
    try {
      // We don't need to manually setMessages here because the real-time listener will pick it up
      await sendChatMessage(order, text);
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] p-8">
        <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
          <div className="h-48 bg-gray-200 rounded-3xl w-full"></div>
          <div className="h-24 bg-gray-200 rounded-3xl w-full"></div>
          <div className="h-64 bg-gray-200 rounded-3xl w-full"></div>
        </div>
      </div>
    );
  }

  if (!order && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-red-500">
          Order Not Found
        </h2>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5F2] pb-40">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <OrderHero order={order} />

        <ProviderCard
            order={order}
            onOpenChat={() => setOpenChat(true)}
        />

        <OrderInfo order={order} />

        <Gallery order={order} />

        <OrderTimeline order={order} />

        <ActionButtons
          order={order}
          onOpenChat={() => setOpenChat(true)}
          onOpenRating={() => setOpenRating(true)}
        />
      </div>


      <ChatDrawer
        isOpen={openChat}
        onClose={() => setOpenChat(false)}
        order={order}
        messages={messages}
        onSendMessage={handleSendMessage}
      />

      <RatingModal
        isOpen={openRating}
        onClose={() => setOpenRating(false)}
        providerName={order?.provider?.name}
        onSubmit={(data) => {
          console.log("Rating submitted", data);
          toast.success("Rating submitted successfully!");
          setOpenRating(false);
        }}
      />
      <HomeownerBottomNav />
    </main>
  );
};

export default OrderDetails;
