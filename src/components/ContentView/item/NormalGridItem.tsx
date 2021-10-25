import React from 'react';
import * as UI from '@chakra-ui/react';
import {useContentManagementController} from '@modules/home/admin-modules/content-management';
import {useRouter, useHover} from '@utils/hooks';

function GridItem({item, linkToChild, isVideo, isBrochures}) {
  const {push} = useRouter();
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
          push(linkToChild);
        }}
        bg="white"
        bgImage={`url(${
          item?.thumbnailMediaDestination?.replace(' ', '%20') ||
          item?.mediaDestination
        })`}
        bgSize="cover"
        bgRepeat="no-repeat"
        cursor="pointer"
        shadow="sm"
        height="200px"
        size="20px"
        fontWeight="bold"
        position="relative">
        {isVideo && (
          <UI.Image
            //left= {0}
            position="absolute"
            zIndex={1}
            top={'50%'}
            left={'50%'}
            transform={'translate(-50%, -50%);'}
            w="100px"
            src={'/images/playback.png'}
          />
        )}
        {!isVideo && !isBrochures ? (
          <UI.Center
            position="absolute"
            w="full"
            height="50px"
            bg="#000000a7"
            bottom={0}>
            <UI.Text textAlign={'center'} color="white">{item?.name || item?.resourceName}</UI.Text>
          </UI.Center>
        ) : (
          <UI.Box
            position="absolute"
            w="full"
            //height="50px"
            bg="#000000a7"
            bottom={0}
            p={2}>
            <UI.Text color="white">{item?.name || item?.resourceName}</UI.Text>
            <UI.HStack>
              <UI.Text color={'white'} fontSize={'12px'}>
                {isVideo
                  ? item?.videoLength + ' | ' + item?.videoFileType
                  : item?.noOfPages + ' pages | ' + item?.brochureFormat}
              </UI.Text>
            </UI.HStack>
          </UI.Box>
        )}
      </UI.Box>
    </UI.Box>
  );
}

export default React.memo(GridItem);
