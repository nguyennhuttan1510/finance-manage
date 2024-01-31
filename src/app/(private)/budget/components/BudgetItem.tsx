'use client';
import React from 'react';
import Icon from '@/components/common/Icon';
import Card from '@/components/card/Card';

import { FaTrashCan, FaPenToSquare } from 'react-icons/fa6';
import Link from 'next/link';

export type UserType = {
  fullname: string;
  id: number;
};

export type BudgetType = {
  id: number;
  icon: JSX.Element;
  purpose: string;
  members: UserType[];
  target: number;
  current: number;
  status: string;
  startDate: string;
  endDate: string;
};

export interface BudgetItemPropsType {
  budget: BudgetType;
  onClick?: (id: BudgetType['id']) => void;
}

const BudgetItem = (props: BudgetItemPropsType) => {
  const { budget, onClick } = props;

  return (
    <Card>
      <div className="flex text-mode">
        <div className="left-item w-full flex items-center text-[14px]">
          <Link
            href={`/budget/${budget.id}`}
            className={`flex w-1/12 items-center font-medium underline cursor-pointer`}
          >
            1
          </Link>
          <div className="flex w-2/12 items-center font-medium">
            <Icon touch className="p-2 mr-4 flex-1">
              {budget.icon}
            </Icon>
            <div>{budget.purpose}</div>
          </div>
          <div className="flex w-2/12 px-4 gap-x-1">
            {budget.members &&
              Array.isArray(budget.members) &&
              budget.members.map((item) => (
                <Icon key={item.id} touch className="p-4"></Icon>
              ))}
          </div>
          <div className="px-4 flex w-1/12 font-medium">{budget.status}</div>
          <div className="px-4 flex w-1/12 font-medium">{budget.target}</div>
          <div className="px-4 flex w-1/12 font-medium">{budget.current}</div>
          <div className="w-1/12 px-4 font-medium">{budget.startDate}</div>
          <div className="w-1/12 px-4 font-medium">{budget.endDate}</div>
          <div className="w-2/12 flex justify-end">
            <div className="px-4">
              <Icon sizeIcon="small" className="!text-blue-500">
                <FaPenToSquare />
              </Icon>
            </div>
            <div className="px-4">
              <Icon sizeIcon="small" className="!text-red-500">
                <FaTrashCan />
              </Icon>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BudgetItem;
