import { Action, createSlice, Dispatch } from '@reduxjs/toolkit';
import { WalletAPI } from '../../../../apis/WalletAPI';
import {
  OverviewWalletResponseType,
  WalletGeneralInfoType,
  WalletQueryRequest,
} from '../../../../apis/WalletAPI.type';
import queryString from 'query-string';
import { getMetaDataWallet } from '@/lib/features/metadata/metadataSlice';

type InitialWalletType = {
  overview: null | OverviewWalletResponseType;
  walletCurrent: WalletGeneralInfoType;
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    overview: null,
    walletCurrent: {},
  } as InitialWalletType,
  reducers: {
    setOverviewWallet: (state, action) => {
      state.overview = action.payload;
    },
    setWalletCurrent: (state, action) => {
      state.walletCurrent = { ...state.walletCurrent, ...action.payload };
    },
    setAnalyzeWalletCurrent: (state, action) => {
      state.walletCurrent = { ...state.walletCurrent, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOverviewWallet, setWalletCurrent, setAnalyzeWalletCurrent } =
  walletSlice.actions;

export default walletSlice.reducer;

//ACTIONS

export const getOverviewWallets = () => async (dispatch: Dispatch) => {
  const res = await WalletAPI.overviewWallets();
  dispatch(setOverviewWallet(res.data));
};

export const getWalletCurrent =
  (id: number, query?: any) => async (dispatch: Dispatch) => {
    const res = await WalletAPI.findOne(id, query);
    dispatch(setWalletCurrent(res.data.data));
  };

export const getAnalyzeWalletCurrent =
  (id: number, query?: Partial<WalletQueryRequest>) => async (dispatch: Dispatch) => {
    const res = await WalletAPI.analyzeWallet(id, query);
    dispatch(setAnalyzeWalletCurrent(res.data.data));
  };

export const deleteWallet = (id?: number | null) => async (dispatch: any) => {
  if (!id) throw new Error('not found id');
  const res = await WalletAPI.delete(id);
  dispatch(getOverviewWallets());
  const walletOption = await dispatch(getMetaDataWallet());
  if (walletOption?.[0]?.walletID) {
    dispatch(getWalletCurrent(walletOption[0].walletID));
  }
  return res;
};
