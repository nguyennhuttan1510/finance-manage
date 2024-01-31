import React from 'react';
import WalletBase from '@/components/common/Wallet/WalletBase';
import Icon from '@/components/common/Icon';
import { IoFastFoodOutline } from 'react-icons/io5';
import { Box, LinearProgress } from '@mui/material';
import { WalletRouterPropsType } from '@/components/common/Wallet/WalletRouter';

type WalletBudgetPropsType = WalletRouterPropsType &
  JSX.IntrinsicElements['div'];

const WalletBudget = (props: WalletBudgetPropsType) => {
  return (
    <WalletBase>
      <Box className="w-1/2 mx-auto py-6">
        <Box className="flex flex-col items-center  gap-4 mb-2">
          <div className="w-fit flex box-shadow justify-center items-center gap-x-2 px-6 py-2 rounded bg-mode">
            <Icon touch={true} className="p-1">
              <IoFastFoodOutline />
            </Icon>
            <div className="text-lg font-medium">Travel</div>
          </div>
          <div className="w-fit flex box-shadow justify-center items-center gap-x-2 px-6 py-2 rounded bg-mode">
            <Icon touch={true} className="p-1">
              <IoFastFoodOutline />
            </Icon>
            <div className="text-lg font-medium">Main Wallet</div>
          </div>
        </Box>
        <Box className="flex flex-col items-center mb-2">
          <div className="text-[14px] text-gray-500">Mục tiêu</div>
          <div className="text-2xl font-bold">5.000.000</div>
        </Box>
        <Box className="flex flex-col items-center mb-2">
          <div className="text-lg font-bold">Còn 5 ngày</div>
        </Box>
        <Box className="flex justify-between mb-2">
          <div>
            <div className="text-[14px] text-gray-500">Đã chi</div>
            <div className="text-lg font-bold">2.000.000</div>
          </div>
          <div className="text-lg text-right">
            <div className="text-[14px] text-gray-500">Còn lại</div>
            <div className="text-lg font-bold">3.000.000</div>
          </div>
        </Box>
        <Box>
          <LinearProgress
            className="flex-1"
            variant="buffer"
            value={50}
            valueBuffer={60}
            classes={{
              bar1Buffer: 'bg-primary',
              bar2Buffer: 'bg-light',
            }}
          />
        </Box>
      </Box>
    </WalletBase>
  );
};

export default WalletBudget;
