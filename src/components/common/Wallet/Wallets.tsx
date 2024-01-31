import React from 'react';
import Icon from '@/components/common/Icon';
import { FaWallet } from 'react-icons/fa6';
import Button from '@/components/button';
import {
  OverviewWalletResponseType,
  WalletResponseType,
} from '../../../../apis/WalletAPI.type';
import Utils from '@/utils';
import { ActionWallet } from '@/contexts/WalletSidebarProvider';

interface WalletsPropsType
  extends Pick<
    ActionWallet,
    'onChangeWalletCurrent' | 'onCreateWallet' | 'onOpenContextAndSelected'
  > {
  wallets: OverviewWalletResponseType | null;
}

const Wallets = (props: WalletsPropsType) => {
  const {
    wallets,
    onCreateWallet,
    onChangeWalletCurrent,
    onOpenContextAndSelected,
  } = props;

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col gap-y-6 text-black overflow-y-auto">
        <div className="flex flex-col gap-y-4">
          <div className="px-4 py-1 flex justify-between text-[14px] font-medium">
            <div>Total</div>
            <div>{Utils.Currency.format(wallets?.totalBalance)}</div>
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-y-4">
          <div className="px-4 py-2 flex justify-between">
            <div>Include total</div>
            <div>{Utils.Currency.format(wallets?.totalBalanceInclude)}</div>
          </div>
          {wallets &&
            Array.isArray(wallets.walletsInclude) &&
            wallets.walletsInclude.map((wallet) => (
              <WalletOverviewItem
                key={wallet.walletID}
                wallet={wallet}
                onOpenContextAndSelected={onOpenContextAndSelected}
                onChangeWalletCurrent={onChangeWalletCurrent}
              />
            ))}
        </div>
        <hr />
        <div className="flex flex-col gap-y-4">
          <div className="px-4 py-2 flex justify-between">
            <div>Exclude total</div>
            <div>{Utils.Currency.format(wallets?.totalBalanceExclude)}</div>
          </div>
          {wallets &&
            Array.isArray(wallets.walletsExclude) &&
            wallets.walletsExclude.map((wallet) => (
              <WalletOverviewItem
                key={wallet.walletID}
                wallet={wallet}
                onOpenContextAndSelected={onOpenContextAndSelected}
                onChangeWalletCurrent={onChangeWalletCurrent}
              />
            ))}
        </div>
      </div>
      <div className="mt-auto pt-4">
        <Button onClick={onCreateWallet}>Create wallet</Button>
      </div>
    </div>
  );
};

export default Wallets;

const WalletOverviewItem = ({
  wallet,
  onOpenContextAndSelected,
  onChangeWalletCurrent,
}: Omit<WalletsPropsType, 'wallets' | 'onCreateWallet'> & {
  wallet: WalletResponseType;
}) => {
  return (
    <div
      className="px-4 py-2 flex justify-between items-center cursor-pointer rounded-xl bg-light noselect"
      onDoubleClick={() => {
        onOpenContextAndSelected(wallet);
      }}
      onClick={() => {
        onChangeWalletCurrent(wallet.walletID);
      }}
    >
      <div className="flex items-center">
        <Icon className="p-2 mr-2" touch>
          <FaWallet className="text-sm" />
        </Icon>
        <div className="text-[12px] capitalize">{wallet.nameWallet}</div>
      </div>
      <div>{Utils.Currency.format(wallet.balance)}</div>
    </div>
  );
};
