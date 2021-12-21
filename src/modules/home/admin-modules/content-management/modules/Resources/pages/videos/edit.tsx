import React, {useEffect} from 'react';
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
        languageId: value.language.value,
        fileType: value.fileType.value,
        videoLength: value.videoLength,
        thumbnailMediaDestination: value.thumb,
        mediaDestination: value.videos,
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
            EDIT VIDEO
          </UI.Text>
          <FormGenerate
            spacing={6}
            onSubmit={(value) => {
              handleSubmit(value);
            }}
            schema={{
              name: yup
                .string()
                .required('Please enter Video Name')
                .default(resourceData?.resourceName),
              language: yup
                .object({
                  value: yup.number().required('Please select language'),
                })
                .required()
                .default(resourceData?.languageId),
              fileType: yup
                .object({
                  value: yup.string().required('Please select Video Type'),
                })
                .required()
                .default(resourceData?.fileType),
              videoLength: yup
                .string()
                .required('Please enter Video Length')
                .default(resourceData?.videoLength),
              videos: yup.string().required('Please upload file'),
              thumb: yup.string().required('Please upload thumbnail'),
            }}
            fields={[
              {
                name: 'name',
                type: 'input',
                label: 'Video Name',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
                defaultValue: resourceData?.resourceName,
              },
              {
                type: 'upload-file-content',
                layout: 'horizontal',
                name: 'videos',
                productModuleId: resourceData?.productModuleId,
                defaultValue: resourceData?.mediaDestination,
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
                labelUpload: 'Upload Thumbnail',
                defaultValue: resourceData?.thumbnailMediaDestination,
                colSpan: 12,
                width: '100%',
                size: 'md',
                acceptFileType:"image/png, image/jpeg",
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
                defaultValue: {
                  value: resourceData?.fileType,
                  label: resourceData?.fileType,
                }
              },
              {
                name: 'videoLength',
                type: 'input',
                label: 'Video Length',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
                defaultValue: resourceData?.videoLength,
              },
              {
                name: 'language',
                type: 'select',
                label: 'Select Language',
                placeholder: 'Select Language',
                size: 'md',
                errorProperty: 'value',
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
