'use client';
import React from 'react';
import './styles.scss';
export interface TabItemPropsType {
  value: number | string;
  selectedID: number | string;
  children: React.ReactNode;
  onSelect: (selected: TabItemPropsType['value']) => void;
}

const TabItem = (props: TabItemPropsType) => {
  const { selectedID, value, onSelect, children } = props;
  return (
    <div
      onClick={() => {
        onSelect(value);
      }}
      className={`tab-item flex justify-center items-center ${selectedID === value ? 'active' : ''}`}
    >
      {children}
    </div>
  );
};

export default TabItem;
