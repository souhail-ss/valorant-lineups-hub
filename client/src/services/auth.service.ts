import axios from 'axios';
import { SignUpData, SignInData, AuthResponse } from '../types/auth.types';

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
};