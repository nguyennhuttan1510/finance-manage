import { WalletMetadata } from './WalletAPI.type';
import { EventMetadata } from './EventAPI.type';
import { CategoryMetadata } from './CategoryAPI.type';

type MetadataType = {
  name: string;
  value: string;
  description: string;
  createdDate: string;
  type: number;
  priority: number;
};

export interface MetadataResponseType {
  wallets: WalletMetadata[];
  events: EventMetadata[];
  categories: CategoryMetadata[];
  walletType: MetadataType[];
  categoryType: MetadataType[];
}

export interface QueryMetadata {
  type: string;
  group: string;
}
