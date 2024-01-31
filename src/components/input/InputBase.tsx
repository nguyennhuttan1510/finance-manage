import React from 'react';
import './styles.scss'
import {InputBasePropsType} from "@/components/input/input.type";

const InputBase = (props: InputBasePropsType) => {
  const { prefix, className, sizeInput = 'medium', ...propsInput } = props

  let sizeClass = ''
  switch (sizeInput) {
    case 'small':
      sizeClass = 'px-2 py-1 rounded'
      break;
    case 'medium':
      sizeClass = ' px-4 py-2 rounded-md'
      break;
    case 'large':
      sizeClass = ' px-6 py-3 rounded-lg'
      break;
    default:
      sizeClass = ' px-4 py-2 rounded-md'
      break;
  }

  return (
    <>
      {prefix}
      <input className={`input w-full border border-black text-black ${sizeClass} ${className}`} {...propsInput} />
    </>
  );
};

export default InputBase;