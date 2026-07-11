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
        type: "spring",
        stiffness: 250,
        damping: 20
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
              ? "bg-gradient-to-r from-[#12376B] to-[#1f59ad] text-white rounded-br-sm shadow-md shadow-[#12376B]/20"
              : "bg-white backdrop-blur-sm text-gray-800 rounded-bl-sm border border-white shadow-sm"
          }
        `}
      >
        {/* Message */}
        <p className="text-[15px] leading-7 break-words">
          {message.text || message.message}
        </p>

        {/* Time */}
        <div
          className={`mt-2 flex items-center gap-1 text-xs ${
            isCustomer
              ? "justify-end text-blue-100"
              : "justify-end text-gray-400"
          }`}
        >
          <span>{message.timeString || message.time}</span>

          {isCustomer && (
            <i className="fa-solid fa-check-double text-[11px]"></i>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
