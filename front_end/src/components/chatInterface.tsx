import { useState, useRef } from "react";
import { FaMicrophone, FaLink, FaUpload, FaPaperPlane } from "react-icons/fa";
import { modelService } from "../services/modelService";

interface ChatMessage {
  id: number;
  text: string;
  timestamp: Date;
  sender: "user" | "bot";
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

function ChatInterface({ messages, setMessages }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now(),
        text: input,
        timestamp: new Date(),
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");

      // if file is not selected, send text message only
      if (!audioFile) {
        modelService.sendTextOnly(newMessage.text).then((response) => {
          console.log("Text response:", response);
          const botMessage: ChatMessage = {
            id: Date.now() + 1,
            text: response || "No response from model.",
            timestamp: new Date(),
            sender: "bot",
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        });
        return;
      }

      // if file is selected, send audio with text
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Audio = reader.result?.toString().split(",")[1]; // remove data URL prefix
        if (!base64Audio) return;

        modelService
          .sendAudioWithText(
            audioFile.name,
            audioFile.type,
            base64Audio,
            newMessage.text
          )
          .then((response) => {
            const botMessage: ChatMessage = {
              id: Date.now() + 1,
              text: response || "No response from model.",
              timestamp: new Date(),
              sender: "bot",
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
          });
      };

      reader.readAsDataURL(audioFile);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
      setAudioURL(URL.createObjectURL(file));
    }
  };

  const handleDelete = () => {
    setAudioFile(null);
    setAudioURL(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear file input
    }
  };

  const handleAudioRecord = () => {
    // Implement audio recording logic
    console.log("Recording audio...");
  };

  const handleLinkInsert = () => {
    const url = prompt("Enter URL:");
    if (url) {
      setInput((prev) => prev + " " + url);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg shadow w-3/4 ${
              message.sender === "bot"
                ? "bg-blue-100 text-blue-900 self-start"
                : "bg-white text-gray-800 self-end"
            }`}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      {/* Display audio if selected */}
      {audioFile ? (
        <div className="p-1 border shadow-md">
          <div className="flex items-center justify-center gap-10">
            <audio controls src={audioURL || ""} />
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete Audio
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
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
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

export default ChatInterface;
