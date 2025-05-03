import api from '../utility/api';
import { tokenService } from '../utility/tokenHandler';
import { LoginCredentials, AuthResponse, User } from '../models/models';

export const loginService = {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await api.post<AuthResponse>('/user/login', credentials);
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