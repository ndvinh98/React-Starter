import React, {memo} from 'react';
import {useRouter, useHover} from '@utils/hooks';
import * as UI from '@chakra-ui/react';
import {usePartnerContoller} from '@modules/partner/partner.contoller';
import {useRouterController} from '@modules/router';

const ItemGrid = (props: any) => {
  const {record} = props;
  const path = useRouterController((s) => s.path);
  const {push} = useRouter();
  const [hoverRef, isHovered] = useHover<any>();
  const {addSelectedItem, removeSelectedItem, itemsSelected} =
    usePartnerContoller();

  return (
    <UI.ScaleFade ref={hoverRef} in={true} initialScale={0.9}>
      <UI.HStack position={'relative'}>
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
          right={'10px'}
          top={'10px'}
          size={'lg'}
        />
      </UI.HStack>

      <UI.HStack
        shadow={'sm'}
        bgSize={'400px'}
        cursor={'pointer'}
        border={'1px solid #BDBDBD'}
        onClick={() => {
          push(`${path}/${record?.id}`);
        }}
        w="100%"
        height={'200px'}>
        <UI.Center w={'full'}>
          <UI.VStack>
            <UI.Center shadow={'md'} w={'80px'} h={'80px'} bg={'white'}>
              <UI.Image
                w={'45px'}
                h={'45px'}
                src={
                  record?.mediaDestination || 'https://i.imgur.com/SDIkQIE.png'
                }
              />
            </UI.Center>
            <UI.Text
              pt={3}
              w={'100%'}
              color={'#828282'}
              textTransform={'uppercase'}
              fontSize={'md'}
              textAlign={'center'}
              fontWeight={'semibold'}>
              {record?.name}
            </UI.Text>
          </UI.VStack>
        </UI.Center>
      </UI.HStack>
    </UI.ScaleFade>
  );
};
export default memo(ItemGrid);
