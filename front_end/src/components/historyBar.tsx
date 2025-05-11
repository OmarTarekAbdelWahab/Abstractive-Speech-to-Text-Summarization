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
    <div className="w-72 bg-background p-4 overflow-y-auto border-r border-primary-light">
      <h2 className="text-text text-2xl font-bold mb-4 font-title">
        Chat History
      </h2>
      <div className="space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            onClick={() => {
              // TODO: send id to backend and fetch new chat
              console.log(`Clicked message: ${message.text}`);
              setSelectedMessageId(message.id);
            }}
            className={`rounded-lg p-3 transition-all duration-200 cursor-pointer shadow-sm font-primary ${
              selectedMessageId === message.id
                ? "bg-secondary text-text font-semibold shadow-lg"
                : "bg-background-dark hover:bg-secondary hover:shadow-md"
            }`}
          >
            <p className="truncate">{message.text}</p>
            <p className="text-xs text-text/60">
              {message.timestamp.toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryBar;
