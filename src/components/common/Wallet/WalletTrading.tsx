'use client';
import React from 'react';
import Icon from '@/components/common/Icon';
import { IoFastFoodOutline } from 'react-icons/io5';
import WalletBase from '@/components/common/Wallet/WalletBase';
import Utils from '@/utils';
import { WalletRouterPropsType } from '@/components/common/Wallet/WalletRouter';

export type WalletTradingPropsType = WalletRouterPropsType &
  JSX.IntrinsicElements['div'];

const WalletTrading = (props: WalletTradingPropsType) => {
  const { wallet, onOpenWallets } = props;
  if (!wallet) return <>Not Found Wallet</>;
  return (
    <WalletBase>
      <div className="text-lg text-mode">Balance</div>
      <div className="text-2xl text-mode font-bold">
        {Utils.Currency.format(wallet.balance)}
      </div>
      <div
        className="w-fit flex justify-center items-center gap-x-2 px-6 py-2 rounded bg-mode box-shadow cursor-pointer"
        onClick={onOpenWallets}
      >
        <Icon touch={true} className="p-1">
          <IoFastFoodOutline />
        </Icon>
        <div className="text-md font-medium">{wallet.nameWallet}</div>
      </div>
    </WalletBase>
  );
};

export default WalletTrading;
