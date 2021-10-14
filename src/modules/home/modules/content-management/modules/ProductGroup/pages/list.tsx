import React, {useEffect, useState, useRef} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter, useGetItem} from '@utils/hooks';
import {IApplication, ICategorie, IGrouping} from '@types';

function List() {
  const {getItem: getAllMenu, data: menuData} = useGetItem('applications/menu');
  useEffect(() => {
    getAllMenu();
  }, []);

  const handleOnChange = ({business, product}) => {
    if (business) getListCategories({filters: JSON.stringify([{application: business}])})
  };

  //const {getList: getListApplications, data: lineOfBusinessData} = useGetList<IApplication>('applications');
  const {getList: getListCategories, data: categoriesData} = useGetList<ICategorie>('categories');
  const {getList: getListGroupings, data: groupingsData} = useGetList<IGrouping>('groupings');

  const {page, limit} = useFilter({limit: 10, page: 1});
  useEffect(() => {
    getListGroupings({
      page,
      limit,
    });
  }, [page, limit]);


  return (
    <UI.Box minH="89vh">
      <ContentView
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
                name: 'product',
                type: 'select',
                size: 'md',
                colSpan: 3,
                placeholder: 'Line of Product',
                options: categoriesData?.records.map((x) => ({
                  value: x?.id,
                  label: x?.name,
                })),
              },
            ]}
          />
        }
        name="Content Management - Product Group"
        linkAddNew="/home/content-management/product-group/add-new"
      />
    </UI.Box>
  );
}

export default List;
