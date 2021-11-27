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
// import PdfThumbnail from 'react-pdf-thumbnail';
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

const FILE_TYPES = [
  {
    label: 'PDF',
    value: 'PDF',
  },
  {
    label: 'DOC',
    value: 'DOC',
  },
  {
    label: 'PPT',
    value: 'PPT',
  }
];

function AddNew() {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  const [defaultFile, setDefaultFile] = useState<File>();
  const {push} = useRouter();
  const toast = UI.useToast();
  const {params} = useRouterController();
  const {languages} = useConfigStore();
  const [defaultThumb, setDefaultThumb] = useState<any>();
  const [defaultNumPages, setDefaultNumpages] = useState<string>();
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

  const readFileData = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.readAsDataURL(file);
    });
  };

 

  const generateThumbPDF = async (file) => {
    const data = await readFileData(file);
    const pdf = await pdfjsLib.getDocument(data).promise;
    const canvas = document.createElement("canvas");
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1 });
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: context, viewport: viewport }).promise;
    const thumb = canvas.toDataURL();
    canvas.remove();
    setDefaultFile(dataURLtoFile(thumb, `${getFileName(file?.name)}.png`));
    setDefaultNumpages(pdf.numPages.toString())
  }

  const dataURLtoFile = (dataUrl, fileName) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, {type: mime});
  };

  const getFileName = (name: string) => {
    if (!name) return undefined;
    const names = name?.split('/');
    if (!names.length) return name;
    return names?.[names?.length - 1];
  };

  const handleOnchange = async ({brochures}) => {
    setDefaultThumb(brochures);
  };

  useEffect(() => {
    if (defaultThumb && defaultThumb?.file){
      generateThumbPDF(defaultThumb?.file);
    }
  },[defaultThumb])

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
                acceptFileType: "application/pdf",
              },
              {
                type: 'upload-file-content',
                layout: 'horizontal',
                name: 'thumb',
                labelUpload: 'Upload Thumbnail (Optional)',
                defaultFile: defaultFile,
                //defaultValue: data?.mediaDestination,
                colSpan: 12,
                width: '100%',
                size: 'md',
                urlPath: '/products/uploadThumbnailUrl',
                acceptFileType:"image/png, image/jpeg"
              },
              {
                name: 'fileType',
                type: 'select',
                label: 'File Format',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
                options: FILE_TYPES,
              },
              {
                name: 'noOfPages',
                type: 'input',
                label: 'Number Of Pages',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
                //value: defaultNumPages,
                //defaultValue: defaultNumPages,
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
