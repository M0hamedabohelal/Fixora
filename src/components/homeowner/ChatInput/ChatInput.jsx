import { useState } from "react";

const ChatInput = ({ onSendMessage }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    onSendMessage(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-transparent px-4 py-3">
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
            border border-gray-200
            bg-white
            backdrop-blur-md
            px-6
            py-3.5
            text-sm
            shadow-inner
            outline-none
            transition-all
            focus:border-[#12376B]/30
            focus:bg-white
            focus:shadow-lg
          "
        />

        {/* Send */}
        <button
          onClick={handleSend}
          className={`
            flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300
            ${text.trim() ? 'bg-[#12376B] text-white shadow-[0_0_15px_rgba(18,55,107,0.5)] hover:scale-105 hover:bg-[#0F2F5A]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            active:scale-95
          `}
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
