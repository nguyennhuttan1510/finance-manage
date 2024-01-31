import React, { useEffect } from 'react';
import Icon from '@/components/common/Icon';
import { IoBagCheck } from 'react-icons/io5';
import Input from '@/components/input';
import Badge from '@/components/badge/Badge';
import Select from '@/components/select/Select';
import Datetime from '@/components/datetime/Datetime';
import { Checkbox } from '@mui/material';
import Button from '@/components/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { WalletAPI } from '../../../../apis/WalletAPI';
import { ArrElement } from '../../../../apis/common';
import { MetadataResponseType } from '../../../../apis/MetadataAPI.type';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import {
  getMetaDataWallet,
  getMetaDataWalletType,
} from '@/lib/features/metadata/metadataSlice';
import {
  getOverviewWallets,
  getWalletCurrent,
} from '@/lib/features/wallet/walletSlice';
import {
  TypeWallet,
  WalletCreateRequestType,
  WalletResponseType,
  WalletUpdateRequestType,
} from '../../../../apis/WalletAPI.type';
import { ActionWallet, VariableWallet } from '@/contexts/WalletSidebarProvider';
import Utils from '@/utils';
import moment from 'moment';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

type WalletCreateEditFormPropType = Pick<
  ActionWallet,
  'onToggleWalletForm' | 'onToggleWalletIconModal'
> &
  Pick<VariableWallet, 'modeWalletForm'> & {
    wallet: WalletResponseType | undefined;
  };

type WalletCreateFormType = {
  name?: string;
  balance?: number;
  type?: number | undefined;
  description?: string;
  members?: number[];
  isInclude?: boolean;
  startDate?: string;
  endDate?: string;
  target?: number;
};

const WalletCreateEditForm = (props: WalletCreateEditFormPropType) => {
  const {
    wallet,
    modeWalletForm,
    onToggleWalletIconModal,
    onToggleWalletForm,
  } = props;
  const dispatch = useAppDispatch();
  const metadataWalletType = useAppSelector(
    (state) => state.metadata.walletType,
  );
  const initialValues: Partial<WalletCreateFormType> = {
    name: '',
    description: '',
    isInclude: true,
    members: [],
    type: undefined,
    balance: undefined,
    endDate: undefined,
    startDate: undefined,
    target: undefined,
  };
  const walletCurrent = useAppSelector((state) => state.wallet.walletCurrent);
  const formik = useFormik<WalletCreateFormType>({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object().shape({
      type: Yup.string().required('type is required!'),
      balance: Yup.number().required('balance is required!'),
      isInclude: Yup.boolean().required('select include is required!'),
      name: Yup.string().required('name wallet is required!'),
      description: Yup.string().max(150),
      startDate: Yup.string().when('type', (type, schema) => {
        if (Number(type) === TypeWallet.SAVING)
          return schema.required('Start date is required!');
        return schema;
      }),
      endDate: Yup.string().when('type', (type, schema) => {
        if (Number(type) === TypeWallet.SAVING)
          return schema.required('End date is required!');
        return schema;
      }),
      target: Yup.string().when('type', (type, schema) => {
        if (Number(type) === TypeWallet.SAVING)
          return schema.required('Target is required!');
        return schema;
      }),
    }),
    onSubmit: async (values: WalletCreateFormType, { resetForm }) => {
      let isSubmitSuccess = false;
      if (modeWalletForm === 'create') {
        const res = await WalletAPI.create({
          description: values.description,
          members: values.members,
          balance: Number(values.balance),
          name: values.name,
          type: Number(values.type),
          is_include_total: values.isInclude,
          start_date: values.startDate,
          end_date: values.endDate,
          target: Number(values.target),
        } as WalletCreateRequestType);
        isSubmitSuccess = res.data.status;
      } else {
        if (!wallet?.walletID) return;
        const res = await WalletAPI.updateWallet({
          description: values.description,
          members: values.members,
          balance: Number(values.balance),
          name: values.name,
          type: Number(values.type),
          is_include_total: values.isInclude,
          wallet_id: wallet.walletID,
        } as WalletUpdateRequestType);
        await refreshWallet(wallet);
        isSubmitSuccess = res.data.status;
      }
      if (isSubmitSuccess) {
        createWalletSuccess();
        resetForm();
      } else {
        createWalletError();
      }
    },
  });

  const refreshWallet = async (walletEdited: WalletResponseType) => {
    if (walletEdited.walletID === walletCurrent.walletID) {
      dispatch(getWalletCurrent(walletCurrent.walletID));
    }
  };

  const createWalletSuccess = () => {
    dispatch(getOverviewWallets());
    dispatch(getMetaDataWallet());
    onToggleWalletForm();
  };
  const createWalletError = () => {};

  const isSavingWallet = Number(formik.values.type) === TypeWallet.SAVING;

  useEffect(() => {
    const fetchInit = async () => {
      dispatch(getMetaDataWalletType());
    };
    fetchInit();
  }, []);

  useEffect(() => {
    if (modeWalletForm === 'edit' && wallet) {
      formik.setValues({
        name: wallet.nameWallet,
        balance: wallet.balance,
        description: wallet.description,
        members: wallet.members,
        type: wallet.type,
        isInclude: wallet.includeTotal,
        startDate: wallet.startDate,
        endDate: wallet.endDate,
      });
    }
  }, [modeWalletForm, wallet]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="min-w-[30rem] flex flex-col gap-y-4"
    >
      <div className="text-center text-black font-medium text-lg">
        {modeWalletForm === 'create' ? 'Create wallet' : 'Edit wallet'}
      </div>
      <div className="flex gap-x-2">
        <Icon onClick={onToggleWalletIconModal} className="w-fit p-2" touch>
          <IoBagCheck />
        </Icon>
        <Input
          className="border-0"
          placeholder="Main wallet"
          value={formik.values.name}
          name="name"
          onChange={formik.handleChange}
          statusInput={
            formik.submitCount > 0 && formik.errors.name ? 'error' : undefined
          }
          helpText={formik.submitCount > 0 ? formik.errors.name : ''}
        />
      </div>
      <div className="flex items-baseline gap-x-2">
        <Input
          className="border-0 text-xl font-bold"
          placeholder="15.000.000"
          name="balance"
          value={Utils.Currency.formatOriginal(formik.values.balance)}
          onChange={(e) => {
            formik.setFieldValue(
              'balance',
              Utils.Currency.convertNumber(e.target.value),
            );
          }}
          statusInput={
            formik.submitCount > 0 && formik.errors.balance
              ? 'error'
              : undefined
          }
          helpText={formik.submitCount > 0 ? formik.errors.balance : ''}
        />
        <Badge>VND</Badge>
      </div>
      {isSavingWallet && (
        <div className="flex items-baseline gap-x-2">
          <Input
            className="border-0 text-xl font-bold"
            placeholder="15.000.000"
            name="target"
            value={Utils.Currency.formatOriginal(formik.values.target)}
            onChange={(e) => {
              formik.setFieldValue(
                'target',
                Utils.Currency.convertNumber(e.target.value),
              );
            }}
            statusInput={
              formik.submitCount > 0 && formik.errors.target
                ? 'error'
                : undefined
            }
            helpText={formik.submitCount > 0 ? formik.errors.target : ''}
          />
          <Badge>VND</Badge>
        </div>
      )}
      <Select
        className="basic-single"
        classNamePrefix="select"
        value={metadataWalletType.find(
          (option) => option.value == formik.values.type,
        )}
        name="type"
        options={metadataWalletType}
        placeholder="Select wallet type"
        getOptionLabel={(
          option: ArrElement<MetadataResponseType['walletType']>,
        ) => option.name}
        getOptionValue={(
          option: ArrElement<MetadataResponseType['walletType']>,
        ) => String(option.value)}
        onChange={(value) => {
          if (!value) return;
          formik.setFieldValue('type', value.value);
        }}
        statusInput={
          Boolean(formik.submitCount > 0 && formik.errors.type)
            ? 'error'
            : undefined
        }
        helpText={formik.submitCount > 0 ? formik.errors.type : ''}
      />
      <div className="flex gap-x-1">
        {/*<Icon touch className="p-4"></Icon>*/}
        {/*<Icon touch className="p-4"></Icon>*/}
        {/*<Icon touch className="p-4"></Icon>*/}
      </div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        name="color"
        options={options}
        placeholder="Owner wallet"
        isDisabled={true}
      />
      <hr />
      {isSavingWallet && (
        <div className="flex gap-x-4">
          <div>
            <div className="font-medium mb-2">Ngày bắt đầu</div>
            <Datetime
              className="flex-1"
              name="startDate"
              format={'DD/MM/YYYY'}
              value={formik.values.startDate}
              onChange={(e) => {
                console.log('date', e);
                formik.setFieldValue('startDate', moment(e));
              }}
              helpText={formik.submitCount > 0 ? formik.errors.startDate : ''}
              statusInput={
                Boolean(formik.submitCount > 0 && formik.errors.startDate)
                  ? 'error'
                  : undefined
              }
            />
          </div>
          <div>
            <div className="font-medium mb-2">Ngày kết thúc</div>
            <Datetime
              className="flex-1"
              format={'DD/MM/YYYY'}
              name="endDate"
              value={formik.values.endDate}
              onChange={(e) => {
                console.log('date', e);
                formik.setFieldValue('endDate', moment(e));
              }}
              helpText={formik.submitCount > 0 ? formik.errors.endDate : ''}
              statusInput={
                Boolean(formik.submitCount > 0 && formik.errors.endDate)
                  ? 'error'
                  : undefined
              }
            />
          </div>
        </div>
      )}
      <hr />
      <div className="flex items-center gap-x-2">
        <Checkbox
          name="isInclude"
          checked={formik.values.isInclude}
          onChange={(e) => formik.setFieldValue('isInclude', e.target.checked)}
        />
        <div>Include total</div>
      </div>
      <hr />
      <div className="flex justify-end">
        {modeWalletForm === 'create' ? (
          <Button type="submit">Create</Button>
        ) : (
          <Button type="submit">Update</Button>
        )}
      </div>
    </form>
  );
};

export default WalletCreateEditForm;
