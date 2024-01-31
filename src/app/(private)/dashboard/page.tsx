'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Container from '@/components/container/Container';
import TitlePage from '@/components/common/TitlePage';
import PieChart, { colors } from '@/components/charts/PieChart';
import Card from '@/components/card/Card';
import { Box } from '@mui/material';
import BarChart from '@/components/charts/BarChart';
import TransactionItem from '@/components/common/Transaction/TransactionItem';
import Icon from '@/components/common/Icon';
import LineChart from '@/components/charts/LineChart';
import {
  AnalyzeCategory,
  AnalyzeDays,
  GeneralWallet,
  OverviewWalletResponseType,
  WalletResponseType,
} from '../../../../apis/WalletAPI.type';
import { WalletAPI } from '../../../../apis/WalletAPI';
import Utils from '@/utils';
import moment from 'moment';
import { AnalyzeTransactions } from '../../../../apis/TransactionAPI.type';
import { Bar } from 'react-chartjs-2';

const DashboardPage = () => {
  const [overview, setOverview] = useState<
    GeneralWallet & OverviewWalletResponseType & AnalyzeTransactions
  >();

  const fetch = async () => {
    const res = await WalletAPI.overviewAll({
      start_date: moment().startOf('month').toISOString(),
      end_date: moment().endOf('month').toISOString(),
    });
    if (!res.data.status || !res.data.data) return;
    setOverview(res.data.data);
  };

  const incomeCategory = {
    labels:
      overview?.general?.categoriesIncome?.map(
        (item: AnalyzeCategory) => item.name,
      ) || [],
    datasets: [
      {
        label: '# of Votes',
        data:
          overview?.general?.categoriesIncome?.map(
            (item: AnalyzeCategory) => item.sum,
          ) || [],
        backgroundColor: overview?.general?.categoriesIncome?.map(
          (item: AnalyzeCategory, index: number) => colors[index].background,
        ),
        borderColor: overview?.general?.categoriesIncome?.map(
          (item: AnalyzeCategory, index: number) => colors[index].border,
        ),
        borderWidth: 1,
      },
    ],
  };

  const costCategory = {
    labels:
      overview?.general?.categoriesCost?.map(
        (item: AnalyzeCategory) => item.name,
      ) || [],
    datasets: [
      {
        label: '# of Votes',
        data:
          overview?.general?.categoriesCost?.map(
            (item: AnalyzeCategory) => item.sum,
          ) || [],
        backgroundColor: overview?.general?.categoriesCost?.map(
          (item: AnalyzeCategory, index: number) => colors[index].background,
        ),
        borderColor: overview?.general?.categoriesCost?.map(
          (item: AnalyzeCategory, index: number) => colors[index].border,
        ),
        borderWidth: 1,
      },
    ],
  };

  const dataCostIncome = useMemo(() => {
    return {
      labels: [moment().format('MMMM')],
      datasets: [
        {
          label: 'Income',
          data: [overview?.general?.totalIncome || 0],
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Cost',
          data: [overview?.general?.totalCost || 0],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  }, [overview?.general]);

  const dataLine = {
    labels: Utils.Date.daysFrom(),
    datasets: [
      {
        label: 'Income',
        data: overview?.general?.daysIncome?.map(
          (item: AnalyzeDays) => item.sum,
        ),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Cost',
        data: overview?.general?.daysCost?.map((item: AnalyzeDays) =>
          Math.abs(item.sum),
        ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Container main>
      <TitlePage>Dashboard</TitlePage>
      <Box className="flex gap-x-4 mb-4">
        <Card className="w-full">
          <Box className="mb-8">
            <Box className="text-3xl font-medium">
              {Utils.Currency.format(overview?.totalBalance)}
            </Box>
            <Box className="text-[14px] font-medium text-secondary">
              balance total
            </Box>
          </Box>
          <Box className="flex justify-between mb-4 text-[14px] font-medium">
            <Box>My wallet</Box>
            <Box>view more</Box>
          </Box>
          {overview?.walletsInclude &&
            Array.isArray(overview.walletsInclude) &&
            overview.walletsInclude.map((wallet: WalletResponseType) => (
              <Box
                key={wallet.walletID}
                className="flex justify-between text-lg"
              >
                <Box>{wallet.nameWallet}</Box>
                <Box>{Utils.Currency.format(wallet.balance)}</Box>
              </Box>
            ))}
        </Card>
      </Box>
      <Box className="flex gap-x-4 mb-4">
        <Card className="w-2/3 flex gap-x-8">
          <Box className="flex w-1/3 min-w-40 max-w-sm flex-col items-center gap-y-2">
            <Box className="font-medium text-lg">Income</Box>
            <PieChart data={incomeCategory} />
          </Box>
          <Box className="flex w-1/3 min-w-40 max-w-sm flex-col items-center gap-y-2">
            <Box className="font-medium text-lg">Cost</Box>
            <PieChart data={costCategory} />
          </Box>
          <Box className="flex w-1/3 flex-col gap-y-4">
            <Box>
              <Box className="text-xl font-medium">1.000.000 đ</Box>
              <Box className="text-gray-500">Tổng chi tháng này - 0%</Box>
            </Box>
            <Box>
              <Box className="text-[14px] font-medium">Chi tiêu nhiều nhất</Box>
              <Box className="flex flex-col">
                {overview?.transaction?.highestTransaction?.map(
                  (transaction) => (
                    <TransactionItem
                      className="pl-4"
                      key={transaction.transactionID}
                    >
                      <Icon touch className="p-4"></Icon>
                      <Box>
                        <Box>{transaction.category?.name}</Box>
                        <Box className="text-gray-500">
                          {Utils.Currency.format(transaction.amount)}
                        </Box>
                      </Box>
                      <Box className="flex-1 text-right">
                        {transaction?.percent ? `${transaction.percent}%` : 0}
                      </Box>
                    </TransactionItem>
                  ),
                )}
              </Box>
            </Box>
          </Box>
        </Card>
        <Card className="w-1/3">
          <Box className="flex flex-col gap-y-2">
            <Box className="font-medium text-[14px] mb-4">Cash flow</Box>
            <BarChart
              data={dataCostIncome}
              options={{ plugins: { title: { display: false } } }}
            />
          </Box>
        </Card>
      </Box>
      <Box className="mb-4 flex gap-x-4">
        <Card className="w-1/3">
          <Box className="text-[14px] font-medium mb-4">Last transaction</Box>
          <Box className="flex flex-col max-h-[400px] overflow-auto">
            {overview?.transaction?.latestTransaction &&
              Array.isArray(overview?.transaction.latestTransaction) &&
              overview?.transaction.latestTransaction.map((transaction) => (
                <TransactionItem
                  className="pl-4"
                  key={transaction.transactionID}
                >
                  <Icon touch className="p-4"></Icon>
                  <Box>
                    <Box>{transaction.category?.name}</Box>
                    <Box className="text-gray-500">
                      {Utils.Date.formatDate(transaction.createdDate)}
                    </Box>
                  </Box>
                  <Box className="flex-1 text-right">
                    {Utils.Currency.format(transaction.amount)}
                  </Box>
                </TransactionItem>
              ))}
          </Box>
        </Card>
        <Card className="w-2/3">
          <Box className="text-[14px] font-medium mb-4">Time line</Box>
          <LineChart data={dataLine} />
        </Card>
      </Box>
    </Container>
  );
};

export default DashboardPage;
