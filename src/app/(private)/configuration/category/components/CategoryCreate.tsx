import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/common/Sidebar';
import Input from '@/components/input';
import Textarea from '@/components/textarea/Textarea';
import Select from '@/components/select/Select';
import Button from '@/components/button';
import Icon from '@/components/common/Icon';

import { IoFastFoodOutline } from 'react-icons/io5';
import Modal from '@/components/modal/Modal';
import IconCategory, {
  IconCategoryPropsType,
} from '@/components/common/IconCategory/IconCategory';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import CategoryAPI from '../../../../../../apis/CategoryAPI';
import {
  CategoryCreate,
  CategoryType,
} from '../../../../../../apis/CategoryAPI.type';
import {
  getMetaDataCategory,
  getMetaDataCategoryType,
} from '@/lib/features/metadata/metadataSlice';

interface CategoryCreatePropsType {
  open: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

const icons: IconCategoryPropsType['icons'] = [
  {
    id: 1,
    renderIcon: <IoFastFoodOutline />,
  },
  {
    id: 2,
    renderIcon: <IoFastFoodOutline />,
  },
  {
    id: 3,
    renderIcon: <IoFastFoodOutline />,
  },
  {
    id: 4,
    renderIcon: <IoFastFoodOutline />,
  },
  {
    id: 5,
    renderIcon: <IoFastFoodOutline />,
  },
  {
    id: 6,
    renderIcon: <IoFastFoodOutline />,
  },
  {
    id: 7,
    renderIcon: <IoFastFoodOutline />,
  },
  {
    id: 8,
    renderIcon: <IoFastFoodOutline />,
  },
  {
    id: 9,
    renderIcon: <IoFastFoodOutline />,
  },
  {
    id: 10,
    renderIcon: <IoFastFoodOutline />,
  },
];

const DEFAULT_OPTION = 0;
const CategoryCreate = (props: CategoryCreatePropsType) => {
  const { open, onOpen, onClose } = props;
  const [stateLocal, setStateLocal] = useState({
    openModalListIcon: false,
  });
  const dispatch = useAppDispatch();
  const metadata = useAppSelector((state) => state.metadata);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      icon: '',
      name: '',
      description: '',
      categoryType: metadata.categoryType?.[DEFAULT_OPTION],
      categoryParent: undefined as any,
    },
    onSubmit: async (values) => {
      const payload: CategoryCreate = {
        icon: values.icon,
        name: values.name,
        type: Number(values.categoryType.value) as CategoryType,
        parent_id: values?.categoryParent?.categoryID
          ? Number(values?.categoryParent?.categoryID)
          : null,
        description: values.description,
      };
      await createCategory(payload);
    },
  });

  const createCategory = async (values: CategoryCreate) => {
    const res = await CategoryAPI.create(values);
    if (res.data.status) {
      formik.resetForm();
      if (!onClose) return;
      onClose();
      await dispatch(getMetaDataCategory());
    }
  };

  const onToggleIconCategoryModal = () => {
    setStateLocal((prevState) => ({
      ...prevState,
      openModalListIcon: !prevState.openModalListIcon,
    }));
  };

  const fetch = async () => {
    await dispatch(getMetaDataCategoryType());
  };

  const parentCategories = metadata.categories.filter(
    (category) => !Boolean(category.parentID),
  );

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <Modal
        open={stateLocal.openModalListIcon}
        onClose={onToggleIconCategoryModal}
      >
        <IconCategory icons={icons} onClickIcon={onToggleIconCategoryModal} />
      </Modal>
      <Sidebar open={open} onClose={onClose}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
              <Icon
                className="p-2"
                touch={true}
                onClick={onToggleIconCategoryModal}
              >
                <IoFastFoodOutline />
              </Icon>
              <Input
                name="name"
                className="!px-1 text-[22px] font-bold border-0 focus-visible:outline-0"
                sizeInput="large"
                type="text"
                placeholder="Ăn uống"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
            <Select
              options={metadata.categoryType}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.value}
              value={formik.values.categoryType}
              onChange={(option) =>
                formik.setFieldValue('categoryType', option)
              }
              placeholder="Income"
            />
            <Select
              options={parentCategories}
              getOptionLabel={(option) => option?.name}
              getOptionValue={(option) => String(option?.categoryID)}
              value={formik.values.categoryParent}
              onChange={(option) =>
                formik.setFieldValue('categoryParent', option)
              }
              placeholder="Hóa đơn"
            />
            <Textarea
              rows={4}
              placeholder="Note"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <hr />
            {/*<div className="flex items-center">*/}
            {/*  <Checkbox />*/}
            {/*  <div>Include Total</div>*/}
            {/*</div>*/}
            {/*<hr />*/}
            <div className="flex gap-x-4">
              <Button
                type="submit"
                className="bg-primary text-white"
                size="medium"
              >
                Create
              </Button>
              {/*<Button*/}
              {/*  onClick={() => {*/}
              {/*    formik.resetForm();*/}
              {/*    if (!onClose) return;*/}
              {/*    onClose();*/}
              {/*  }}*/}
              {/*  className="bg-red-600 text-white"*/}
              {/*  size="medium"*/}
              {/*>*/}
              {/*  Cancel*/}
              {/*</Button>*/}
            </div>
          </div>
        </form>
      </Sidebar>
    </>
  );
};

export default CategoryCreate;
