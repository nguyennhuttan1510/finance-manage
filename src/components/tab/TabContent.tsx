'use client'
import React from 'react';
import './styles.scss'
export interface TabContentPropsType {
  children: React.ReactNode
}

const TabContent = (props: TabContentPropsType) => {
  const {children} = props
  return (
    <div className='tab-content w-full'>
      {children}
    </div>
  );
};

export default TabContent;