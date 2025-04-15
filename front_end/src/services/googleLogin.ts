// src/services/authService.ts
import { jwtDecode } from 'jwt-decode';
import { GoogleUser, AuthResponse } from './models';
import api from './api';

export const authService = {
  async googleLogin(credential: string): Promise<AuthResponse> {
    try {
      const decodedUser: GoogleUser = jwtDecode(credential);

      // need correct endpoint
      const response = await api.post<AuthResponse>('/auth/google', {
        credential,
        userData: {
          email: decodedUser.email,
          name: decodedUser.name,
          googleId: decodedUser.sub
        }
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      console.error('Google login error:', error);
      throw new Error('Failed to login with Google');
    }
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};