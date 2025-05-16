import { useState } from "react";
import ChatInterface from "../components/ChatInterface";
import HistoryBar from "../components/HistoryBar";
import AudioGrabber from "../components/AudioGrabber";

interface ChatMessage {
  id: number;
  text: string;
  timestamp: Date;
  sender: "user" | "bot";
}

function Dashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const handleFileUpload = (newFile: File, newAudioURL: string) => {
    setAudioFile(newFile);
    setAudioURL(newAudioURL);
  };
  
  return (
    <>
      {
        !audioURL?
        (
          <AudioGrabber handleGetFile={handleFileUpload}/>
        ):
        <div className="flex h-full bg-gray-200">
          <HistoryBar messages={messages} />
          <div className="flex flex-col flex-1">
            <ChatInterface messages={messages} setMessages={setMessages} audioFile={audioFile!} audioURL={audioURL!} />
          </div>
          
        </div>
      }
    </>
  );
}

export default Dashboard;
