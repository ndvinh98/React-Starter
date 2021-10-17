import React, {useEffect, useRef} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter, useGetList, useGetItem, usePatch} from '@utils/hooks';
import UploadFileContent from '@components/UploadFileContent';
import FormGenerate from '@components/FormGenerate';
import * as yup from 'yup';
import {useRouterController} from '@modules/router';
import {IApplication, ICategorie, IGrouping} from '@types';
import {isEmpty} from 'lodash';
import LoadingComponent from '@components/LoadingComponent';

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
  const {params} = useRouterController();
  let mediaDestination = '';
  const {
    data: productData,
    getItem,
    loading: loadingProduct,
  } = useGetItem('/products/');

  useEffect(() => {
    if (params?.id)
      getItem({relations: JSON.stringify(['grouping'])}, {path: params?.id});
  }, [params]);

  const {patch, data, loading} = usePatch(`products/${productData?.id}`);

  useEffect(() => {
    if (data) {
      toast({
        title: 'Successfully!',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
    }
  }, [data]);

  const handleSubmit = (value) => {
    if (value && mediaDestination) {
      patch({
        name: value.name,
        grouping: value.category,
        mediaDestination,
      });
    };
    if (!mediaDestination){
      toast({
        title: 'Please upload file!',
        status: 'error',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  /////
  const {getList: getListApplications, data: lineOfBusinessData} =
    useGetList<IApplication>('applications');

  useEffect(() => {
    getListApplications({
      limit: 9999,
    });
  }, []);

  const categoryRef = useRef<any>(null);
  const applicationRef = useRef<any>(null);
  const groupingRef = useRef<any>(null);

  useEffect(() => {
    categoryRef?.current?.select?.clearValue();
    groupingRef?.current?.select?.clearValue();
  },[applicationRef?.current?.state?.value?.value])

  useEffect(() => {
    groupingRef?.current?.select?.clearValue();
  },[categoryRef?.current?.state?.value?.value])

  const {getList: getListCategories, data: categoriesData} = useGetList<ICategorie>('categories');
  const {getList: getListGroupings, data: groupingsData} = useGetList<IGrouping>('groupings');

  const handleOnChange = ({application, category}) => {
    if (application) {
      getListCategories({limit:9999,filter: JSON.stringify([{application: application}])});
    }
    if (category) getListGroupings({limit:9999,filter: JSON.stringify([{category: category}])})
  };

  return (
    <UI.Box py={5} px={7}>
      <LoadingComponent isLoading={loadingProduct}>
        <UI.HStack
          w="full"
          _hover={{cursor: 'pointer'}}
          onClick={() => push('/home/content-management/product-group')}>
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
            EDIT PRODUCT
          </UI.Text>
          {!isEmpty(productData) && (
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
                  .default(productData?.name),
                  application: yup.number().required('Line of Business is required'),
                  category: yup.number().required('Line of Product is required'),
                  grouping: yup.number().required('Product Group is required'),
              }}
              fields={[
                {
                  name: 'name',
                  type: 'input',
                  label: 'Line of Product Name',
                  size: 'md',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValue: productData?.name,
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
                  // defaultValue: {
                  //   label: productData?.application?.name,
                  //   value: productData?.application?.id,
                  // },
                  options: lineOfBusinessData?.records?.map((x) => ({
                    value: x?.id,
                    label: x?.name,
                  })),
                },
                {
                  name: 'category',
                  refEl: categoryRef,
                  label:  'Select Line of Product',
                  placeholder: 'Select Line of Product',
                  layout: 'horizontal',
                  width: '70%',
                  isDisabled: applicationRef?.current?.state?.value?.value ? false : true,
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
                  label:  'Select Product Group',
                  placeholder: 'Select Product Group',
                  layout: 'horizontal',
                  width: '70%',
                  isDisabled: categoryRef?.current?.state?.value?.value ? false : true,
                  type: 'select',
                  size: 'md',
                  options: groupingsData?.records?.map?.((x) => ({
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
                  Save
                </UI.Button>
              </UI.Center>
            </FormGenerate>
          )}
        </UI.VStack>
      </LoadingComponent>
    </UI.Box>
  );
}

export default Edit;
