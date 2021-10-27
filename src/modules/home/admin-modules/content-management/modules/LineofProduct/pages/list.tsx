import React, {useEffect, useRef} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter} from '@utils/hooks';
import {ICategorie} from '@types';
import {useContentManagementController} from '@modules/home';
import {useRouterController} from '@modules/router';
import {keyBy} from 'lodash';

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

  const {page, limit, setPage, setLimit} = useFilter({limit: 10, page: 1});
  useEffect(() => {
    getListCategories({
      page,
      limit,
    });
  }, [page, limit]);

  const applicationRef = useRef<any>(null);
  const {query} = useRouterController();

  useEffect(() => {
    if (query?.parentId){
      applicationRef?.current?.select?.setValue({
        value: query?.parentId,
        label: keyBy(allLineBusiness, 'id')?.[query?.parentId]?.name,
      });
    }
  }, [query]);

  return (
    <UI.Box minH="89vh">
      <ContentView
        onReloadPage={() =>
          getListCategories({
            page,
            limit,
          })
        }
        isLoading={loadingCategory}
        data={categoriesData?.records}
        limit={limit}
        totalCount={categoriesData?.total}
        currentPage={page}
        onPageChange={setPage}
        onLimitChange={setLimit}
        filterBar={
          <FormGenerate
            onChangeValue={handleOnChange}
            gap="10px"
            w="60vw"
            display="stack"
            styled={{
              direction: 'row',
            }}
            fields={[
              {
                name: 'business',
                type: 'select',
                size: 'md',
                colSpan: 3,
                placeholder: 'All Line of Business',
                defaultValue: {
                  label: 'All Line of Business',
                  value: -1,
                },
                styled: {
                  width: '30%',
                },
                isClearable: false,
                refEl: applicationRef,
                options: [
                  {label: 'All Line of Business', value: -1},
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
        linkAddNew="/home/content-management/line-of-product/detail/add"
        linkToChild="/home/content-management/product-group"
      />
    </UI.Box>
  );
}

export default List;
