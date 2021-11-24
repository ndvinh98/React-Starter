import React, {useEffect, useState} from 'react';
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

const IMAGE_TYPES = [
  {
    label: 'PNG',
    value: 'PNG',
  },
  {
    label: 'JPEG',
    value: 'JPEG',
  },
];

function AddNew() {
  const {push} = useRouter();
  const toast = UI.useToast();
  const {params} = useRouterController();
  const {languages} = useConfigStore();
  const [defaultFile, setDefaultFile] = useState<File>();
  const {post, loading, data: postData} = usePost('/productModuleResources');
  const {
    data: moduleData,
    loading: loadModuleData,
    getItem,
  } = useGetItem('/productModules/');
  const {me, getMe} = useAuthController();

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
      push('/home/content-management/resources/module/' + moduleData?.id);
    }
  }, [postData]);

  const handleSubmit = (value) => {
    console.log(value);
    if (value && moduleData) {
      post({
        productModuleId: moduleData?.id,
        resourceName: value.name,
        languageId: value.language,
        fileType: value.fileType,
        thumbnailMediaDestination: value.thumb,
        mediaDestination: value.images?.thumb,
        uploadedByUserId: me?.id,
      });
    }
  };

  const handleOnchange = (value) => {
    if (value?.images?.file) {
      setDefaultFile(value?.images?.file);
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
            ADD NEW IMAGE
          </UI.Text>
          <FormGenerate
            spacing={6}
            onSubmit={(value) => {
              handleSubmit(value);
            }}
            onChangeValue={(value) => {
              handleOnchange(value);
            }}
            schema={{
              name: yup.string().required('Please enter Image Name'),
              language: yup.number().required('Please select language'),
              fileType: yup.string().required('Please enter Image type'),
              images: yup
                .object({
                  thumb: yup
                    .string()
                    .required('Please upload file')
                    .typeError('Please upload file'),
                })
                .required('Please upload thumbnail'),

              // thumb: yup
              //   .string()
              //   .required('Please upload thumbnail'),
            }}
            fields={[
              {
                name: 'name',
                type: 'input',
                label: 'Image Name',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
              },
              {
                type: 'upload-file-content',
                layout: 'horizontal',
                name: 'images',
                productModuleId: moduleData?.id,
                exportFile: true,
                //defaultValue: data?.mediaDestination,
                colSpan: 12,
                labelUpload: 'Upload Image',
                description: ' ',
                width: '100%',
                size: 'md',
                urlPath: 'productModuleResources/uploadFileUrl',
              },
              {
                type: 'upload-file-content',
                layout: 'horizontal',
                name: 'thumb',
                labelUpload: 'Upload Thumbnail',
                defaultFile: defaultFile,
                //defaultValue: data?.mediaDestination,
                colSpan: 12,
                width: '100%',
                size: 'md',
                urlPath: '/products/uploadThumbnailUrl',
              },
              {
                name: 'fileType',
                type: 'select',
                label: 'Image Format',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
                options: IMAGE_TYPES,
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
