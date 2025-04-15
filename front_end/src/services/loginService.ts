// src/services/authService.ts
import api from './api';
import { tokenService } from './tokenService';
import { LoginCredentials, AuthResponse, User } from './models';

export const loginService = {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await api.post<AuthResponse>('/login', credentials);
      const { token, user } = response.data;
      
      tokenService.setToken(token);
      tokenService.setUser(user);
      
      return user;
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      tokenService.clearAll();
    }
  },

  isAuthenticated(): boolean {
    return !!tokenService.getToken();
  }
};