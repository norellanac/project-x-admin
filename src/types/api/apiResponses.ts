export interface ApiResponseType<T> {
  data: T;
  message?: string;
  status?: number;
}

export interface UserResponseType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  user: UserResponseType;
  token: string;
  refreshToken: string;
}

export interface CategoryType {
  id: string | number;
  name: string;
  description?: string;
  iconUrl?: string;
}
