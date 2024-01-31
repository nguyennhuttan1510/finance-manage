import React from 'react';
import { className } from 'postcss-selector-parser';

type OverlayPropsType = {
  onClose?: () => void;
  open?: boolean;
  className?: string;
} & JSX.IntrinsicElements['div'];

const Overlay = (props: OverlayPropsType) => {
  const { open = false, className = '', onClose, ...rest } = props;
  return (
    <div
      onClick={onClose}
      className={`fixed z-10 top-0 left-0 bottom-0 right-0 bg-gray-700 opacity-60 ${
        open ? 'visible' : 'hidden'
      } ${className}`}
      style={{ transition: '.4s all ease' }}
      {...rest}
    ></div>
  );
};

export default Overlay;
