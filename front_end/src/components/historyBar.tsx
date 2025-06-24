import { ChatPreview } from "../models/models";

interface HistoryBarProps {
  chats: ChatPreview[];
  selectedAudioId: number;
  selectAudio: (audioId: number) => void;
}


function HistoryBar({ chats, selectedAudioId, selectAudio }: HistoryBarProps) {
  console.log(chats);
  
  return (
    <div className="w-72 bg-background p-4 overflow-y-auto border-r border-primary-light">
      <h2 className="text-text text-2xl font-bold mb-4 font-title">
        Chat History
      </h2>
      <div className="space-y-2">
        {chats.map((chat) => (
          <div
            key={chat.audioId}
            onClick={() => {
              // TODO: send id to backend and fetch new chat
              console.log(`Clicked chat: ${chat.title}`);
              selectAudio(chat.audioId);
            }}
            className={`rounded-lg p-3 transition-all duration-200 cursor-pointer shadow-sm font-primary ${
              selectedAudioId === chat.audioId
                ? "bg-secondary text-text font-semibold shadow-lg"
                : "bg-background-dark hover:bg-secondary hover:shadow-md"
            }`}
          >
            <p className="truncate">{chat.title}</p>
            <p className="text-xs text-text/60">
              {new Date(chat.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryBar;
