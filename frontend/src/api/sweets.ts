import api from './axios';

export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSweetData {
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  imageUrl?: string;
}

export interface SearchParams {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const sweetService = {
  getAll: async (): Promise<Sweet[]> => {
    const response = await api.get('/sweets');
    return response.data;
  },

  search: async (params: SearchParams): Promise<Sweet[]> => {
    const response = await api.get('/sweets/search', { params });
    return response.data;
  },

  create: async (data: CreateSweetData): Promise<Sweet> => {
    const response = await api.post('/sweets', data);
    return response.data;
  },

  update: async (id: number, data: Partial<CreateSweetData>): Promise<Sweet> => {
    const response = await api.put(`/sweets/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/sweets/${id}`);
  },

  purchase: async (id: number, quantity: number): Promise<Sweet> => {
    const response = await api.post(`/sweets/${id}/purchase`, { quantity });
    return response.data;
  },

  restock: async (id: number, quantity: number): Promise<Sweet> => {
    const response = await api.post(`/sweets/${id}/restock`, { quantity });
    return response.data;
  }
};
