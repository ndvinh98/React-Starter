import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
import {useRouterController} from '@modules/router';
import {useRouter} from '@utils/hooks';
import {usePartnerContoller} from '@modules/partner/partner.contoller';

const IMAGES = {
  1: {id: 1, url: 'https://i.imgur.com/2NpnErN.png'},
  2: {id: 2, url: 'https://i.imgur.com/wSX6CPl.png'},
  3: {id: 3, url: 'https://i.imgur.com/Q04dMOc.png'},
  4: {id: 4, url: 'https://i.imgur.com/1okhbVx.png'},
  5: {id: 5, url: 'https://i.imgur.com/Y3lAWKG.png'},
  6: {id: 6, url: 'https://i.imgur.com/2NpnErN.png'},
  7: {id: 7, url: 'https://i.imgur.com/wSX6CPl.png'},
  8: {id: 8, url: 'https://i.imgur.com/Q04dMOc.png'},
  9: {id: 9, url: 'https://i.imgur.com/1okhbVx.png'},
  10: {id: 10, url: 'https://i.imgur.com/Y3lAWKG.png'},
  11: {id: 11, url: 'https://i.imgur.com/2NpnErN.png'},
  12: {id: 12, url: 'https://i.imgur.com/wSX6CPl.png'},
  13: {id: 13, url: 'https://i.imgur.com/Q04dMOc.png'},
  14: {id: 14, url: 'https://i.imgur.com/1okhbVx.png'},
  15: {id: 15, url: 'https://i.imgur.com/Y3lAWKG.png'},
};

const ItemList = (props: any) => {
  const {title, id, isCanNotSelected} = props;
  const path = useRouterController((s) => s.path);

  const {addSelectedItem, removeSelectedItem, itemsSelected} =
    usePartnerContoller();

  const {isOpen, onClose, onOpen} = UI.useDisclosure();
  const {push} = useRouter();
  return (
    <UI.ScaleFade in={true} initialScale={0.9}>
      <UI.Box
        onMouseEnter={isCanNotSelected ? undefined : () => onOpen()}
        onMouseLeave={() => onClose()}
        cursor={'pointer'}
        w="100%"
        h="70px">
        <UI.HStack spacing={5} alignItems={'stretch'} pl={5}>
          <UI.Box position={'relative'}>
            <UI.Image
              shadow={'md'}
              w={'150px'}
              h={'90px'}
              src={IMAGES?.[id]?.url || 'https://i.imgur.com/2NpnErN.png'}
              alt={id}
              mr={3}
            />
            {(isOpen || itemsSelected?.includes(id)) && (
              <UI.Checkbox
                onChange={(e) => {
                  if (e?.target?.checked) addSelectedItem(id);
                  else removeSelectedItem(id);
                }}
                isChecked={itemsSelected?.includes(id)}
                bg={'white'}
                borderRadius={'md'}
                position={'absolute'}
                right={'10px'}
                top={'10px'}
                size={'lg'}
              />
            )}
          </UI.Box>
          <UI.HStack
            onClick={() => {
              if (path === '/dashboard') {
                push(`${path}/1/${id}`);
              } else push(`${path}/${id}`);
            }}
            w={'100%'}
            h={'90px'}>
            <UI.Text color={'#4F4F4F'} fontSize={'lg'} fontWeight={'semibold'}>
              {title}
            </UI.Text>
          </UI.HStack>
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
