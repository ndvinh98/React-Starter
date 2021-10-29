import React, {useEffect, useRef} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter, usePost} from '@utils/hooks';
import FormGenerate from '@components/FormGenerate';
import {useGetItem, usePatch} from '@utils/hooks';
import * as yup from 'yup';
import {useRouterController} from '@modules/router';
import {useConfigStore} from '@services/config';
import LoadingComponent from '@components/LoadingComponent';

function Edit() {
  const {push} = useRouter();
  const toast = UI.useToast();
  const {params} = useRouterController();
  const {languages} = useConfigStore();
  const {
    data: resourceData,
    loading: loadResourceData,
    getItem,
  } = useGetItem('/productModuleResources/');

  const {patch, loading, data} = usePatch(
    `productModuleResources/${resourceData?.id}`,
  );

  useEffect(() => {
    if (params?.id) getItem({}, {path: params?.id});
  }, [params]);

  const {
    data: moduleData,
    getItem: getModuleData,
  } = useGetItem('/productModules/');

  useEffect(() => {
    if (resourceData?.productModuleId) getModuleData({}, {path: resourceData?.productModuleId});
  }, [resourceData]);

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
    if (
      value
    ) {
      patch({
        resourceName: value.name,
        languageId: value.language,
        brochureFormat: value.brochureFormat,
        noOfPages: value.noOfPages,
        thumbnailMediaDestination: value.thumb,
        mediaDestination: value.brochures
      });
    }
  };

  return (
    <UI.Box py={5} px={7}>
      <LoadingComponent isLoading={loadResourceData}>
        <UI.HStack
          w="full"
          _hover={{cursor: 'pointer'}}
          onClick={() =>
            push(
              '/home/content-management/resources/module/' + resourceData?.id,
            )
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
            EDIT FILE
          </UI.Text>
          <FormGenerate
            spacing={6}
            onSubmit={(value) => {
              handleSubmit(value);
            }}
            schema={{
              name: yup
                .string()
                .required('Please enter Resource Name')
                .default(resourceData?.resourceName),
              brochureFormat: yup
                .string()
                .required('Please enter File Format')
                .default(resourceData?.brochureFormat),
              noOfPages: yup
                .number()
                .required('Please enter number of pages')
                .default(resourceData?.noOfPages),
              language: yup
                .number()
                .required('Please select language')
                .default(resourceData?.languageId),
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
                label: 'File Name',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
                defaultValue: resourceData?.resourceName,
              },
              {
                type: 'upload-file-contnet',
                layout: 'horizontal',
                name: 'brochures',
                productModuleId: resourceData?.productModuleId,
                defaultValue: resourceData?.mediaDestination,
                colSpan: 12,
                labelUpload: 'Upload File',
                description: ' ',
                width: '100%',
                size: 'md',
                urlPath: 'productModuleResources/uploadFileUrl',
              },
              {
                type: 'upload-file-contnet',
                layout: 'horizontal',
                name: 'thumb',
                labelUpload: 'Upload Thumbnail',
                defaultValue: resourceData?.thumbnailMediaDestination,
                colSpan: 12,
                width: '100%',
                size: 'md',
                urlPath: '/products/uploadThumbnailUrl',
              },
              {
                name: 'brochureFormat',
                type: 'input',
                label: 'File Format',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
                defaultValue: resourceData?.brochureFormat,
              },
              {
                name: 'noOfPages',
                type: 'input',
                label: 'Number Of Pages',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
                defaultValue: resourceData?.noOfPages,
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
                defaultValue: {
                  value: resourceData?.languageId,
                  label: languages.map((x) => { if(x?.id === resourceData?.languageId) return x?.name ;})
                },
              },
            ]}>
            <UI.Center mt={4} w="full">
              <UI.Button type={'submit'} isLoading={loading} w="150px">
                Save
              </UI.Button>
            </UI.Center>
          </FormGenerate>
        </UI.VStack>
      </LoadingComponent>
    </UI.Box>
  );
}

export default Edit;
