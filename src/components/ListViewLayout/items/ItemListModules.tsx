import React, {memo} from 'react';
import {useRouter, useHover} from '@utils/hooks';
import * as UI from '@chakra-ui/react';
import {usePartnerContoller} from '@modules/partner/partner.contoller';
import {useRouterController} from '@modules/router';

const ItemList = (props: any) => {
  const {record} = props;
  const {push} = useRouter();
  const [hoverRef, isHovered] = useHover<any>();
  const path = useRouterController((s) => s.path);
  const {addSelectedItem, removeSelectedItem, itemsSelected} =
    usePartnerContoller();

  return (
    <UI.ScaleFade ref={hoverRef} in={true} initialScale={0.9}>
      <UI.Box cursor={'pointer'} w="100%" h="70px">
        <UI.HStack pl={5}>
          <UI.Checkbox
            onChange={(e) => {
              e.stopPropagation();
              if (e?.target?.checked) addSelectedItem(record?.id);
              else removeSelectedItem(record?.id);
            }}
            hidden={!isHovered && !itemsSelected.includes(record?.id)}
            bg={'white'}
            mr={3}
            borderRadius={'md'}
            size={'lg'}
          />
          <UI.Box
            onClick={() => {
              push(`${path}/${record?.id}`);
            }}
            position={'relative'}>
            <UI.Center shadow={'md'} w={'80px'} h={'80px'} bg={'white'}>
              <UI.Image
                w={'45px'}
                h={'45px'}
                src={
                  record?.mediaDestination || 'https://i.imgur.com/SDIkQIE.png'
                }
              />
            </UI.Center>
          </UI.Box>
          <UI.Text
            onClick={() => {
              push(`${path}/${record?.id}`);
            }}
            pl={4}
            color={'#4F4F4F'}
            fontSize={'md'}
            fontWeight={'semibold'}>
            {record?.name}
          </UI.Text>
        </UI.HStack>
      </UI.Box>
      <UI.Divider
        h={'40px'}
        borderBottomWidth={'2px'}
        borderBottomColor={'#E0E0E0'}
      />
    </UI.ScaleFade>
  );
};

export default memo(ItemList);
