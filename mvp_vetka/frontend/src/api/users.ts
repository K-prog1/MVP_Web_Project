import apiClient from './client';

export interface ApiUser {
  id: number;
  full_name: string;
  email?: string;
  company?: string;
  position?: string;
  interests?: string;
  bio?: string;
  avatar_url?: string;
  age?: number;
  created_at: string;
}

export const usersAPI = {
  getFeed: (page: number = 1, limit: number = 10) => 
    apiClient.get('/users/feed', { 
      params: { page, limit } 
    }),
    
  likeUser: (userId: number) => 
    apiClient.post('/likes', { 
      to_user_id: userId, 
      is_like: true 
    }),
    
  dislikeUser: (userId: number) => 
    apiClient.post('/likes', { 
      to_user_id: userId, 
      is_like: false 
    }),
    
  getMyLikes: () => 
    apiClient.get('/likes/my-likes'),
};