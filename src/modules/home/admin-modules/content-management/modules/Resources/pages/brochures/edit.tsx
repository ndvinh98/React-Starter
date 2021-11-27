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
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

const FILE_TYPES = [
  {
    label: 'PDF',
    value: 'PDF',
  }
];

function Edit() {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  const [defaultThumb, setDefaultThumb] = useState<any>();
  const [defaultFile, setDefaultFile] = useState<File>();
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
    if (params?.resourceId) getItem({}, {path: params?.resourceId});
  }, [params]);

  const {data: moduleData, getItem: getModuleData} =
    useGetItem('/productModules/');

  useEffect(() => {
    if (resourceData?.productModuleId)
      getModuleData({}, {path: resourceData?.productModuleId});
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
      push('/home/content-management/resources/module/' + resourceData?.productModuleId)
    }
  }, [data]);

  const handleSubmit = (value) => {
    if (value) {
      patch({
        resourceName: value.name,
        languageId: value.language,
        fileType: value.fileType,
        noOfPages: value.noOfPages,
        thumbnailMediaDestination: value.thumb,
        mediaDestination: value.brochures?.mediaDestination,
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
      <LoadingComponent isLoading={loadResourceData || isEmpty(languages) || isEmpty(resourceData)} >
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
            EDIT FILE
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
                .required('Please enter File Name')
                .default(resourceData?.resourceName),
              fileType: yup
                .string()
                .required('Please enter File Format')
                .default(resourceData?.fileType),
              noOfPages: yup
                .number()
                .typeError('Please select Number of Pages')
                .required('Please enter Number of Pages')
                .default(resourceData?.noOfPages),
              language: yup
                .number()
                .typeError('Please select Language')
                .required('Please select Language')
                .default(resourceData?.languageId),
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
                defaultValue: resourceData?.resourceName,
              },
              {
                type: 'upload-file-content',
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
                acceptFileType: "application/pdf",
                exportFile: true
              },
              {
                type: 'upload-file-content',
                layout: 'horizontal',
                name: 'thumb',
                labelUpload: 'Upload Thumbnail (Optional)',
                defaultValue: resourceData?.thumbnailMediaDestination,
                colSpan: 12,
                width: '100%',
                size: 'md',
                defaultFile: defaultFile,
                acceptFileType:"image/png, image/jpeg",
                urlPath: '/products/uploadThumbnailUrl',
              },
              {
                name: 'fileType',
                type: 'select',
                label: 'File Format',
                size: 'md',
                layout: 'horizontal',
                width: '70%',
                options: FILE_TYPES,
                defaultValue: {
                  value: resourceData?.fileType,
                  label: resourceData?.fileType,
                }
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
                  label: languages.map((x) => {
                    if (x?.id === resourceData?.languageId) return x?.name;
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
