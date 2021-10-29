import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter, useRouter} from '@utils/hooks';
import {IProduct, ICategorie, IGrouping, IModules} from '@types';
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

  const {getList: getListCategories, data: categoriesRawData} =
    useGetList<ICategorie>('categories');
  const {getList: getListGroupings, data: groupingsRawData} =
    useGetList<IGrouping>('groupings');
  const {getList: getListProduct, data: productsRawData} =
    useGetList<IProduct>('products');
  const {
    getList: getListModules,
    loading: loadingModule,
    data: modulesData,
  } = useGetList<IModules>('productModules');

  const {page, limit, setPage, setLimit, filter, setFilter} = useFilter({
    limit: 10,
    page: 1,
    filter: {
      applicationId: +url.query?.lineOfBusiness || -1,
      categoryId: +url.query?.lineOfProduct || -1,
      groupingId: +url.query?.productGroup || -1,
      productId: +url.query?.productId || -1,
    },
  });

  const createFilter = React.useMemo(() => {
    const {applicationId, categoryId, groupingId, productId} = filter;
    if (applicationId < 0) return {};
    if (applicationId > 0 && categoryId < 0) {
      return {
        relations: JSON.stringify([
          'product',
          'product.grouping',
          'product.grouping.category',
          'product.grouping.category.application',
        ]),
        filter: JSON.stringify([
          {product: {grouping: {category: {application: applicationId}}}},
        ]),
      };
    }
    if (applicationId > 0 && categoryId > 0 && groupingId < 0) {
      return {
        relations: JSON.stringify([
          'product',
          'product.grouping',
          'product.grouping.category',
        ]),
        filter: JSON.stringify([{product: {grouping: {category: categoryId}}}]),
      };
    }
    if (
      applicationId > 0 &&
      categoryId > 0 &&
      groupingId > 0 &&
      productId < 0
    ) {
      return {
        relations: JSON.stringify(['product', 'product.grouping']),
        filter: JSON.stringify([{product: {grouping: groupingId}}]),
      };
    }
    if (
      applicationId > 0 &&
      categoryId > 0 &&
      groupingId > 0 &&
      productId > 0
    ) {
      return {
        filter: JSON.stringify([{productId: productId}]),
      };
    }
  }, [filter]);

  useEffect(() => {
    getListModules({
      ...createFilter,
      page,
      limit,
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

  useEffect(() => {
    if (filter?.categoryId > 0) {
      getListGroupings({
        limit: 9999,
        filter: JSON.stringify([{category: filter?.categoryId}]),
      });
    }
  }, [filter?.categoryId]);

  const productsData =
    productsRawData?.records?.map?.((x) => ({
      value: x?.id,
      label: x?.name,
    })) || [];

  const productsDataKeys = keyBy(
    [{value: -1, label: 'All Products'}, ...productsData],
    'value',
  );

  useEffect(() => {
    if (filter?.groupingId > 0) {
      getListProduct({
        limit: 9999,
        filter: JSON.stringify([{grouping: filter?.groupingId}]),
      });
    }
  }, [filter?.groupingId]);
  const {push} = useRouter();

  return (
    <UI.Box minH="89vh">
      <ContentView
        onReloadPage={() =>
          getListModules({
            page,
            limit,
          })
        }
        isLoading={loadingModule}
        data={modulesData?.records}
        limit={limit}
        totalCount={modulesData?.total}
        currentPage={page}
        filterBarWidth="full"
        isModulesView={true}
        onPageChange={setPage}
        onLimitChange={setLimit}
        filterBar={
          <FormGenerate
            gap="10px"
            w="60vw"
            mb={4}
            fields={[
              {
                name: 'application',
                isClearable: false,
                type: 'select',
                size: 'md',
                colSpan: 3,
                placeholder: 'Line of Business',
                defaultValue: {
                  value: -1,
                  label: 'All Line of Business',
                },
                onChangeValue: (data) => {
                  setFilter({
                    applicationId: data?.value,
                    categoryId: -1,
                    groupingId: -1,
                    productId: -1,
                  });
                },
                value: allLineBusinessKeys?.[filter?.applicationId],
                options: [
                  {value: -1, label: 'All Business'},
                  ...allLineBusiness,
                ],
              },
              {
                name: 'category',
                isClearable: false,
                onChangeValue: (data) => {
                  setFilter((s) => ({
                    ...s,
                    categoryId: data?.value,
                    groupingId: -1,
                    productId: -1,
                  }));
                },
                isDisabled: filter?.applicationId < 0,
                type: 'select',
                size: 'md',
                colSpan: 3,
                placeholder: 'Line of Product',
                value: categoriesDataKeys?.[filter?.categoryId],
                defaultValue: {value: -1, label: 'All Line of Product'},
                options: [
                  {value: -1, label: 'All Line of Product'},
                  ...categoriesData,
                ],
              },
              {
                name: 'grouping',
                isClearable: false,
                isDisabled: filter?.categoryId < 0,
                type: 'select',
                size: 'md',
                colSpan: 3,
                placeholder: 'Product Group',
                defaultValue: {
                  value: -1,
                  label: 'All Product Group',
                },
                onChangeValue: (data) => {
                  setFilter((s) => ({
                    ...s,
                    groupingId: data?.value,
                    productId: -1,
                  }));
                },
                value: groupingsDataKeys?.[filter?.groupingId],
                options: [
                  {value: -1, label: 'All Line of Product Group'},
                  ...groupingsData,
                ],
              },
              {
                name: 'product',
                isClearable: false,
                isDisabled: filter?.groupingId < 0,
                type: 'select',
                size: 'md',
                colSpan: 3,
                onChangeValue: (data) => {
                  setFilter((s) => ({
                    ...s,
                    productId: data?.value,
                  }));
                },
                placeholder: 'Products',
                defaultValue: {
                  value: -1,
                  label: 'All Products',
                },
                value: productsDataKeys?.[filter?.productId],
                options: [
                  {value: -1, label: 'All Line of Product Group'},
                  ...productsData,
                ],
              },
            ]}
          />
        }
        name="Modules"
        linkDeleteContent="/productModules"
        linkAddNew="/home/content-management/modules/detail/add"
        linkToChild="/home/content-management/resources"
        onClickItem={(item) => {
          push(`/home/content-management/resources/module/${item?.id}`);
        }}
      />
    </UI.Box>
  );
}

export default List;
