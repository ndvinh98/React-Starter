import React, {useEffect, useRef} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter, useGetItem} from '@utils/hooks';
import {ICategorie, IGrouping} from '@types';

function List() {
  const {getItem: getAllMenu, data: menuData} = useGetItem('applications/menu');
  useEffect(() => {
    getAllMenu();
  }, []);

  const handleOnChange = ({business, category}) => {
    if (business)
      getListCategories({filter: JSON.stringify([{application: business}])});
    getListGroupings({
      filter: category ? JSON.stringify([{category: category}]) : undefined,
    });
  };

  //const {getList: getListApplications, data: lineOfBusinessData} = useGetList<IApplication>('applications');
  const {
    getList: getListCategories,
    data: categoriesData,
    // setData,
  } = useGetList<ICategorie>('categories');
  const {getList: getListGroupings, data: groupingsData} =
    useGetList<IGrouping>('groupings');

  const {page, limit} = useFilter({limit: 10, page: 1});
  useEffect(() => {
    getListGroupings({
      page,
      limit,
    });
  }, [page, limit]);

  const productRef = useRef<any>(null);

  return (
    <UI.Box minH="89vh">
      {/* <UI.Button
        onClick={() => {
          productRef?.current?.select?.clearValue();
          setData({});
        }}>
        set
      </UI.Button> */}
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
                options: menuData?.map?.((x) => ({
                  value: x?.id,
                  label: x?.name,
                })),
              },
              {
                name: 'category',
                refEl: productRef,
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
      />
    </UI.Box>
  );
}

export default List;
