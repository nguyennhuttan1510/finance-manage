'use client';
import React from 'react';
import './styles.scss';
import Utils from '@/utils';

interface TransactionCategoryPropsType {
  children: React.ReactNode;
  title: string;
  amount: number;
  subtitle: string;
  icon?: string | JSX.Element;
}

const TransactionGroup = (props: TransactionCategoryPropsType) => {
  const { children, title, subtitle, amount, icon } = props;
  return (
    <div className="transaction-category box-shadow bg-mode flex flex-col rounded-xl overflow-hidden">
      <div className="transaction-total flex items-center gap-x-4 w-full py-2 px-6">
        <div className="flex justify-center items-center text-xl h-10 w-10 bg-primary text-white font-bold rounded-full">
          {icon}
        </div>
        <div className="flex flex-col">
          <div className="text-[14px] font-medium">{title}</div>
          <div className="text-md text-gray-400">{subtitle}</div>
        </div>
        <div
          className={`ml-auto text-[16px] font-medium ${Utils.Transaction.colorAmountTransactionByNumber(amount)}`}
        >
          {Utils.Currency.format(amount)}
        </div>
      </div>
      {children}
    </div>
  );
};

export default TransactionGroup;
