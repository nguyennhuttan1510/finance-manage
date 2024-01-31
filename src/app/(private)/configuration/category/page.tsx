'use client';
import React, { useEffect, useState } from 'react';
import './styles.scss';
import Container from '@/components/container/Container';
import CategoryList from '@/app/(private)/configuration/category/components/CategoryList';
import CategoryItem from '@/app/(private)/configuration/category/components/CategoryItem';
import TitlePage from '@/components/common/TitlePage';
import Icon from '@/components/common/Icon';
import { IoAddOutline } from 'react-icons/io5';
import CategoryCreate from '@/app/(private)/configuration/category/components/CategoryCreate';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { getMetaDataCategory } from '@/lib/features/metadata/metadataSlice';
import { CategoryResponseType } from '../../../../../apis/CategoryAPI.type';
import CategoryAPI from '../../../../../apis/CategoryAPI';
import { Box } from '@mui/material';

const CategoryPage = () => {
  const [stateLocal, setStateLocal] = useState({
    open: false,
  });

  const [categoryID, setCategoryID] = useState<number | undefined>();
  const dispatch = useAppDispatch();
  const metadata = useAppSelector((state) => state.metadata);

  const onToggleCategoryCreate = () => {
    setStateLocal((prevState) => ({ ...prevState, open: !prevState.open }));
  };

  const fetch = async () => {
    await dispatch(getMetaDataCategory());
  };

  const onSelectedCategory = (id: number) => {
    setCategoryID(id);
  };

  const subCategories = metadata.categories.filter(
    (category) => category.parentID === categoryID,
  );

  const isCategoryParent = (category: CategoryResponseType) =>
    !Boolean(category.parentID);

  const onDelete = async (id: number) => {
    if (!id) return;
    const res = await CategoryAPI.delete(id);
    if (res.data.status) {
      console.log('delete category success');
      await dispatch(getMetaDataCategory());
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <Container main={true} className="category">
      <TitlePage>Categories</TitlePage>
      <CategoryCreate
        key={stateLocal.open ? 0 : 1}
        open={stateLocal.open}
        onOpen={onToggleCategoryCreate}
        onClose={onToggleCategoryCreate}
      />
      <Box className="flex justify-end py-4">
        <Icon
          touch={true}
          className="h-10 w-10"
          onClick={onToggleCategoryCreate}
        >
          <IoAddOutline />
        </Icon>
      </Box>
      <div className="p-4 flex gap-x-4 bg-mode rounded-xl box-shadow">
        <div className="flex-1 px-4">
          <div className="w-full flex justify-between items-center">
            <div className="text-[16px] mb-4">Main category</div>
          </div>
          <CategoryList style={{ backgroundColor: 'transparent' }}>
            {Array.isArray(metadata.categories) &&
              metadata.categories.map(
                (category) =>
                  isCategoryParent(category) && (
                    <CategoryItem
                      key={category.categoryID}
                      category={category}
                      onClick={onSelectedCategory}
                      onDelete={onDelete}
                    />
                  ),
              )}
          </CategoryList>
        </div>

        <div className="flex-1 px-4">
          <div className="w-full flex justify-between items-center">
            <div className="text-[16px] mb-4">Sub category</div>
          </div>
          <CategoryList>
            {Array.isArray(subCategories) && subCategories.length > 0 ? (
              subCategories.map((subCategory) => (
                <CategoryItem
                  key={subCategory.categoryID}
                  category={subCategory}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <Box className="flex justify-center text-sm font-medium text-gray-500">
                Not have subcategory
              </Box>
            )}
          </CategoryList>
        </div>
      </div>
    </Container>
  );
};

export default CategoryPage;
