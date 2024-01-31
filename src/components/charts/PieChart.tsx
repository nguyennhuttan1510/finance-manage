import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartPiePropsType {
  data: any;
  options?: ChartOptions<'pie'>;
}

export type PieChartData = {
  label: string;
  value: number;
  color: string;
};

const optionsPie: ChartOptions<'pie'> = {
  plugins: {
    legend: {
      display: true,
      align: 'center',
      position: 'bottom',
    },
  },
};

const PieChart = (props: ChartPiePropsType) => {
  const { data, options } = props;
  const optionsChart = { ...optionsPie, ...options };
  return <Pie data={data} options={optionsChart} />;
};

export const colors = [
  {
    background: 'rgba(255, 99, 132, 0.2)',
    border: 'rgba(255, 99, 132, 1)',
  },
  {
    background: 'rgba(54, 162, 235, 0.2)',
    border: 'rgba(54, 162, 235, 1)',
  },
  {
    background: 'rgba(255, 206, 86, 0.2)',
    border: 'rgba(255, 206, 86, 1)',
  },
  {
    background: 'rgba(75, 192, 192, 0.2)',
    border: 'rgba(75, 192, 192, 1)',
  },
  {
    background: 'rgba(75, 192, 192, 0.2)',
    border: 'rgba(75, 192, 192, 1)',
  },
  {
    background: 'rgba(153, 102, 255, 0.2)',
    border: 'rgba(153, 102, 255, 1)',
  },
  {
    background: 'rgba(255, 159, 64, 0.2)',
    border: 'rgba(255, 159, 64, 1)',
  },
  {
    background: 'rgba(67, 255, 221, 0.2)',
    border: 'rgba(67, 255, 221, 1)',
  },
  {
    background: 'rgba(68, 255, 118, 0.2)',
    border: 'rgba(68, 255, 118, 1)',
  },
  {
    background: 'rgba(201, 255, 65, 0.2)',
    border: 'rgba(201, 255, 65, 1)',
  },
  {
    background: 'rgba(255, 181, 62, 0.2)',
    border: 'rgba(255, 181, 62, 1)',
  },
  {
    background: 'rgba(255, 81, 63, 0.2)',
    border: 'rgba(255, 81, 63, 1)',
  },
];

export default PieChart;
