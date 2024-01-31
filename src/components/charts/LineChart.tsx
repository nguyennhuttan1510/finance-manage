import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

interface LineChartPropsType {
  data: any
  options?: ChartOptions<'line'>
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const optionsDefault = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const LineChart = (props: LineChartPropsType) => {
  const {data, options} = props
  const optionsChart = { ...optionsDefault, ...options}
  return (
    <Line options={optionsChart} data={data} />
  );
};

export default LineChart;