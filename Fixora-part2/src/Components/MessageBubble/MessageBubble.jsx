import { motion } from "framer-motion";

const MessageBubble = ({ message }) => {
  const isCustomer = message.sender === "customer";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`flex ${
        isCustomer ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[80%]
          rounded-3xl
          px-4
          py-3
          shadow-sm
          ${
            isCustomer
              ? "bg-[#12376B] text-white rounded-br-md"
              : "bg-white text-gray-800 rounded-bl-md border border-gray-200"
          }
        `}
      >
        {/* Message */}
        <p className="text-[15px] leading-7 break-words">
          {message.message}
        </p>

        {/* Time */}
        <div
          className={`mt-2 flex items-center gap-1 text-xs ${
            isCustomer
              ? "justify-end text-blue-100"
              : "justify-end text-gray-400"
          }`}
        >
          <span>{message.time}</span>

          {isCustomer && (
            <i className="fa-solid fa-check-double text-[11px]"></i>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;