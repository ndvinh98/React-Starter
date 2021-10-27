import React, {useEffect, useRef, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {
  useRouter,
  useGetList,
  useGetItem,
  usePatch,
  usePost,
} from '@utils/hooks';
import FormGenerate from '@components/FormGenerate';
import * as yup from 'yup';
import {useRouterController} from '@modules/router';
import {ICategorie, IGrouping} from '@types';
import LoadingComponent from '@components/LoadingComponent';
import {useContentManagementController} from '@modules/home';
import {keyBy} from 'lodash';

const STOCK = [
  'https://i.imgur.com/Q04dMOc.png',
  'https://i.imgur.com/2NpnErN.png',
  'https://i.imgur.com/wSX6CPl.png',
  'https://i.imgur.com/Y3lAWKG.png',
  'https://i.imgur.com/1okhbVx.png',
];

function Edit() {
  const allLineBusiness = useContentManagementController(
    (s) => s.allLineBusiness,
  );
  const {push} = useRouter();
  const toast = UI.useToast();

  const [mode, setMode] = useState<'ADD' | 'EDIT'>('ADD');
  const {params} = useRouterController();
  const {data, getItem} = useGetItem(`/products/${params?.id}`);

  const [applicationId, setApplicationId] = useState(-1);
  const [categoryId, setCategoryId] = useState(-1);
  const [groupingId, setGroupingId] = useState(-1);

  useEffect(() => {
    if (params?.id && params?.id !== 'add') {
      getItem({
        relations: JSON.stringify([
          'grouping',
          'grouping.category',
          'grouping.category.application',
        ]),
      });
      setMode('EDIT');
    } else {
      setMode('ADD');
    }
  }, [params]);

  const {
    patch,
    data: patchData,
    loading: pathLoading,
  } = usePatch(`products/${params?.id}`);

  const {post, data: postData, loading: postLoading} = usePost(`products`);

  useEffect(() => {
    if (postData || patchData) {
      toast({
        title: 'Successfully!',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
      push('/home/content-management/products');
    }
  }, [postData, patchData]);

  const handleSubmit = ({name, category, thumb, grouping}) => {
    if (mode === 'ADD')
      post({
        name,
        category,
        grouping,
        mediaDestination: thumb,
      });
    if (mode === 'EDIT') {
      patch({
        name,
        category,
        grouping,
        mediaDestination: thumb,
      });
    }
  };

  const categoryRef = useRef<any>(null);
  const applicationRef = useRef<any>(null);
  const groupingRef = useRef<any>(null);

  useEffect(() => {
    categoryRef?.current?.select?.clearValue();
    groupingRef?.current?.select?.clearValue();
  }, [applicationId]);

  useEffect(() => {
    groupingRef?.current?.select?.clearValue();
  }, [categoryId]);

  const {
    getList: getListCategories,
    data: categoriesData,
    loading: categoriesLoading,
  } = useGetList<ICategorie>('categories');
  const {
    getList: getListGroupings,
    data: groupingsData,
    loading: groupingsLoading,
  } = useGetList<IGrouping>('groupings');

  const handleOnChange = ({application, category, grouping}) => {
    if (application && application > 0) setApplicationId(application);
    if (category && category > 0) setCategoryId(category);
    if (grouping && grouping > 0) setGroupingId(grouping);
  };

  useEffect(() => {
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

  useEffect(() => {
    const applicationId = data?.grouping?.category?.application?.id;
    const categoryId = data?.grouping?.category?.id;
    const groupingId = data?.grouping?.id;

    if (applicationId) {
      applicationRef?.current?.select?.setValue({
        value: applicationId,
        label: keyBy(allLineBusiness, 'id')?.[applicationId]?.name,
      });
      setApplicationId(applicationId);
    }
    if (categoryId) setCategoryId(categoryId);
    if (groupingId) setGroupingId(groupingId);
  }, [data]);

  useEffect(() => {
    if (categoriesData?.records && categoryId > 0) {
      categoryRef?.current?.select?.setValue({
        value: categoryId,
        label: keyBy(categoriesData?.records, 'id')?.[categoryId]?.name,
      });
    }
  }, [categoriesData, categoryId]);

  useEffect(() => {
    if (groupingsData?.records && groupingId > 0) {
      groupingRef?.current?.select?.setValue({
        value: groupingId,
        label: keyBy(groupingsData?.records, 'id')?.[groupingId]?.name,
      });
    }
  }, [groupingsData, groupingId]);

  return (
    <UI.Box py={5} px={7}>
      <UI.HStack
        w="full"
        _hover={{cursor: 'pointer'}}
        onClick={() => push('/home/content-management/products')}>
        <BsArrowLeft size={20} />
        <UI.Text fontSize={'14px'}>Back</UI.Text>
      </UI.HStack>
      <UI.Text fontSize="24px" fontWeight="bold">
        Content Management - Products
      </UI.Text>
      <UI.VStack
        spacing="20px"
        alignItems="flex-start"
        mt={3}
        py={5}
        px={7}
        bg="white"
        shadow="md">
        <UI.Text fontSize="16px" fontWeight="bold">
        {mode==="ADD" ? "ADD NEW" : mode}  PRODUCT
        </UI.Text>
        <LoadingComponent>
          <FormGenerate
            spacing={6}
            onChangeValue={handleOnChange}
            onSubmit={(value) => {
              handleSubmit(value);
            }}
            schema={{
              name: yup
                .string()
                .required('Please enter Product Name')
                .default(data?.name),
              application: yup
                .number()
                .required('Please select Line of Business'),
              category: yup.number().required('Please select Line of Product'),
              grouping: yup.number().required('Please select Product Group'),
              thumb: yup
                .string()
                .default(data?.mediaDestination)
                .required('Please upload or select an icon'),
            }}
            fields={[
              {
                name: 'name',
                type: 'input',
                label: 'Product Name',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
                defaultValue: data?.name,
              },
              {
                name: 'application',
                type: 'select',
                refEl: applicationRef,
                label: 'Select Line of Business',
                placeholder: 'Select Line of Business',
                size: 'md',
                layout: 'horizontal',
                isClearable: false,
                width: '70%',
                options: allLineBusiness?.map((x) => ({
                  value: x?.id,
                  label: x?.name,
                })),
              },
              {
                name: 'category',
                refEl: categoryRef,
                label: 'Select Line of Product',
                placeholder: 'Select Line of Product',
                layout: 'horizontal',
                width: '70%',
                isClearable: false,
                isDisabled: applicationId < 0,
                type: 'select',
                size: 'md',
                isLoading: categoriesLoading,
                options: categoriesData?.records?.map?.((x) => ({
                  value: x?.id,
                  label: x?.name,
                })),
              },
              {
                name: 'grouping',
                refEl: groupingRef,
                label: 'Select Product Group',
                placeholder: 'Select Product Group',
                layout: 'horizontal',
                width: '70%',
                isDisabled: categoryId < 0,
                isLoading: groupingsLoading,
                isClearable: false,
                type: 'select',
                size: 'md',
                options: groupingsData?.records?.map?.((x) => ({
                  value: x?.id,
                  label: x?.name,
                })),
              },
              {
                type: 'upload-file-contnet',
                layout: 'horizontal',
                name: 'thumb',
                defaultValue: data?.mediaDestination,
                isChooseStock: true,
                listStock: STOCK,
                colSpan: 12,
                width: '100%',
                size: 'md',
                urlPath: '/products/uploadThumbnailUrl',
              },
            ]}>
            <UI.Center mt={4} w="full">
              {mode === 'ADD' && (
                <UI.Button type={'submit'} isLoading={postLoading} w="150px">
                  Create
                </UI.Button>
              )}
              {mode === 'EDIT' && (
                <UI.Button type={'submit'} isLoading={pathLoading} w="150px">
                  Update
                </UI.Button>
              )}
            </UI.Center>
          </FormGenerate>
        </LoadingComponent>
      </UI.VStack>
    </UI.Box>
  );
}

export default Edit;
