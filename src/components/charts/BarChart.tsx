'use client';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ChartOptions,
  LinearScale,
  CategoryScale,
  Title,
  BarElement,
} from 'chart.js';
interface BarChartPropsType {
  data: any;
  options?: ChartOptions<'bar'>;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const optionsBar: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const defaultData = {
  labels: [''],
  datasets: [
    {
      label: 'Label 1',
      data: [0],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Label 2',
      data: [0],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const BarChart = (props: BarChartPropsType) => {
  const { data = defaultData, options } = props;
  console.log('data', data);
  const optionsChart: ChartOptions<'bar'> = { ...optionsBar, ...options };
  return <Bar options={optionsChart} data={data} />;
};

export default BarChart;
