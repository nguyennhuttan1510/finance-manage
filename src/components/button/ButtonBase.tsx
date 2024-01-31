import React from 'react';
import './styles.scss';
import { ButtonBasePropsType } from '@/components/button/button.type';

const ButtonBase = (props: ButtonBasePropsType) => {
  const { children, className, prefix, size, ...propsButtonBase } = props;

  let sizeClass = '';
  switch (size) {
    case 'small':
      sizeClass = 'px-2 py-1 rounded text-md';
      break;
    case 'medium':
      sizeClass = 'px-4 py-2 rounded-md text-md';
      break;
    case 'large':
      sizeClass = 'px-6 py-2 rounded-xl text-lg font-medium';
      break;
    default:
      sizeClass = 'px-4 py-2 rounded-md text-md';
      break;
  }

  return (
    <button
      className={`button flex w-fit justify-center items-center gap-x-4 bg-black text-white cursor-pointer ${sizeClass} ${className}`}
      {...propsButtonBase}
    >
      {prefix}
      {children}
    </button>
  );
};

export default ButtonBase;
