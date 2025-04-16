import { useState, useRef } from "react";
import { FaMicrophone, FaLink, FaUpload, FaPaperPlane } from "react-icons/fa";

interface ChatMessage {
  id: number;
  text: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

function ChatInterface({ messages, setMessages }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now(),
        text: input,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAudioRecord = () => {
    // Implement audio recording logic
    console.log("Recording audio...");
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleLinkInsert = () => {
    const url = prompt("Enter URL:");
    if (url) {
      setInput((prev) => prev + " " + url);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="mb-4 p-3 rounded-lg bg-white shadow">
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Type a message..."
            rows={1}
          />
          <button
            onClick={handleAudioRecord}
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
          >
            <FaMicrophone />
          </button>
          <button
            onClick={handleFileUpload}
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
          >
            <FaUpload />
          </button>
          <button
            onClick={handleLinkInsert}
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
          >
            <FaLink />
          </button>
          <button
            onClick={handleSend}
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
          >
            <FaPaperPlane />
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="audio/*"
          onChange={(e) => {
            // Handle file upload
            console.log("File selected:", e.target.files?.[0]);
          }}
        />
      </div>
    </div>
  );
}

export default ChatInterface;
