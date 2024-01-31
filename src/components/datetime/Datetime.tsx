import React from 'react';
import './styles.scss';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { STATUS_INPUT, StatusInput } from '@/components/common/StatusInput';

export type DatetimeProps = DatePickerProps<any> & {
  helpText?: string | JSX.Element;
  statusInput?: StatusInput;
};

const Datetime = (props: DatetimeProps) => {
  const status = STATUS_INPUT(props.statusInput);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker {...props} />
      </LocalizationProvider>
      {props.helpText && <p className={`${status} px-4`}>{props.helpText}</p>}
    </>
  );
};

export default Datetime;
