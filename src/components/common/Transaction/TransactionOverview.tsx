'use client';
import React from 'react';
import './styles.scss';
import { WalletGeneralInfoType } from '../../../../apis/WalletAPI.type';
import Utils from '@/utils';

interface WalletInfoProps {
  wallet: WalletGeneralInfoType;
}

const TransactionOverview = (props: WalletInfoProps) => {
  const { wallet } = props;
  return (
    <div className="transaction-overview flex flex-wrap gap-y-2 w-full py-4">
      <div className="w-1/4 px-4 justify-between">
        <div className="max-w-sm flex gap-x-2">
          <div className="text-gray-500 w-5/12">Start amount:</div>
          <div className="font-medium w-7/12">
            {Utils.Currency.format(wallet.general?.startAmount)}
          </div>
        </div>
      </div>
      <div className="w-1/4 px-4 justify-between">
        <div className="max-w-sm flex gap-x-2">
          <div className="text-gray-500 w-5/12">End amount:</div>
          <div className="font-medium w-7/12">
            {Utils.Currency.format(wallet.general?.endAmount)}
          </div>
        </div>
      </div>
      <div className="w-1/4 px-4 justify-between">
        <div className="max-w-sm flex gap-x-2">
          <div className="text-gray-500 w-5/12">Uneven wallet:</div>
          <div className="font-medium w-7/12">
            {Utils.Currency.format(wallet.general?.unevenAmount)}
          </div>
        </div>
      </div>
      <div className="w-1/4 px-4 justify-between">
        <div className="max-w-sm flex gap-x-2">
          <div className="text-gray-500 w-5/12">Status:</div>
          <div className="font-medium w-7/12">{wallet.status}</div>
        </div>
      </div>
      <div className="w-1/4 px-4 justify-between">
        <div className="max-w-sm flex gap-x-2">
          <div className="text-gray-500 w-5/12">Highest cost:</div>
          <div className="font-medium w-7/12 text-red-500">
            {Utils.Currency.format(wallet.general?.highestCost)}
          </div>
        </div>
      </div>
      <div className="w-1/4 px-4 justify-between">
        <div className="max-w-sm flex gap-x-2">
          <div className="text-gray-500 w-5/12">Lowest cost:</div>
          <div className="font-medium w-7/12 text-red-500">
            {Utils.Currency.format(wallet.general?.lowestCost)}
          </div>
        </div>
      </div>
      <div className="w-1/4 px-4 justify-between">
        <div className="max-w-sm flex gap-x-2">
          <div className="text-gray-500 w-5/12">Highest income:</div>
          <div className="font-medium w-7/12 text-green-500">
            {Utils.Currency.format(wallet.general?.highestIncome)}
          </div>
        </div>
      </div>
      <div className="w-1/4 px-4 justify-between">
        <div className="max-w-sm flex gap-x-2">
          <div className="text-gray-500 w-5/12">Lowest income:</div>
          <div className="font-medium w-7/12 text-green-500">
            {Utils.Currency.format(wallet.general?.lowestIncome)}
          </div>
        </div>
      </div>
      <div className="w-1/4 px-4 justify-between">
        <div className="max-w-sm flex gap-x-2">
          <div className="text-gray-500 w-5/12">Start date:</div>
          <div className="font-medium w-7/12">
            {Utils.Date.formatDate(wallet.general?.startDate, 'DD/MM/YYYY')}
          </div>
        </div>
      </div>
      <div className="w-1/4 px-4 justify-between">
        <div className="max-w-sm flex gap-x-2">
          <div className="text-gray-500 w-5/12">End date</div>
          <div className="font-medium w-7/12">
            {Utils.Date.formatDate(wallet.general?.endDate, 'DD/MM/YYYY')}
          </div>
        </div>
      </div>
      <div className="w-1/4 px-4 justify-between">
        <div className="max-w-sm flex gap-x-2">
          <div className="text-gray-500 w-5/12">Total income:</div>
          <div className="font-medium w-7/12 text-green-500">
            {Utils.Currency.format(wallet.general?.totalIncome)}
          </div>
        </div>
      </div>
      <div className="w-1/4 px-4 justify-between">
        <div className="max-w-sm flex gap-x-2">
          <div className="text-gray-500 w-5/12">Total cost:</div>
          <div className="font-medium w-7/12 text-red-500">
            {Utils.Currency.format(wallet.general?.totalCost)}
          </div>
        </div>
      </div>

      {/*<div className='flex justify-between items-center'>*/}
      {/*  <div className='text-[16px]'>Incoming funds</div>*/}
      {/*  <div className='text-[16px] font-medium'>10.000.000</div>*/}
      {/*  /!*<Skeleton width={200} height={30} variant="text" sx={{ fontSize: '1rem' }} />*!/*/}
      {/*</div>*/}
      {/*<div className='flex justify-between items-center'>*/}
      {/*  <div className='text-red-500 text-[16px]'>Money out</div>*/}
      {/*  <div className='text-red-500 text-[16px] font-medium'>-5.000.000</div>*/}
      {/*  /!*<Skeleton width={200} height={30} variant="text" sx={{ fontSize: '1rem' }} />*!/*/}
      {/*</div>*/}
      {/*<hr />*/}
      {/*<div className='flex justify-between items-center'>*/}
      {/*  <div className='text-[16px]'>Total</div>*/}
      {/*  <div className='w-1/3 text-right text-lg font-medium'>5.000.000</div>*/}
      {/*  /!*<Skeleton width={200} height={30} variant="text" sx={{ fontSize: '1rem' }} />*!/*/}

      {/*</div>*/}
    </div>
  );
};

export default TransactionOverview;
