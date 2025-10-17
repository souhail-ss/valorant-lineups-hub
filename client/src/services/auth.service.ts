import axios from 'axios';
import { SignUpData, SignInData, AuthResponse, User } from '../types/auth.types';

const API_URL = 'http://localhost:3000/auth';

export const authService = {
  signUp: async (data: SignUpData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/signup`, data);
    return response.data;
  },

  signIn: async (data: SignInData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/signin`, data);
    return response.data;
  },
    getCurrentUser: (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  signOut: (): void => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
};