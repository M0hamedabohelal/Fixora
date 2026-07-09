import { useEffect, useRef } from "react";
import MessageBubble from "../MessageBubble/MessageBubble";

const ChatMessages = ({ messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#12376B]/10">
            <i className="fa-regular fa-comments text-3xl text-[#12376B]"></i>
          </div>

          <h3 className="text-lg font-semibold text-gray-800">
            No messages yet
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Start the conversation with the service provider.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-4 p-5"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px,#e5e7eb 1px,transparent 0)",
        backgroundSize: "24px 24px",
      }}
    >
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
