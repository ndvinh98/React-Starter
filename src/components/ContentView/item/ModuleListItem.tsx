import React from 'react';
import * as UI from '@chakra-ui/react';
import {useContentManagementController} from '@modules/home/modules/content-management';
import {useRouter, useHover} from '@utils/hooks';

function ModuleGridItem({item, linkToChild}) {
  const {push} = useRouter();
  const [hoverRef, isHovered] = useHover<any>();
  const itemSelected = useContentManagementController((s) => s.itemSelected);
  const addItem = useContentManagementController((s) => s.addItem);
  const removeItem = useContentManagementController((s) => s.removeItem);

  return (
    <UI.Box ref={hoverRef} w="full" position="relative">
      <UI.HStack
        key={item?.id}
        cursor="pointer"
        w="full"
        borderTopWidth={2}
        py={5}>
        <UI.Checkbox
          onChange={(e) => {
            e.stopPropagation();
            if (e?.target?.checked) addItem(item?.id);
            else removeItem(item?.id);
          }}
          isChecked={itemSelected.includes(+item?.id)}
          hidden={!isHovered && !itemSelected.includes(+item?.id)}
          size="lg"
          zIndex={9}
        />
        <UI.Box
          onClick={() => {
            push(linkToChild + '/module/' + item?.id);
          }}
          bg={'white'}
          cursor="pointer"
          mr={3}
          shadow="md"
          p={4}
          w="68px"
          h="68px">
          <UI.Image
            src={
              item?.thumbnailMediaDestination?.replace(' ', '%20') ||
              item?.mediaDestination
            }></UI.Image>
        </UI.Box>
        <UI.Text
          onClick={() => {
            push(linkToChild + '/module/' + item?.id);
          }}
          textTransform="uppercase"
          color="#828282"
          fontWeight="bold"
          fontSize="18px">
          {item?.name}
        </UI.Text>
      </UI.HStack>
    </UI.Box>
  );
}

export default React.memo(ModuleGridItem);
