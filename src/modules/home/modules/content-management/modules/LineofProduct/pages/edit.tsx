import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter, useGetList, useGetItem, usePatch} from '@utils/hooks';
import UploadFileContent from '@components/UploadFileContent';
import FormGenerate from '@components/FormGenerate';
import * as yup from 'yup';
import {useRouterController} from '@modules/router';
import {IApplication} from '@types';
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
    data: categoryData,
    getItem,
    loading: loadingCategory,
  } = useGetItem('/categories/');

  useEffect(() => {
    if (params?.id)
      getItem({relations: JSON.stringify(['application'])}, {path: params?.id});
  }, [params]);

  const {patch, data, loading} = usePatch(`categories/${categoryData?.id}`);

  const {getList: getListApplications, data: lineOfBusinessData} =
    useGetList<IApplication>('applications');

  useEffect(() => {
    getListApplications({
      limit: 9999,
    });
  }, []);

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
        application: value.application,
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

  return (
    <UI.Box py={5} px={7}>
      <LoadingComponent isLoading={loadingCategory}>
        <UI.HStack
          w="full"
          _hover={{cursor: 'pointer'}}
          onClick={() => push('/home/content-management/line-of-product')}>
          <BsArrowLeft size={20} />
          <UI.Text fontSize={'14px'}>Back</UI.Text>
        </UI.HStack>
        <UI.Text fontSize="24px" fontWeight="bold">
          Content Management - Line of Product
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
            EDIT LINE OF PRODUCT
          </UI.Text>
          {!isEmpty(categoryData) && (
            <FormGenerate
              spacing={6}
              onSubmit={(value) => {
                handleSubmit(value);
              }}
              schema={{
                name: yup
                  .string()
                  .required('Line of Product Name is required')
                  .default(categoryData?.name),
                application: yup
                  .number()
                  .required('Line of Business is required')
                  .default(categoryData?.application?.id),
              }}
              fields={[
                {
                  name: 'name',
                  type: 'input',
                  label: 'Line of Product Name',
                  size: 'md',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValue: categoryData?.name,
                },
                {
                  name: 'application',
                  type: 'select',
                  label: 'Select Line of Business',
                  placeholder: 'Select Line of Business',
                  size: 'md',
                  layout: 'horizontal',
                  width: '70%',
                  defaultValue: {
                    label: categoryData?.application?.name,
                    value: categoryData?.application?.id,
                  },
                  options: lineOfBusinessData?.records?.map((x) => ({
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
