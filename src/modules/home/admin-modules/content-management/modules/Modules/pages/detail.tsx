import React, {useEffect, useRef, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter, usePost, usePatch, useGetItem} from '@utils/hooks';
import FormGenerate from '@components/FormGenerate';
import {useGetList} from '@utils/hooks';
import {ICategorie, IGrouping, IProduct} from '@types';
import * as yup from 'yup';
import {useContentManagementController} from '@modules/home';
import {useRouterController} from '@modules/router';
import {keyBy} from 'lodash';

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
  const allLineBusiness = useContentManagementController(
    (s) => s.allLineBusiness,
  );
  const {push} = useRouter();
  const toast = UI.useToast();
  const [mode, setMode] = useState<'ADD' | 'EDIT'>('ADD');
  const {params} = useRouterController();
  const {data, getItem} = useGetItem(`/productModules/${params?.id}`);
  const [productIdBack, setProductIdBack] = useState()

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
        `/home/content-management/modules?productId=${productIdBack}&productGroup=${groupingId}&lineOfProduct=${categoryId}&lineOfBusiness=${applicationId}`,
      );
    }
  }, [postData, pathData]);

  const handleSubmit = ({name, product, mediaType, thumb}) => {
    setProductIdBack(product);
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

  ///
  const categoryRef = useRef<any>(null);
  const applicationRef = useRef<any>(null);
  const groupingRef = useRef<any>(null);
  const productRef = useRef<any>(null);
  const mediaTypeRef = useRef<any>(null);

  const [mediaType, setMediaType] = useState();
  const [applicationId, setApplicationId] = useState(-1);
  const [categoryId, setCategoryId] = useState(-1);
  const [groupingId, setGroupingId] = useState(-1);
  const [productId, setProductId] = useState(-1);

  useEffect(() => {
    categoryRef?.current?.select?.clearValue();
    groupingRef?.current?.select?.clearValue();
    productRef?.current?.select?.clearValue();
  }, [applicationId]);

  useEffect(() => {
    groupingRef?.current?.select?.clearValue();
    productRef?.current?.select?.clearValue();
  }, [categoryId]);

  useEffect(() => {
    productRef?.current?.select?.clearValue();
  }, [groupingId]);

  const {getList: getListCategories, data: categoriesData} =
    useGetList<ICategorie>('categories');
  const {getList: getListGroupings, data: groupingsData} =
    useGetList<IGrouping>('groupings');
  const {getList: getListProduct, data: productsData} =
    useGetList<IProduct>('products');

  const handleOnChange = ({application, category, grouping}) => {
    if (mediaType && mediaType !== -1) setMediaType(mediaType);
    if (application > 0) setApplicationId(application);
    if (category > 0) setCategoryId(category);
    if (grouping > 0) setGroupingId(grouping);
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

  useEffect(() => {
    if (categoryId > 0) {
      getListGroupings({
        limit: 9999,
        filter: JSON.stringify([{category: categoryId}]),
      });
    }
  }, [categoryId]);

  useEffect(() => {
    if (groupingId > 0) {
      getListProduct({
        limit: 9999,
        filter: JSON.stringify([{grouping: groupingId}]),
      });
    }
  }, [groupingId]);

  useEffect(() => {
    const applicationId = data?.product?.grouping?.category?.application?.id;
    const categoryId = data?.product?.grouping?.category?.id;
    const groupingId = data?.product?.grouping?.id;
    const productId = data?.product?.id;

    if (applicationId) {
      applicationRef?.current?.select?.setValue({
        value: applicationId,
        label: keyBy(allLineBusiness, 'id')?.[applicationId]?.name,
      });
      setApplicationId(applicationId);
    }
    if (categoryId) setCategoryId(categoryId);
    if (groupingId) setGroupingId(groupingId);
    if (productId) setProductId(productId);
    if (data?.mediaType) setMediaType(data?.mediaType);
  }, [data]);

  useEffect(() => {
    if (mediaType && mediaType !== -1) {
      mediaTypeRef?.current?.select?.setValue({
        value: mediaType,
        label: mediaType,
      });
    }
  }, [mediaType]);

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

  useEffect(() => {
    if (productsData?.records && productId > 0) {
      productRef?.current?.select?.setValue({
        value: productId,
        label: keyBy(productsData?.records, 'id')?.[productId]?.name,
      });
    }
  }, [productsData, productId]);

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
          onSubmit={handleSubmit}
          schema={{
            name: yup
              .string()
              .default(data?.name)
              .required('Please enter Module Name'),
            mediaType: yup
              .string()
              .default(data?.mediaType)
              .required('Please select Media Type'),
            application: yup
              .number()
              .default(data?.product?.grouping?.category?.application?.id)
              .typeError('Please select Line of Business')
              .required('Please select Line of Business'),
            category: yup
              .number()
              .typeError('Please select Line of Product')
              .default(data?.product?.grouping?.category?.id)
              .required('Please select Line of Product'),
            grouping: yup
              .number()
              .typeError('Please select Product Group')
              .default(data?.product?.grouping?.id)
              .required('Please select Product Group'),
            product: yup
              .number()
              .typeError('Please select Product')
              .default(data?.product?.id)
              .required('Please select Product'),
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
              refEl: mediaTypeRef,
              label: 'Select Media Type',
              placeholder: 'Select Media Type',
              size: 'md',
              layout: 'horizontal',
              width: '70%',
              isClearable: false,
              options: MEDIA_TYPE?.map((x) => ({
                value: x,
                label: x,
              })),
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
              isDisabled: applicationId < 0,
              type: 'select',
              isClearable: false,
              size: 'md',
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
              isClearable: false,
              type: 'select',
              size: 'md',
              options: groupingsData?.records?.map?.((x) => ({
                value: x?.id,
                label: x?.name,
              })),
            },
            {
              name: 'product',
              refEl: productRef,
              label: 'Select Product',
              placeholder: 'Select Product',
              layout: 'horizontal',
              width: '70%',
              isDisabled: groupingId < 0,
              type: 'select',
              size: 'md',
              isClearable: false,
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
