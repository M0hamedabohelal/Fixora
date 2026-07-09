import { useState } from "react";

const ChatInput = ({ messages, setMessages }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "customer",
      type: "text",
      message: text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setText("");

    // Auto Reply (Static Demo)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "provider",
          type: "text",
          message: "Thanks for your message. I'll reply as soon as possible 👋",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        {/* Input */}
        <input
          type="text"
          value={text}
          placeholder="Type your message..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="
            flex-1
            rounded-full
            border
            border-gray-300
            bg-gray-50
            px-5
            py-3
            text-sm
            outline-none
            transition
            focus:border-[#12376B]
            focus:bg-white
          "
        />

        {/* Send */}
        <button
          onClick={handleSend}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-[#12376B]
            text-white
            transition
            hover:scale-105
            hover:bg-[#0F2F5A]
            active:scale-95
          "
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;