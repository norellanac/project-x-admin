export interface User {
  id: string;
  name?: string | null;
  lastname?: string | null;
  email?: string | null;
  phone?: string | null;
  firstName?: string;
  lastName?: string;
  role?: string;
  roles?: { id: number; name: string }[];
  averageRating?: number | null;
  avatarUrl?: string | null;
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
