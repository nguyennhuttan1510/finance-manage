'use client';
import React from 'react';
import './styles.scss';

import { FaRegTrashCan } from 'react-icons/fa6';
import { CategoryResponseType } from '../../../../../../apis/CategoryAPI.type';
import Icon from '@/components/common/Icon';

interface CategoryItemPropsType {
  category: CategoryResponseType;
  onClick?: (id: number) => void;
  onDelete?: (id: number) => void;
  children?: React.ReactNode;
}

const CategoryItem = (props: CategoryItemPropsType) => {
  const { category, onClick, onDelete ,children } = props;
  if (props.children) return <div>{children}</div>;
  return (
    <div
      className="category-item flex gap-x-2 items-center px-4 py-1 cursor-pointer"
      onClick={() => {
        if (!onClick) return;
        onClick(category.categoryID);
      }}
    >
      <Icon key={category?.categoryID} touch className="p-4"></Icon>
      <div className="text-md">{category?.name}</div>
      <div className="action">
        <div className="action__item">
          <div className="action_icon" onClick={() => {onDelete(category.categoryID)}}>
            <FaRegTrashCan className="text-sm text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
