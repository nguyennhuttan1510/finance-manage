import React from 'react';
import InputBase from '@/components/input/InputBase';
import { InputBasePropsType } from '@/components/input/input.type';
import { Box } from '@mui/material';
import { STATUS_INPUT } from '@/components/common/StatusInput';

const Input = (props: InputBasePropsType) => {
  const status = STATUS_INPUT(props.statusInput);
  return (
    <Box className="flex flex-col gap-y-2">
      <InputBase {...props} />
      {props.helpText && <p className={`${status} px-4`}>{props.helpText}</p>}
    </Box>
  );
};

export default Input;
