'use client';

import React from 'react';
import BudgetItem, {BudgetItemPropsType, BudgetType} from "@/app/(private)/budget/components/BudgetItem";

interface BudgetsPropsType {
  budgets:BudgetType[]
  onClickBudget?: BudgetItemPropsType['onClick']
}

const Budgets = (props: BudgetsPropsType) => {
  const {budgets, onClickBudget} = props

  return (
    <div className='flex flex-col gap-y-4'>
      {budgets && Array.isArray(budgets) && budgets.map(budget => (
        <BudgetItem key={budget.id} budget={budget} onClick={onClickBudget} />
      ))}
    </div>
  );
};

export default Budgets;