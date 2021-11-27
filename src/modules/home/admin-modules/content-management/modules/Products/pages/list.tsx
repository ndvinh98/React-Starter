import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter, useRouter} from '@utils/hooks';
import {IProduct, ICategorie, IGrouping} from '@types';
import {useContentManagementController} from '@modules/home';
import {useCurrentRoute} from 'react-navi';
import {keyBy} from 'lodash';

function List() {
  const {url} = useCurrentRoute();
  const allLineBusiness = useContentManagementController(
    (s) => s.allLineBusiness,
  )?.map?.((x) => ({
    value: x?.id,
    label: x?.name,
  }));

  const allLineBusinessKeys = keyBy(allLineBusiness, 'value');

  const {page, limit, setPage, setLimit, filter, setFilter} = useFilter({
    limit: 10,
    page: 1,
    filter: {
      applicationId: +url.query?.lineOfBusiness || -1,
      categoryId: +url.query?.lineOfProduct || -1,
      groupingId: +url.query?.productGroup || -1,
    },
  });

  const {getList: getListCategories, data: categoriesRawData} =
    useGetList<ICategorie>('categories');
  const {getList: getListGroupings, data: groupingsRawData} =
    useGetList<IGrouping>('groupings');
  const {
    getList: getListProduct,
    loading: loadingProducts,
    data: productsData,
  } = useGetList<IProduct>('products');

  const createFilter = React.useMemo(() => {
    if (filter?.applicationId < 0) return {};
    if (filter?.applicationId > 0 && filter?.categoryId < 0) {
      return {
        relations: JSON.stringify([
          'grouping',
          'grouping.category',
          'grouping.category.application',
        ]),
        filter: JSON.stringify([
          {grouping: {category: {application: filter?.applicationId}}},
        ]),
      };
    }
    if (
      filter?.applicationId > 0 &&
      filter?.categoryId > 0 &&
      filter?.groupingId < 0
    ) {
      return {
        relations: JSON.stringify(['grouping', 'grouping.category']),
        filter: JSON.stringify([{grouping: {category: filter?.categoryId}}]),
      };
    }
    if (
      filter?.applicationId > 0 &&
      filter?.categoryId > 0 &&
      filter?.groupingId > 0
    ) {
      return {
        filter: JSON.stringify([{grouping: filter?.groupingId}]),
      };
    }
  }, [filter]);

  useEffect(() => {
    getListProduct({
      ...createFilter,
      page,
      limit,
      relations: JSON.stringify([
        'grouping',
        'grouping.category',
        'grouping.category.application',
      ]),
    });
  }, [filter, page, limit]);

  useEffect(() => {
    if (filter?.applicationId > 0) {
      getListCategories({
        limit: 9999,
        filter: JSON.stringify([{application: filter?.applicationId}]),
      });
    }
  }, [filter?.applicationId]);

  const categoriesData =
    categoriesRawData?.records?.map?.((x) => ({
      value: x?.id,
      label: x?.name,
    })) || [];

  const categoriesDataKeys = keyBy(
    [{value: -1, label: 'All Line of Product'}, ...categoriesData],
    'value',
  );

  useEffect(() => {
    if (filter?.categoryId > 0) {
      getListGroupings({
        limit: 9999,
        filter: JSON.stringify([{category: filter?.categoryId}]),
      });
    }
  }, [filter?.categoryId]);

  const groupingsData =
    groupingsRawData?.records?.map?.((x) => ({
      value: x?.id,
      label: x?.name,
    })) || [];

  const groupingsDataKeys = keyBy(
    [{value: -1, label: 'All Product Group'}, ...groupingsData],
    'value',
  );
  const {push} = useRouter();

  return (
    <UI.Box minH="89vh">
      <ContentView
        onReloadPage={() =>
          getListProduct({
            page,
            limit,
          })
        }
        isLoading={loadingProducts}
        data={productsData?.records}
        limit={limit}
        totalCount={productsData?.total}
        currentPage={page}
        onPageChange={setPage}
        onLimitChange={setLimit}
        filterBar={
          <FormGenerate
            gap="10px"
            w="60vw"
            display="stack"
            styled={{
              direction: 'row',
              flexWrap: 'wrap',
            }}
            fields={[
              {
                name: 'application',
                type: 'select',
                size: 'md',
                isClearable: false,
                styled: {
                  width: '28%',
                },
                value: allLineBusinessKeys?.[filter?.applicationId],
                onChangeValue: (data) => {
                  setFilter({
                    applicationId: data?.value,
                    categoryId: -1,
                    groupingId: -1,
                  });
                },
                placeholder: 'Line of Business',
                options: [
                  {value: -1, label: 'All Business'},
                  ...allLineBusiness,
                ],
              },
              {
                name: 'category',
                type: 'select',
                isClearable: false,
                isDisabled: +filter?.applicationId < 0,
                size: 'md',
                value: categoriesDataKeys?.[filter?.categoryId],
                onChangeValue: (data) => {
                  setFilter((s) => ({
                    ...s,
                    categoryId: data?.value,
                    groupingId: -1,
                  }));
                },
                styled: {
                  width: '28%',
                },
                defaultValue: {value: -1, label: 'All Line of Product'},
                placeholder: 'Line of Product',
                options: [
                  {value: -1, label: 'All Line of Product'},
                  ...categoriesData,
                ],
              },
              {
                name: 'grouping',
                type: 'select',
                isClearable: false,
                isDisabled: filter?.categoryId < 0,
                size: 'md',
                styled: {
                  width: '28%',
                },
                onChangeValue: (data) => {
                  setFilter((s) => ({
                    ...s,
                    groupingId: data?.value,
                  }));
                },
                value: groupingsDataKeys?.[filter?.groupingId],
                placeholder: 'Product Group',
                options: [
                  {value: -1, label: 'All Product Group'},
                  ...groupingsData,
                ],
              },
            ]}
          />
        }
        name="Products"
        linkDeleteContent="/products"
        linkAddNew="/home/content-management/products/detail/add"
        linkToChild="/home/content-management/modules"
        onClickItem={(item) => {
          push(
            `/home/content-management/modules?productId=${item?.id}&productGroup=${item?.grouping?.id}&lineOfProduct=${item?.grouping?.category?.id}&lineOfBusiness=${item?.grouping?.category?.application?.id}`,
          );
        }}
      />
    </UI.Box>
  );
}

export default List;
