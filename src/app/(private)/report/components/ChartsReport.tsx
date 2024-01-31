import React, { useCallback, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import BUSINESS from '@/constants/business';
import PieChart, { colors, PieChartData } from '@/components/charts/PieChart';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import Container from '@/components/container/Container';
import Utils from '@/utils';
import Sidebar from '@/components/common/Sidebar';
import Card from '@/components/card/Card';
import { useAppSelector } from '@/lib/hook';
import {
  AnalyzeCategory,
  AnalyzeDays,
  WalletGeneralInfoType,
} from '../../../../../apis/WalletAPI.type';
import moment, { Moment } from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const optionsPieCost: ChartOptions<'pie'> = {
  plugins: {
    title: {
      display: true,
      text: 'Cost',
    },
    legend: {
      display: false,
    },
  },
};

const optionsPieIncome: ChartOptions<'pie'> = {
  plugins: {
    title: {
      display: true,
      text: 'Income',
    },
    legend: {
      display: false,
    },
  },
};

interface ChartReportProps {
  dateSelected: string | number | Moment;
}

const ChartsReport = (props: ChartReportProps) => {
  const { dateSelected } = props;
  const walletCurrent = useAppSelector((state) => state.wallet.walletCurrent);

  const categoryTypeData = useCallback(
    (category: AnalyzeCategory[]) => {
      let labels: string[] = [];
      let data: number[] = [];
      let color: string[] = [];
      if (!Array.isArray(category))
        return {
          labels: ['default'],
          datasets: [
            {
              label: '# of Votes',
              data: [0],
            },
          ],
        };
      category.forEach((item, index) => {
        labels = [...labels, item.name];
        data = [...data, Math.abs(item.sum)];
        color = [...color, colors[index].background];
      });
      return {
        labels: labels,
        datasets: [
          {
            label: '# of Votes',
            data: data,
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1,
          },
        ],
      };
    },
    [
      walletCurrent.general?.categoriesIncome,
      walletCurrent.general?.categoriesCost,
    ],
  );

  const walletVolatility = {
    labels: [moment(dateSelected).format('MMMM')],
    datasets: [
      {
        label: 'Income',
        data: [Math.abs(walletCurrent.general?.totalIncome) || 0],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Cost',
        data: [Math.abs(walletCurrent.general?.totalCost) || 0],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const timeLineTransaction = useCallback(() => {
    const data = [
      {
        label: 'Cost',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        data: walletCurrent?.general?.daysCost,
      },
      {
        label: 'Income',
        data: walletCurrent?.general?.daysIncome,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ];
    const datasets = data.map((line) => {
      const dataLine = line?.data?.map((item) => Math.abs(item.sum));
      return {
        ...line,
        data: dataLine,
      };
    });
    return {
      labels: Utils.Date.daysFrom(dateSelected as Moment),
      datasets: datasets,
    };
  }, [walletCurrent?.general?.daysCost, walletCurrent?.general?.daysIncome]);

  return (
    <div className="w-full flex flex-col gap-y-8">
      <Card>
        <div className="text-lg font-bold mb-4">
          Report December of Main wallet
        </div>
        {/*<div className="flex gap-x-16">*/}
        {/*  <div className="flex gap-x-2">*/}
        {/*    <span className="text-[16px] text-gray-500">Income</span>*/}
        {/*    <span className="text-[16px] text-green-500">*/}
        {/*      {Utils.Currency.format(walletCurrent?.general?.totalIncome)}*/}
        {/*    </span>*/}
        {/*  </div>*/}
        {/*  <div className="flex gap-x-2">*/}
        {/*    <span className="text-[16px] text-gray-500">Cost</span>*/}
        {/*    <span className="text-[16px] text-red-500">*/}
        {/*      {Utils.Currency.format(walletCurrent?.general?.totalCost)}*/}
        {/*    </span>*/}
        {/*  </div>*/}
        {/*  <div className="flex gap-x-2">*/}
        {/*    <span className="text-[16px] text-gray-500">Balance</span>*/}
        {/*    <span className="text-[16px]">*/}
        {/*      {Utils.Currency.format(walletCurrent?.balance)}*/}
        {/*    </span>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="py-8">
          <div className="flex mb-16 items-end gap-x-10">
            <div className="flex-1">
              <div className="w-[300px]">
                <PieChart
                  data={categoryTypeData(walletCurrent.general?.categoriesCost)}
                  options={optionsPieCost}
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="w-[300px]">
                <PieChart
                  data={categoryTypeData(
                    walletCurrent.general?.categoriesIncome,
                  )}
                  options={optionsPieIncome}
                />
              </div>
            </div>
            <div className="flex-1">
              <BarChart
                data={walletVolatility}
                options={{ plugins: { title: { display: false } } }}
              />
            </div>
          </div>
          <div className="flex gap-x-10">
            <LineChart data={timeLineTransaction()} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChartsReport;
