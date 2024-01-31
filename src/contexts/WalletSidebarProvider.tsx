'use client';
import React, { createContext, useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/hook';
import {
  deleteWallet,
  getOverviewWallets,
  getWalletCurrent,
} from '@/lib/features/wallet/walletSlice';
import { WalletResponseType } from '../../apis/WalletAPI.type';
import { getMetaDataWallet } from '@/lib/features/metadata/metadataSlice';

export type LocalStateType = {
  openWalletsSideBar: boolean;
  openCreateEditWalletModal: boolean;
  openWalletIconModal: boolean;
  openContextMenu: boolean;
  openConfirmDelete: boolean;
  walletSelected: WalletResponseType | undefined;
};

export type ActionWallet = {
  onToggleCreateEditWalletModal: () => void;
  onToggleWalletSidebar: () => void;
  onToggleWalletIconModal: () => void;
  onToggleContextMenu: () => void;
  onToggleConfirmDeleteWallet: () => void;
  onTriggerOverviewWallet: () => void;
  onChangeWalletCurrent: (walletID: WalletResponseType['walletID']) => void;
  onToggleWalletForm: () => void;
  onSetWalletSelected: (wallet?: WalletResponseType) => void;
  onDeleteWallet: () => void;
  onOpenContextAndSelected: (wallet: WalletResponseType) => void;
  onCreateWallet: () => void;
};

export type VariableWallet = {
  modeWalletForm: 'create' | 'edit';
};

export type SidebarWalletContextType = {
  state: LocalStateType;
  action: ActionWallet;
  variable: VariableWallet;
};

export const SidebarWalletContext = createContext<SidebarWalletContextType>(
  {} as SidebarWalletContextType,
);

const WalletSidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<LocalStateType>({
    openWalletsSideBar: false,
    openCreateEditWalletModal: false,
    openWalletIconModal: false,
    openContextMenu: false,
    openConfirmDelete: false,
    walletSelected: undefined,
  });
  const dispatch = useAppDispatch();

  const onToggleCreateEditWalletModal = () => {
    setState((prevState) => ({
      ...prevState,
      openCreateEditWalletModal: !prevState.openCreateEditWalletModal,
    }));
  };

  const onToggleWalletSidebar = () => {
    setState((prevState) => ({
      ...prevState,
      openWalletsSideBar: !prevState.openWalletsSideBar,
    }));
  };

  const onToggleWalletIconModal = () => {
    setState((prevState) => ({
      ...prevState,
      openWalletIconModal: !prevState.openWalletIconModal,
    }));
  };

  const onToggleContextMenu = () => {
    setState((prevState) => ({
      ...prevState,
      openContextMenu: !prevState.openContextMenu,
    }));
  };

  const onToggleConfirmDeleteWallet = () => {
    setState((prevState) => ({
      ...prevState,
      openConfirmDelete: !prevState.openConfirmDelete,
    }));
  };

  const onTriggerOverviewWallet = async () => {
    await dispatch(getOverviewWallets());
    onToggleWalletSidebar();
  };

  const onChangeWalletCurrent: SidebarWalletContextType['action']['onChangeWalletCurrent'] =
    (walletID) => {
      // onToggleWalletSidebar();
      dispatch(getWalletCurrent(walletID));
    };

  const onToggleWalletForm = () => {
    onToggleCreateEditWalletModal();
  };

  const onSetWalletSelected: ActionWallet['onSetWalletSelected'] = (wallet) => {
    setState((prevState) => ({ ...prevState, walletSelected: wallet }));
  };

  const onDeleteWallet = async () => {
    await dispatch(deleteWallet(state.walletSelected?.walletID));
    onToggleConfirmDeleteWallet();
  };

  const onOpenContextAndSelected: ActionWallet['onOpenContextAndSelected'] = (
    wallet,
  ) => {
    onToggleContextMenu();
    onSetWalletSelected(wallet);
  };

  const onCreateWallet: ActionWallet['onCreateWallet'] = () => {
    onToggleWalletForm();
    onSetWalletSelected();
  };

  const modeWalletForm: VariableWallet['modeWalletForm'] = state.walletSelected
    ? 'edit'
    : 'create';

  const action: ActionWallet = {
    onToggleCreateEditWalletModal,
    onToggleWalletSidebar,
    onToggleWalletIconModal,
    onToggleContextMenu,
    onToggleConfirmDeleteWallet,
    onTriggerOverviewWallet,
    onChangeWalletCurrent,
    onToggleWalletForm,
    onSetWalletSelected,
    onDeleteWallet,
    onOpenContextAndSelected,
    onCreateWallet,
  };
  const variable = {
    modeWalletForm,
  };

  useEffect(() => {
    const fetchInit = async () => {
      const walletOption = await dispatch(getMetaDataWallet());
      if (walletOption?.[0]?.walletID) {
        dispatch(getWalletCurrent(walletOption[0].walletID));
      }
    };
    fetchInit();
  }, []);

  return (
    <SidebarWalletContext.Provider value={{ state, action, variable }}>
      {children}
    </SidebarWalletContext.Provider>
  );
};

export default WalletSidebarProvider;
