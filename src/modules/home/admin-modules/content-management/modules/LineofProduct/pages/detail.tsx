import React, {useEffect, useState, useRef} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter, usePost, usePatch, useGetItem} from '@utils/hooks';
import FormGenerate from '@components/FormGenerate';
import * as yup from 'yup';
import {useRouterController} from '@modules/router';
import {useContentManagementController} from '@modules/home';
import {isNull, keyBy} from 'lodash';
import LoadingComponent from '@components/LoadingComponent';

const STOCK = [
  'https://i.imgur.com/Q04dMOc.png',
  'https://i.imgur.com/2NpnErN.png',
  'https://i.imgur.com/wSX6CPl.png',
  'https://i.imgur.com/Y3lAWKG.png',
  'https://i.imgur.com/1okhbVx.png',
];

function AddNew() {
  const allLineBusiness = useContentManagementController(
    (s) => s.allLineBusiness,
  );

  const {push} = useRouter();
  const toast = UI.useToast();
  const {params} = useRouterController();

  const applicationRef = useRef<any>(null);

  const {post, loading: postLoading, data: postData} = usePost('/categories');
  const {
    patch,
    loading: pathLoading,
    data: pathData,
  } = usePatch(`/categories/${params?.id}`);

  const {getItem, data} = useGetItem(`/categories/${params?.id}`);
  const [mode, setMode] = useState<'ADD' | 'EDIT'>('ADD');

  useEffect(() => {
    if (postData || pathData) {
      toast({
        title: 'Successfully!',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
      push('/home/content-management/line-of-product');
    }
  }, [postData, pathData]);

  useEffect(() => {
    if (params?.id && params?.id !== 'add') {
      getItem({
        relations: JSON.stringify(['application']),
      });
      setMode('EDIT');
    } else {
      setMode('ADD');
    }
  }, [params]);

  const handleSubmit = ({name, thumb, application}) => {
    if (mode === 'ADD')
      post({
        name,
        application,
        mediaDestination: thumb,
      });
    if (mode === 'EDIT') {
      patch({
        name,
        application,
        mediaDestination: thumb,
      });
    }
  };

  useEffect(() => {
    const applicationId = data?.application?.id;
    if (applicationId) {
      applicationRef?.current?.select?.setValue({
        value: applicationId,
        label: keyBy(allLineBusiness, 'id')?.[applicationId]?.name,
      });
    }
  }, [data]);

  return (
    <UI.Box py={5} px={7}>
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
          {mode === 'ADD' ? 'ADD NEW' : mode} LINE OF PRODUCT
        </UI.Text>
        <LoadingComponent isError={isNull(data)}>
          <FormGenerate
            spacing={6}
            onSubmit={(value) => {
              handleSubmit(value);
            }}
            schema={{
              name: yup
                .string()
                .default(data?.name)
                .required('Please enter Line of Product Name'),
              application: yup
                .number()
                .default(data?.application?.id)
                .required('Please select Line of Business'),
              thumb: yup
                .string()
                .default(data?.mediaDestination)
                .required('Please upload or select an image'),
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
                label: 'Select Line of Business',
                placeholder: 'Select Line of Business',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
                refEl: applicationRef,
                isClearable: false,
                defaultValue: {
                  value: data?.id,
                  label: keyBy(allLineBusiness, 'id')?.[data?.id]?.name,
                },
                options: allLineBusiness?.map((x) => ({
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

export default AddNew;
