import api from './api';
import { storageHandler } from './storageHandler';
import { LoginCredentials, AuthResponse, User, RegisterCredentials } from '../models/models';

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await api.post<AuthResponse>('/user/login', credentials);
    const { token, user } = response.data;
    
    storageHandler.setTokenInStorage(token);
    storageHandler.setUserInStorage(user);
    
    return user;
  },
  async register(credentials: RegisterCredentials): Promise<User> {
    const response = await api.post<AuthResponse>("user/register", credentials);
    const { token, user } = response.data;
    
    storageHandler.setTokenInStorage(token);
    storageHandler.setUserInStorage(user);

    return user;
  },
  async googleLogAuth(idToken: string): Promise<User> {
    const response = await api.post<AuthResponse>("/auth/google", {
      credential: idToken,
    });

    const data = response.data;
    const { token, user } = data;

    storageHandler.setTokenInStorage(token);
    storageHandler.setUserInStorage(user);
    return user;
    
  },

  async logout(): Promise<void> {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      storageHandler.clearAllFromStorage();  
    }
  },
};