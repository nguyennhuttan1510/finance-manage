import { http } from '@/services/http';
import { ResponseAPI } from './config/tranformer';
import { MetadataResponseType, QueryMetadata } from './MetadataAPI.type';
import queryString from 'query-string';

const MetadataAPI = {
  getMetadata: async (
    query: Partial<QueryMetadata>,
  ): Promise<ResponseAPI<Partial<MetadataResponseType>>> => {
    const stringify = queryString.stringify(query);
    return await http.get(`/metadata?${stringify}`);
  },
};

export default MetadataAPI;
