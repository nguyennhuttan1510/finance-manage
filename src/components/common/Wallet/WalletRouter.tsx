import React, { useContext } from 'react';
import {
  TypeWallet, WalletGeneralInfoType,
  WalletResponseType
} from "../../../../apis/WalletAPI.type";
import WalletTrading from '@/components/common/Wallet/WalletTrading';
import WalletBudget from '@/components/common/Wallet/WalletBudget';
import WalletSaving from '@/components/common/Wallet/WalletSaving';
import { SidebarWalletContext } from '@/contexts/WalletSidebarProvider';
import Button from '@/components/button';
import { Box } from '@mui/material';

export type WalletRouterPropsType = {
  wallet: WalletGeneralInfoType | null;
  onOpenWallets?: () => void;
};

const WalletRouter = (props: WalletRouterPropsType) => {
  const { wallet } = props;
  const { action } = useContext(SidebarWalletContext);
  if (!wallet || !wallet.walletID) {
    return (
      <Box className="flex justify-end">
        <Button onClick={action.onTriggerOverviewWallet}>Create Wallet</Button>
      </Box>
    );
  }
  const propsWallet = {
    wallet: wallet,
    onOpenWallets: action.onTriggerOverviewWallet,
  };
  switch (Number(wallet.type)) {
    case TypeWallet.TRADING:
      return <WalletTrading {...propsWallet} />;
    case TypeWallet.BUDGET:
      return <WalletBudget {...propsWallet} />;
    case TypeWallet.SAVING:
      return <WalletSaving {...propsWallet} />;
    default:
      return <></>;
  }
};

export default WalletRouter;
