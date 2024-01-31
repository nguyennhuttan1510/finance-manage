'use client';
import React from 'react';

export interface FilterItemPropsType<T = any> {
  current: T
  id: T
  onClick: (sort: FilterItemPropsType['current']) => void
  children: React.ReactNode
}

const FilterItem = function<T>(props: FilterItemPropsType<T>) {
  const {id, current, onClick, children} = props
  const isActive = (current: FilterItemPropsType['current'], target: FilterItemPropsType['current']) => current === target ? 'bg-primary text-white' : ''

  return (
    <div className={`item h-8 px-4 flex justify-center items-center text-md cursor-pointer ${isActive(current, id)}`} onClick={() => {onClick(id)}}>{children}</div>
  );
};

export default FilterItem;