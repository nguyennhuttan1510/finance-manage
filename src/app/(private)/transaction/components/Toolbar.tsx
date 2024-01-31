import React from 'react';
import { IoAddOutline } from 'react-icons/io5';
import Icon from '@/components/common/Icon';
import Filter from '@/components/common/Filter/Filter';
import FilterItem from '@/components/common/Filter/FilterItem';

export interface ToolbarPropsType<T = any> {
  type: T;
  onOpenTransactionCreate: () => void;
  onClickOption: (sort: ToolbarPropsType['type']) => void;
}

const Toolbar = (props: ToolbarPropsType) => {
  const { type, onClickOption, onOpenTransactionCreate } = props;
  return (
    <div className="toolbar w-full flex items-center">
      <div className="left-toolbar">
        <Filter>
          <FilterItem current={type} id="day" onClick={onClickOption}>
            Day
          </FilterItem>
          <FilterItem current={type} id="category" onClick={onClickOption}>
            Category
          </FilterItem>
        </Filter>
      </div>
      <div className="right-toolbar ml-auto">
        <Icon
          touch={true}
          className="h-10 w-10"
          onClick={onOpenTransactionCreate}
        >
          <IoAddOutline />
        </Icon>
      </div>
    </div>
  );
};

export default Toolbar;
