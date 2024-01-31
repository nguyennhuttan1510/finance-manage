import { CategoryType } from '../../apis/CategoryAPI.type';

export const colorAmountTransaction = (typeCategory: CategoryType) => {
  let colorTransaction = '';
  switch (typeCategory) {
    case CategoryType.INCOME:
      colorTransaction = 'text-green-500';
      break;
    case CategoryType.COST:
      colorTransaction = 'text-red-500';
      break;
    default:
      colorTransaction = 'text-gray-300';
      break;
  }
  return colorTransaction;
};

export const colorAmountTransactionByNumber = (amount: number) => {
  let colorTransaction = '';
  if (amount > 0) {
    colorTransaction = 'text-green-500';
  } else if (amount < 0) {
    colorTransaction = 'text-red-500';
  } else {
    colorTransaction = 'text-gray-300';
  }
  return colorTransaction;
};
