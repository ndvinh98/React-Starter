import React, {useEffect, useState, useRef} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter, useGetItem} from '@utils/hooks';
import {IProduct, ICategorie, IGrouping, IModules} from '@types';

function List() {
  const {getItem: getAllMenu, data: menuData} = useGetItem('applications/menu');
  useEffect(() => {
    getAllMenu();
  }, []);

  const handleOnChange = ({application, category, grouping, product}) => {
    if (application) getListCategories({limit: 9999,filter: JSON.stringify([{application: application}])});
    if (category) getListGroupings({limit: 9999,filter: JSON.stringify([{category: category}])});
    if (grouping) getListProduct({limit: 9999,filter: JSON.stringify([{grouping: grouping}])});
    getListModules({
      filter: product ? JSON.stringify([{productId: product}]) : undefined,
    });
  };

  const categoryRef = useRef<any>(null);
  const applicationRef = useRef<any>(null);
  const groupingRef = useRef<any>(null);
  const productRef = useRef<any>(null);

  useEffect(() => {
    categoryRef?.current?.select?.clearValue();
    groupingRef?.current?.select?.clearValue();
    productRef?.current?.select?.clearValue();
  }, [applicationRef?.current?.state?.value?.value]);

  useEffect(() => {
    groupingRef?.current?.select?.clearValue();
    productRef?.current?.select?.clearValue();
  }, [categoryRef?.current?.state?.value?.value]);

  useEffect(() => {
    productRef?.current?.select?.clearValue();
  }, [groupingRef?.current?.state?.value?.value]);

  //const {getList: getListApplications, data: lineOfBusinessData} = useGetList<IApplication>('applications');
  const {getList: getListCategories, data: categoriesData} = useGetList<ICategorie>('categories');
  const {getList: getListGroupings, data: groupingsData} = useGetList<IGrouping>('groupings');
  const {getList: getListProduct, data: productsData} = useGetList<IProduct>('products');
  const {getList: getListModules,loading: loadingModule, data: modulesData} = useGetList<IModules>('productModules');

  const {page, limit} = useFilter({limit: 10, page: 1});
  useEffect(() => {
    getListModules({
      page,
      limit,
    });
  }, [page, limit]);


  return (
    <UI.Box minH="89vh">
      <ContentView
        isLoading={loadingModule}
        data={modulesData?.records}
        limit={limit}
        totalCount={modulesData?.total}
        currentPage={page}
        filterBarWidth="full"
        isModulesView={true}
        filterBar={
          <FormGenerate
            onChangeValue={handleOnChange}
            gap="10px"
            w="60vw"
            mb={4}
            fields={[
              {
                name: 'application',
                refEl: applicationRef,
                type: 'select',
                size: 'md',
                colSpan: 3,
                placeholder: 'Line of Business',
                options: menuData?.map((x) => ({
                  value: x?.id,
                  label: x?.name,
                })),
              },
              {
                name: 'category',
                refEl: categoryRef,
                isDisabled: applicationRef?.current?.state?.value?.value ? false : true,
                type: 'select',
                size: 'md',
                colSpan: 3,
                placeholder: 'Line of Product',
                options: categoriesData?.records.map((x) => ({
                  value: x?.id,
                  label: x?.name,
                })),
              },
              {
                name: 'grouping',
                refEl: groupingRef,
                isDisabled: categoryRef?.current?.state?.value?.value ? false : true,
                type: 'select',
                size: 'md',
                colSpan: 3,
                placeholder: 'Product Group',
                options: groupingsData?.records.map((x) => ({
                  value: x?.id,
                  label: x?.name,
                })),
              },
              {
                name: 'product',
                refEl: productRef,
                isDisabled: groupingRef?.current?.state?.value?.value ? false : true,
                type: 'select',
                size: 'md',
                colSpan: 3,
                placeholder: 'Products',
                options: productsData?.records.map((x) => ({
                  value: x?.id,
                  label: x?.name,
                })),
              },
            ]}
          />
        }
        name="Modules"
        linkDeleteContent="/productModules/"
        linkAddNew="/home/content-management/modules/add-new"
        linkToChild="/home/content-management/resources"
      />
    </UI.Box>
  );
}

export default List;
