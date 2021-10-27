import React, {useEffect, useRef, useState} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter, useGetItem} from '@utils/hooks';
import {ICategorie, IGrouping} from '@types';
import {useContentManagementController} from '@modules/home';
import {useRouterController} from '@modules/router';
import {keyBy} from 'lodash';


function List() {
  const [applicationId, setApplicationId] = useState(-1);
  const [categoryId, setCategoryId] = useState(-1);
  const {page, limit, setPage, setLimit} = useFilter({limit: 10, page: 1});

  const allLineBusiness = useContentManagementController(
    (s) => s.allLineBusiness,
  );
  const handleOnChange = ({application, category}) => {
    setApplicationId(application || -1);
    setCategoryId(category || -1);
  };
  useEffect(() => {
    if (applicationId > 0) {
      getListCategories({
        limit: 9999,
        filter: JSON.stringify([{application: applicationId}]),
      });
    }
  }, [applicationId]);

  const createFilter = React.useMemo(() => {
    if (applicationId < 0) return {};
    if (applicationId > 0 && categoryId < 0) {
      return {
        relations: JSON.stringify(['category', 'category.application']),
        filter: JSON.stringify([{category: {application: applicationId}}]),
      };
    }
    if (applicationId > 0 && categoryId > 0) {
      return {
        filter: JSON.stringify([{category: categoryId}]),
      };
    }
  }, [applicationId, categoryId]);

  useEffect(() => {
    getListGroupings({
      ...createFilter,
      page,
      limit,
    });
  }, [applicationId, categoryId, page, limit]);

  const {getList: getListCategories, data: categoriesData} =
    useGetList<ICategorie>('categories');

  const {
    getList: getListGroupings,
    data: groupingsData,
    loading,
  } = useGetList<IGrouping>('groupings');

  const categoryRef = useRef<any>(null);
  const applicationRef = useRef<any>(null);

  useEffect(() => {
    if (!initData.current){
      categoryRef?.current?.select?.setValue({value: -1, label: 'All Line of Product'});
    }
  }, [applicationId]);

  const {query} = useRouterController();
  const {data, getItem} = useGetItem(`/categories/`);

  useEffect(() => {
    if (query?.parentId){
      getItem({relations: JSON.stringify(['application'])},{path: query?.parentId});
    }
  },[query])

  useEffect(() => {
    const applicationId = data?.application?.id;
    const categoryId = data?.id;
    if (applicationId) {
      applicationRef?.current?.select?.setValue({
        value: applicationId,
        label: keyBy(allLineBusiness, 'id')?.[applicationId]?.name,
      });
      setApplicationId(applicationId);
    }
    if (categoryId){ 
      setCategoryId(categoryId);
    }
  }, [data]);
  
  const initData = useRef(true);
  useEffect(() => {
    if (categoriesData?.records && categoryId && initData.current && keyBy(categoriesData?.records, 'id')?.[categoryId]?.name) {
      console.log(keyBy(categoriesData?.records, 'id')?.[categoryId]?.name)
      categoryRef?.current?.select?.setValue({
        value: categoryId,
        label: keyBy(categoriesData?.records, 'id')?.[categoryId]?.name,
      });
      initData.current = false;
    }
  }, [categoriesData, categoryId]);

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
            onChangeValue={handleOnChange}
            w="60vw"
            display="stack"
            styled={{
              direction: 'row',
            }}
            fields={[
              {
                name: 'application',
                type: 'select',
                refEl: applicationRef,
                placeholder: 'Line of Business',
                isClearable: false,
                styled: {
                  width: '30%',
                },
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
                refEl: categoryRef,
                isDisabled: applicationId < 0,
                type: 'select',
                isClearable: false,
                size: 'md',
                colSpan: 3,
                placeholder: 'Line of Product',
                styled: {
                  width: '30%',
                },
                defaultValue: {
                  value: -1,
                  label: 'All Line of Product',
                },
                options: categoriesData?.records
                  ? [
                      {value: -1, label: 'All Line of Product'},
                      ...categoriesData?.records?.map?.((x) => ({
                        value: x?.id,
                        label: x?.name,
                      })),
                    ]
                  : [{value: -1, label: 'All Line of Product'}],
              },
            ]}
          />
        }
        name="Product Group"
        linkDeleteContent="/groupings"
        linkAddNew="/home/content-management/product-group/detail/add"
        linkToChild="/home/content-management/products"
      />
    </UI.Box>
  );
}

export default List;
