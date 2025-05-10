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
    <div className="flex h-screen bg-gray-200">
      <HistoryBar messages={messages} />
      <ChatInterface messages={messages} setMessages={setMessages} />
    </div>
  );
}

export default Dashboard;
