import { useState, useRef } from "react";
import { FaMicrophone, FaLink, FaUpload, FaPaperPlane } from "react-icons/fa";
import { modelService } from "../services/modelService";
import AudioRecorder from "./AudioRecorder";
import ToolTip from "./ToolTip";

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
  const [showRecordPopup, setShowRecordPopup] = useState(false);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    
    const newMessage: ChatMessage = {
      id: Date.now(),
      text,
      timestamp: new Date(),
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // if file is not selected, send text message only
    if (!audioFile) {
      modelService.sendTextOnly(newMessage.text).then((response) => {
        console.log("Text response:", response);
        const botMessage: ChatMessage = {
          id: Date.now() + 1,
          text: response,
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
            text: response,
            timestamp: new Date(),
            sender: "bot",
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        });
    };

    reader.readAsDataURL(audioFile);
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

  const handleDeleteAudioFile = () => {
    setAudioFile(null);
    setAudioURL(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAudioRecord = (recordedFile: Blob, recordedUrl: string) => {
    // Implement audio recording logic
    const fileFromBlob = new File([recordedFile], "recorded_audio.wav", {
      type: "audio/wav",
    });
    setAudioFile(fileFromBlob);
    setAudioURL(recordedUrl);
    setShowRecordPopup(false);
  };

  const handleLinkInsert = () => {
    const url = prompt("Enter URL:");
    if (url) {
      setInput((prev) => prev + " " + url);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background text-text font-primary">
      <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 transition-all duration-200 text-text rounded-xl shadow max-w-[75%] ${
              message.sender === "bot"
                ? "bg-primary-light self-start"
                : "bg-secondary self-end"
            }`}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      {/* Display audio if selected */}
      {audioURL && (
        <div className="p-3 bg-background-dark flex items-center justify-between">
          <audio controls src={audioURL || ""} />
          <button
            onClick={handleDeleteAudioFile}
            className="px-3 py-1 bg-cancel text-white rounded hover:bg-red-600 ml-4"
          >
            Delete Audio
          </button>
        </div>
      )}

      <div className="p-4 border-t border-primary-light bg-background">
        <div className="flex items-center space-x-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
            placeholder="Type a message..."
            rows={1}
          />
          <ToolTip text="record">
            <button
              onClick={() => setShowRecordPopup(true)}
              className="p-2 rounded-full bg-secondary text-text hover:bg-secondary/80"
            >
              <FaMicrophone />
            </button>
          </ToolTip>

          {showRecordPopup && (
            <div className="fixed inset-0 bg-black/30 w-full backdrop-blur-sm flex items-center justify-center z-40">
              <div className="text-text bg-background rounded-xl shadow-xl p-6 relative w-1/2 h-1/2 max-w-xl">
                <button
                  onClick={() => setShowRecordPopup(false)}
                  className="absolute top-2 right-2 text-gray-600 hover:text-cancel text-2xl font-bold"
                  aria-label="Close"
                >
                  &times;
                </button>
                <AudioRecorder onSave={handleAudioRecord} />
              </div>
            </div>
          )}

          <ToolTip text="upload">
            <button
              onClick={handleFileUpload}
              className="p-2 rounded-full bg-secondary text-text hover:bg-secondary/80"
            >
              <FaUpload />
            </button>
          </ToolTip>

          <ToolTip text="insert link">
            <button
              onClick={handleLinkInsert}
              className="p-2 rounded-full bg-secondary text-text hover:bg-secondary/80"
            >
              <FaLink />
            </button>
          </ToolTip>

          <ToolTip text="send">
            <button
              onClick={handleSend}
              className="p-2 rounded-full bg-primary text-white hover:bg-primary-dark"
            >
              <FaPaperPlane />
            </button>
          </ToolTip>
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