import api from './api';
import { ChatPreview, Message } from '../models/models';

export const messagingService = {
  async uploadAudio(title: string, type: string, audio_data: string): Promise<number> {
    const response = await api.post<any>('/user/uploadAudio', JSON.stringify({
          title,
          type,
          audio_data,
        }));
    const data = response.data as { audioId: number };
    console.log("Response from model:", data.audioId);
    return data.audioId || 0;
  },
  async sendMessage(audioId: number, content: string, timestamp: number): Promise<Message> {
    const response = await api.post<Message>('/user/addMessage', { audioId, content, timestamp });
    return response.data;
  },
  async saveMessage(messageId: number, newContent: string): Promise<boolean> {
    const response = await api.post<boolean>('/user/saveEditMessage', { messageId, newContent });
    console.log("Response from model:", response);
    return response.data;
  },
  async promptEditMessage(messageContent: string, prompt: string): Promise<string> {
    const response = await api.post<string>('/user/promptMessage', { messageContent, prompt });
    console.log("Response from model:", response);
    return response.data;
  },
  async getMessages(audioId: number): Promise<Message[]> {
    const response = await api.get<Message[]>(`/user/getMessages/${audioId}`);
    return response.data;
  },
  async getUserChatHistory(): Promise<ChatPreview[]> {
    const response = await api.get<ChatPreview[]>('/user/getChatHistory/');
    return response.data;
  },
};