import { useState } from "react";
import ChatInterface from "../components/chatInterface";
import HistoryBar from "../components/historyBar";

interface ChatMessage {
  id: number;
  text: string;
  timestamp: Date;
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
