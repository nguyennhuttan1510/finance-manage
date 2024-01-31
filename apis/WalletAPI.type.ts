import {
  TransactionCategorySearchResponseType,
  TransactionSearchRequestType,
  TransactionsGroupByDate,
} from './TransactionAPI.type';
import { CategoryTransactionSearchResponseType } from './CategoryAPI.type';

export enum TypeWallet {
  'TRADING' = 1,
  'SAVING',
  'BUDGET',
}

export interface WalletResponseType {
  walletID: number;
  nameWallet: string;
  balance: number;
  status: string;
  includeTotal: boolean;
  description: string;
  type: TypeWallet;
  createDate: string;
  updatedDate: string;
  deletedDate: string;
  transactions:
    | CategoryTransactionSearchResponseType[]
    | TransactionsGroupByDate[];
  members: any[];
  startDate?: string;
  endDate?: string;
  targetAmount?: number;
  remaining?: number;
  remainingAmount?: number;
  percentCurrent?: number;
  percentTarget?: number;
}

export type AnalyzeCategory = {
  category_id: string;
  sum: number;
  name: string;
};

export type AnalyzeDays = {
  day: string;
  sum: number;
};

export type WalletGeneralInfoType = WalletResponseType & GeneralWallet;
export interface GeneralWallet {
  general: {
    startAmount: number;
    endAmount: number;
    unevenAmount: number;
    highestCost: number;
    lowestCost: number;
    highestIncome: number;
    lowestIncome: number;
    totalIncome: number;
    totalCost: number;
    startDate: string;
    endDate: string;
    categoriesIncome: AnalyzeCategory[];
    categoriesCost: AnalyzeCategory[];
    daysIncome: AnalyzeDays[];
    daysCost: AnalyzeDays[];
  };
}
export type OverviewWalletResponseType = {
  totalBalance: number;
  totalBalanceInclude: number;
  totalBalanceExclude: number;
  walletsInclude: WalletResponseType[];
  walletsExclude: WalletResponseType[];
};

export type WalletMetadata = Pick<
  WalletResponseType,
  'walletID' | 'nameWallet'
>;

export interface WalletRequestType {
  wallet_id: number;
  name: string;
  balance: number;
  status: number;
  is_include_total: boolean;
  description: string;
  type: number;
  members: number[];
  start_date?: string;
  end_date?: string;
  target?: number;
}

export type WalletCreateRequestType = Omit<
  WalletRequestType,
  'wallet_id' | 'status'
>;

export type WalletUpdateRequestType = Omit<WalletRequestType, 'status'>;
export type WalletQueryRequest = Partial<WalletRequestType> &
  Partial<TransactionSearchRequestType>;
