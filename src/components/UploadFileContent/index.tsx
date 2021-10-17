import React, {memo, useState, useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {useGetItem} from '@utils/hooks';
import {IoMdCloseCircle} from 'react-icons/io';
import UploadThumb from '@components/UploadThumb';
import {uploadFile} from '@services';

export interface IUploadFileContent {
  urlPath: string;
  callBack?: (value) => void;
  name?: string;
  isChooseStock?: boolean;
  listStock?: string[];
  isListStockIcon?: boolean;
  description?: string;
  label?: string;
  productModuleId?: number;
}

function UploadFileContent(props: IUploadFileContent) {
  const {
    urlPath,
    name,
    isChooseStock,
    listStock,
    isListStockIcon,
    description,
    label,
    productModuleId,
    callBack,
  } = props;
  const [thumb, setThumb] = useState('');
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState();
  const {data, getItem} = useGetItem<{url: string; value: string}>(urlPath);
  useEffect(() => {
    if (data) {
      uploadFile(data.url, file)
        .then(() => setThumb(data.value))
        .finally(() => setUploading(false));
    }
  }, [data]);

  useEffect(() => {
    callBack(thumb);
  }, [thumb]);

  const handleOnchange = (thumb) => {
    if (thumb?.[0] && productModuleId) {
      setUploading(true);
      setFile(thumb?.[0]);
      getItem({
        productModuleId: productModuleId,
        name: thumb?.[0]?.name,
        type: thumb?.[0]?.type,
      });
    } else {
      if (thumb?.[0]) {
        setUploading(true);
        setFile(thumb?.[0]);
        getItem({
          name: thumb?.[0]?.name,
          type: thumb?.[0]?.type,
        });
      }
    }
  };
  const getFileName = (name: string) => {
    if (!name) return undefined;
    const names = name?.split('/');
    if (!names.length) return name;
    return names?.[names?.length - 1];
  };

  return (
    <>
      <UI.HStack alignItems="flex-start" w="full">
        <UI.Text w="42%">{label ? label : 'Upload Image'}</UI.Text>
        <UI.VStack alignItems="flex-start" w="full">
          <UploadThumb
            name={name ? name : 'thumb'}
            isLoading={uploading}
            description={description ? description : undefined}
            onChangeValue={(res) => {
              const thumb = res?.[name] || res?.thumb;
              handleOnchange(thumb);
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
              {productModuleId ? (
                <UI.Box p={2} borderRadius={"15px"} border={"1px solid #E0E0E0"}><UI.Text>{getFileName(data?.value)}</UI.Text></UI.Box>
              ) : (
                <UI.Image
                  boxSize={isListStockIcon ? '48px' : '120px'}
                  borderRadius="md"
                  objectFit="cover"
                  src={thumb}
                />
              )}
            </UI.Box>
          )}
        </UI.VStack>
      </UI.HStack>

      {isChooseStock && listStock && (
        <UI.HStack mt={4} alignItems="flex-start" w="full">
          <UI.Text w="42%">
            {isListStockIcon ? 'Choose Icon' : 'Choose Stock Image'}
          </UI.Text>
          <UI.SimpleGrid
            borderWidth="2px"
            borderRadius="md"
            p={5}
            w="full"
            gap="20px"
            templateColumns={
              isListStockIcon
                ? 'repeat(auto-fill, 40px)'
                : 'repeat(auto-fill, 180px)'
            }>
            {listStock.map((x, i) => (
              <UI.Box cursor="pointer" onClick={() => setThumb(x)} key={i}>
                {isListStockIcon ? (
                  <UI.Image w={'28px'} h={'28px'} src={x} />
                ) : (
                  <UI.Image src={x} />
                )}
              </UI.Box>
            ))}
          </UI.SimpleGrid>
        </UI.HStack>
      )}
    </>
  );
}

export default memo(UploadFileContent);
