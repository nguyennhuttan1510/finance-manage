import moment, { Moment } from 'moment';

export const days = Array.from({ length: 31 }, (v, i) => i);
export const formatDate = (date: Date | string, format?: string) => {
  format = format ??= 'dddd, DD/MM/YYYY, HH:mm:ss a';
  return moment(date).format(format);
};

export const daysFrom = (date: Moment = moment()) =>
  Array.from({ length: moment(date).daysInMonth() }, (v, i) => i + 1);
