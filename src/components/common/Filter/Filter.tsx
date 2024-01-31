'use client';
import React from 'react';
import './styles.scss'

export interface FilterPropsType {
  children: React.ReactNode
}

const Filter = (props: FilterPropsType) => {
  const {children} = props

  return (
    <div className='option flex rounded-xl bg-mode text-mode overflow-hidden box-shadow'>
      {children}
    </div>
  );
};

export default Filter;