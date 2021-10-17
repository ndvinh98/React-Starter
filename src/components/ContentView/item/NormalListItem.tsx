import React from 'react';
import * as UI from '@chakra-ui/react';
import {useContentManagementController} from '@modules/home/modules/content-management';
import {useRouter, useHover} from '@utils/hooks';

function NormalListItem({item, linkToChild, isVideo, isBrochures}) {
  const {push} = useRouter();
  const [hoverRef, isHovered] = useHover<any>();
  const itemSelected = useContentManagementController((s) => s.itemSelected);
  const addItem = useContentManagementController((s) => s.addItem);
  const removeItem = useContentManagementController((s) => s.removeItem);
  return (
    <UI.Box ref={hoverRef} w="full" position="relative">
      <UI.Checkbox
        onChange={(e) => {
          e.stopPropagation();
          if (e?.target?.checked) addItem(item?.id);
          else removeItem(item?.id);
        }}
        isChecked={itemSelected.includes(+item?.id)}
        hidden={!isHovered && !itemSelected.includes(+item?.id)}
        borderRadius="md"
        position="absolute"
        left="65px"
        top="27px"
        zIndex={99}
        size="lg"
      />
      <UI.HStack
        onClick={() => {
          push(linkToChild);
        }}
        key={item?.id}
        cursor="pointer"
        w="full"
        borderTopWidth={2}
        py={5}>
        <UI.Center
          bgImage={`url(${
            item?.thumbnailMediaDestination?.replace(' ', '%20') ||
            item?.mediaDestination
          })`}
          bgSize="cover"
          bgRepeat="no-repeat"
          cursor="pointer"
          mr={3}
          shadow="md"
          position="relative"
          w="90px"
          h="60px">
          {isVideo && (
            <UI.Image
              //left= {0}
              position="absolute"
              zIndex={1}
              top={'50%'}
              left={'50%'}
              transform={'translate(-50%, -50%);'}
              w="30px"
              src={'/images/playback.png'}
            />
          )}
        </UI.Center>

        <UI.VStack alignItems={'start'}>
          <UI.Text
            textTransform="uppercase"
            color="#828282"
            fontWeight="bold"
            fontSize="18px">
            {item?.name || item?.resourceName}
          </UI.Text>
          {(isVideo || isBrochures) && (
            <UI.Text color={'#828282'} fontSize={'12px'}>
              {isVideo
                ? item?.videoLength + ' | ' + item?.videoFileType
                : item?.noOfPages + ' pages | ' + item?.brochureFormat}
            </UI.Text>
          )}
        </UI.VStack>
      </UI.HStack>
    </UI.Box>
  );
}

export default React.memo(NormalListItem);
