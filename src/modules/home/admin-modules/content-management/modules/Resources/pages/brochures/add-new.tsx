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
import PdfThumbnail from 'react-pdf-thumbnail';

function AddNew() {
  const [defaultFile, setDefaultFile] = useState<File>();
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
    if (value && moduleData) {
      post({
        productModuleId: moduleData?.id,
        resourceName: value.name,
        languageId: value.language,
        fileType: value.fileType,
        noOfPages: value.noOfPages,
        thumbnailMediaDestination: value.thumb,
        mediaDestination: value.brochures?.mediaDestination,
        uploadedByUserId: me?.id,
      });
    }
  };

  const createThumb = async (pdf) => {
    console.log(pdf);
		const { File, error } = await PdfThumbnail(
			pdf,
			{ // thumb image config
				fileName: 'thumbPDF.png', // thumb file name
				height: 200, // image height
				width: 200, // image width
				pageNo: 0  // pdf page number
			}
		);
		if (!error) {
			setDefaultFile(File);
		}
	};

  const handleOnchange = (value) => {
    console.log(value);
    if (value?.brochures?.file) {
      createThumb(value?.brochures?.file);
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
            ADD NEW FILE
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
              name: yup.string().required('Please enter File Name'),
              language: yup.number().required('Please select language'),
              fileType: yup.string().required('Please enter File Format'),
              noOfPages: yup.number().required('Please enter number of pages'),
              //brochures: yup.string().required('Please upload file'),
              //thumb: yup.string().required('Please upload thumbnail'),
            }}
            fields={[
              {
                name: 'name',
                type: 'input',
                label: 'File Name',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
              },
              {
                type: 'upload-file-content',
                layout: 'horizontal',
                name: 'brochures',
                productModuleId: moduleData?.id,
                //defaultValue: data?.mediaDestination,
                exportFile: true,
                colSpan: 12,
                labelUpload: 'Upload File',
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
                type: 'input',
                label: 'File Format',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
              },
              {
                name: 'noOfPages',
                type: 'input',
                label: 'Number Of Pages',
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
