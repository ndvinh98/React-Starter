import React, {useState, useEffect, useMemo} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter, useGetItem, usePost, useGetList} from '@utils/hooks';
import {IoMdCloseCircle} from 'react-icons/io';
import {IProduct, ICategorie, IGrouping} from '@types';
import UploadThumb from '@components/UploadThumb';
import {uploadFile} from '@services';
import { isEmpty } from 'lodash';
const STOCK = [
  'https://i.imgur.com/bkSeJLO.png',
  'https://i.imgur.com/fdw9rPG.png',
  'https://i.imgur.com/1rbFlw9.png',
  'https://i.imgur.com/YrMF0sJ.png',
  'https://i.imgur.com/6i8WZcA.png',
  'https://i.imgur.com/UBtbu6v.png',
  'https://i.imgur.com/W5a9L20.png',
  'https://i.imgur.com/zCOxHFq.png',
  'https://i.imgur.com/CB7v9TS.png',
  'https://i.imgur.com/OeouoPm.png',
  'https://i.imgur.com/C4orAXH.png',
  'https://i.imgur.com/pWt4xGE.png',
  'https://i.imgur.com/uzqxhL6.png',
  'https://i.imgur.com/qPM9VTA.png',
  'https://i.imgur.com/ic4gKes.png',
  'https://i.imgur.com/9HGgUZv.png',
  'https://i.imgur.com/QfdgXMP.png',
  'https://i.imgur.com/GUCcNGx.png',
  'https://i.imgur.com/EKpwL6c.png',
  'https://i.imgur.com/cicFJvg.png',
  'https://i.imgur.com/OQTAPtF.png',
  'https://i.imgur.com/VIOUKbE.png',
  'https://i.imgur.com/xWUDb9W.png',
  'https://i.imgur.com/pZumQI2.png',
  'https://i.imgur.com/Ql4ZYtL.png',
  'https://i.imgur.com/iSxfB38.png'
];

const MEDIA_TYPE = ["VIDEOS", "DOCUMENTS", "IMAGES"]

function AddNew() {
  const {getItem: getAllMenu, data: menuData} = useGetItem('applications/menu');
  const [name, setName] = useState('');
  const [moduleType, setModuleType] = useState('');
  const [mediaType, setMediaType] = useState('');

  const [application, setApplication] = useState('');
  const [category, setCategory] = useState('');
  const [grouping, setGroup] = useState('');
  const [product, setProduct] = useState('');
  useEffect(() => {
    getAllMenu();
  }, []);

  const {getList: getListCategories, data: categoriesData} =
    useGetList<ICategorie>('categories');
  const {getList: getListGroupings, data: groupingsData, setData: setGroupingsData} =
    useGetList<IGrouping>('groupings');
  const {getList: getListProduct, data: productsData, setData: setProductsData} =
    useGetList<IProduct>('products');

  useEffect(() => {
    if (application)
      getListCategories({
        limit: 9999,
        filter: JSON.stringify([{application: application}]),
      });
      setGroupingsData({});
      setProductsData({});
      setGroup('');
      setProduct('');
      setCategory('');
  }, [application]);

  useEffect(() => {
    if (category)
      getListGroupings({
        limit: 9999,
        filter: JSON.stringify([{category: category}]),
      });
      setProductsData({});
      setGroup('');
      setProduct('');
  }, [category]);

  useEffect(() => {
    if (grouping)
      getListProduct({
        limit: 9999,
        filter: JSON.stringify([{grouping: grouping}]),
      });
  }, [grouping]);



  const {push} = useRouter();
  const toast = UI.useToast();

  const handleChange = (event) => {
    setName(event.target.value);
    setModuleType(event.target.value.split(' ').join(''));
  };

  const handleChangeMediaType = (event) => {
    setMediaType(event.target.value);
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

  const [thumb, setThumb] = useState('');
  const canCreate =
    name && product && mediaType && moduleType;

  const [file, setFile] = useState();

  const [uploading, setUploading] = useState(false);

  const {data, getItem} = useGetItem<{url: string; value: string}>(
    '/products/uploadThumbnailUrl',
  );

  const {post, loading, data: postData} = usePost('/productModules');

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
        Content Management - Modules
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
          ADD NEW MODULE
        </UI.Text>
        <UI.HStack w="full">
          <UI.Text w="300px">Module Name</UI.Text>
          <UI.Input value={name} onChange={handleChange} />
        </UI.HStack>
        <UI.HStack w="full">
          <UI.Text w="300px">Select Media Type</UI.Text>
          <UI.Select
            placeholder={'Select Media Type'}
            onChange={handleChangeMediaType}>
            {
              MEDIA_TYPE.map((x) => {
                return <option value={x}>{x}</option>;
              })}
          </UI.Select>
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
        <UI.HStack alignItems="flex-start" w="full">
          <UI.Text w="300px">Upload Icon</UI.Text>
          <UI.VStack alignItems="flex-start" w="full">
            <UploadThumb
              name="thumb"
              isLoading={uploading}
              description={'Recommended size: 48px x 48px'}
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
        <UI.HStack alignItems="flex-start" w="full">
          <UI.Text w="300px">Choose Icon</UI.Text>
          <UI.SimpleGrid
            borderWidth="2px"
            borderRadius="md"
            p={5}
            w="full"
            gap="20px"
            templateColumns="repeat(auto-fill, 30px)">
            {STOCK.map((x, i) => (
              <UI.Box cursor="pointer" onClick={() => setThumb(x)} key={i}>
                <UI.Image src={x} />
              </UI.Box>
            ))}
          </UI.SimpleGrid>
        </UI.HStack>
        <UI.Center w="full">
          <UI.Button
            isLoading={loading}
            onClick={() =>
              post({
                productId: product,
                name,
                moduleType,
                mediaType,
                mediaDestination: thumb,
              })
            }
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
