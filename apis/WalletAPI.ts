import { ResponseAPI } from './config/tranformer';
import { http } from '@/services/http';
import {
  AnalyzeDashboard,
  GeneralWallet,
  OverviewWalletResponseType,
  WalletCreateRequestType,
  WalletGeneralInfoType,
  WalletQueryRequest,
  WalletResponseType,
  WalletUpdateRequestType,
} from './WalletAPI.type';
import queryString from 'query-string';
import { AnalyzeTransactions } from './TransactionAPI.type';

export const WalletAPI = {
  findOne: async function (
    id: number,
    queryParam?: any,
  ): Promise<ResponseAPI<WalletResponseType>> {
    const query = queryString.stringify(queryParam);
    return await http.get(`/wallet/${id}?${query}`);
  },

  analyzeWallet: async function (
    id: number,
    queryParam?: Partial<WalletQueryRequest>,
  ): Promise<ResponseAPI<WalletResponseType>> {
    const query = queryParam ? queryString.stringify(queryParam) : '';
    return await http.get(`/wallet/${id}/analyze?${query}`);
  },

  create: async function (
    wallet: WalletCreateRequestType,
  ): Promise<ResponseAPI<WalletResponseType>> {
    return await http.post('/wallet', wallet);
  },

  updateWallet: async function (
    wallet: WalletUpdateRequestType,
  ): Promise<ResponseAPI<WalletResponseType>> {
    return await http.patch(`/wallet/${wallet.wallet_id}`, wallet);
  },

  overviewWallets: async function (): Promise<
    ResponseAPI<OverviewWalletResponseType>
  > {
    return await http.get(`/wallet/overview`).then((res) => res.data);
  },

  delete: async function (id: number): Promise<ResponseAPI<any>> {
    return await http.delete(`/wallet/${id}`);
  },

  overviewAll: async (params?: {
    start_date?: string;
    end_date?: string;
  }): Promise<
    ResponseAPI<
      GeneralWallet & OverviewWalletResponseType & AnalyzeTransactions
    >
  > => {
    const stringify = params ? queryString.stringify(params) : '';
    return await http.get(`/wallet/dashboard?${stringify}`);
  },
};
