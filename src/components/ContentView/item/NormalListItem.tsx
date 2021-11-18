import React from 'react';
import * as UI from '@chakra-ui/react';
import {useContentManagementController} from '@modules/home/admin-modules/content-management';
import {useHover} from '@utils/hooks';
import {useModalController} from '@modules/modal';
import {format} from 'date-fns';

const MEDIA_TYPE = {
  image: "IMAGES",
  video: "VIDEOS",
  document: "DOCUMENTS",
};

function NormalListItem({item, onClickItem, mediaType}) {
  const [hoverRef, isHovered] = useHover<any>();
  const itemSelected = useContentManagementController((s) => s.itemSelected);
  const addItem = useContentManagementController((s) => s.addItem);
  const removeItem = useContentManagementController((s) => s.removeItem);
  const {openModal} = useModalController();

  return (
    <UI.Box ref={hoverRef} w="full" position="relative">
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
        borderRadius="md"
        position="absolute"
        left="65px"
        top="27px"
        zIndex={99}
        size="lg"
      />
      <UI.HStack
        onClick={() => {
          if (!mediaType) onClickItem?.(item);
          else
            openModal('contentViewer', {
              mediaDestination: item?.mediaDestination,
            });
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
          {mediaType === MEDIA_TYPE.video && (
            <UI.Image
              onClick={() =>
                openModal('contentViewer', {
                  mediaDestination: item?.mediaDestination,
                })
              }
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
          {(mediaType) && (
            <UI.Text color={'#828282'} fontSize={'12px'}>
              {mediaType === MEDIA_TYPE.video
                ? item?.videoLength + ' | ' + item?.fileType
                : mediaType === MEDIA_TYPE.image 
                ? item?.fileType
                : item?.noOfPages + ' pages | ' + item?.fileType}
                {' | Uploaded: ' +
                  (item?.createdAt
                    ? format(new Date(item?.createdAt), 'dd MMM yyyy')
                    : undefined) +
                  ' | Uploaded by: ' +
                  item?.uploadedByUser?.firstName +
                  ' ' +
                  item?.uploadedByUser?.lastName}
            </UI.Text>
          )}
        </UI.VStack>
      </UI.HStack>
    </UI.Box>
  );
}

export default React.memo(NormalListItem);
