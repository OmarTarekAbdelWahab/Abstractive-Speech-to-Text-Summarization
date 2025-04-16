import { useState } from "react";

interface ChatMessage {
  id: number;
  text: string;
  timestamp: Date;
}

interface HistoryBarProps {
  messages: ChatMessage[];
}

function HistoryBar({ messages }: HistoryBarProps) {
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null
  );
  return (
    <div className="w-70 bg-blue-500 p-4 overflow-y-auto">
      <h2 className="text-white text-xl font-bold mb-4">Chat History</h2>
      <div className="space-y-1">
        {messages.map((message) => (
          <div
            key={message.id}
            onClick={() => {
              // Handle message click
              // need to send the id to backend and get the new chat messages
              console.log(`Clicked message: ${message.text}`);
              setSelectedMessageId(message.id);
            }}
            className={`rounded p-2 ${
              selectedMessageId === message.id
                ? "bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white cursor-pointer`}
          >
            <p className="truncate">{message.text}</p>
            <p className="text-xs">{message.timestamp.toLocaleTimeString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryBar;
