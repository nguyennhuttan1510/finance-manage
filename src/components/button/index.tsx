import React from 'react';
import ButtonBase from '@/components/button/ButtonBase';
import { ButtonBasePropsType } from '@/components/button/button.type';

const Button = ({ children, ...propsButtonBase }: ButtonBasePropsType) => {
  return <ButtonBase {...propsButtonBase}>{children}</ButtonBase>;
};

export default Button;
