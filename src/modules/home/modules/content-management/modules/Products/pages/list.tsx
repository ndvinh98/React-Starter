import React, {useEffect, useState, useRef} from 'react';
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

  const handleOnChange = ({business, category, grouping}) => {
    if (business) getListCategories({filter: JSON.stringify([{application: business}])})
    if (category) getListGroupings({filter: JSON.stringify([{category: category}])})
    getListProduct({filter: grouping ? JSON.stringify([{grouping: grouping}]): undefined})


  };

  //const {getList: getListApplications, data: lineOfBusinessData} = useGetList<IApplication>('applications');
  const {getList: getListCategories, data: categoriesData} = useGetList<ICategorie>('categories');
  const {getList: getListGroupings, data: groupingsData} = useGetList<IGrouping>('groupings');
  const {getList: getListProduct, data: productsData} = useGetList<IProduct>('products');


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
                name: 'business',
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
        name="Content Management - Products"
        linkAddNew="/home/content-management/products/add-new"
      />
    </UI.Box>
  );
}

export default List;
