import React, {useEffect, useState, useMemo} from 'react';
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

  const allLineBusinessKey = useMemo(
    () => keyBy(allLineBusiness, 'id'),
    [allLineBusiness],
  );
  // const categoryRef = useRef<any>(null);
  // const applicationRef = useRef<any>(null);

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

  const categoriesDataKey = useMemo(
    () => keyBy(categoriesData?.records, 'id'),
    [categoriesData],
  );

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

  const {post, loading: postLoading, data: postData} = usePost('/groupings');
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
    setCategoryId(category);
  };
  const handleOnChange = ({application}) => {
    setApplicationId(application || -1);
  };

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
      push(
        `/home/content-management/product-group?lineOfProduct=${categoryValue?.value}&lineOfBusiness=${applicationValue?.value}`,
      );
    }
  }, [postData, pathData]);

  const [applicationValue, setApplicationValue] = useState(null);
  const [categoryValue, setCategoryValue] = useState(null);

  useEffect(() => {
    if (applicationValue?.value > 0) {
      getListCategories({
        limit: 9999,
        filter: JSON.stringify([{application: applicationValue?.value}]),
      });
    }
  }, [applicationValue]);

  useEffect(() => {
    if (data) {
      const applicationId = data?.category?.application?.id;
      if (applicationId) {
        setApplicationValue({
          value: applicationId,
          label: allLineBusinessKey?.[applicationId]?.name,
        });
      }
    }
  }, [data, allLineBusinessKey]);

  useEffect(() => {
    if (data?.category?.id) {
      setCategoryValue({
        value: categoryId,
        label: categoriesDataKey?.[data?.category?.id]?.name,
      });
    }
  }, [data, categoriesDataKey]);

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
          {mode === 'ADD' ? 'ADD NEW' : mode} PRODUCT GROUP
        </UI.Text>
        <LoadingComponent isError={isNull(data)}>
          <FormGenerate
            spacing={6}
            onChangeValue={handleOnChange}
            key={data?.id}
            onSubmit={(data) => {
              handleSubmit({
                ...data,
                category: data?.category?.value,
                application: data?.application?.value,
              });
            }}
            schema={{
              name: yup
                .string()
                .required('Please enter Product Group Name')
                .default(data?.name),
              application: yup
                .object({
                  value: yup
                    .number()
                    .required('Please select Line of Business'),
                })
                .default({value: data?.category?.application?.id})
                .required(),
              category: yup
                .object({
                  value: yup.number().required('Please select Line of Product'),
                })
                .default({value: data?.category?.id})
                .required(),
              thumb: yup
                .string()
                .default(data?.mediaDestination)
                .required('Please upload or select an image'),
            }}
            fields={[
              {
                name: 'name',
                type: 'input',
                label: 'Product Group Name',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
                defaultValue: data?.name,
              },
              {
                name: 'application',
                type: 'select',
                label: 'Select Line of Business',
                placeholder: 'Select Line of Business',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
                isClearable: false,
                errorProperty: 'value',
                value: applicationValue,
                canControlsValue: true,
                onChangeValue: (data) => {
                  setCategoryValue(null);
                  setApplicationValue(data);
                },
                options: allLineBusiness?.map((x) => ({
                  value: x?.id,
                  label: x?.name,
                })),
              },
              {
                name: 'category',
                label: 'Select Line of Product',
                placeholder: 'Select Line of Product',
                layout: 'horizontal',
                width: '70%',
                isDisabled: applicationValue?.value < 0,
                type: 'select',
                size: 'md',
                isLoading: categoriesLoading,
                isClearable: false,
                canControlsValue: true,
                value: categoryValue,
                onChangeValue: (data) => {
                  setCategoryValue(data);
                },
                errorProperty: 'value',
                options: categoriesData?.records?.map?.((x) => ({
                  value: x?.id,
                  label: x?.name,
                })),
              },
              {
                type: 'upload-file-content',
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
