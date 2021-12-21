import React, {useEffect, useState, useMemo}  from 'react';
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
import {keyBy, isEmpty} from 'lodash';

const STOCK = [
  'https://i.imgur.com/Q04dMOc.png',
  'https://i.imgur.com/2NpnErN.png',
  'https://i.imgur.com/wSX6CPl.png',
  'https://i.imgur.com/Y3lAWKG.png',
  'https://i.imgur.com/1okhbVx.png',
];

function Edit() {
  const {push} = useRouter();
  const toast = UI.useToast();
  const [mode, setMode] = useState<'ADD' | 'EDIT'>('ADD');
  const {params} = useRouterController();
  const {data, getItem} = useGetItem(`/products/${params?.id}`);
  const [applicationId, setApplicationId] = useState(-1);
  const [categoryId, setCategoryId] = useState(-1);
  const [groupingId, setGroupingId] = useState(-1);
  const [applicationValue, setApplicationValue] = useState(null);
  const [categoryValue, setCategoryValue] = useState(null);
  const [groupingValue, setGroupingValue] = useState(null);

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

  const allLineBusiness = useContentManagementController(
    (s) => s.allLineBusiness,
  );

  const allLineBusinessKey = useMemo(
    () => keyBy(allLineBusiness, 'id'),
    [allLineBusiness],
  );

  const categoriesDataKey = useMemo(
    () => keyBy(categoriesData?.records, 'id'),
    [categoriesData],
  );

  const groupingsDataKey = useMemo(
    () => keyBy(groupingsData?.records, 'id'),
    [groupingsData],
  );



  useEffect(() => {
    if (applicationValue?.value > 0) {
      getListCategories({
        limit: 9999,
        filter: JSON.stringify([{application: applicationValue?.value}]),
      });
    }
  }, [applicationValue]);

  useEffect(() => {
    if (categoryValue?.value > 0) {
      getListGroupings({
        limit: 9999,
        filter: JSON.stringify([{category: categoryValue?.value}]),
      });
    }
  }, [categoryValue]);


  useEffect(() => {
    if (data) {
      if (data?.grouping?.category?.application?.id && !isEmpty(allLineBusinessKey)) {
        const applicationId = data?.grouping?.category?.application?.id
        setApplicationValue({
          value: applicationId,
          label: allLineBusinessKey?.[applicationId]?.name,
        });
      }
    }
  }, [data, allLineBusinessKey]);

  useEffect(() => {
    if (data?.grouping?.category?.id && !isEmpty(categoriesDataKey)) {
      const categoryId = data?.grouping?.category?.id
      setCategoryValue({
        value: categoryId,
        label: categoriesDataKey?.[categoryId]?.name,
      });
    }
  }, [data, categoriesDataKey]);

  useEffect(() => {
    if (data?.grouping?.id && !isEmpty(groupingsDataKey)) {
      const groupingId = data?.grouping?.id
      setGroupingValue({
        value: groupingId,
        label: groupingsDataKey?.[groupingId]?.name,
      });
    }
  }, [data, groupingsDataKey]);


  const handleOnChange = ({application, category, grouping}) => {
    if (application && application > 0) setApplicationId(application);
    if (category && category > 0) setCategoryId(category);
    if (grouping && grouping > 0) setGroupingId(grouping);
  };

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

  useEffect(() => {
    if (postData || patchData) {
      toast({
        title: 'Successfully!',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
      push(
        `/home/content-management/products?productGroup=${groupingValue?.value}&lineOfProduct=${categoryValue?.value}&lineOfBusiness=${applicationValue?.value}`,
      );
    }
  }, [postData, patchData]);

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
          {mode === 'ADD' ? 'ADD NEW' : mode} PRODUCT
        </UI.Text>
        <LoadingComponent>
          <FormGenerate
            spacing={6}
            onChangeValue={handleOnChange}
            key={data?.id}
            onSubmit={(data) => {
              handleSubmit({
                ...data,
                category: data?.category?.value,
                application: data?.application?.value,
                grouping: data?.grouping?.value
              });
            }}
            schema={{
              name: yup
                .string()
                .required('Please enter Product Name')
                .default(data?.name),
              application: yup
                .object({
                  value: yup
                    .number()
                    .required('Please select Line of Business'),
                })
                .default({value: data?.grouping?.category?.application?.id})
                .required(),
              category: yup
                .object({
                  value: yup.number().required('Please select Line of Product'),
                })
                .default({value: data?.grouping?.category?.id})
                .required(),
              grouping: yup
                .object({
                  value: yup.number().required('Please select Product Group'),
                })
                .default({value: data?.grouping?.id})
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
                label: 'Product Name',
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
                isClearable: false,
                width: '70%',
                errorProperty: 'value',
                value: applicationValue,
                canControlsValue: true,
                onChangeValue: (data) => {
                  setCategoryValue(null);
                  setGroupingValue(null);
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
                isClearable: false,
                isDisabled: applicationValue?.value < 0,
                type: 'select',
                size: 'md',
                canControlsValue: true,
                value: categoryValue,
                onChangeValue: (data) => {
                  setGroupingValue(null);
                  setCategoryValue(data);
                },
                errorProperty: 'value',
                isLoading: categoriesLoading,
                options: categoriesData?.records?.map?.((x) => ({
                  value: x?.id,
                  label: x?.name,
                })),
              },
              {
                name: 'grouping',
                label: 'Select Product Group',
                placeholder: 'Select Product Group',
                layout: 'horizontal',
                width: '70%',
                isDisabled: categoryValue?.value < 0,
                isLoading: groupingsLoading,
                isClearable: false,
                type: 'select',
                size: 'md',
                canControlsValue: true,
                value: groupingValue,
                onChangeValue: (data) => {
                  setGroupingValue(data);
                },
                errorProperty: 'value',
                options: groupingsData?.records?.map?.((x) => ({
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
