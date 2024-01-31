'use client';
import React from 'react';
import './styles.scss';
import ReactSelect, { GroupBase, Props } from 'react-select';
import { Box } from '@mui/material';
import { STATUS_INPUT, StatusInput } from '@/components/common/StatusInput';

type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Props<Option, IsMulti, Group> & {
  label?: string;
  id?: string;
  helpText?: string | JSX.Element;
  statusInput?: StatusInput;
};

const colourStyles = {
  control: (styles: any) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      // backgroundColor: '#FF9130',
      // color: '#FFF',
      backgroundColor: isDisabled
        ? undefined
        : isSelected
          ? '#FF9130'
          : isFocused
            ? '#ff91305e'
            : undefined,
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? '#FF9130'
            : '#ff91305e'
          : undefined,
      },
    };
  },
};

const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: SelectProps<Option, IsMulti, Group>,
) => {
  const { classNamePrefix = 'select', helpText, statusInput } = props;
  const status = STATUS_INPUT(statusInput);
  return (
    <Box className="flex flex-col gap-y-2">
      <ReactSelect
        classNamePrefix={classNamePrefix}
        styles={colourStyles}
        {...props}
      />
      {helpText && <p className={`${status} px-4`}>{helpText}</p>}
    </Box>
  );
};

export default Select;
