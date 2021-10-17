import React, {useState, useEffect, useMemo} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter, useGetItem, usePost, useGetList} from '@utils/hooks';
import {IoMdCloseCircle} from 'react-icons/io';
import {IProduct, ICategorie, IGrouping} from '@types';
import UploadThumb from '@components/UploadThumb';
import {uploadFile} from '@services';
import {isEmpty} from 'lodash';
import {useConfigStore} from '@services/config';

function AddNew() {
  const {getItem: getAllMenu, data: menuData} = useGetItem('applications/menu');
  const [name, setName] = useState('');
  const [brochures, setBrochures] = useState('');
  const [numPages, setNumPages] = useState('');
  const [application, setApplication] = useState('');
  const [category, setCategory] = useState('');
  const [grouping, setGroup] = useState('');
  const [product, setProduct] = useState('');
  const [module, setModule] = useState('');
  const {languages} = useConfigStore();
  const [chooseLanguage, setChooseLanguage] = useState('');

  useEffect(() => {
    getAllMenu();
  }, []);

  const {getList: getListCategories, data: categoriesData} =
    useGetList<ICategorie>('categories');
  const {
    getList: getListGroupings,
    data: groupingsData,
    setData: setGroupingsData,
  } = useGetList<IGrouping>('groupings');
  const {
    getList: getListProduct,
    data: productsData,
    setData: setProductsData,
  } = useGetList<IProduct>('products');
  const {
    getList: getListModule,
    data: moduleData,
    setData: setModuleData,
  } = useGetList('productModules');

  useEffect(() => {
    if (application)
      getListCategories({
        limit: 9999,
        filter: JSON.stringify([{application: application}]),
      });
    setGroupingsData({});
    setProductsData({});
    setModuleData({});
    setGroup('');
    setProduct('');
    setCategory('');
    setModule('');
  }, [application]);

  useEffect(() => {
    if (category)
      getListGroupings({
        limit: 9999,
        filter: JSON.stringify([{category: category}]),
      });
    setProductsData({});
    setModuleData({});
    setGroup('');
    setProduct('');
    setModule('');
  }, [category]);

  useEffect(() => {
    if (grouping)
      getListProduct({
        limit: 9999,
        filter: JSON.stringify([{grouping: grouping}]),
      });
    setModuleData({});
  }, [grouping]);

  useEffect(() => {
    console.log(product);
    if (product)
      getListModule({
        limit: 9999,
        filter: JSON.stringify([{productId: product}]),
      });
  }, [product]);

  const {push} = useRouter();
  const toast = UI.useToast();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleChangeBrochures = (event) => {
    setBrochures(event.target.value);
  };

  const handleChangeNumPages = (event) => {
    setNumPages(event.target.value);
  };

  const handleChangeSelectLanguage = (event) => {
    setChooseLanguage(event.target.value);
  };

  const handleChangeSelectBusiness = (event) => {
    setApplication(event.target.value);
  };
  const handleChangeSelectCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeSelectGroup = (event) => {
    setGroup(event.target.value);
  };

  const handleChangeSelectProduct = (event) => {
    setProduct(event.target.value);
  };

  const handleChangeSelectModule = (event) => {
    setModule(event.target.value);
  };

  const [thumb, setThumb] = useState('');
  const [thumbVideo, setThumbVideo] = useState('');

  const [file, setFile] = useState();
  const [fileVideo, setFileVideo] = useState();

  const [uploading, setUploading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const {data, getItem} = useGetItem<{url: string; value: string}>(
    '/products/uploadThumbnailUrl',
  );

  const {data: dataUploadVideo, getItem: getVideo} = useGetItem<{
    url: string;
    value: string;
  }>('productModuleResources/uploadFileUrl');

  const {data: dataDownloadVideo, getItem: getDownloadVideo} = useGetItem<{
    url: string;
    value: string;
  }>('productModuleResources/downloadFileUrl');

  useEffect(() => {
    if (dataUploadVideo) {
      uploadFile(dataUploadVideo.url, fileVideo)
        .then(() =>
          getDownloadVideo({name: JSON.stringify([dataUploadVideo.value])}),
        )
        .finally(() => setUploadingVideo(false));
    }
  }, [dataUploadVideo]);

  useEffect(() => {
    if (dataDownloadVideo) setThumbVideo(dataDownloadVideo?.url);
  }, [dataDownloadVideo]);

  const {post, loading, data: postData} = usePost('/productModuleResources');

  useEffect(() => {
    if (data) {
      uploadFile(data.url, file)
        .then(() => setThumb(data.value))
        .finally(() => setUploading(false));
    }
  }, [data]);

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

  const canCreate =
    name &&
    product &&
    chooseLanguage &&
    module &&
    thumb &&
    dataUploadVideo?.value &&
    brochures &&
    numPages;

  return (
    <UI.Box py={5} px={7}>
      <UI.HStack
        w="full"
        _hover={{cursor: 'pointer'}}
        onClick={() => push('/home/content-management/modules')}>
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
          ADD NEW BROCHURES
        </UI.Text>
        <UI.HStack w="full">
          <UI.Text w="300px">Brochures Name</UI.Text>
          <UI.Input value={name} onChange={handleChange} />
        </UI.HStack>

        <UI.HStack w="full">
          <UI.Text w="300px">Select Line of Business</UI.Text>
          <UI.Select
            placeholder={'Select Line of Business'}
            onChange={handleChangeSelectBusiness}>
            {!isEmpty(menuData) &&
              menuData.map((x) => {
                return <option value={x?.id}>{x?.name}</option>;
              })}
          </UI.Select>
        </UI.HStack>
        <UI.HStack w="full">
          <UI.Text w="300px">Select Line of Product</UI.Text>
          <UI.Select
            placeholder={'Select Line of Product'}
            isDisabled={application ? false : true}
            onChange={handleChangeSelectCategory}>
            {!isEmpty(categoriesData) &&
              categoriesData?.records.map((x) => {
                return <option value={x?.id}>{x?.name}</option>;
              })}
          </UI.Select>
        </UI.HStack>
        <UI.HStack w="full">
          <UI.Text w="300px">Select Product Group</UI.Text>
          <UI.Select
            placeholder={'Select Product Group'}
            isDisabled={category ? false : true}
            onChange={handleChangeSelectGroup}>
            {!isEmpty(groupingsData) &&
              groupingsData?.records.map((x) => {
                return <option value={x?.id}>{x?.name}</option>;
              })}
          </UI.Select>
        </UI.HStack>
        <UI.HStack w="full">
          <UI.Text w="300px">Select Product</UI.Text>
          <UI.Select
            placeholder={'Select Product Group'}
            isDisabled={grouping ? false : true}
            onChange={handleChangeSelectProduct}>
            {!isEmpty(productsData) &&
              productsData?.records.map((x) => {
                return <option value={x?.id}>{x?.name}</option>;
              })}
          </UI.Select>
        </UI.HStack>
        <UI.HStack w="full">
          <UI.Text w="300px">Select Module</UI.Text>
          <UI.Select
            placeholder={'Select Module'}
            isDisabled={product ? false : true}
            onChange={handleChangeSelectModule}>
            {!isEmpty(moduleData) &&
              moduleData?.records.map((x) => {
                return <option value={x?.id}>{x?.name}</option>;
              })}
          </UI.Select>
        </UI.HStack>

        <UI.HStack alignItems="flex-start" w="full">
          <UI.Text w="300px">Upload Video</UI.Text>
          <UI.VStack alignItems="flex-start" w="full">
            <UploadThumb
              name="thumbVideo"
              isLoading={uploadingVideo}
              description={' '}
              onChangeValue={({thumbVideo}) => {
                if (thumbVideo?.[0] && module) {
                  setUploadingVideo(true);
                  setFileVideo(thumbVideo?.[0]);
                  getVideo({
                    productModuleId: module,
                    name: thumbVideo?.[0]?.name,
                    type: thumbVideo?.[0]?.type,
                  });
                }
              }}
            />

            {thumbVideo && (
              <UI.Box position="relative">
                <UI.Circle
                  onClick={() => {
                    setThumbVideo('');
                    setFileVideo(null);
                  }}
                  cursor="pointer"
                  bg="white"
                  right={-2}
                  top={-2}
                  position="absolute">
                  <IoMdCloseCircle fontSize="20px" color="red" />
                </UI.Circle>
                <UI.Image
                  boxSize="48px"
                  borderRadius="md"
                  objectFit="cover"
                  src={thumbVideo}
                />
              </UI.Box>
            )}
          </UI.VStack>
        </UI.HStack>

        <UI.HStack alignItems="flex-start" w="full">
          <UI.Text w="300px">Upload Splash Screen</UI.Text>
          <UI.VStack alignItems="flex-start" w="full">
            <UploadThumb
              name="thumb"
              isLoading={uploading}
              description={' '}
              onChangeValue={({thumb}) => {
                if (thumb?.[0]) {
                  setUploading(true);
                  setFile(thumb?.[0]);
                  getItem({
                    name: thumb?.[0]?.name,
                    type: thumb?.[0]?.type,
                  });
                }
              }}
            />
            {thumb && (
              <UI.Box position="relative">
                <UI.Circle
                  onClick={() => {
                    setThumb('');
                    setFile(null);
                  }}
                  cursor="pointer"
                  bg="white"
                  right={-2}
                  top={-2}
                  position="absolute">
                  <IoMdCloseCircle fontSize="20px" color="red" />
                </UI.Circle>
                <UI.Image
                  boxSize="48px"
                  borderRadius="md"
                  objectFit="cover"
                  src={thumb}
                />
              </UI.Box>
            )}
          </UI.VStack>
        </UI.HStack>

        <UI.HStack w="full">
          <UI.Text w="300px">Brochures Format</UI.Text>
          <UI.Input value={brochures} onChange={handleChange} />
        </UI.HStack>

        <UI.HStack w="full">
          <UI.Text w="300px">No. of pages</UI.Text>
          <UI.Input value={numPages} onChange={handleChange} />
        </UI.HStack>

        <UI.HStack w="full">
          <UI.Text w="300px">Language</UI.Text>
          <UI.Select
            placeholder={'Select Language'}
            onChange={handleChangeSelectLanguage}>
            {!isEmpty(languages) &&
              languages?.map((x) => {
                return <option value={x?.id}>{x?.name}</option>;
              })}
          </UI.Select>
        </UI.HStack>

        <UI.Center w="full">
          <UI.Button
            isLoading={loading}
            // onClick={() =>
            //   post({
            //     productModuleId: module,
            //     resourceName: name,
            //     languageId: chooseLanguage,
            //     thumbnailMediaDestination: data?.value,
            //     mediaDestination: dataUploadVideo?.value,
            //   })
            // }
            isDisabled={!canCreate}
            w="150px">
            Create
          </UI.Button>
        </UI.Center>
      </UI.VStack>
    </UI.Box>
  );
}

export default AddNew;
