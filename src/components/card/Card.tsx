'use client';
import React from 'react';

export type CardPropsType = {
  children: React.ReactNode
} & JSX.IntrinsicElements['div']

const Card = (props: CardPropsType) => {
  const { children, className = '' , ...rest } = props
  return (
    <div className={`p-4 rounded-xl box-shadow bg-mode ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Card;