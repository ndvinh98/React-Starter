import React, {useEffect, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter, usePost, useGetItem, usePatch} from '@utils/hooks';
import FormGenerate from '@components/FormGenerate';
import * as yup from 'yup';
import {useRouterController} from '@modules/router';
import LoadingComponent from '@components/LoadingComponent';
import {isNull} from 'lodash';
import {
  useContentManagementController,
  useTierManagementContoller,
} from '@modules/home';

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
  const {params} = useRouterController();
  const {getItem, data} = useGetItem(`/applications/${params?.id}`);
  const [mode, setMode] = useState<'ADD' | 'EDIT'>('ADD');
  const getAllLineBusiness = useContentManagementController(
    (s) => s.getAllLineBusiness,
  );
  const getProducts = useTierManagementContoller((s) => s.getProducts);

  useEffect(() => {
    if (params?.id && params?.id !== 'add') {
      getItem();
      setMode('EDIT');
    } else {
      setMode('ADD');
    }
  }, [params]);

  const {post, loading: postLoading, data: postData} = usePost('/applications');
  const {
    patch,
    loading: pathLoading,
    data: pathData,
  } = usePatch(`/applications/${params?.id}`);

  useEffect(() => {
    if (postData || pathData) {
      toast({
        title: 'Successfully!',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
      getAllLineBusiness();
      getProducts();
      push('/home/content-management/line-of-business');
    }
  }, [postData, pathData]);

  const handleSubmit = ({name, thumb}) => {
    if (mode === 'ADD')
      post({
        name,
        lineOfBusiness: 1,
        mediaDestination: thumb,
      });
    if (mode === 'EDIT') {
      patch({
        name,
        lineOfBusiness: 1,
        mediaDestination: thumb,
      });
    }
  };

  return (
    <UI.Box py={5} px={7}>
      <UI.HStack
        w="full"
        _hover={{cursor: 'pointer'}}
        onClick={() => push('/home/content-management/line-of-business')}>
        <BsArrowLeft size={20} />
        <UI.Text fontSize={'14px'}>Back</UI.Text>
      </UI.HStack>
      <UI.Text fontSize="24px" fontWeight="bold">
        Content Management - Line of Business
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
          {mode === 'ADD' ? 'ADD NEW' : mode} LINE OF BUSINESS
        </UI.Text>
        <LoadingComponent isError={isNull(data)}>
          <FormGenerate
            spacing={6}
            onSubmit={handleSubmit}
            schema={{
              name: yup
                .string()
                .default(data?.name)
                .required('Please enter Line of Business Name'),
              thumb: yup
                .string()
                .default(data?.mediaDestination)
                .required('Please upload or select an image'),
            }}
            fields={[
              {
                name: 'name',
                type: 'input',
                label: 'Line of Business Name',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
                defaultValue: data?.name,
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

export default AddNew;
