import * as UI from '@chakra-ui/react';
import React, {memo} from 'react';

const MEDIA_TYPE = {
  VIDEOS: ({record, isSelected}) => {
    return (
      <UI.HStack alignItems={'flex-start'} position={'relative'}>
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
        <UI.Image w={'150px'} h={'90px'} src={'/images/001.png'} />
        <UI.VStack pt={2} spacing={0} w={'full'}>
          <UI.Text w={'full'} textAlign={'left'} fontSize={'18px'}>
            {record?.resourceName}
          </UI.Text>
          <UI.Text
            mt={0}
            pt={0}
            color={'#6C6F84'}
            w={'full'}
            textAlign={'left'}>
            14 minutes | .mp4
          </UI.Text>
        </UI.VStack>
      </UI.HStack>
    );
  },
  DOCUMENTS: ({isSelected, record}) => {
    return (
      <UI.HStack alignItems={'flex-start'} position={'relative'}>
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
        <UI.Image w={'150px'} h={'90px'} src={'/images/002.png'} />
        <UI.VStack pt={2} spacing={0} w={'full'}>
          <UI.Text w={'full'} textAlign={'left'} fontSize={'18px'}>
            {record?.resourceName}
          </UI.Text>
          <UI.Text
            mt={0}
            pt={0}
            color={'#6C6F84'}
            w={'full'}
            textAlign={'left'}>
            10 pages | .pdf
          </UI.Text>
        </UI.VStack>
      </UI.HStack>
    );
  },
};

const ItemList = (props: any) => {
  const {isSelected, record, productModuleRelation} = props;
  const Component = MEDIA_TYPE?.[productModuleRelation?.module?.mediaType];
  return (
    <UI.ScaleFade in={true} initialScale={0.9}>
      {Component && <Component record={record} isSelected={isSelected} />}
    </UI.ScaleFade>
  );
};
export default memo(ItemList);
