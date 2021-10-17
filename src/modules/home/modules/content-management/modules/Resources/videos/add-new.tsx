import React, {useEffect, useRef} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter, usePost} from '@utils/hooks';
import UploadFileContent from '@components/UploadFileContent';
import FormGenerate from '@components/FormGenerate';
import {useGetItem} from '@utils/hooks';
import * as yup from 'yup';
import {useRouterController} from '@modules/router';
import {useConfigStore} from '@services/config';
import LoadingComponent from '@components/LoadingComponent';

function AddNew() {
  const {push} = useRouter();
  const toast = UI.useToast();
  const {params} = useRouterController();
  const {languages} = useConfigStore();
  let mediaDestination = '';
  let thumbnailMediaDestination = '';
  const {post, loading, data: postData} = usePost('/productModuleResources');
  const {
    data: moduleData,
    loading: loadModuleData,
    getItem,
  } = useGetItem('/productModules/');

  useEffect(() => {
    if (params?.id) getItem({}, {path: params?.id});
  }, [params]);

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
    if (value && mediaDestination && thumbnailMediaDestination && moduleData) {
      post({
        productModuleId: moduleData?.id,
        resourceName: value.name,
        languageId: value.language,
        videoFileType: value.videoFileType,
        videoLength: value.videoLength,
        thumbnailMediaDestination,
        mediaDestination,
      });
    }
  };

  return (
    <UI.Box py={5} px={7}>
      <LoadingComponent isLoading={loadModuleData}>
        <UI.HStack
          w="full"
          _hover={{cursor: 'pointer'}}
          onClick={() =>
            push('/home/content-management/resources/module/' + moduleData?.id)
          }>
          <BsArrowLeft size={20} />
          <UI.Text fontSize={'14px'}>Back</UI.Text>
        </UI.HStack>
        <UI.Text fontSize="24px" fontWeight="bold">
          Content Management - Videos
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
            ADD NEW VIDEO
          </UI.Text>
          <FormGenerate
            spacing={6}
            onSubmit={(value) => {
              handleSubmit(value);
            }}
            schema={{
              name: yup.string().required('Video Name is required'),
              language: yup.number().required('Language is required'),
              videoFileType: yup
                .string()
                .required('Video Type is required'),
              videoLength: yup.string().required('Video Length is required'),
            }}
            fields={[
              {
                name: 'name',
                type: 'input',
                label: 'Video Name',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
              },
              {
                type: 'decor',
                layout: 'horizontal',
                colSpan: 12,
                width: '100%',
                size: 'md',
                DecorComponent: () => (
                  <UploadFileContent
                    name={'videos'}
                    productModuleId={moduleData?.id}
                    urlPath={'productModuleResources/uploadFileUrl'}
                    label={'Upload Video'}
                    description={' '}
                    callBack={(value) => {
                      mediaDestination = value;
                    }}
                  />
                ),
              },
              {
                type: 'decor',
                layout: 'horizontal',
                colSpan: 12,
                width: '100%',
                size: 'md',
                DecorComponent: () => (
                  <UploadFileContent
                    label={'Upload Splash Screen'}
                    urlPath={'/products/uploadThumbnailUrl'}
                    callBack={(value) => {
                      thumbnailMediaDestination = value;
                    }}
                  />
                ),
              },
              {
                name: 'videoFileType',
                type: 'input',
                label: 'Video Type',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
              },
              {
                name: 'videoLength',
                type: 'input',
                label: 'Video Length',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
              },
              {
                name: 'language',
                type: 'select',
                label: 'Select Language',
                placeholder: 'Select Language',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
                options: languages?.map((x) => ({
                  value: x?.id,
                  label: x?.name,
                })),
              },
            ]}>
            <UI.Center mt={4} w="full">
              <UI.Button type={'submit'} isLoading={loading} w="150px">
                Create
              </UI.Button>
            </UI.Center>
          </FormGenerate>
        </UI.VStack>
      </LoadingComponent>
    </UI.Box>
  );
}

export default AddNew;
