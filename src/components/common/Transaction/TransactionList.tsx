'use client';
import React from 'react';
import TransactionGroup from '@/components/common/Transaction/TransactionGroup';
import TransactionItem from '@/components/common/Transaction/TransactionItem';
import { Box } from '@mui/material';
import {
  TransactionCategorySearchResponseType,
  TransactionSearchRequestType,
  TransactionsGroupByDate,
} from '../../../../apis/TransactionAPI.type';
import { CategoryTransactionSearchResponseType } from '../../../../apis/CategoryAPI.type';
import { ToolbarPropsType } from '@/app/(private)/transaction/components/Toolbar';
import Image from 'next/image';
import moment from 'moment';
import Utils from '@/utils';

interface TransactionListPropsType {
  // children?: React.ReactNode;
  transactions:
    | TransactionCategorySearchResponseType[]
    | CategoryTransactionSearchResponseType[]
    | TransactionsGroupByDate[]
    | null;
  groupBy: ToolbarPropsType<TransactionSearchRequestType['group_by']>['type'];
}

const TransactionList = (props: TransactionListPropsType) => {
  const { transactions, groupBy } = props;
  if (!transactions) return <></>;
  if (Array.isArray(transactions) && transactions.length === 0)
    return (
      <Box className="flex justify-center items-center gap-y-4">
        <Image
          width={500}
          height={300}
          src="/images/empty_data.svg"
          alt="empty"
        />
      </Box>
    );
  return (
    <Box className="transactions flex flex-col gap-y-4">
      {(() => {
        switch (groupBy) {
          case 'category':
            const transactionGroupByCategories =
              transactions as CategoryTransactionSearchResponseType[];
            return (
              <>
                {transactionGroupByCategories.map((category, index) => (
                  <TransactionGroup
                    key={index}
                    title={category.name}
                    subtitle={`${category.length} transactions`}
                    amount={category.total}
                  >
                    {category.transactions.map((transaction) => (
                      <TransactionItem
                        key={transaction.transactionID}
                        title={transaction.category.name}
                        subtitle={Utils.Date.formatDate(
                          transaction.createdDate,
                        )}
                        description={transaction.description}
                        amount={Utils.Currency.format(transaction.amount)}
                        typeCategory={transaction.category.type}
                      />
                    ))}
                  </TransactionGroup>
                ))}
              </>
            );

          case 'day':
            const transactionGroupByDate =
              transactions as TransactionsGroupByDate[];
            return (
              <>
                {transactionGroupByDate.map((date, index) => (
                  <TransactionGroup
                    key={index}
                    title={moment(date.createdDate).format('dddd, DD/MM')}
                    subtitle={`${date.length} transactions`}
                    amount={date.total}
                    icon={moment(date.createdDate).format('DD')}
                  >
                    {date.transactions.map((transaction) => (
                      <TransactionItem
                        key={transaction.transactionID}
                        title={transaction.category.name}
                        subtitle={Utils.Date.formatDate(
                          transaction.createdDate,
                          'HH:mm:ss a',
                        )}
                        description={transaction.description}
                        amount={Utils.Currency.format(transaction.amount)}
                        typeCategory={transaction.category.type}
                      />
                    ))}
                  </TransactionGroup>
                ))}
              </>
            );
        }
      })()}
    </Box>
  );
};
export default TransactionList;
