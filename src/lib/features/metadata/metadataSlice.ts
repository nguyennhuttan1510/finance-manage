import { createSlice, Dispatch } from '@reduxjs/toolkit';
import MetadataAPI from '../../../../apis/MetadataAPI';
import { WalletMetadata } from '../../../../apis/WalletAPI.type';
import { CategoryResponseType } from '../../../../apis/CategoryAPI.type';
import CategoryAPI from '../../../../apis/CategoryAPI';
import { MetadataResponseType } from '../../../../apis/MetadataAPI.type';

export const metadataSlice = createSlice({
  name: 'metadata',
  initialState: {
    wallets: [] as WalletMetadata[],
    categories: [] as CategoryResponseType[],
    events: [],
    walletType: [] as MetadataResponseType['walletType'],
    categoryType: [] as MetadataResponseType['categoryType'],
  },
  reducers: {
    setWallets: (state, action) => {
      console.log('action.payload', action.payload);
      state.wallets = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setWalletType: (state, action) => {
      state.walletType = action.payload;
    },
    setCategoryType: (state, action) => {
      state.categoryType = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWallets, setCategories, setEvents, setWalletType, setCategoryType } =
  metadataSlice.actions;
export default metadataSlice.reducer;

//ACTIONS

export const getMetaDataTransactionCreate =
  () => async (dispatch: Dispatch) => {
    const res = await MetadataAPI.getMetadata({
      group: 'transaction-create',
    });
    dispatch(setCategories(res.data.data?.categories));
    dispatch(setWallets(res.data.data?.wallets));
    dispatch(setEvents(res.data.data?.events));
  };

export const getMetaDataWallet = () => async (dispatch: Dispatch) => {
  const res = await MetadataAPI.getMetadata({
    type: 'wallet',
  });
  const walletOption = res.data.data?.wallets;
  dispatch(setWallets(walletOption));
  return walletOption;
};

export const getMetaDataWalletType = () => async (dispatch: Dispatch) => {
  const res = await MetadataAPI.getMetadata({
    type: 'walletType',
  });
  dispatch(setWalletType(res.data.data?.walletType));
  return res.data;
};

export const getMetaDataCategory = () => async (dispatch: Dispatch) => {
  const res = await MetadataAPI.getMetadata({
    type: 'category',
  });
  dispatch(setCategories(res.data.data?.categories));
  return res.data;
};

export const getMetaDataCategoryType = () => async (dispatch: Dispatch) => {
  const res = await MetadataAPI.getMetadata({
    type: 'categoryType',
  });
  dispatch(setCategoryType(res.data.data?.categoryType));
  return res.data;
};

export const getCategoryByID = (id: number) => async () => {
  const res = await CategoryAPI.findOne(id);
  return res.data;
};
