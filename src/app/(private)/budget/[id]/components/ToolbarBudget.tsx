'use client';
import React from 'react';
import {Box} from "@mui/material";
import Filter from "@/components/common/Filter/Filter";
import FilterItem from "@/components/common/Filter/FilterItem";
import Icon from "@/components/common/Icon";
import {IoAddOutline} from "react-icons/io5";
import {ToolbarPropsType} from "@/app/(private)/transaction/components/Toolbar";

interface ToolbarBudgetPropsType<T = any> extends ToolbarPropsType<T> {}

const ToolbarBudget = (props: ToolbarBudgetPropsType) => {
  const { type, onClickOption, onOpenTransactionCreate } = props
  return (
    <Box className='toolbar w-full flex items-center'>
      <Box className='left-toolbar flex gap-x-2'>
        <Filter>
          <FilterItem current={type} id='day' onClick={onClickOption}>
            Day
          </FilterItem>
          <FilterItem current={type} id='category' onClick={onClickOption}>
            Category
          </FilterItem>
        </Filter>
      </Box>
      <Box className='right-toolbar ml-auto'>
        <Icon touch={true} className='h-10 w-10' onClick={onOpenTransactionCreate}><IoAddOutline /></Icon>
      </Box>
    </Box>
  );
};

export default ToolbarBudget;