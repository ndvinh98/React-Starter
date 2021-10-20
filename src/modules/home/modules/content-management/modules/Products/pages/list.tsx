import React, {useEffect, useRef, useState} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter} from '@utils/hooks';
import {IProduct, ICategorie, IGrouping} from '@types';
import {useContentManagementController} from '@modules/home';

function List() {
  const allLineBusiness = useContentManagementController(
    (s) => s.allLineBusiness,
  );
  const categoryRef = useRef<any>(null);
  const applicationRef = useRef<any>(null);
  const groupingRef = useRef<any>(null);

  const [applicationId, setApplicationId] = useState(-1);
  const [categoryId, setCategoryId] = useState(-1);
  const [groupingId, setGroupingId] = useState(-1);

  const {page, limit, setPage, setLimit} = useFilter({limit: 10, page: 1});

  useEffect(() => {
    categoryRef?.current?.select?.setValue({value: -1, label: 'All Product'});
    groupingRef?.current?.select?.setValue({value: -1, label: 'All Grouping'});
  }, [applicationId]);

  useEffect(() => {
    groupingRef?.current?.select?.setValue({value: -1, label: 'All Grouping'});
  }, [categoryId]);

  const {getList: getListCategories, data: categoriesData} =
    useGetList<ICategorie>('categories');
  const {getList: getListGroupings, data: groupingsData} =
    useGetList<IGrouping>('groupings');
  const {
    getList: getListProduct,
    loading: loadingProducts,
    data: productsData,
  } = useGetList<IProduct>('products');

  const handleOnChange = ({application, category, grouping}) => {
    setApplicationId(application || -1);
    setCategoryId(category || -1);
    setGroupingId(grouping || -1);
  };

  const createFilter = React.useMemo(() => {
    if (applicationId < 0) return {};
    if (applicationId > 0 && categoryId < 0) {
      return {
        relations: JSON.stringify([
          'grouping',
          'grouping.category',
          'grouping.category.application',
        ]),
        filter: JSON.stringify([
          {grouping: {category: {application: applicationId}}},
        ]),
      };
    }
    if (applicationId > 0 && categoryId > 0 && groupingId < 0) {
      return {
        relations: JSON.stringify(['grouping', 'grouping.category']),
        filter: JSON.stringify([{grouping: {category: categoryId}}]),
      };
    }
    if (applicationId > 0 && categoryId > 0 && groupingId > 0) {
      return {
        filter: JSON.stringify([{grouping: groupingId}]),
      };
    }
  }, [applicationId, categoryId, groupingId]);

  useEffect(() => {
    getListProduct({
      ...createFilter,
      page,
      limit,
    });
  }, [applicationId, categoryId, groupingId, page, limit]);

  useEffect(() => {
    if (applicationId < 0) {
      categoryRef?.current?.select?.setValue({value: -1, label: 'All Product'});
      groupingRef?.current?.select?.setValue({
        value: -1,
        label: 'All Product Group',
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
    if (categoryId > 0) {
      getListGroupings({
        limit: 9999,
        filter: JSON.stringify([{category: categoryId}]),
      });
    }
  }, [categoryId]);

  return (
    <UI.Box minH="89vh">
      <ContentView
        isLoading={loadingProducts}
        data={productsData?.records}
        limit={limit}
        totalCount={productsData?.total}
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
              flexWrap: 'wrap',
            }}
            fields={[
              {
                name: 'application',
                refEl: applicationRef,
                type: 'select',
                size: 'md',
                isClearable: false,
                styled: {
                  width: '28%',
                },
                defaultValue: {
                  value: -1,
                  label: 'All Business',
                },
                placeholder: 'Line of Business',
                options: [
                  {value: -1, label: 'All Business'},
                  ...allLineBusiness?.map?.((x) => ({
                    value: x?.id,
                    label: x?.name,
                  })),
                ],
              },
              {
                name: 'category',
                type: 'select',
                refEl: categoryRef,
                isClearable: false,
                isDisabled: +applicationId < 0,
                size: 'md',
                styled: {
                  width: '28%',
                },
                defaultValue: {value: -1, label: 'All Product'},
                placeholder: 'Line of Product',
                options: categoriesData?.records
                  ? [
                      {value: -1, label: 'All Product'},
                      ...categoriesData?.records.map((x) => ({
                        value: x?.id,
                        label: x?.name,
                      })),
                    ]
                  : [{value: -1, label: 'All Product'}],
              },
              {
                name: 'grouping',
                type: 'select',
                refEl: groupingRef,
                isClearable: false,
                isDisabled: categoryId < 0,
                size: 'md',
                styled: {
                  width: '28%',
                },
                defaultValue: {
                  value: -1,
                  label: 'All Product Group',
                },
                placeholder: 'Product Group',
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
            ]}
          />
        }
        name="Products"
        linkDeleteContent="/products"
        linkAddNew="/home/content-management/products/add-new"
        linkToChild="/home/content-management/modules"
      />
    </UI.Box>
  );
}

export default List;
