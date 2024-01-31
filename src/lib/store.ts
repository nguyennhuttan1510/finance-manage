import { configureStore } from '@reduxjs/toolkit';
import metadata from './features/metadata/metadataSlice';
import transaction from './features/transaction/transactionSlice';
import wallet from './features/wallet/walletSlice';
export const makeStore = () => {
  return configureStore({
    reducer: {
      metadata: metadata,
      transaction: transaction,
      wallet: wallet,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
