import React from 'react';
import * as UI from '@chakra-ui/react';
import {useContentManagementController} from '@modules/home/admin-modules/content-management';
import {useHover} from '@utils/hooks';

function ModuleGridItem({item, onClickItem}) {
  const [hoverRef, isHovered] = useHover<any>();
  const itemSelected = useContentManagementController((s) => s.itemSelected);
  const addItem = useContentManagementController((s) => s.addItem);
  const removeItem = useContentManagementController((s) => s.removeItem);

  return (
    <UI.Box width="full" ref={hoverRef} position="relative">
      <UI.Checkbox
        onChange={(e) => {
          e.stopPropagation();
          if (e?.target?.checked) {
            addItem(item);
          } else {
            removeItem(item);
          }
        }}
        defaultChecked={itemSelected?.map((x) => x?.id).includes(+item?.id)}
        hidden={
          !isHovered && !itemSelected?.map((x) => x?.id).includes(+item?.id)
        }
        position={'absolute'}
        bg={'white'}
        borderRadius={'md'}
        right={'10px'}
        top={'10px'}
        size={'lg'}
        zIndex={9}
      />
      <UI.Box
        onClick={() => {
          onClickItem?.(item);
        }}
        cursor="pointer"
        shadow="sm"
        height="200px"
        size="20px"
        borderWidth="2px"
        key={item?.id}>
        <UI.VStack
          h={'full'}
          w={'full'}
          justifyContent={'center'}
          alignItems={'center'}>
          <UI.Box w={'68px'} h={'68px'} bg={'white'} p={3}>
            <UI.Image
              src={
                item?.thumbnailMediaDestination?.replace(' ', '%20') ||
                item?.mediaDestination
              }></UI.Image>
          </UI.Box>
          <UI.Text fontWeight={'bold'} color={'#828282'}>
            {item?.name?.toUpperCase()}
          </UI.Text>
        </UI.VStack>
      </UI.Box>
    </UI.Box>
  );
}

export default React.memo(ModuleGridItem);
