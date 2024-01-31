'use client';
import React, { useEffect, useState } from 'react';
import Container from '@/components/container/Container';
import BUSINESS from '@/constants/business';
import TitlePage from '@/components/common/TitlePage';
import ChartsReport from '@/app/(private)/report/components/ChartsReport';
import TabContent from '@/components/tab/TabContent';
import Tab, { TabListPropsType } from '@/components/tab/Tab';

import { Box } from '@mui/material';
import Card from '@/components/card/Card';
import WalletRouter from '@/components/common/Wallet/WalletRouter';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import moment from 'moment/moment';
import { colors } from '@/components/charts/PieChart';
import { getAnalyzeWalletCurrent, getWalletCurrent } from "@/lib/features/wallet/walletSlice";
import TransactionOverview from '@/components/common/Transaction/TransactionOverview';

const DatetimeOption = BUSINESS.MONTH.map((item) => ({
  id: item.id,
  label: item.label,
  value: moment().set({ month: item.id }).toISOString(),
}));

const ReportPage = () => {
  const [stateLocal, setStateLocal] = useState<{
    tabID: TabListPropsType['tabIDSelected'];
    [key: string]: any;
  }>({
    tabID: DatetimeOption[0].value,
  });
  const dispatch = useAppDispatch();
  const walletCurrent = useAppSelector((state) => state.wallet.walletCurrent);
  const onSelectTab = (tabSelected: string | number) => {
    setStateLocal((prevState) => ({ ...prevState, tabID: tabSelected }));
  };

  useEffect(() => {
    const fetch = async () => {
      if (!walletCurrent.walletID) return;
      dispatch(
        getAnalyzeWalletCurrent(walletCurrent.walletID, {
          start_date: moment(stateLocal.tabID).startOf('month').toISOString(),
          end_date: moment(stateLocal.tabID).endOf('month').toISOString(),
        }),
      );
    };
    fetch();
  }, [stateLocal.tabID, walletCurrent.walletID]);

  return (
    <Container main={true}>
      <TitlePage>Reports</TitlePage>
      <Card>
        <WalletRouter wallet={walletCurrent} />
        <Tab
          className="py-4"
          tabs={DatetimeOption}
          tabIDSelected={stateLocal.tabID}
          onSelectTab={onSelectTab}
        />
      </Card>
      <Card className="my-8">
        <TransactionOverview wallet={walletCurrent} />
      </Card>
      <Box className="mt-8">
        <TabContent>
          <ChartsReport dateSelected={stateLocal.tabID} />
        </TabContent>
      </Box>
    </Container>
  );
};

export default ReportPage;
