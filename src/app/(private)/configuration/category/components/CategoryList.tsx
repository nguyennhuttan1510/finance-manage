import React from 'react';

type CategoryPropsType = {
  children: React.ReactNode
} & JSX.IntrinsicElements['div']

const CategoryList = (props: CategoryPropsType) => {
  const {children, className, ...rest} = props
  return (
    <div className={`sub-category flex flex-col gap-y-4 ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default CategoryList;