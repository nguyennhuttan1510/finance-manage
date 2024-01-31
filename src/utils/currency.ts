export const format = (currency?: number) => {
  if (!currency) return 0;
  return Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(currency);
};

export const formatOriginal = (number?: number) => {
  if (!number) return 0;
  return Intl.NumberFormat('de-DE').format(number);
};
export const convertNumber = (currency?: string) => {
  console.log('currency', currency);
  if (!currency) return 0;
  console.log('currency return ', currency.replaceAll('[^0-9]', ''));
  return currency.replaceAll(/[^0-9]/g, '');
};
