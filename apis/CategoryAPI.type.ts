import { TransactionCategorySearchResponseType } from './TransactionAPI.type';

export type CategoryResponseType = {
  categoryID: number;
  name: string;
  icon: string;
  type: number;
  createDate: string;
  parentID: CategoryResponseType['categoryID'];
};

export type CategoryMetadata = Pick<
  CategoryResponseType,
  'categoryID' | 'name' | 'type'
>;

export type CategoryTransactionSearchResponseType = CategoryResponseType & {
  transactions: TransactionCategorySearchResponseType[];
  total: number;
  length: number;
};

export enum CategoryType {
  'COST' = 1,
  'INCOME',
  'OTHER',
}

export type CategoryCreate = {
  name: string;
  icon: string;
  description: string;
  type: CategoryType;
  parent_id: number | null;
};
