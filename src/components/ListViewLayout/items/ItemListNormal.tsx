import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
import {usePartnerContoller} from '@modules/partner/partner.contoller';
import {useRouterController} from '@modules/router';
import {useRouter} from '@utils/hooks';

const ItemList = (props: any) => {
  const {title, id, isCanNotSelected, mediaDestination} = props;
  const {addSelectedItem, removeSelectedItem, itemsSelected} =
    usePartnerContoller();
  const {isOpen, onClose, onOpen} = UI.useDisclosure();
  const {push} = useRouter();
  const path = useRouterController((s) => s.path);
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
              objectFit="contain"
              shadow={'md'}
              w={'150px'}
              h={'90px'}
              src={mediaDestination || 'https://i.imgur.com/2NpnErN.png'}
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
