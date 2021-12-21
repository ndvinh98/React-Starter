import React, {useEffect, useRef} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter, usePost} from '@utils/hooks';
import FormGenerate from '@components/FormGenerate';
import {useGetItem} from '@utils/hooks';
import * as yup from 'yup';
import {useRouterController} from '@modules/router';
import {useConfigStore} from '@services/config';
import LoadingComponent from '@components/LoadingComponent';
import {useAuthController} from '@modules/auth';

const FILE_TYPES = [
  {
    label: 'MP4',
    value: 'MP4',
  },
  {
    label: 'MOV',
    value: 'MOV',
  },
];


function AddNew() {
  const {push} = useRouter();
  const toast = UI.useToast();
  const {params} = useRouterController();
  const {languages} = useConfigStore();
  const {post, loading, data: postData} = usePost('/productModuleResources');
  const {
    data: moduleData,
    loading: loadModuleData,
    getItem,
  } = useGetItem('/productModules/');

  useEffect(() => {
    if (params?.id) getItem({}, {path: params?.id});
    getMe();
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
      push('/home/content-management/resources/module/' + moduleData?.id)
    }
  }, [postData]);

  const {me, getMe} = useAuthController();
  const handleSubmit = (value) => {
    if (value  && moduleData) {
      post({
        productModuleId: moduleData?.id,
        resourceName: value.name,
        languageId: value.language.value,
        fileType: value.fileType.value,
        videoLength: value.videoLength,
        thumbnailMediaDestination: value.thumb,
        mediaDestination: value.videos,
        uploadedByUserId: me?.id,
      });
    };
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
          Content Management - {moduleData?.name}
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
              name: yup.string().required('Please enter Video Name'),
              language: yup
                .object({
                  value: yup.number().required('Please select language'),
                })
                .required(),
              fileType: yup
                .object({
                  value: yup.string().required('Please select Video Type'),
                })
                .required(),
              videoLength: yup.string().required('Please enter video length'),
              videos: yup
                .string()
                .required('Please upload file'),
              thumb: yup
                .string()
                .required('Please upload thumbnail'),
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
                type: 'upload-file-content',
                layout: 'horizontal',
                name: 'videos',
                productModuleId: moduleData?.id,
                //defaultValue: data?.mediaDestination,
                colSpan: 12,
                labelUpload: 'Upload File',
                description: ' ',
                width: '100%',
                size: 'md',
                acceptFileType:"video/*",
                urlPath: 'productModuleResources/uploadFileUrl',
              },
              {
                type: 'upload-file-content',
                layout: 'horizontal',
                name: 'thumb',
                acceptFileType:"image/png, image/jpeg",
                labelUpload: 'Upload Thumbnail',
                //defaultValue: data?.mediaDestination,
                colSpan: 12,
                width: '100%',
                size: 'md',
                urlPath: '/products/uploadThumbnailUrl',
              },
              {
                name: 'fileType',
                type: 'select',
                label: 'Video Type',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
                errorProperty: 'value',
                options: FILE_TYPES,
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
                errorProperty: 'value',
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
                Publish
              </UI.Button>
            </UI.Center>
          </FormGenerate>
        </UI.VStack>
      </LoadingComponent>
    </UI.Box>
  );
}

export default AddNew;
