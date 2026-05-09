export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductService {
  id: string | number;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  categoryId?: string | number;
  createdAt?: string;
  updatedAt?: string;
}
