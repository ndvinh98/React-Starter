import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter} from '@utils/hooks';
import {IApplication, ICategorie} from '@types';

function List() {
  const handleOnChange = ({business}) => {
    getListCategories({
      filter: business ? JSON.stringify([{application: business}]) : undefined,
    });
  };

  const {getList: getListApplications,loading: loadingApplications, data: lineOfBusinessData} =
    useGetList<IApplication>('applications');
  const {getList: getListCategories, data: categoriesData} =
    useGetList<ICategorie>('categories');

  useEffect(() => {
    getListApplications({
      limit: 9999,
    });
  }, []);

  const {page, limit} = useFilter({limit: 10, page: 1});
  useEffect(() => {
    getListCategories({
      page,
      limit,
    });
  }, [page, limit]);

  return (
    <UI.Box minH="89vh">
      <ContentView
        isLoading={loadingApplications}
        data={categoriesData?.records}
        limit={limit}
        totalCount={categoriesData?.total}
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
                options: lineOfBusinessData?.records?.map((x) => ({
                  value: x?.id,
                  label: x?.name,
                })),
              },
            ]}
          />
        }
        name="Content Management - Line of Product"
        linkAddNew="/home/content-management/line-of-product/add-new"
        linkToChild="/home/content-management/product-group"
      />
    </UI.Box>
  );
}

export default List;
