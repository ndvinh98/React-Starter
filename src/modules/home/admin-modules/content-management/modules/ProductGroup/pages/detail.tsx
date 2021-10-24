import React, {useEffect, useRef, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {
  useRouter,
  useGetItem,
  useGetList,
  usePost,
  usePatch,
} from '@utils/hooks';
import FormGenerate from '@components/FormGenerate';
import * as yup from 'yup';
import {useRouterController} from '@modules/router';
import {useContentManagementController} from '@modules/home';
import {ICategorie} from '@types';
import {isNull, keyBy} from 'lodash';
import LoadingComponent from '@components/LoadingComponent';

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
  const categoryRef = useRef<any>(null);
  const applicationRef = useRef<any>(null);

  const {params} = useRouterController();
  const [mode, setMode] = useState<'ADD' | 'EDIT'>('ADD');
  const {push} = useRouter();
  const {data, getItem} = useGetItem(`/groupings/${params?.id}`);
  const [applicationId, setApplicationId] = useState(-1);
  const [categoryId, setCategoryId] = useState(-1);

  const {
    getList: getListCategories,
    data: categoriesData,
    loading: categoriesLoading,
  } = useGetList<ICategorie>('categories');

  useEffect(() => {
    if (params?.id && params?.id !== 'add') {
      getItem({
        relations: JSON.stringify(['category', 'category.application']),
      });
      setMode('EDIT');
    } else {
      setMode('ADD');
    }
  }, [params]);

  const {post, loading: postLoading, data: postData} = usePost('/categories');
  const {
    patch,
    loading: pathLoading,
    data: pathData,
  } = usePatch(`/groupings/${params?.id}`);

  const handleSubmit = ({application, category, name, thumb}) => {
    if (mode === 'ADD')
      post({
        name,
        application,
        category,
        mediaDestination: thumb,
      });
    if (mode === 'EDIT') {
      patch({
        name,
        application,
        category,
        mediaDestination: thumb,
      });
    }
  };
  const handleOnChange = ({application}) => {
    setApplicationId(application || -1);
  };

  useEffect(() => {
    if (applicationId > 0) {
      categoryRef?.current?.select?.clearValue();
      getListCategories({
        limit: 9999,
        filter: JSON.stringify([{application: applicationId}]),
      });
    }
  }, [applicationId]);

  const toast = UI.useToast();
  useEffect(() => {
    if (postData || pathData) {
      toast({
        title: 'Successfully!',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
      push('/home/content-management/product-group');
    }
  }, [postData, pathData]);

  useEffect(() => {
    const applicationId = data?.category?.application?.id;
    const categoryId = data?.category?.id;
    if (applicationId) {
      applicationRef?.current?.select?.setValue({
        value: applicationId,
        label: keyBy(allLineBusiness, 'id')?.[applicationId]?.name,
      });
      setApplicationId(applicationId);
    }
    if (categoryId) setCategoryId(categoryId);
  }, [data]);

  const initData = useRef(true);
  useEffect(() => {
    if (categoriesData?.records && categoryId && initData.current) {
      categoryRef?.current?.select?.setValue({
        value: categoryId,
        label: keyBy(categoriesData?.records, 'id')?.[categoryId]?.name,
      });
      initData.current = false;
    }
  }, [categoriesData]);

  return (
    <UI.Box py={5} px={7}>
      <UI.HStack
        w="full"
        _hover={{cursor: 'pointer'}}
        onClick={() => push('/home/content-management/product-group')}>
        <BsArrowLeft size={20} />
        <UI.Text fontSize={'14px'}>Back</UI.Text>
      </UI.HStack>
      <UI.Text fontSize="24px" fontWeight="bold">
        Content Management - Product Group
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
          EDIT PRODUCT GROUP
        </UI.Text>
        <LoadingComponent isError={isNull(data)}>
          <FormGenerate
            spacing={6}
            onChangeValue={handleOnChange}
            onSubmit={(value) => {
              handleSubmit(value);
            }}
            schema={{
              name: yup
                .string()
                .required('Line of Product Name is required')
                .default(data?.name),
              application: yup
                .number()
                .required('Please select Line of Business'),
              category: yup
                .number()
                .typeError('Please select Line of Product')
                .required('Please select Line of Product'),
              thumb: yup
                .string()
                .default(data?.mediaDestination)
                .required('Thumb is required'),
            }}
            fields={[
              {
                name: 'name',
                type: 'input',
                label: 'Line of Product Name',
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
                width: '70%',
                isClearable: false,
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
                isDisabled: applicationId < 0,
                type: 'select',
                size: 'md',
                isLoading: categoriesLoading,
                isClearable: false,
                options: categoriesData?.records?.map?.((x) => ({
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
