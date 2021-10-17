import React, {useEffect, useRef, useState} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter, useGetItem} from '@utils/hooks';
import {ICategorie, IGrouping} from '@types';

import LoadingComponent from '@components/LoadingComponent';

function List() {
  const {getItem: getAllMenu,loading: loadingMenu, data: menuData} = useGetItem('applications/menu');
  useEffect(() => {
    getAllMenu();
  }, []);

  const handleOnChange = ({application, category}) => {
    if (application){
      getListCategories({limit:9999,filter: JSON.stringify([{application: application}])});
    }
    getListGroupings({
      filter: category ? JSON.stringify([{category: category}]) : undefined,
    });
  };

  const {
    getList: getListCategories,
    data: categoriesData,
    setData: setListCategories,
  } = useGetList<ICategorie>('categories');


  const {
    getList: getListGroupings,
    data: groupingsData,
    loading,
  } = useGetList<IGrouping>('groupings');

  const categoryRef = useRef<any>(null);
  const applicationRef = useRef<any>(null);
  useEffect(() => {
    categoryRef?.current?.select?.clearValue();
  },[applicationRef?.current?.state?.value?.value])

  const {page, limit} = useFilter({limit: 10, page: 1});
  useEffect(() => {
    getListGroupings({
      page,
      limit,
    });
  }, [page, limit]);

  return (
    <UI.Box minH="89vh">
      {/* <UI.Button
        onClick={() => {
          categoryRef?.current?.select?.clearValue();
          setData({});
        }}>
        set
      </UI.Button> */}

      <ContentView
        isLoading={loading}
        data={groupingsData?.records}
        limit={limit}
        totalCount={groupingsData?.total}
        currentPage={page}
        filterBar={
          <FormGenerate
            onChangeValue={handleOnChange}
            gap="10px"
            w="60vw"
            mb={4}
            fields={[
              {
                name: 'application',
                type: 'select',
                refEl: applicationRef,
                colSpan: 3,
                placeholder: 'Line of Business',
                options: menuData?.map?.((x) => ({
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
                options: categoriesData?.records?.map?.((x) => ({
                  value: x?.id,
                  label: x?.name,
                })),
              },
            ]}
          />
        }
        name="Content Management - Product Group"
        linkAddNew="/home/content-management/product-group/add-new"
        linkToChild="/home/content-management/products"
      />
    </UI.Box>
  );
}

export default List;
