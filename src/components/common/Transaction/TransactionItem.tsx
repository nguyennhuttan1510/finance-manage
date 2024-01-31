'use client';
import React from 'react';
import './styles.scss';
import Icon from '@/components/common/Icon';
import { CategoryType } from '../../../../apis/CategoryAPI.type';
import Utils from '@/utils';

export type TransactionItemPropType = {
  children?: React.ReactNode;
  title?: string;
  amount?: number | string;
  subtitle?: string;
  icon?: string | JSX.Element;
  description?: string;
  typeCategory?: CategoryType;
} & JSX.IntrinsicElements['div'];

const TransactionItem = (props: TransactionItemPropType) => {
  const {
    children,
    title,
    subtitle,
    amount,
    icon,
    description = '',
    typeCategory = CategoryType.COST,
    className = '',
    ...rest
  } = props;

  const colorAmount = Utils.Transaction.colorAmountTransaction(typeCategory);

  return (
    <div
      className={`transaction flex items-center gap-x-4 w-full py-2 px-6 pl-12 ${className}`}
      {...rest}
    >
      {children ? (
        children
      ) : (
        <>
          <Icon touch className="p-4">
            {icon}
          </Icon>
          <div className="flex flex-col">
            <div className="text-[14px] font-medium">{title}</div>
            <div className="text-md text-gray-400">{subtitle}</div>
          </div>
          <div className="ml-auto flex w-1/2">
            <div className="flex-1 mr-8 text-md text-right">{description}</div>
            <div className={`min-w-24 text-[14px] text-right ${colorAmount}`}>
              {typeCategory === CategoryType.INCOME ? `+${amount}` : amount}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionItem;
