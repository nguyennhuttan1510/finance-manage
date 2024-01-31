import React from 'react';
import { IoAddOutline } from 'react-icons/io5';

export type IconPropsType = {
  sizeIcon?: 'small' | 'medium' | 'large';
  touch?: boolean;
  onClick?: (e: React.MouseEventHandler<HTMLDivElement | undefined>) => void;
} & JSX.IntrinsicElements['div'];

const Icon = (props: IconPropsType) => {
  const {
    sizeIcon = 'medium',
    touch = false,
    className = '',
    onClick,
    children,
    ...rest
  } = props;

  let size;
  const isTouch = touch ? 'bg-primary !text-white' : 'text-black';
  switch (sizeIcon) {
    case 'small':
      size = 'text-xl';
      break;
    case 'large':
      size = 'text-3xl';
      break;
    default:
      size = 'text-2xl';
      break;
  }

  return (
    <div>
      <div
        className={`flex justify-center items-center cursor-pointer text-mode rounded-full ${isTouch} ${size} ${className}`}
        onClick={onClick}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
};

export default Icon;
