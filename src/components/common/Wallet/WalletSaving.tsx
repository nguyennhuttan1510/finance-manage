import React from 'react';
import { Box, LinearProgress } from '@mui/material';
import { WalletRouterPropsType } from '@/components/common/Wallet/WalletRouter';
import Icon from '@/components/common/Icon';
import { IoFastFoodOutline } from 'react-icons/io5';
import Utils from '@/utils';

type WalletSavingPropsType = WalletRouterPropsType &
  JSX.IntrinsicElements['div'];

const WalletSaving = (props: WalletSavingPropsType) => {
  const { wallet, onOpenWallets } = props;
  if (!wallet) return <>Not Found Wallet</>;
  return (
    <Box className="mx-auto py-6" sx={{ width: '50%' }}>
      <Box className="w-full flex justify-center mb-2">
        <div
          className="w-fit flex justify-center items-center gap-x-2 px-6 py-2 rounded bg-mode box-shadow cursor-pointer"
          onClick={onOpenWallets}
        >
          <Icon touch={true} className="p-1">
            <IoFastFoodOutline />
          </Icon>
          <div className="text-md font-medium">{wallet.nameWallet}</div>
        </div>
      </Box>
      <Box className="flex flex-col items-center mb-2">
        <div className="text-[14px] text-gray-500">Cần thêm</div>
        <div className="text-2xl font-bold">
          {Utils.Currency.format(wallet?.remainingAmount)}
        </div>
      </Box>
      <Box className="flex flex-col items-center mb-2">
        <div className="text-lg font-bold">{`Còn ${wallet?.remaining || 0} ngày`}</div>
      </Box>
      <Box className="flex justify-between mb-2">
        <div>
          <div className="text-[14px] text-gray-500">Hiện tại</div>
          <div className="text-lg font-bold">
            {Utils.Currency.format(wallet?.balance)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[14px] text-gray-500">Mục tiêu</div>
          <div className="text-lg font-bold">
            {Utils.Currency.format(wallet?.targetAmount)}
          </div>
        </div>
      </Box>
      <Box>
        <LinearProgress
          className="flex-1"
          variant="buffer"
          value={wallet?.percentCurrent}
          valueBuffer={wallet?.percentTarget}
          classes={{
            bar1Buffer: 'bg-primary',
            bar2Buffer: 'bg-light',
          }}
        />
      </Box>
    </Box>
  );
};

export default WalletSaving;
