'use client';
import React, { useEffect } from 'react';
import './styles.scss';
import Input from '@/components/input';
import Button from '@/components/button';
import Textarea from '@/components/textarea/Textarea';
import Select from '@/components/select/Select';
import Datetime from '@/components/datetime/Datetime';
import Sidebar from '@/components/common/Sidebar';
import Badge from '@/components/badge/Badge';
import { useFormik } from 'formik';
import { TransactionType } from '../../../../apis/TransactionAPI.type';
import moment, { Moment } from 'moment';
import { TransactionAPI } from '../../../../apis/TransactionAPI';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { getMetaDataTransactionCreate } from '@/lib/features/metadata/metadataSlice';
import { MetadataResponseType } from '../../../../apis/MetadataAPI.type';
import { ArrElement } from '../../../../apis/common';
import { getWalletCurrent } from '@/lib/features/wallet/walletSlice';
import { CategoryMetadata } from '../../../../apis/CategoryAPI.type';
import { WalletMetadata } from '../../../../apis/WalletAPI.type';
import { EventMetadata } from '../../../../apis/EventAPI.type';
import Utils from '@/utils';

export interface TransactionCreatePropsType {
  open: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onGetTransactions?: () => void;
}

type TransactionCreateForm = Omit<
  TransactionType,
  | 'transactionID'
  | 'balanceOf'
  | 'eventID'
  | 'categoryID'
  | 'walletID'
  | 'createdDate'
> & {
  createdDate: Moment | undefined;
  eventOption: EventMetadata | undefined;
  categoryOption: CategoryMetadata | undefined;
  walletOption: WalletMetadata | undefined;
};

const DEFAULT_OPTION = 0;
const TransactionCreate = (props: TransactionCreatePropsType) => {
  const {
    open = false,
    onClose = () => {},
    onGetTransactions = () => {},
  } = props;
  const dispatch = useAppDispatch();
  const metadata = useAppSelector((state) => state.metadata);
  const walletCurrent = useAppSelector((state) => state.wallet.walletCurrent);

  const formik = useFormik<TransactionCreateForm>({
    enableReinitialize: true,
    initialValues: {
      amount: 0,
      createdDate: undefined,
      categoryOption: metadata.categories[DEFAULT_OPTION],
      walletOption: metadata.wallets.find(
        (wallet) => wallet.walletID === walletCurrent.walletID,
      ),
      description: '',
      eventOption: metadata.events[DEFAULT_OPTION],
    },
    onSubmit: async (values: TransactionCreateForm, { resetForm }) => {
      if (!values.categoryOption || !values.walletOption)
        throw new Error('not found category and wallet in create transaction');
      const res = await TransactionAPI.create({
        amount: Number(values.amount),
        created_date: values.createdDate || moment(),
        category_id: values.categoryOption.categoryID,
        category_type: values.categoryOption.type,
        wallet_id: values.walletOption.walletID,
        description: values.description,
        event_id: values.eventOption?.eventID,
      });
      if (res.data.status) {
        await createTransactionSuccessful(resetForm);
      } else {
        createTransactionError(resetForm);
      }
    },
  });

  const createTransactionSuccessful = async (resetForm: any) => {
    dispatch(getWalletCurrent(walletCurrent.walletID));
    await onGetTransactions();
    onClose();
    resetForm();
  };
  const createTransactionError = (resetForm: any) => {
    resetForm();
  };

  const onCancel = () => {
    onClose();
  };

  useEffect(() => {
    const fetch = async () => {
      dispatch(getMetaDataTransactionCreate());
    };
    fetch();
  }, []);

  return (
    <>
      <Sidebar open={open} onClose={onCancel}>
        <form
          key={open ? 1 : 0}
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-y-4"
        >
          <div className="flex items-baseline gap-x-4">
            <Input
              name="amount"
              className="!px-1 text-[22px] font-bold border-0 focus-visible:outline-0"
              sizeInput="large"
              type="text"
              placeholder="15.000.000"
              value={Utils.Currency.formatOriginal(formik.values.amount)}
              onChange={(event) =>
                formik.setFieldValue(
                  'amount',
                  Utils.Currency.convertNumber(event.target.value),
                )
              }
            />
            <Badge>VND</Badge>
          </div>
          <Textarea
            name="description"
            rows={4}
            placeholder="Note"
            onChange={formik.handleChange}
          />
          <Select
            className="basic-single"
            classNamePrefix="select"
            name="categoryID"
            value={
              formik.values.categoryOption ||
              metadata.categories[DEFAULT_OPTION]
            }
            options={metadata.categories}
            placeholder="Select category"
            getOptionLabel={(
              option: ArrElement<MetadataResponseType['categories']>,
            ) => option.name}
            getOptionValue={(
              option: ArrElement<MetadataResponseType['categories']>,
            ) => String(option.categoryID)}
            onChange={(option) => {
              formik.setFieldValue('categoryOption', option);
            }}
          />
          <Datetime
            format="DD/MM/YYYY"
            value={moment(formik.values.createdDate)}
            onChange={(value) => {
              formik.setFieldValue('createdDate', value);
            }}
          />
          <hr />
          <Select
            className="basic-single"
            classNamePrefix="select"
            name="eventID"
            value={formik.values.eventOption}
            options={metadata.events}
            placeholder="Select event"
            getOptionLabel={(
              option: ArrElement<MetadataResponseType['events']>,
            ) => option.eventName}
            getOptionValue={(
              option: ArrElement<MetadataResponseType['events']>,
            ) => String(option.eventID)}
            onChange={(option) => {
              formik.setFieldValue('eventOption', option);
            }}
          />
          <Select
            className="basic-single"
            classNamePrefix="select"
            name="walletID"
            value={formik.values.walletOption}
            options={metadata.wallets}
            placeholder="Select wallet"
            getOptionLabel={(
              option: ArrElement<MetadataResponseType['wallets']>,
            ) => option.nameWallet}
            getOptionValue={(
              option: ArrElement<MetadataResponseType['wallets']>,
            ) => String(option.walletID)}
            onChange={(option) => {
              formik.setFieldValue('walletOption', option);
            }}
          />
          <hr />
          <div className="flex gap-x-4">
            <Button
              className="bg-primary text-white"
              size="medium"
              type="submit"
            >
              Create
            </Button>
            <Button
              className="bg-red-600 text-white"
              size="medium"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Sidebar>
    </>
  );
};

export default TransactionCreate;
