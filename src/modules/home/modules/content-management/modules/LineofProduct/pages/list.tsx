import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter} from '@utils/hooks';
import {ICategorie} from '@types';
import {useContentManagementController} from '@modules/home';

function List() {
  const handleOnChange = ({business}) => {
    if (business)
      getListCategories({
        filter:
          business > 0 ? JSON.stringify([{application: business}]) : undefined,
      });
  };

  const allLineBusiness = useContentManagementController(
    (s) => s.allLineBusiness,
  );

  const {
    getList: getListCategories,
    loading: loadingCategory,
    data: categoriesData,
  } = useGetList<ICategorie>('categories');

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
        isLoading={loadingCategory}
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
                defaultValue: {
                  label: 'All Business',
                  value: -1,
                },
                isClearable: false,
                options: [
                  {label: 'All Business', value: -1},
                  ...allLineBusiness?.map((x) => ({
                    value: x?.id,
                    label: x?.name,
                  })),
                ],
              },
            ]}
          />
        }
        name="Line of Product"
        linkDeleteContent="/categories"
        linkAddNew="/home/content-management/line-of-product/add-new"
        linkToChild="/home/content-management/product-group"
      />
    </UI.Box>
  );
}

export default List;
