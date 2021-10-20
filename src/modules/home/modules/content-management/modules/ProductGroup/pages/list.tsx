import React, {useEffect, useRef, useState} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter} from '@utils/hooks';
import {ICategorie, IGrouping} from '@types';
import {useContentManagementController} from '@modules/home';

function List() {
  const [applicationId, setApplicationId] = useState(-1);
  const [categoryId, setCategoryId] = useState(-1);

  const allLineBusiness = useContentManagementController(
    (s) => s.allLineBusiness,
  );
  const handleOnChange = ({application, category}) => {
    setApplicationId(application);
    setCategoryId(category);
  };
  useEffect(() => {
    if (applicationId > 0) {
      getListCategories({
        limit: 9999,
        filter: JSON.stringify([{application: applicationId}]),
      });
      getListGroupings({
        relations: JSON.stringify(['category', 'category.application']),
        filter: JSON.stringify([{category: {application: applicationId}}]),
      });
    }

    if (applicationId < 0) {
      getListGroupings();
    }
  }, [applicationId]);

  useEffect(() => {
    if (categoryId > 0)
      getListGroupings({
        filter: JSON.stringify([{category: categoryId}]),
      });
    if (categoryId < 0)
      getListGroupings({
        relations: JSON.stringify(['category', 'category.application']),
        filter:
          applicationId < 0
            ? undefined
            : JSON.stringify([{category: {application: applicationId}}]),
      });
  }, [categoryId]);

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
    categoryRef?.current?.select?.setValue({value: -1, label: 'All Business'});
  }, [applicationRef?.current?.state?.value?.value]);

  const {page, limit} = useFilter({limit: 10, page: 1});
  useEffect(() => {
    getListGroupings({
      page,
      limit,
    });
  }, [page, limit]);

  return (
    <UI.Box minH="89vh">
      <ContentView
        isLoading={loading}
        data={groupingsData?.records}
        limit={limit}
        totalCount={groupingsData?.total}
        currentPage={page}
        filterBar={
          <FormGenerate
            onChangeValue={handleOnChange}
            w="60vw"
            display="stack"
            mb={4}
            styled={{
              direction: 'row',
            }}
            fields={[
              {
                name: 'application',
                type: 'select',
                refEl: applicationRef,
                colSpan: 3,
                placeholder: 'Line of Business',
                isClearable: false,
                styled: {
                  width: '30%',
                },
                defaultValue: {
                  value: -1,
                  label: 'All Business',
                },
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
                  label: 'All Product',
                },
                options: categoriesData?.records
                  ? [
                      {value: -1, label: 'All Product'},
                      ...categoriesData?.records?.map?.((x) => ({
                        value: x?.id,
                        label: x?.name,
                      })),
                    ]
                  : [{value: -1, label: 'All Product'}],
              },
            ]}
          />
        }
        name="Product Group"
        linkDeleteContent="/groupings"
        linkAddNew="/home/content-management/product-group/add-new"
        linkToChild="/home/content-management/products"
      />
    </UI.Box>
  );
}

export default List;
