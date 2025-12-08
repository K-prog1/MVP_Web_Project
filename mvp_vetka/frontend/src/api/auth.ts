import apiClient from './client';

export interface RegisterData {
  full_name: string;
  email: string;
  password: string;
  company?: string;
  position?: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authAPI = {
  register: (data: RegisterData) => 
    apiClient.post('/auth/register', data),
    
  login: (data: LoginData) => 
    apiClient.post('/auth/login', data),
    
  getMe: () => 
    apiClient.get('/auth/me'),
    
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};