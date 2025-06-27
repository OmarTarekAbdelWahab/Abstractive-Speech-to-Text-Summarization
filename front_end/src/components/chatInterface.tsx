import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { messagingService } from "../services/messagingService";
import { Message } from "../models/models";
import ToolTip from "./ToolTip";

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  audioId: number;
}

function ChatInterface({ messages, setMessages, audioId }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [textPrompt, setTextPrompt] = useState("");
  // const [currentEditableContent, setCurrentEditableContent] = useState("");

  const handleSendEditMessage = async (messageContent: string) => {
    let prompt = textPrompt.trim();
    if (!prompt) return "";
    setTextPrompt("");
    return await messagingService.promptEditMessage(messageContent, prompt);
  };

  const handleSaveMessage = async (messageId: number, newContent: string) => {
    const success = await messagingService.saveMessage(messageId, newContent);
    if (success) {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.messageId === messageId ? { ...msg, content: newContent } : msg
        )
      );
    }
  };

  const handleSend = () => {
    let content = input.trim();
    if (!content) return;

    setInput("");

    const newMessage: Message = {
      // id: Date.now(),
      content,
      timestamp: Date.now(),
      sender: "user",
      audioId: audioId,
      isEditable: false,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    messagingService
      .sendMessage(audioId, content, newMessage.timestamp)
      .then((response) => {
        const botMessage: Message = response;
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      });

    return;
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background text-text font-primary">
      <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-2">
        {messages.length > 0 ? (
          <>
            {messages.map((message) => (
              <div
                key={message.timestamp}
                className={`p-3 transition-all duration-200 text-text rounded-xl shadow max-w-[75%] ${
                  message.sender === "bot"
                    ? "bg-primary-light self-start"
                    : "bg-secondary self-end"
                }`}
              >
                {message.sender === "bot" ? (
                  <div className="flex flex-col space-y-2">
                    <p
                      contentEditable={message.isEditable}
                      className="border-b border-dashed border-primary-light pb-1"
                      suppressContentEditableWarning={true}
                      onInput={(e) => {
                        console.log(e.currentTarget.textContent);
                        message.content = e.currentTarget.textContent || "";
                      }}
                    >
                      {message.content}
                    </p>
                    <button
                      onClick={() => {
                        if (message.messageId !== null) {
                          handleSaveMessage(
                            message.messageId!,
                            message.content
                          );
                        }
                        setMessages((prevMessages) =>
                          prevMessages.map((msg) =>
                            msg.timestamp === message.timestamp
                              ? { ...msg, isEditable: !msg.isEditable }
                              : msg
                          )
                        );
                        setTextPrompt("");
                      }}
                      className="text-sm text-primary hover:underline self-end"
                    >
                      {message.isEditable ? "Save" : "Edit"}
                    </button>
                    {message.isEditable ? (
                      <div className="p-4 border-t border-primary-light bg-primary-light">
                        <div className="flex items-center space-x-2">
                          <textarea
                            value={textPrompt}
                            onChange={(e) => setTextPrompt(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="flex-1 p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
                            placeholder="Prompt to edit the text..."
                            rows={1}
                          />

                          <div className="">
                            <ToolTip text="edit">
                              <button
                                onClick={async () => {
                                  var newContent = await handleSendEditMessage(
                                    message.content
                                  );
                                  setMessages((prevMessages) =>
                                    prevMessages.map((msg) =>
                                      msg.timestamp === message.timestamp
                                        ? { ...msg, content: newContent }
                                        : msg
                                    )
                                  );
                                  setTextPrompt("");
                                }}
                                className="p-2 w-full flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark"
                              >
                                <FaPaperPlane />
                              </button>
                            </ToolTip>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-4xl text-primary/30 text-center">
              Add Instruction for how you want to summarize your audio
            </p>
          </div>
        )}
      </div>
      {/* Display audio if selected */}
      {/* {audioURL && (
        <div className="p-3 bg-background-dark flex items-center justify-between">
          <audio controls src={audioURL || ""} />
          <button
            onClick={handleDeleteAudioFile}
            className="px-3 py-1 bg-cancel text-white rounded hover:bg-red-600 ml-4"
          >
            Delete Audio
          </button>
        </div>
      )} */}

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

          <div className="">
            <ToolTip text="send">
              <button
                onClick={() => handleSend()}
                className="p-2 w-full flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark"
              >
                <FaPaperPlane />
              </button>
            </ToolTip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
