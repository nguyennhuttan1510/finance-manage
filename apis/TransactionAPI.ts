import {
  TransactionCreateResponseType,
  TransactionCreateRequestType,
  TransactionResponseType,
  TransactionSearchRequestType,
  TransactionType,
  TransactionUpdateRequestType,
  TransactionCategorySearchResponseType,
} from './TransactionAPI.type';
import { http } from '@/services/http';
import queryString from 'query-string';
import { ResponseAPI } from './config/tranformer';
import { CategoryTransactionSearchResponseType } from './CategoryAPI.type';

export const TransactionAPI = {
  create: async function (
    transactionFormCreate: TransactionCreateRequestType,
  ): Promise<ResponseAPI<TransactionCreateResponseType>> {
    return await http.post('/transaction', transactionFormCreate);
  },
  findOne: async function (
    transactionID: TransactionType['transactionID'],
  ): Promise<ResponseAPI<TransactionResponseType>> {
    return await http.get(`/transaction/${transactionID}`);
  },
  search: async function (
    query: Partial<TransactionSearchRequestType>,
  ): Promise<
    ResponseAPI<
      | TransactionCategorySearchResponseType[]
      | CategoryTransactionSearchResponseType[]
    >
  > {
    const stringify = queryString.stringify(query, {
      skipNull: true,
      skipEmptyString: true,
    });
    return await http.get(`/transaction${stringify ? `?${stringify}` : ''}`);
  },
  update: async function (
    transactionFormUpdate: TransactionUpdateRequestType,
  ): Promise<ResponseAPI<TransactionResponseType>> {
    return await http.patch('/transaction', transactionFormUpdate);
  },
  delete: async function (
    transactionID: TransactionType['transactionID'],
  ): Promise<ResponseAPI<TransactionResponseType>> {
    return await http.delete(`/transaction/${transactionID}`);
  },
};
