import React, {useEffect, useRef} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter, usePost} from '@utils/hooks';
import UploadFileContent from '@components/UploadFileContent';
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
  let mediaDestination = '';
  let thumbnailMediaDestination = '';
  const {
    data: resourceData,
    loading: loadResourceData,
    getItem,
  } = useGetItem('/productModuleResources/');

  useEffect(() => {
    if (params?.id) getItem({}, {path: params?.id});
  }, [params]);

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
    }
  }, [data]);

  const handleSubmit = (value) => {
    if (
      value &&
      mediaDestination &&
      thumbnailMediaDestination &&
      resourceData
    ) {
      patch({
        productModuleId: resourceData?.id,
        resourceName: value.name,
        languageId: value.language,
        brochureFormat: value.brochureFormat,
        noOfPages: value.noOfPages,
        thumbnailMediaDestination,
        mediaDestination,
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
          Content Management - Brochures
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
            ADD NEW BROCHURE
          </UI.Text>
          <FormGenerate
            spacing={6}
            onSubmit={(value) => {
              handleSubmit(value);
            }}
            schema={{
              name: yup
                .string()
                .required('Resource Name is required')
                .default(resourceData?.resourceName),
              brochureFormat: yup
                .string()
                .required('Brochure Format is required')
                .default(resourceData?.brochureFormat),
              noOfPages: yup
                .number()
                .required('Number of Pages is required')
                .default(resourceData?.noOfPages),
              language: yup
                .number()
                .required('Language is required')
                .default(resourceData?.language),
            }}
            fields={[
              {
                name: 'name',
                type: 'input',
                label: 'Brochure Name',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
                defaultValue: resourceData?.resourceName,
              },
              {
                type: 'decor',
                layout: 'horizontal',
                colSpan: 12,
                width: '100%',
                size: 'md',
                DecorComponent: () => (
                  <UploadFileContent
                    name={'brochures'}
                    productModuleId={resourceData?.id}
                    urlPath={'productModuleResources/uploadFileUrl'}
                    label={'Upload File'}
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
                    description={' '}
                    label={'Upload Thumbnail'}
                    urlPath={'/products/uploadThumbnailUrl'}
                    callBack={(value) => {
                      thumbnailMediaDestination = value;
                    }}
                  />
                ),
              },
              {
                name: 'brochureFormat',
                type: 'input',
                label: 'Brochure Format',
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
