import React from "react";
import { ChatMessage } from "../models/models";
import { FaPen } from "react-icons/fa";

const BotMessage: React.FC<{ message: ChatMessage }> = ({ message }) => {
  return (
    <div
      key={message.id}
      className={
        "p-3 rounded-lg shadow w-3/4 bg-blue-100 text-blue-900 self-start"
      }
    >
      <p contentEditable="true">{message.text}</p>
      <button
        onClick={() => {
          const newText = prompt("Edit message:", message.text);
          //   if (newText !== null) {
          //     setMessages((prevMessages) =>
          //       prevMessages.map((msg) =>
          //         msg.id === message.id ? { ...msg, text: newText } : msg
          //       )
          //     );
          //   }
        }}
        className="mt-2 p-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        <FaPen />
      </button>
    </div>
  );
};

export default BotMessage;
