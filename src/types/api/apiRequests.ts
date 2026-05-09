export interface LoginValues {
  email: string;
  password: string;
}

export interface UpdateUserPayload {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  avatarUrl?: string;
}
