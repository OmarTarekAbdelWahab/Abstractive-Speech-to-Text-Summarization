import { useState } from "react";
import ChatInterface from "../components/ChatInterface";
import HistoryBar from "../components/HistoryBar";

interface ChatMessage {
  id: number;
  text: string;
  timestamp: Date;
  sender: "user" | "bot";
}

function Dashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  return (
    <div className="flex h-full bg-gray-200">
      <HistoryBar messages={messages} />
      <div className="flex flex-col flex-1">
        <ChatInterface messages={messages} setMessages={setMessages} />
      </div>
      
    </div>
  );
}

export default Dashboard;
