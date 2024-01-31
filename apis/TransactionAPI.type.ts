import { CategoryResponseType, CategoryType } from './CategoryAPI.type';
import { Moment } from 'moment';

export interface TransactionRequestType {
  transaction_id: number;
  amount: number;
  created_date: number | string | Moment;
  balance_of: number;
  description: string;
}

export type TransactionCreateRequestType = Omit<
  TransactionRequestType,
  'transaction_id' | 'balance_of'
> & {
  event_id: number | undefined;
  wallet_id: number;
  category_id: number;
  category_type: CategoryType;
};
export type TransactionUpdateRequestType = TransactionCreateRequestType;

export type TransactionSearchRequestType = Omit<
  TransactionRequestType,
  'balance_of'
> &
  TransactionCreateRequestType & {
    start_date: string;
    end_date: string;
    group_by: 'category' | 'transaction' | 'day';
  };

export interface TransactionResponseType {
  transactionID: number;
  amount: number;
  balanceOf: number;
  description: string;
  createdDate: string;
  updatedDate: string;
  percent?: number;
}

export type AnalyzeTransactions = {
  transaction: {
    highestTransaction: TransactionCategorySearchResponseType[];
    latestTransaction: TransactionCategorySearchResponseType[];
  };
};

export type TransactionCreateResponseType = TransactionResponseType & {
  category: number;
  wallet: number;
  event: number;
};

export type TransactionCategorySearchResponseType = TransactionResponseType & {
  category: CategoryResponseType;
};

export interface TransactionType {
  transactionID: number;
  amount: number;
  createdDate: Moment | string;
  balanceOf: number;
  categoryID: number;
  walletID: number;
  description: string;
  eventID: number;
}

export type TransactionsGroupByDate = {
  createdDate: string;
  transactions: TransactionCategorySearchResponseType[];
  total: number;
  length: number;
};
