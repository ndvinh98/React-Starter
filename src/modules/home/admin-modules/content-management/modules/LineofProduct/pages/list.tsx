import React, {useEffect, useRef, useState} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter, useRouter} from '@utils/hooks';
import {ICategorie} from '@types';
import {useContentManagementController} from '@modules/home';
import {keyBy} from 'lodash';
import {useCurrentRoute} from 'react-navi';

function List() {
  const {url} = useCurrentRoute();
  const allLineBusiness = useContentManagementController(
    (s) => s.allLineBusiness,
  )?.map?.((x) => ({
    value: x?.id,
    label: x?.name,
  }));

  const allLineBusinessKeys = keyBy(allLineBusiness, 'value');

  const [lineOfBusinessId, setLineOfBusinessId] = useState(
    url.query?.lineOfBusiness,
  );

  const handleOnChange = ({business}) => {
    if (business) setLineOfBusinessId(business);
  };

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
      relations: JSON.stringify(['application']),
      filter:
        +lineOfBusinessId > 0
          ? JSON.stringify([{application: +lineOfBusinessId}])
          : undefined,
    });
  }, [page, limit, lineOfBusinessId]);

  const applicationRef = useRef<any>(null);

  const {push} = useRouter();

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
            defaultWatchValue={{
              business: url?.query?.lineOfBusiness,
            }}
            fields={[
              {
                name: 'business',
                type: 'select',
                size: 'md',
                colSpan: 3,
                placeholder: 'All Line of Business',
                value: allLineBusinessKeys?.[lineOfBusinessId],
                styled: {
                  width: '30%',
                },
                isClearable: false,
                refEl: applicationRef,
                options: [
                  {label: 'All Line of Business', value: -1},
                  ...allLineBusiness,
                ],
              },
            ]}
          />
        }
        name="Line of Product"
        linkDeleteContent="/categories"
        linkAddNew="/home/content-management/line-of-product/detail/add"
        onClickItem={(item) => {
          push(
            `/home/content-management/product-group?lineOfProduct=${item?.id}&lineOfBusiness=${item?.application?.id}`,
          );
        }}
      />
    </UI.Box>
  );
}

export default List;
