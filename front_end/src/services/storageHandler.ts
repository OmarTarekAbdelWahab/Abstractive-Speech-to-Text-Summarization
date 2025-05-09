import { User } from '../models/models';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const storageHandler = {
  getTokenFromStorage(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setTokenInStorage(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeTokenFromStorage(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  getUserFromStorage(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  setUserInStorage(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUserFromStorage(): void {
    localStorage.removeItem(USER_KEY);
  },

  clearAllFromStorage(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};