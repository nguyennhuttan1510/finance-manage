'use client';
import React, { useContext, useEffect, useState } from 'react';

import Container from '@/components/container/Container';
import TabContent from '@/components/tab/TabContent';
import Toolbar, {
  ToolbarPropsType,
} from '@/app/(private)/transaction/components/Toolbar';
import TransactionList from '@/components/common/Transaction/TransactionList';
import TransactionOverview from '@/components/common/Transaction/TransactionOverview';
import TransactionCreate, {
  TransactionCreatePropsType,
} from '@/components/common/Transaction/TransactionCreate';
import Tab, { TabListPropsType } from '@/components/tab/Tab';
import BUSINESS from '@/constants/business';
import TitlePage from '@/components/common/TitlePage';
import Loading from '@/components/common/Loading/Loading';
import Card from '@/components/card/Card';
import { TransactionAPI } from '../../../../apis/TransactionAPI';
import {
  TransactionCategorySearchResponseType,
  TransactionSearchRequestType,
} from '../../../../apis/TransactionAPI.type';
import { CategoryTransactionSearchResponseType } from '../../../../apis/CategoryAPI.type';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { getMetaDataWallet } from '@/lib/features/metadata/metadataSlice';
import WalletRouter from '@/components/common/Wallet/WalletRouter';
import { getWalletCurrent } from '@/lib/features/wallet/walletSlice';
import moment from 'moment';
import { Box } from '@mui/material';
import Button from '@/components/button';
import { SidebarWalletContext } from '@/contexts/WalletSidebarProvider';

interface StateLocalType {
  createDate: TabListPropsType['tabIDSelected'];
  sort: ToolbarPropsType<TransactionSearchRequestType['group_by']>['type'];
  openTransactionCreate: TransactionCreatePropsType['open'];
  isLoadingTransactions: boolean;
}

window.moment = moment;

const DatetimeOption = BUSINESS.MONTH.map((item) => ({
  id: item.id,
  label: item.label,
  value: moment().set({ month: item.id }).toISOString(),
}));

const Transaction = () => {
  const [stateLocal, setStateLocal] = useState<StateLocalType>({
    createDate: DatetimeOption[0].value,
    sort: 'category',
    openTransactionCreate: false,
    isLoadingTransactions: true,
  });
  const [transactions, setTransaction] = React.useState<
    | TransactionCategorySearchResponseType[]
    | CategoryTransactionSearchResponseType[]
    | null
  >(null);
  const walletCurrent = useAppSelector((state) => state.wallet.walletCurrent);
  const { action } = useContext(SidebarWalletContext);

  const onSelectTab = (value: number | string) => {
    setStateLocal((prevState) => ({ ...prevState, createDate: value }));
  };
  const onToggleTransactionCreate = () => {
    setStateLocal((prevState) => ({
      ...prevState,
      openTransactionCreate: !prevState.openTransactionCreate,
    }));
  };

  const onClickSort = (sort: ToolbarPropsType['type']) => {
    setStateLocal((prevState) => ({ ...prevState, sort: sort }));
  };

  const getTransactions = async (
    query: Partial<TransactionSearchRequestType> = {
      group_by: stateLocal.sort,
    },
  ) => {
    console.log('query transaction', query);
    if (!query.wallet_id) return;
    const res = await TransactionAPI.search(query)
      .then((data) => data.data)
      .finally(() => {
        setStateLocal((prevState) => ({
          ...prevState,
          isLoadingTransactions: false,
        }));
      });
    setTransaction(res.data);
  };

  const onGetTransactions = async () => {
    await getTransactions({
      wallet_id: walletCurrent?.walletID,
      group_by: stateLocal.sort,
      start_date: moment(stateLocal.createDate).startOf('month').toISOString(),
      end_date: moment(stateLocal.createDate).endOf('month').toISOString(),
    });
  };
  //
  // useEffect(() => {
  //   const fetchInit = async () => {
  //     const walletOption = await dispatch(getMetaDataWallet());
  //     if (walletOption?.[0]?.walletID) {
  //       dispatch(getWalletCurrent(walletOption[0].walletID));
  //     }
  //   };
  //   fetchInit();
  // }, []);

  useEffect(() => {
    const fetch = async () => {
      await getTransactions({
        wallet_id: walletCurrent.walletID,
        group_by: stateLocal.sort,
        start_date: moment(stateLocal.createDate)
          .startOf('month')
          .toISOString(),
        end_date: moment(stateLocal.createDate).endOf('month').toISOString(),
      });
    };
    fetch();
  }, [walletCurrent.walletID, stateLocal.sort, stateLocal.createDate]);

  return (
    <Container main={true}>
      <TitlePage>Transaction</TitlePage>
      {!walletCurrent.walletID ? (
        <Box className="flex justify-end">
          <Button onClick={action.onTriggerOverviewWallet}>
            Create Wallet
          </Button>
        </Box>
      ) : (
        <>
          <Card className="mb-8">
            <WalletRouter wallet={walletCurrent} />
            <Tab
              className="py-4"
              tabs={DatetimeOption}
              tabIDSelected={stateLocal.createDate}
              onSelectTab={onSelectTab}
            />
            <Toolbar
              onClickOption={onClickSort}
              type={stateLocal.sort}
              onOpenTransactionCreate={onToggleTransactionCreate}
            />
          </Card>
          {/*<Card className="mb-8">*/}
          {/*  <TransactionOverview wallet={walletCurrent} />*/}
          {/*</Card>*/}
          <TabContent>
            <TransactionCreate
              open={stateLocal.openTransactionCreate}
              onClose={onToggleTransactionCreate}
              onGetTransactions={onGetTransactions}
            />
            <Loading isLoading={stateLocal.isLoadingTransactions}>
              <TransactionList
                key="transactions"
                transactions={transactions}
                groupBy={stateLocal.sort}
              />
            </Loading>
          </TabContent>
        </>
      )}
    </Container>
  );
};

export default Transaction;
