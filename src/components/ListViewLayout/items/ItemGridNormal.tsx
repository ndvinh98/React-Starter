import React, {memo} from 'react';
import {usePartnerContoller} from '@modules/partner/partner.contoller';
import * as UI from '@chakra-ui/react';
import {useHover, useRouter} from '@utils/hooks';
import {useRouterController} from '@modules/router';

const ItemGrid = (props: any) => {
  const {title, id, isCanNotSelected, mediaDestination} = props;
  const path = useRouterController((s) => s.path);
  const {addSelectedItem, removeSelectedItem, itemsSelected} =
    usePartnerContoller();

  const {push} = useRouter();
  const [hoverRef, isHovered] = useHover<any>();
  return (
    <UI.ScaleFade in={true} initialScale={0.9}>
      <UI.Box ref={hoverRef} position="relative">
        {!isCanNotSelected && (
          <UI.Checkbox
            hidden={!isHovered && !itemsSelected.includes(id)}
            onChange={(e) => {
              if (e?.target?.checked) addSelectedItem(id);
              else removeSelectedItem(id);
            }}
            isChecked={itemsSelected?.includes(id)}
            position={'absolute'}
            bg={'white'}
            borderRadius={'md'}
            zIndex={2}
            top={2}
            left={2}
            size={'lg'}
          />
        )}
        <UI.Box
          onClick={() => {
            if (path === '/dashboard') {
              push(`${path}/1/${id}`);
            } else push(`${path}/${id}`);
          }}
          position={'relative'}
          shadow={'md'}
          bgSize={'contain'}
          bgRepeat={'no-repeat'}
          cursor={'pointer'}
          bgPosition={'center center'}
          bgImage={`url(${
            mediaDestination || 'https://i.imgur.com/2NpnErN.png'
          })`}
          w="100%"
          height={'200px'}>
          <UI.Center
            position={'absolute'}
            w={'full'}
            bottom={0}
            left={0}
            h={'80px'}
            bg={`rgba(0, 0, 0, 0.7)`}>
            <UI.Text
              w={'80%'}
              color={'white'}
              textTransform={'uppercase'}
              fontSize={'md'}
              textAlign={'center'}
              fontWeight={'semibold'}>
              {title === 'Access Control (Smart Locks)' ? (
                <span>
                  Access Control
                  <br />
                  (Smart Locks)
                </span>
              ) : (
                title
              )}
            </UI.Text>
          </UI.Center>
        </UI.Box>
      </UI.Box>
    </UI.ScaleFade>
  );
};
export default memo(ItemGrid);
