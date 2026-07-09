import { AnimatePresence, motion } from "framer-motion";

import ChatHeader from "../ChatHeader/ChatHeader";
import ChatMessages from "../ChatMessages/ChatMessages";
import ChatInput from "../ChatInput/ChatInput";

const ChatDrawer = ({
  isOpen,
  onClose,
  order,
  messages,
  setMessages,
}) => {
  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            className="
              fixed
              top-0
              right-0
              z-50
              flex
              h-screen
              w-full
              max-w-[430px]
              flex-col
              overflow-hidden
              bg-[#F8F9FC]
              shadow-2xl
            "
          >
            {/* Header */}
            <div className="shrink-0">
              <ChatHeader
                provider={order.provider}
                onClose={onClose}
              />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-[#F4F7FB]">
              <ChatMessages
                messages={messages}
              />
            </div>

            {/* Input */}
            <div className="shrink-0 bg-white border-t">
              <ChatInput
                messages={messages}
                setMessages={setMessages}
              />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatDrawer;