import React, {useEffect, useRef} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter, useRouter} from '@utils/hooks';
import {ICategorie, IGrouping} from '@types';
import {useContentManagementController} from '@modules/home';
import {keyBy} from 'lodash';
import {useCurrentRoute} from 'react-navi';

function List() {
  const {url} = useCurrentRoute();
  const formRef = useRef(null);

  const {page, limit, setPage, setLimit, filter, setFilter} = useFilter({
    limit: 10,
    page: 1,
    filter: {
      applicationId: url.query?.lineOfBusiness || -1,
      categoryId: url.query?.lineOfProduct || -1,
    },
  });

  const allLineBusiness = useContentManagementController(
    (s) => s.allLineBusiness,
  )?.map?.((x) => ({
    value: x?.id,
    label: x?.name,
  }));
  const allLineBusinessKeys = keyBy(allLineBusiness, 'value');

  const {getList: getListCategories, data: categoriesRawData} =
    useGetList<ICategorie>('categories');

  useEffect(() => {
    if (filter?.applicationId > 0) {
      getListCategories({
        limit: 9999,
        filter: JSON.stringify([{application: filter?.applicationId}]),
      });
    }
  }, [filter?.applicationId]);

  const createFilter = React.useMemo(() => {
    if (filter?.applicationId < 0) return {};
    if (filter?.applicationId > 0 && filter?.categoryId < 0) {
      return {
        relations: JSON.stringify(['category', 'category.application']),
        filter: JSON.stringify([
          {category: {application: filter?.applicationId}},
        ]),
      };
    }
    if (filter?.applicationId > 0 && filter?.categoryId > 0) {
      return {
        filter: JSON.stringify([{category: filter?.categoryId}]),
      };
    }
  }, [filter]);

  useEffect(() => {
    getListGroupings({
      ...createFilter,
      page,
      limit,
      relations: JSON.stringify(['category', 'category.application']),
    });
  }, [filter, page, limit]);

  const categoriesData =
    categoriesRawData?.records?.map?.((x) => ({
      value: x?.id,
      label: x?.name,
    })) || [];

  const categoriesDataKeys = keyBy(
    [{value: -1, label: 'All Line of Product'}, ...categoriesData],
    'value',
  );
  const {
    getList: getListGroupings,
    data: groupingsData,
    loading,
  } = useGetList<IGrouping>('groupings');
  const {push} = useRouter();

  return (
    <UI.Box minH="89vh">
      <ContentView
        onReloadPage={() =>
          getListGroupings({
            page,
            limit,
          })
        }
        isLoading={loading}
        data={groupingsData?.records}
        limit={limit}
        totalCount={groupingsData?.total}
        currentPage={page}
        onPageChange={setPage}
        onLimitChange={setLimit}
        filterBar={
          <FormGenerate
            w="60vw"
            display="stack"
            ref={formRef}
            styled={{
              direction: 'row',
            }}
            fields={[
              {
                name: 'application',
                type: 'select',
                placeholder: 'Line of Business',
                isClearable: false,
                onChangeValue: (data) => {
                  setFilter({
                    applicationId: data?.value,
                    categoryId: -1,
                  });
                },
                styled: {
                  width: '30%',
                },
                canControlsValue: true,
                value: allLineBusinessKeys?.[filter?.applicationId] || -1,
                defaultValue: {
                  value: -1,
                  label: 'All Line of Business',
                },
                options: [
                  {value: -1, label: 'All Line of Business'},
                  ...allLineBusiness,
                ],
              },
              {
                name: 'category',
                isDisabled: filter?.applicationId < 0,
                type: 'select',
                isClearable: false,
                size: 'md',
                colSpan: 3,
                placeholder: 'Line of Product',
                styled: {
                  width: '30%',
                },
                onChangeValue: (data) => {
                  setFilter((s) => ({
                    ...s,
                    categoryId: data?.value,
                  }));
                },
                canControlsValue: true,
                value: categoriesDataKeys?.[filter?.categoryId],
                defaultValue: {
                  value: -1,
                  label: 'All Line of Product',
                },
                options: [
                  {value: -1, label: 'All Line of Product'},
                  ...categoriesData,
                ],
              },
            ]}
          />
        }
        name="Product Group"
        linkDeleteContent="/groupings"
        linkAddNew="/home/content-management/product-group/detail/add"
        linkToChild="/home/content-management/products"
        onClickItem={(item) => {
          push(
            `/home/content-management/products?productGroup=${item?.id}&lineOfProduct=${item?.category?.id}&lineOfBusiness=${item?.category?.application?.id}`,
          );
        }}
      />
    </UI.Box>
  );
}

export default List;
