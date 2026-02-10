export interface User {
  _id: string;
  username: string;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
  };
  error?: string;
}

export interface ApiError {
  success: false;
  error: string;
}