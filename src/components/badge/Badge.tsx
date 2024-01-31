import React from 'react';

type BadgePropsType = {
  children: React.ReactNode
} & JSX.IntrinsicElements['div']

const Badge = (props: BadgePropsType) => {
  const {children, className} = props
  return (
    <div className={`w-fit h-fit px-1.5 text-gray-500 text-md font-bold border border-gray-500 rounded-lg ${className}`}>{children}</div>
  );
};

export default Badge;