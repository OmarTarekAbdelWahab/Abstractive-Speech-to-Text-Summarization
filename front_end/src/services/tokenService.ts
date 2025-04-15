import { User } from './models';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const tokenService = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  getUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  setUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser(): void {
    localStorage.removeItem(USER_KEY);
  },

  clearAll(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};