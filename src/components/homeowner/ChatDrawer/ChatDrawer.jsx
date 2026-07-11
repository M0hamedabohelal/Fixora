import { AnimatePresence, motion } from "framer-motion";

import ChatHeader from "../ChatHeader/ChatHeader";
import ChatMessages from "../ChatMessages/ChatMessages";
import ChatInput from "../ChatInput/ChatInput";

const ChatDrawer = ({
  isOpen,
  onClose,
  order,
  messages,
  onSendMessage,
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
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
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
              z-[60]
              flex
              h-screen
              w-full
              max-w-[430px]
              flex-col
              overflow-hidden
              bg-white
              backdrop-blur-2xl
              shadow-2xl
              border-l border-white
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
            <div className="flex-1 overflow-y-auto bg-transparent">
              <ChatMessages
                messages={messages}
              />
            </div>

            {/* Input */}
            <div className="shrink-0 bg-white backdrop-blur-md border-t border-white">
              <ChatInput
                onSendMessage={onSendMessage}
              />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatDrawer;
