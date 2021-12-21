import React, {useEffect, useMemo, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter, usePost, usePatch, useGetItem} from '@utils/hooks';
import FormGenerate from '@components/FormGenerate';
import {useGetList} from '@utils/hooks';
import {ICategorie, IGrouping, IProduct} from '@types';
import * as yup from 'yup';
import {useContentManagementController} from '@modules/home';
import {useRouterController} from '@modules/router';
import {keyBy, isEmpty} from 'lodash';

const STOCK = [
  'https://i.imgur.com/bkSeJLO.png',
  'https://i.imgur.com/fdw9rPG.png',
  'https://i.imgur.com/1rbFlw9.png',
  'https://i.imgur.com/YrMF0sJ.png',
  'https://i.imgur.com/6i8WZcA.png',
  'https://i.imgur.com/UBtbu6v.png',
  'https://i.imgur.com/W5a9L20.png',
  'https://i.imgur.com/zCOxHFq.png',
  'https://i.imgur.com/CB7v9TS.png',
  'https://i.imgur.com/OeouoPm.png',
  'https://i.imgur.com/C4orAXH.png',
  'https://i.imgur.com/pWt4xGE.png',
  'https://i.imgur.com/uzqxhL6.png',
  'https://i.imgur.com/qPM9VTA.png',
  'https://i.imgur.com/ic4gKes.png',
  'https://i.imgur.com/9HGgUZv.png',
  'https://i.imgur.com/QfdgXMP.png',
  'https://i.imgur.com/GUCcNGx.png',
  'https://i.imgur.com/EKpwL6c.png',
  'https://i.imgur.com/cicFJvg.png',
  'https://i.imgur.com/OQTAPtF.png',
  'https://i.imgur.com/VIOUKbE.png',
  'https://i.imgur.com/xWUDb9W.png',
  'https://i.imgur.com/pZumQI2.png',
  'https://i.imgur.com/Ql4ZYtL.png',
  'https://i.imgur.com/iSxfB38.png',
];

const MEDIA_TYPE = ['VIDEOS', 'DOCUMENTS', 'IMAGES'];

function AddNew() {
  const {push} = useRouter();
  const toast = UI.useToast();
  const [mode, setMode] = useState<'ADD' | 'EDIT'>('ADD');
  const {params} = useRouterController();
  const {data, getItem} = useGetItem(`/productModules/${params?.id}`);
  const [applicationId, setApplicationId] = useState(-1);
  const [categoryId, setCategoryId] = useState(-1);
  const [groupingId, setGroupingId] = useState(-1);
  const [productId, setProductId] = useState(-1);
  const [applicationValue, setApplicationValue] = useState(null);
  const [categoryValue, setCategoryValue] = useState(null);
  const [groupingValue, setGroupingValue] = useState(null);
  const [productValue, setProductValue] = useState(null);
  const [mediaTypeValue, setMediaTypeValue] = useState(null);




  useEffect(() => {
    if (params?.id && params?.id !== 'add') {
      getItem({
        relations: JSON.stringify([
          'product',
          'product.grouping',
          'product.grouping.category',
          'product.grouping.category.application',
        ]),
      });
      setMode('EDIT');
    } else {
      setMode('ADD');
    }
  }, [params]);

  const {
    post,
    loading: postLoading,
    data: postData,
  } = usePost('/productModules');

  const {
    patch,
    loading: pathLoading,
    data: pathData,
  } = usePatch(`/productModules/${params?.id}`);

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
        `/home/content-management/modules?productId=${productValue?.value}&productGroup=${groupingValue?.value}&lineOfProduct=${categoryValue?.value}&lineOfBusiness=${applicationValue?.value}`,
      );
    }
  }, [postData, pathData]);

  const handleSubmit = ({name, product, mediaType, thumb}) => {
    if (mode === 'ADD')
      post({
        name,
        productId: product,
        moduleType: name.split(' ').join(''),
        mediaType: mediaType,
        mediaDestination: thumb,
      });

    if (mode === 'EDIT')
      patch({
        name,
        productId: product,
        moduleType: name.split(' ').join(''),
        mediaType: mediaType,
        mediaDestination: thumb,
      });
  };

  const {getList: getListCategories, data: categoriesData} =
    useGetList<ICategorie>('categories');
  const {getList: getListGroupings, data: groupingsData} =
    useGetList<IGrouping>('groupings');
  const {getList: getListProduct, data: productsData} =
    useGetList<IProduct>('products');

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

  const productDataKey = useMemo(
    () => keyBy(productsData?.records, 'id'),
    [productsData],
  );

  

  const handleOnChange = ({application, category, grouping, product}) => {
    if (application > 0) setApplicationId(application);
    if (category > 0) setCategoryId(category);
    if (grouping > 0) setGroupingId(grouping);
    if (product > 0) setProductId(product);

  };

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
    if (groupingValue?.value > 0) {
      getListProduct({
        limit: 9999,
        filter: JSON.stringify([{grouping: groupingValue?.value}]),
      });
    }
  }, [groupingValue]);

  useEffect(()=>{
    if(data){
      setMediaTypeValue({
        value: data?.mediaType,
        label: data?.mediaType,
      });
    }
  },[data]);

  useEffect(() => {
    if (data) {
      if (data?.product?.grouping?.category?.application?.id && !isEmpty(allLineBusinessKey)) {
        const applicationId = data?.product?.grouping?.category?.application?.id
        setApplicationValue({
          value: applicationId,
          label: allLineBusinessKey?.[applicationId]?.name,
        });
      }
    }
  }, [data, allLineBusinessKey]);

  useEffect(() => {
    if (data?.product?.grouping?.category?.id && !isEmpty(categoriesDataKey)) {
      const categoryId = data?.product?.grouping?.category?.id
      setCategoryValue({
        value: categoryId,
        label: categoriesDataKey?.[categoryId]?.name,
      });
    }
  }, [data, categoriesDataKey]);

  useEffect(() => {
    if (data?.product?.grouping?.id && !isEmpty(groupingsDataKey)) {
      const groupingId = data?.product?.grouping?.id
      setGroupingValue({
        value: groupingId,
        label: groupingsDataKey?.[groupingId]?.name,
      });
    }
  }, [data, groupingsDataKey]);

  useEffect(() => {
    if (data?.product?.id && !isEmpty(productDataKey)) {
      const productId = data?.product?.id
      setProductValue({
        value: productId,
        label: productDataKey?.[productId]?.name,
      });
    }
  }, [data, productDataKey]);

  return (
    <UI.Box py={5} px={7}>
      <UI.HStack
        w="full"
        _hover={{cursor: 'pointer'}}
        onClick={() => push('/home/content-management/modules')}>
        <BsArrowLeft size={20} />
        <UI.Text fontSize={'14px'}>Back</UI.Text>
      </UI.HStack>
      <UI.Text fontSize="24px" fontWeight="bold">
        Content Management - Modules
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
          {mode === 'ADD' ? 'ADD NEW' : mode} MODULE
        </UI.Text>
        <FormGenerate
          onChangeValue={handleOnChange}
          spacing={6}
          onSubmit={(data) => {
            handleSubmit({
              ...data,
              category: data?.category?.value,
              application: data?.application?.value,
              grouping: data?.grouping?.value,
              product: data?.product?.value,
              mediaType: data?.mediaType?.value,
            });
          }}
          schema={{
            name: yup
              .string()
              .default(data?.name)
              .required('Please enter Module Name'),
            mediaType: yup
              .object({
                value: yup.string().required('Please select Media Type'),
              })
              .default({value: data?.mediaType})
              .required(),
            application: yup
              .object({
                value: yup
                  .number()
                  .required('Please select Line of Business'),
              })
              .default({value: data?.product?.grouping?.category?.application?.id})
              .required(),
            category: yup
              .object({
                value: yup.number().required('Please select Line of Product'),
              })
              .default({value: data?.product?.grouping?.category?.id})
              .required(),
            grouping: yup
              .object({
                value: yup.number().required('Please select Product Group'),
              })
              .default({value: data?.product?.grouping?.id})
              .required(),
            product: yup
              .object({
                value: yup.number().required('Please select Product'),
              })
              .default({value: data?.product?.id})
              .required(),
            thumb: yup
              .string()
              .default(data?.mediaDestination)
              .required('Please upload or select an icon'),
          }}
          fields={[
            {
              name: 'name',
              type: 'input',
              label: 'Module Name',
              size: 'md',
              layout: 'horizontal',
              width: '70%',
              defaultValue: data?.name,
            },
            {
              name: 'mediaType',
              type: 'select',
              label: 'Select Media Type',
              placeholder: 'Select Media Type',
              size: 'md',
              layout: 'horizontal',
              width: '70%',
              isClearable: false,
              errorProperty: 'value',
              value: mediaTypeValue,
              onChangeValue: (data) => {
                setMediaTypeValue(data)
              },
              canControlsValue: true,
              options: MEDIA_TYPE?.map((x) => ({
                value: x,
                label: x,
              })),
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
                setProductValue(null);
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
                setProductValue(null);
                setCategoryValue(data);
              },
              errorProperty: 'value',
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
              isClearable: false,
              type: 'select',
              size: 'md',
              canControlsValue: true,
              value: groupingValue,
              onChangeValue: (data) => {
                setGroupingValue(data);
                setProductValue(null);
              },
              errorProperty: 'value',
              options: groupingsData?.records?.map?.((x) => ({
                value: x?.id,
                label: x?.name,
              })),
            },
            {
              name: 'product',
              label: 'Select Product',
              placeholder: 'Select Product',
              layout: 'horizontal',
              width: '70%',
              isDisabled: productValue?.value < 0,
              isClearable: false,
              type: 'select',
              size: 'md',
              canControlsValue: true,
              value: productValue,
              onChangeValue: (data) => {
                setProductValue(data);
              },
              errorProperty: 'value',
              options: productsData?.records?.map?.((x) => ({
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
              isListStockIcon: true,
              description: 'Recommended size: 48px x 48px',
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
      </UI.VStack>
    </UI.Box>
  );
}

export default AddNew;
