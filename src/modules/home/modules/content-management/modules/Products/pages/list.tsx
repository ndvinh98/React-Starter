import React, {useEffect, useRef} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter, useGetItem} from '@utils/hooks';
import {IProduct, ICategorie, IGrouping} from '@types';

function List() {
  const {getItem: getAllMenu, data: menuData} = useGetItem('applications/menu');
  useEffect(() => {
    getAllMenu();
  }, []);

  const categoryRef = useRef<any>(null);
  const applicationRef = useRef<any>(null);
  const groupingRef = useRef<any>(null);

  useEffect(() => {
    categoryRef?.current?.select?.clearValue();
    groupingRef?.current?.select?.clearValue();
  },[applicationRef?.current?.state?.value?.value])

  useEffect(() => {
    groupingRef?.current?.select?.clearValue();
  },[categoryRef?.current?.state?.value?.value])




  const {getList: getListCategories, data: categoriesData} = useGetList<ICategorie>('categories');
  const {getList: getListGroupings, data: groupingsData} = useGetList<IGrouping>('groupings');
  const {getList: getListProduct,loading: loadingProducts, data: productsData} = useGetList<IProduct>('products');

  const handleOnChange = ({application, category, grouping}) => {
    if (application) {
      getListCategories({limit:9999,filter: JSON.stringify([{application: application}])});
    }
    if (category) getListGroupings({limit:9999,filter: JSON.stringify([{category: category}])})
    getListProduct({filter: grouping ? JSON.stringify([{grouping: grouping}]): undefined})
  };


  const {page, limit} = useFilter({limit: 10, page: 1});
  useEffect(() => {
    getListProduct({
      page,
      limit,
    });
  }, [page, limit]);


  return (
    <UI.Box minH="89vh">
      <ContentView
        isLoading={loadingProducts}
        data={productsData?.records}
        limit={limit}
        totalCount={productsData?.total}
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
                type: 'select',
                refEl: categoryRef,
                isDisabled: applicationRef?.current?.state?.value?.value ? false : true,
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
                type: 'select',
                refEl: groupingRef,
                isDisabled: categoryRef?.current?.state?.value?.value ? false : true,
                size: 'md',
                colSpan: 3,
                placeholder: 'Product Group',
                options: groupingsData?.records.map((x) => ({
                  value: x?.id,
                  label: x?.name,
                })),
              },
            ]}
          />
        }
        name="Products"
        linkDeleteContent="/products"
        linkAddNew="/home/content-management/products/add-new"
        linkToChild="/home/content-management/modules"
      />
    </UI.Box>
  );
}

export default List;
