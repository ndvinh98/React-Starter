import React, {useEffect, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter} from '@utils/hooks';
import FormGenerate from '@components/FormGenerate';
import {useGetItem, usePatch} from '@utils/hooks';
import * as yup from 'yup';
import {useRouterController} from '@modules/router';
import {useConfigStore} from '@services/config';
import LoadingComponent from '@components/LoadingComponent';
import {isEmpty} from 'lodash';

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


function Edit() {
  const {push} = useRouter();
  const toast = UI.useToast();
  const {params} = useRouterController();
  const {languages} = useConfigStore();
  const [defaultFile, setDefaultFile] = useState<File>();

  const {
    data: resourceData,
    loading: loadResourceData,
    getItem,
  } = useGetItem('/productModuleResources/');

  useEffect(() => {
    if (params?.resourceId) getItem({}, {path: params?.resourceId});
  }, [params]);

  const {
    data: moduleData,
    getItem: getModuleData,
  } = useGetItem('/productModules/');

  useEffect(() => {
    if (resourceData?.productModuleId) getModuleData({}, {path: resourceData?.productModuleId});
  }, [resourceData]);

  const {patch, loading, data} = usePatch(
    `productModuleResources/${resourceData?.id}`,
  );

  useEffect(() => {
    if (data) {
      toast({
        title: 'Successfully!',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
      push('/home/content-management/resources/module/' + resourceData?.productModuleId)

    }
  }, [data]);

  const handleSubmit = (value) => {
    if (value) {
      patch({
        resourceName: value.name,
        languageId: value.language,
        fileType: value.fileType,
        thumbnailMediaDestination: value.thumb,
        mediaDestination: value.images?.mediaDestination,
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
      <LoadingComponent isLoading={loadResourceData}>
        <UI.HStack
          w="full"
          _hover={{cursor: 'pointer'}}
          onClick={() =>
            push(
              '/home/content-management/resources/module/' + resourceData?.productModuleId,
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
            EDIT IMAGE
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
              name: yup
                .string()
                .required('Please enter Image Name')
                .default(resourceData?.resourceName),
              fileType: yup
                .string()
                .required('Please enter Image Type')
                .default(resourceData?.fileType),
              language: yup
                .number()
                .typeError('Please select Language')
                .required('Please select Language')
                .default(resourceData?.languageId),
              //images: yup.string().required('Please upload file'),
              //thumb: yup.string().required('Please upload thumbnail'),
            }}
            fields={[
              {
                name: 'name',
                type: 'input',
                label: 'Image Name',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
                defaultValue: resourceData?.resourceName,
              },
              {
                type: 'upload-file-content',
                layout: 'horizontal',
                name: 'images',
                productModuleId: resourceData?.productModuleId,
                defaultValue: resourceData?.mediaDestination,
                exportFile: true,
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
                defaultValue: resourceData?.thumbnailMediaDestination,
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
                defaultValue: {
                  value: resourceData?.fileType,
                  label: resourceData?.fileType,
                }
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
                  label: languages?.map((x) => {
                    if (x?.id === resourceData?.languageId)
                     {
                       return x?.name;
                    }
                  }),
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
