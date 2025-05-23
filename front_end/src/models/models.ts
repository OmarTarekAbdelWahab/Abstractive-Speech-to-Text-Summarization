export interface LoginCredentials {
  email: string;
  password: string;
}


export interface AuthResponse {
  token: string;
  user: {
    email: string;
    name: string;
  };
}

export interface User {
  email: string;
  name: string;
}

export interface GoogleUser {
  email: string;
  name: string;
  sub: string;
}