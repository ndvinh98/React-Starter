import React, {useEffect, useRef, useState} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter} from '@utils/hooks';
import {IProduct, ICategorie, IGrouping, IModules} from '@types';
import {useContentManagementController} from '@modules/home';

function List() {
  const allLineBusiness = useContentManagementController(
    (s) => s.allLineBusiness,
  );
  const [applicationId, setApplicationId] = useState(-1);
  const [categoryId, setCategoryId] = useState(-1);
  const [groupingId, setGroupingId] = useState(-1);
  const [productId, setProductId] = useState(-1);

  const handleOnChange = ({application, category, grouping, product}) => {
    setApplicationId(application || -1);
    setCategoryId(category || -1);
    setGroupingId(grouping || -1);
    setProductId(product || -1);
  };

  const categoryRef = useRef<any>(null);
  const applicationRef = useRef<any>(null);
  const groupingRef = useRef<any>(null);
  const productRef = useRef<any>(null);

  const {getList: getListCategories, data: categoriesData} =
    useGetList<ICategorie>('categories');
  const {getList: getListGroupings, data: groupingsData} =
    useGetList<IGrouping>('groupings');
  const {getList: getListProduct, data: productsData} =
    useGetList<IProduct>('products');
  const {
    getList: getListModules,
    loading: loadingModule,
    data: modulesData,
  } = useGetList<IModules>('productModules');

  const {page, limit, setPage, setLimit} = useFilter({limit: 10, page: 1});

  const createFilter = React.useMemo(() => {
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
  }, [applicationId, categoryId, groupingId, productId]);

  useEffect(() => {
    getListModules({
      ...createFilter,
      page,
      limit,
    });
  }, [applicationId, categoryId, groupingId, productId, page, limit]);

  useEffect(() => {
    if (applicationId < 0) {
      categoryRef?.current?.select?.setValue({value: -1, label: 'All Line of Product'});
      groupingRef?.current?.select?.setValue({
        value: -1,
        label: 'All Product Group',
      });
      productRef?.current?.select?.setValue({
        value: -1,
        label: 'All Products',
      });
    }
    if (applicationId > 0) {
      getListCategories({
        limit: 9999,
        filter: JSON.stringify([{application: applicationId}]),
      });
    }
  }, [applicationId]);

  useEffect(() => {
    if (categoryId < 0) {
      groupingRef?.current?.select?.setValue({
        value: -1,
        label: 'All Product Group',
      });
      productRef?.current?.select?.setValue({
        value: -1,
        label: 'All Products',
      });
    }
    if (categoryId > 0) {
      getListGroupings({
        limit: 9999,
        filter: JSON.stringify([{category: categoryId}]),
      });
    }
  }, [categoryId]);

  useEffect(() => {
    if (groupingId < 0) {
      productRef?.current?.select?.setValue({
        value: -1,
        label: 'All Products',
      });
    }
    if (groupingId > 0) {
      getListProduct({
        limit: 9999,
        filter: JSON.stringify([{grouping: groupingId}]),
      });
    }
  }, [groupingId]);

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
            onChangeValue={handleOnChange}
            defaultWatchValue={{
              application: -1,
              category: -1,
              grouping: -1,
              product: -1,
            }}
            gap="10px"
            w="60vw"
            mb={4}
            fields={[
              {
                name: 'application',
                refEl: applicationRef,
                isClearable: false,
                type: 'select',
                size: 'md',
                colSpan: 3,
                placeholder: 'Line of Business',
                defaultValue: {
                  value: -1,
                  label: 'All Line of Business',
                },
                options: [
                  {value: -1, label: 'All Line of Business'},
                  ...allLineBusiness?.map?.((x) => ({
                    value: x?.id,
                    label: x?.name,
                  })),
                ],
              },
              {
                name: 'category',
                isClearable: false,
                refEl: categoryRef,
                isDisabled: applicationId < 0,
                type: 'select',
                size: 'md',
                colSpan: 3,
                placeholder: 'Line of Product',
                defaultValue: {value: -1, label: 'All Line of Product'},
                options: categoriesData?.records
                  ? [
                      {value: -1, label: 'All Line of Product'},
                      ...categoriesData?.records.map((x) => ({
                        value: x?.id,
                        label: x?.name,
                      })),
                    ]
                  : [{value: -1, label: 'All Line of Product'}],
              },
              {
                name: 'grouping',
                isClearable: false,
                refEl: groupingRef,
                isDisabled: categoryId < 0,
                type: 'select',
                size: 'md',
                colSpan: 3,
                placeholder: 'Product Group',
                defaultValue: {
                  value: -1,
                  label: 'All Product Group',
                },
                options: groupingsData?.records
                  ? [
                      {
                        value: -1,
                        label: 'All Product Group',
                      },
                      ...groupingsData?.records.map((x) => ({
                        value: x?.id,
                        label: x?.name,
                      })),
                    ]
                  : [
                      {
                        value: -1,
                        label: 'All Product Group',
                      },
                    ],
              },
              {
                name: 'product',
                isClearable: false,
                refEl: productRef,
                isDisabled: groupingId < 0,
                type: 'select',
                size: 'md',
                colSpan: 3,
                placeholder: 'Products',
                defaultValue: {
                  value: -1,
                  label: 'All Products',
                },
                options: productsData?.records
                  ? [
                      {
                        value: -1,
                        label: 'All Products',
                      },
                      ...productsData?.records.map((x) => ({
                        value: x?.id,
                        label: x?.name,
                      })),
                    ]
                  : [
                      {
                        value: -1,
                        label: 'All Products',
                      },
                    ],
              },
            ]}
          />
        }
        name="Modules"
        linkDeleteContent="/productModules"
        linkAddNew="/home/content-management/modules/detail/add"
        linkToChild="/home/content-management/resources"
      />
    </UI.Box>
  );
}

export default List;
