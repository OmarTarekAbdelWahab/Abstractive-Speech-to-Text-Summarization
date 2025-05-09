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