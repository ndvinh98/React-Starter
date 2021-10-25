import * as UI from '@chakra-ui/react';
import React, {memo} from 'react';

const MEDIA_TYPE = {
  VIDEOS: ({record, isSelected}) => {
    return (
      <UI.HStack
        borderRadius={'md'}
        position={'relative'}
        shadow={'sm'}
        bgSize={'400px'}
        cursor={'pointer'}
        bgPosition={'center center'}
        bgImage={'url(https://i.imgur.com/tMY6Vbx.png)'}
        w="100%"
        overflow={'hidden'}
        height={'200px'}>
        {isSelected && (
          <UI.Checkbox
            position={'absolute'}
            bg={'white'}
            borderRadius={'md'}
            right={'10px'}
            top={'10px'}
            size={'lg'}
          />
        )}
        <UI.Center w={'full'}>
          <UI.VStack>
            <UI.Box position={'relative'}>
              <UI.Image w={'60px'} h={'60px'} src={'/images/play-icon.png'} />
            </UI.Box>
            <UI.Box
              position={'absolute'}
              h={'70px'}
              bottom={0}
              w={'full'}
              bg={'rgba(0, 0, 0, 0.7)'}
              px={4}>
              <UI.Text
                pt={3}
                w={'100%'}
                color={'white'}
                textTransform={'uppercase'}
                fontSize={'md'}
                textAlign={'left'}
                fontWeight={'semibold'}>
                {record?.resourceName}
              </UI.Text>
              <UI.HStack>
                <UI.Text color={'white'}>14 minutes</UI.Text>
                <UI.Text color={'white'}> | .flv</UI.Text>
              </UI.HStack>
            </UI.Box>
          </UI.VStack>
        </UI.Center>
      </UI.HStack>
    );
  },
  DOCUMENTS: ({isSelected, record}) => {
    return (
      <UI.HStack
        overflow={'hidden'}
        borderRadius={'md'}
        position={'relative'}
        shadow={'sm'}
        bgSize={'400px'}
        cursor={'pointer'}
        bgPosition={'center center'}
        bgImage={'url(/images/002.png)'}
        w="100%"
        height={'200px'}>
        {isSelected && (
          <UI.Checkbox
            position={'absolute'}
            bg={'white'}
            borderRadius={'md'}
            right={'10px'}
            top={'10px'}
            size={'lg'}
          />
        )}
        <UI.Center w={'full'}>
          <UI.VStack>
            <UI.Box
              position={'absolute'}
              h={'70px'}
              bottom={0}
              w={'full'}
              bg={'rgba(0, 0, 0, 0.7)'}
              px={4}>
              <UI.Text
                pt={3}
                w={'100%'}
                color={'white'}
                textTransform={'uppercase'}
                fontSize={'md'}
                textAlign={'left'}
                fontWeight={'semibold'}>
                {record?.resourceName}
              </UI.Text>
              <UI.HStack>
                <UI.Text color={'white'}>10 Pages</UI.Text>
                <UI.Text color={'white'}> | .pdf</UI.Text>
              </UI.HStack>
            </UI.Box>
          </UI.VStack>
        </UI.Center>
      </UI.HStack>
    );
  },
};

const ItemGrid = (props: any) => {
  const {isSelected, record, productModuleRelation} = props;
  const Component = MEDIA_TYPE?.[productModuleRelation?.module?.mediaType];
  return (
    <UI.ScaleFade in={true} initialScale={0.9}>
      {Component && <Component record={record} isSelected={isSelected} />}
    </UI.ScaleFade>
  );
};
export default memo(ItemGrid);
