import * as UI from '@chakra-ui/react';
import React, {memo} from 'react';
import {useHover} from '@utils/hooks';
import {usePartnerContoller} from '@modules/partner/partner.contoller';

const MEDIA_TYPE = {
  VIDEOS: ({record}) => {
    const [hoverRef, isHovered] = useHover<any>();
    const {addSelectedItem, removeSelectedItem, itemsSelected} =
      usePartnerContoller();
    return (
      <UI.HStack ref={hoverRef} alignItems={'flex-start'} position={'relative'}>
        <UI.Checkbox
          onChange={(e) => {
            e.stopPropagation();
            if (e?.target?.checked) addSelectedItem(record?.id);
            else removeSelectedItem(record?.id);
          }}
          hidden={!isHovered && !itemsSelected.includes(record?.id)}
          position={'absolute'}
          bg={'white'}
          borderRadius={'md'}
          left={'131px'}
          top={'6px'}
          size={'lg'}
        />

        <UI.Image
          w={'150px'}
          h={'90px'}
          shadow="md"
          objectFit="contain"
          src={record?.thumbnailMediaDestination}
        />
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
  DOCUMENTS: ({record}) => {
    const {addSelectedItem, removeSelectedItem, itemsSelected} =
      usePartnerContoller();
    const [hoverRef, isHovered] = useHover<any>();
    return (
      <UI.HStack ref={hoverRef} alignItems={'flex-start'} position={'relative'}>
        <UI.Checkbox
          onChange={(e) => {
            e.stopPropagation();
            if (e?.target?.checked) addSelectedItem(record?.id);
            else removeSelectedItem(record?.id);
          }}
          hidden={!isHovered && !itemsSelected.includes(record?.id)}
          position={'absolute'}
          bg={'white'}
          borderRadius={'md'}
          left={'131px'}
          top={'6px'}
          size={'lg'}
        />

        <UI.Image
          w={'150px'}
          h={'90px'}
          shadow="md"
          objectFit="contain"
          src={record?.thumbnailMediaDestination}
        />
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
  const {isSelected, record, mediaType} = props;
  const Component = MEDIA_TYPE?.[mediaType];
  return (
    <UI.ScaleFade in={true} initialScale={0.9}>
      {Component && <Component record={record} isSelected={isSelected} />}
    </UI.ScaleFade>
  );
};
export default memo(ItemList);
