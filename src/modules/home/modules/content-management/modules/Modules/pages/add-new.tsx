import React, {useEffect, useRef} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter, usePost} from '@utils/hooks';
import UploadFileContent from '@components/UploadFileContent';
import FormGenerate from '@components/FormGenerate';
import {useGetList} from '@utils/hooks';
import {IApplication, ICategorie, IGrouping, IProduct} from '@types';
import * as yup from 'yup';

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
  let mediaDestination = '';
  const {post, loading, data: postData} = usePost('/productModules');
  useEffect(() => {
    if (postData) {
      toast({
        title: 'Successfully!',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
    }
  }, [postData]);

  const handleSubmit = (value) => {
    if (value && mediaDestination) {
      post({
        name: value.name,
        productId: value.product,
        moduleType: value.name.split(' ').join(''),
        mediaType: value.mediaType,
        mediaDestination,
      });
    }
  };

  ///
  const categoryRef = useRef<any>(null);
  const applicationRef = useRef<any>(null);
  const groupingRef = useRef<any>(null);
  const productRef = useRef<any>(null);

  useEffect(() => {
    categoryRef?.current?.select?.clearValue();
    groupingRef?.current?.select?.clearValue();
    productRef?.current?.select?.clearValue();
  }, [applicationRef?.current?.state?.value?.value]);

  useEffect(() => {
    groupingRef?.current?.select?.clearValue();
    productRef?.current?.select?.clearValue();
  }, [categoryRef?.current?.state?.value?.value]);

  useEffect(() => {
    productRef?.current?.select?.clearValue();
  }, [groupingRef?.current?.state?.value?.value]);

  //const {getList: getListApplications, data: lineOfBusinessData} = useGetList<IApplication>('applications');
  const {getList: getListCategories, data: categoriesData} =
    useGetList<ICategorie>('categories');
  const {getList: getListGroupings, data: groupingsData} =
    useGetList<IGrouping>('groupings');
  const {getList: getListProduct, data: productsData} =
    useGetList<IProduct>('products');
  const {getList: getListApplications, data: lineOfBusinessData} =
    useGetList<IApplication>('applications');

  useEffect(() => {
    getListApplications({
      limit: 9999,
    });
  }, []);
  const handleOnChange = ({application, category, grouping}) => {
    if (application)
      getListCategories({
        limit: 9999,
        filter: JSON.stringify([{application: application}]),
      });
    if (category)
      getListGroupings({
        limit: 9999,
        filter: JSON.stringify([{category: category}]),
      });
    if (grouping)
      getListProduct({
        limit: 9999,
        filter: JSON.stringify([{grouping: grouping}]),
      });
  };

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
          ADD NEW MODULE
        </UI.Text>
        <FormGenerate
          onChangeValue={handleOnChange}
          spacing={6}
          onSubmit={(value) => {
            handleSubmit(value);
          }}
          schema={{
            name: yup.string().required('Module Name is required'),
            mediaType: yup.string().required('Media Type is required'),
            application: yup.number().required('Line of Business is required'),
            category: yup.number().required('Line of Product is required'),
            grouping: yup.number().required('Product Group is required'),
            product: yup.number().required('Product is required'),
          }}
          fields={[
            {
              name: 'name',
              type: 'input',
              label: 'Module Name',
              size: 'md',
              layout: 'horizontal',
              width: '70%',
            },
            {
              name: 'mediaType',
              type: 'select',
              label: 'Select Media Type',
              placeholder: 'Select Media Type',
              size: 'md',
              layout: 'horizontal',
              width: '70%',
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
              width: '70%',
              options: lineOfBusinessData?.records?.map((x) => ({
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
              isDisabled: applicationRef?.current?.state?.value?.value
                ? false
                : true,
              type: 'select',
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
              isDisabled: categoryRef?.current?.state?.value?.value
                ? false
                : true,
              type: 'select',
              size: 'md',
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
              isDisabled: groupingRef?.current?.state?.value?.value
                ? false
                : true,
              type: 'select',
              size: 'md',
              options: productsData?.records?.map?.((x) => ({
                value: x?.id,
                label: x?.name,
              })),
            },
            {
              type: 'decor',
              layout: 'horizontal',
              colSpan: 12,
              width: '100%',
              size: 'md',
              DecorComponent: () => (
                <UploadFileContent
                  urlPath={'/products/uploadThumbnailUrl'}
                  isChooseStock={true}
                  listStock={STOCK}
                  isListStockIcon={true}
                  description={'Recommended size: 48px x 48px'}
                  label={'Add Icon'}
                  callBack={(value) => {
                    mediaDestination = value;
                    //console.log(thumb);
                  }}
                />
              ),
            },
          ]}>
          <UI.Center mt={4} w="full">
            <UI.Button type={'submit'} isLoading={loading} w="150px">
              Create
            </UI.Button>
          </UI.Center>
        </FormGenerate>
      </UI.VStack>
    </UI.Box>
  );
}

export default AddNew;
