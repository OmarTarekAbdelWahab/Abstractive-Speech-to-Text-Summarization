import React from "react";
import { ChatMessage } from "../models/models";

const UserMessage: React.FC<{ message: ChatMessage }> = ({ message }) => {
  return (
    <div
      key={message.id}
      className={"p-3 rounded-lg shadow w-3/4 bg-white text-gray-800 self-end"}
    >
      <p>{message.text}</p>
    </div>
  );
};

export default UserMessage;
