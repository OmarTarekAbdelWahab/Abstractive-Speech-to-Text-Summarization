import { useEffect, useState } from "react";
import ChatInterface from "../components/ChatInterface";
import HistoryBar from "../components/HistoryBar";
import AudioGrabber from "../components/AudioGrabber";
import { ChatPreview, Message } from "../models/models";
import { messagingService } from "../services/messagingService";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [audioId, setAudioId] = useState<number>(0);
  const [chatHistory, setChatHistory] = useState<ChatPreview[]>([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dontUpload = params.get("dontUpload") === "true";

  useEffect(() => {
    updateChatHistory();
  }, []);


  const handleFileUpload = (newFile: File) => {
    // send to backend and grab id
    const reader = new FileReader();
    
    reader.onloadend = async () => {
      const base64Audio = reader.result?.toString().split(",")[1]; // remove data URL prefix
      if (!base64Audio) return;
      
      messagingService
      .uploadAudio(
        newFile.name,
        newFile.type,
        base64Audio,
      )
      .then((response) => {
          setAudioId(response);
          updateChatHistory();
          setMessages([]);
          
          console.log("Response from model:", response);
        });
    }

    reader.readAsDataURL(newFile);
  };

  const selectAudio = (audioId: number) => {
    setAudioId(audioId);

    messagingService.getMessages(audioId).then((chatMessages) => {
      console.log(chatMessages);
      setMessages(chatMessages);
    });
  };

  const updateChatHistory = () => {
    messagingService.getUserChatHistory().then((history) => {
      console.log("Got:", history);

      setChatHistory(history);

      if (dontUpload) {
        selectAudio(history[0].audioId);
      }
    });
  };
  
  return (
    <>
      {
        !audioId && !dontUpload?
        (
          <AudioGrabber handleGetFile={handleFileUpload}/>
        ):
        <div className="flex h-full bg-gray-200">
          {chatHistory.length > 0 && <HistoryBar 
          chats={chatHistory} selectAudio={selectAudio} selectedAudioId={audioId} />}
          <div className="flex flex-col flex-1">
            <ChatInterface messages={messages} setMessages={setMessages} audioId={audioId!} />
          </div>
          
        </div>
      }
    </>
  );
}

export default Dashboard;
