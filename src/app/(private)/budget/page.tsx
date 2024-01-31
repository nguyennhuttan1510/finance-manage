'use client';
import React, {useState} from 'react';
import Container from "@/components/container/Container";
import Icon from "@/components/common/Icon";
import Card from "@/components/card/Card";

import {IoAddOutline} from "react-icons/io5";
import { FaSuitcase } from "react-icons/fa6";
import TitlePage from "@/components/common/TitlePage";
import BudgetCreate, {BudgetCreatePropsType} from "@/app/(private)/budget/components/BudgetCreate";
import Budgets from "@/app/(private)/budget/components/Budgets";
import BudgetItem, {BudgetItemPropsType, BudgetType} from "@/app/(private)/budget/components/BudgetItem";
import FilterItem, {FilterItemPropsType} from "@/components/common/Filter/FilterItem";
import Filter from "@/components/common/Filter/Filter";
import {Box, LinearProgress} from "@mui/material";

interface StateLocalType {
  budgetSideBar: BudgetCreatePropsType['stateBudget'],
  filterStatus: 'process' | 'closed'
}

const fakeData: BudgetType[] = [
  {
    id: 1,
    icon: <FaSuitcase />,
    purpose: 'Travel',
    members: [
      {
        fullname: 'Nguyen Nhut Tan',
        id:1
      },
      {
        fullname: 'Nguyen Nhut Pham',
        id:2
      },
    ],
    target: 6000000,
    current: 5500000,
    status: 'PROCESS',
    startDate: '1/1/2024',
    endDate: '3/1/2024'
  },
  {
    id: 2,
    icon: <FaSuitcase />,
    purpose: 'Travel',
    members: [
      {
        fullname: 'Nguyen Nhut Tan',
        id:1
      },
      {
        fullname: 'Nguyen Nhut Pham',
        id:2
      },
    ],
    target: 6000000,
    current: 7000000,
    status: 'CLOSED',
    startDate: '1/1/2024',
    endDate: '3/1/2024'
  },
]

const BudgetPage = () => {
  const [stateLocal, setStateLocal] = useState<StateLocalType>({
    budgetSideBar: {
      open: false,
      type: 'CREATE'
    },
    filterStatus: 'process'
  })
  const [budgetID, setBudgetID] = useState<BudgetType['id']>()

  const onToggleBudgetSidebar = (type?: StateLocalType['budgetSideBar']['type']) => {
    setStateLocal(prevState => ({...prevState, budgetSideBar: {...prevState.budgetSideBar, open: !prevState.budgetSideBar.open, type: type ?? prevState.budgetSideBar.type }}))
  }

  const onClickBudget: BudgetItemPropsType['onClick'] = (id) => {
    onToggleBudgetSidebar('EDIT')
  }

  const budgetCurrent = fakeData.find((item) => item.id === budgetID )

  const onFilterBudget = (status: StateLocalType['filterStatus']) => {
    setStateLocal(prevState => ({...prevState, filterStatus: status}))
  }
  return (
    <Container main>
      <TitlePage>Budget</TitlePage>
      <Box className='py-8 flex justify-between items-center'>
        <Box>
          <Icon touch={true} className='h-10 w-10' onClick={() => {onToggleBudgetSidebar("CREATE")}} ><IoAddOutline /></Icon>
        </Box>
        <Box>
          <Filter>
            <FilterItem current={stateLocal.filterStatus} id={'process'} onClick={() => {onFilterBudget("process")}}>
              Processing
            </FilterItem>
            <FilterItem current={stateLocal.filterStatus} id={'closed'} onClick={() => {onFilterBudget('closed')}}>
              Closed
            </FilterItem>
          </Filter>
        </Box>
      </Box>
      <BudgetCreate stateBudget={stateLocal.budgetSideBar} onClose={() => {onToggleBudgetSidebar()}} data={budgetCurrent}/>
      <Budgets budgets={fakeData} onClickBudget={onClickBudget} />
    </Container>
  );
};

export default BudgetPage;