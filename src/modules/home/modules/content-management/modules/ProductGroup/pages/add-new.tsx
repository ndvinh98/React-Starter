import React, {useEffect, useRef} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter, usePost} from '@utils/hooks';
import UploadFileContent from '@components/UploadFileContent';
import FormGenerate from '@components/FormGenerate';
import {useGetList} from '@utils/hooks';
import {IApplication, ICategorie} from '@types';
import * as yup from 'yup';
import LoadingComponent from '@components/LoadingComponent';


const STOCK = [
  'https://i.imgur.com/Q04dMOc.png',
  'https://i.imgur.com/2NpnErN.png',
  'https://i.imgur.com/wSX6CPl.png',
  'https://i.imgur.com/Y3lAWKG.png',
  'https://i.imgur.com/1okhbVx.png',
];

function AddNew() {
  const {push} = useRouter();
  const toast = UI.useToast();
  let mediaDestination = '';
  const {post, loading, data: postData} = usePost('/groupings');
  useEffect(() => {
    if (postData) {
      toast({
        title: 'Successfully!',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
      push('/home/content-management/line-of-product');
    }
  }, [postData]);

  const handleSubmit = (value) => {
    if (value && mediaDestination) {
      post({
        name: value.name,
        category: value.category,
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

  ///

  const {getList: getListApplications,loading: loadingApplication, data: lineOfBusinessData} =
    useGetList<IApplication>('applications');

  useEffect(() => {
    getListApplications({
      limit: 9999,
    });
  }, []);

  const handleOnChange = ({application}) => {
    if (application) {
      getListCategories({
        limit: 9999,
        filter: JSON.stringify([{application: application}]),
      });
    }
  };

  const {
    getList: getListCategories,
    data: categoriesData,
  } = useGetList<ICategorie>('categories');

  const categoryRef = useRef<any>(null);
  const applicationRef = useRef<any>(null);

  useEffect(() => {
    categoryRef?.current?.select?.clearValue();
  }, [applicationRef?.current?.state?.value?.value]);

  return (
    <LoadingComponent isLoading={loadingApplication}>
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
          ADD NEW PRODUCT GROUP
        </UI.Text>
        <FormGenerate
          onChangeValue={handleOnChange}
          spacing={6}
          onSubmit={(value) => {
            handleSubmit(value);
          }}
          schema={{
            name: yup.string().required('Product Group Name is required'),
            application: yup.number().required('Line of Business is required'),
            category: yup.number().required('Line of Product is required'),
          }}
          fields={[
            {
              name: 'name',
              type: 'input',
              label: 'Product Group Name',
              size: 'md',
              layout: 'horizontal',
              width: '70%',
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
              Create
            </UI.Button>
          </UI.Center>
        </FormGenerate>
      </UI.VStack>
    </UI.Box>
    </LoadingComponent>
  );
}

export default AddNew;
