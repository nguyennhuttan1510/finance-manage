import React from 'react';
import Input from "@/components/input";
import Badge from "@/components/badge/Badge";
import Textarea from "@/components/textarea/Textarea";
import Select from "@/components/select/Select";
import Datetime from "@/components/datetime/Datetime";
import Button from "@/components/button";
import Sidebar from "@/components/common/Sidebar";
import {BudgetType} from "@/app/(private)/budget/components/BudgetItem";

export interface BudgetCreatePropsType {
  stateBudget: {
    open: boolean
    type: "CREATE" | "EDIT"
  }
  data?: BudgetType
  onClose: () => void
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const BudgetCreate = (props: BudgetCreatePropsType) => {
  const {stateBudget, data, onClose} = props
  return (
    <Sidebar open={stateBudget.open} onClose={onClose}>
      <div className='flex flex-col gap-y-4'>
        <div className='flex items-baseline gap-x-4'>
          <Input className='!px-1 text-[22px] font-bold border-0 focus-visible:outline-0' sizeInput='large' type='text' placeholder='15.000.000' />
          <Badge>VND</Badge>
        </div>
        <Textarea rows={4} placeholder='Note'/>
        <Select
          className="basic-single"
          classNamePrefix="select"
          name="color"
          options={options}
          placeholder='Select category'
        />
        <div className='flex gap-x-4'>
          <div>
            <div  className='font-medium mb-2'>Ngày bắt đầu</div>
            <Datetime />
          </div>
          <div>
            <div  className='font-medium mb-2'>Ngày kết thúc</div>
            <Datetime />
          </div>
        </div>
        <hr/>
        <Select
          className="basic-single"
          classNamePrefix="select"
          name="color"
          options={options}
          placeholder='Select wallet'
        />
        <hr/>
        <div className='flex gap-x-4'>
          {stateBudget.type === 'CREATE' ? (
            <Button className='bg-primary text-white' size='medium'>Create</Button>
          ) : (
            <Button className='bg-primary text-white' size='medium'>Edit</Button>
          )}
          <Button className='bg-red-600 text-white' size='medium'>Cancel</Button>
        </div>
      </div>
    </Sidebar>
  );
};

export default BudgetCreate;