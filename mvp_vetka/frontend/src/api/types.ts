// Типы для API
export interface ApiUser {
  id: number;
  full_name: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  bio?: string;
  interests?: string;
  avatar_url?: string;
  age?: number;
  created_at: string;
}

export interface RegisterRequest {
  email: string;
  password: string;

}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LikeRequest {
  to_user_id: number;
  is_like: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    full_name: string;
    email: string;
    company?: string;
    position?: string;
  };
}

export interface FeedResponse {
  users: ApiUser[];
  page: number;
  has_more: boolean;
  total: number;
}

export interface LikeResponse {
  success: boolean;
  action: 'like' | 'dislike';
  matched: boolean;
}