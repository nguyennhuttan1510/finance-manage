'use client';
import React, { useState } from 'react';
import Container from '@/components/container/Container';
import TitlePage from '@/components/common/TitlePage';
import TabContent from '@/components/tab/TabContent';
import TransactionCreate from '@/components/common/Transaction/TransactionCreate';
import TransactionOverview from '@/components/common/Transaction/TransactionOverview';
import Loading from '@/components/common/Loading/Loading';
import TransactionList from '@/components/common/Transaction/TransactionList';
import TransactionGroup from '@/components/common/Transaction/TransactionGroup';
import TransactionItem from '@/components/common/Transaction/TransactionItem';
import { FilterItemPropsType } from '@/components/common/Filter/FilterItem';
import WalletBudget from '@/components/common/Wallet/WalletBudget';
import ToolbarBudget from '@/app/(private)/budget/[id]/components/ToolbarBudget';

import { useParams } from 'next/navigation';
import Card from '@/components/card/Card';

interface StateLocalType {
  option: 'day' | 'category';
  openTransactionCreate: boolean;
}

const BudgetDetail = () => {
  const [stateLocal, setStateLocal] = useState<StateLocalType>({
    option: 'category',
    openTransactionCreate: false,
  });
  const params = useParams();

  const onToggleTransactionCreate = () => {
    setStateLocal((prevState) => ({
      ...prevState,
      openTransactionCreate: !prevState.openTransactionCreate,
    }));
  };

  const onClickOption = (id: FilterItemPropsType['id']) => {
    setStateLocal((prevState) => ({ ...prevState, option: id }));
  };

  return (
    <Container main={true}>
      <TitlePage>Budget Detail {params.id}</TitlePage>
      <Card>
        <WalletBudget />
        <ToolbarBudget
          type={stateLocal.option}
          onClickOption={onClickOption}
          onOpenTransactionCreate={onToggleTransactionCreate}
        />
      </Card>
      <TabContent>
        <TransactionCreate
          open={stateLocal.openTransactionCreate}
          onClose={onToggleTransactionCreate}
        />
        <Card className="my-8">
          <TransactionOverview />
        </Card>
        <Loading isLoading={false}>
          <TransactionList>
            <TransactionGroup>
              <TransactionItem />
              <TransactionItem />
              <TransactionItem />
              <TransactionItem />
              <TransactionItem />
            </TransactionGroup>
            <TransactionGroup>
              <TransactionItem />
              <TransactionItem />
              <TransactionItem />
            </TransactionGroup>
          </TransactionList>
        </Loading>
      </TabContent>
    </Container>
  );
};

export default BudgetDetail;
