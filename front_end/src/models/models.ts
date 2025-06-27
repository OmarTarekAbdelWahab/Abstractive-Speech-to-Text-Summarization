export interface LoginCredentials {
  email: string;
  password: string;
};

export interface RegisterCredentials extends LoginCredentials {
  username: string;
};

export interface AuthResponse {
  token: string;
  user: User;
};

export interface User {
  email: string;
  username: string;
  createdAt: string;
};

export interface GoogleUser {
  email: string;
  name: string;
  sub: string;
};

export interface Message {
  content: string;
  timestamp: number;
  sender: "user" | "bot";
  audioId: number;
  isEditable: boolean;
  messageId?: number;
};

export interface ChatPreview {
  audioId: number;
  title: string;
  createdAt: number;
}