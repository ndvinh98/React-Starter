import React, {useState, useEffect, useMemo} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouter, useGetItem, usePost} from '@utils/hooks';
import {IoMdCloseCircle} from 'react-icons/io';

import UploadThumb from '@components/UploadThumb';
import {uploadFile} from '@services';

const STOCK = [
  'https://i.imgur.com/Q04dMOc.png',
  'https://i.imgur.com/2NpnErN.png',
  'https://i.imgur.com/wSX6CPl.png',
  'https://i.imgur.com/Y3lAWKG.png',
  'https://i.imgur.com/1okhbVx.png',
];

function AddNew() {
  const {getItem: getAllMenu, data: menuData} = useGetItem('applications/menu');
  const [name, setName] = useState('');
  const [application, setApplication] = useState('');
  const [category, setCategory] = useState('');
  const [grouping, setGroup] = useState('');

  useEffect(() => {
    getAllMenu();
  }, []);

  const listCategories = useMemo(() => {
    if (application) {
      for (let i = 0; i < menuData.length; i++) {
        if (menuData[i].id == application) {
          return menuData[i].categories;
        }
      }
    }
  }, [application]);

  const listGroupings = useMemo(() => {
    if (category) {
      for (let i = 0; i < menuData.length; i++) {
        if (menuData[i].id == application) {
          for (let j= 0; j< menuData[i].categories.length; j++){
            if (menuData[i].categories[j].id == category) {
              return menuData[i].categories[j].groupings
            }
          }
        }
      }
    }
  }, [category]);

  const {push} = useRouter();
  const toast = UI.useToast();

  const handleChange = (event) => setName(event.target.value);
  const handleChangeSelectBusiness = (event) => {
    setApplication(event.target.value);
    setCategory('');
    setGroup('');
  };
  const handleChangeSelectCategory = (event) => {
    setCategory(event.target.value);
    setGroup('');
  };
  const handleChangeSelectGroup = (event) => setGroup(event.target.value);

  const [thumb, setThumb] = useState('');
  const canCreate = name && thumb && application && category && grouping;

  const [file, setFile] = useState();

  const [uploading, setUploading] = useState(false);

  const {data, getItem} = useGetItem<{url: string; value: string}>(
    '/products/uploadThumbnailUrl',
  );

  const {post, loading, data: postData} = usePost('/products');

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
        onClick={() => push('/home/content-management/line-of-business')}>
        <BsArrowLeft size={20} />
        <UI.Text fontSize={'14px'}>Back</UI.Text>
      </UI.HStack>
      <UI.Text fontSize="24px" fontWeight="bold">
        Content Management - Products
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
          ADD NEW PRODUCT
        </UI.Text>
        <UI.HStack w="full">
          <UI.Text w="300px">Product Name</UI.Text>
          <UI.Input value={name} onChange={handleChange} />
        </UI.HStack>
        <UI.HStack w="full">
          <UI.Text w="300px">Select Line of Business</UI.Text>
          <UI.Select
            placeholder={'Select Line of Business'}
            onChange={handleChangeSelectBusiness}>
            {menuData &&
              menuData.map((x) => {
                return <option value={x?.id}>{x?.name}</option>;
              })}
          </UI.Select>
        </UI.HStack>
        <UI.HStack w="full">
          <UI.Text w="300px">Select Line of Product</UI.Text>
          <UI.Select
            placeholder={'Select Line of Product'}
            onChange={handleChangeSelectCategory}>
            {listCategories &&
              listCategories.map((x) => {
                return <option value={x?.id}>{x?.name}</option>;
              })}
          </UI.Select>
        </UI.HStack>
        <UI.HStack w="full">
          <UI.Text w="300px">Select Product Group</UI.Text>
          <UI.Select
            placeholder={'Select Product Group'}
            onChange={handleChangeSelectGroup}>
            {listGroupings &&
              listGroupings.map((x) => {
                return <option value={x?.id}>{x?.name}</option>;
              })}
          </UI.Select>
        </UI.HStack>
        <UI.HStack alignItems="flex-start" w="full">
          <UI.Text w="300px">Upload Image</UI.Text>
          <UI.VStack alignItems="flex-start" w="full">
            <UploadThumb
              name="thumb"
              isLoading={uploading}
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
                  boxSize="120px"
                  borderRadius="md"
                  objectFit="cover"
                  src={thumb}
                />
              </UI.Box>
            )}
          </UI.VStack>
        </UI.HStack>
        <UI.HStack alignItems="flex-start" w="full">
          <UI.Text w="300px">Choose Stock Image</UI.Text>
          <UI.SimpleGrid
            borderWidth="2px"
            borderRadius="md"
            p={5}
            w="full"
            gap="20px"
            templateColumns="repeat(auto-fill, 180px)">
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
                grouping,
                name,
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
