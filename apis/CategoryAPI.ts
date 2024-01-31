import { http } from '@/services/http';
import { ResponseAPI } from './config/tranformer';
import { CategoryCreate, CategoryResponseType } from './CategoryAPI.type';

const CategoryAPI = {
  findOne: async (
    id: number,
  ): Promise<ResponseAPI<Partial<CategoryResponseType>>> => {
    return await http.get(`/category/${id}`);
  },

  create: async (
    category: CategoryCreate,
  ): Promise<ResponseAPI<CategoryResponseType>> => {
    return await http.post('/category', category);
  },

  delete: async (id: number): Promise<ResponseAPI<any>> => {
    return await http.delete(`/category/${id}`);
  },
};

export default CategoryAPI;
