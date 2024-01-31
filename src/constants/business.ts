export type MonthType = {
  id: number;
  label: string;
  value: number;
};

const MONTH: MonthType[] = [
  {
    id: 0,
    label: 'January',
    value: 1,
  },
  {
    id: 1,
    label: 'February',
    value: 2,
  },
  {
    id: 2,
    label: 'March',
    value: 3,
  },
  {
    id: 3,
    label: 'April',
    value: 4,
  },
  {
    id: 4,
    label: 'May',
    value: 5,
  },
  {
    id: 5,
    label: 'June',
    value: 6,
  },
  {
    id: 6,
    label: 'July',
    value: 7,
  },
  {
    id: 7,
    label: 'August',
    value: 8,
  },
  {
    id: 8,
    label: 'September',
    value: 9,
  },
  {
    id: 9,
    label: 'October',
    value: 10,
  },
  {
    id: 10,
    label: 'November',
    value: 11,
  },
  {
    id: 11,
    label: 'December',
    value: 12,
  },
];

const BUSINESS = {
  MONTH,
};

export default BUSINESS;
