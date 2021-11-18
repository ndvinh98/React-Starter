import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
import {useHover} from '@utils/hooks';
import {usePartnerContoller} from '@modules/partner/partner.contoller';
import {useModalController} from '@modules/modal';

const MEDIA_TYPE = {
  VIDEOS: ({record}) => {
    const [hoverRef, isHovered] = useHover<any>();
    const {addSelectedItem, removeSelectedItem, itemsSelected} =
      usePartnerContoller();
    const openModal = useModalController((s) => s.openModal);

    const handleShowContent = () => {
      openModal('contentViewer', {mediaDestination: record?.mediaDestination});
    };
    return (
      <UI.Box ref={hoverRef} position="relative">
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
          zIndex="3"
        />
        <UI.HStack
          onClick={() => handleShowContent()}
          borderRadius={'md'}
          position={'relative'}
          shadow={'sm'}
          cursor={'pointer'}
          bgPosition={'center center'}
          bgRepeat="no-repeat"
          bgSize="cover"
          bgImage={`url("${record?.thumbnailMediaDestination}")`}
          w="100%"
          overflow={'hidden'}
          height={'200px'}>
          <UI.Center w={'full'}>
            <UI.VStack>
              <UI.Box position={'relative'}>
                <UI.Image w={'60px'} h={'60px'} src={'/images/play-icon.png'} />
              </UI.Box>
              <UI.Box
                position={'absolute'}
                h={'70px'}
                bottom={0}
                w={'full'}
                bg={'rgba(0, 0, 0, 0.7)'}
                px={4}>
                <UI.Text
                  pt={3}
                  w={'100%'}
                  color={'white'}
                  textTransform={'uppercase'}
                  fontSize={'md'}
                  textAlign={'left'}
                  fontWeight={'semibold'}>
                  {record?.resourceName?.slice(0, 25)}
                  {record?.resourceName?.length > 25 && <span>...</span>}
                </UI.Text>
                <UI.HStack>
                  <UI.Text color={'white'}>{record?.videoLength}</UI.Text>
                  <UI.Text color={'white'}> | .{record?.fileType}</UI.Text>
                </UI.HStack>
              </UI.Box>
            </UI.VStack>
          </UI.Center>
        </UI.HStack>
      </UI.Box>
    );
  },
  DOCUMENTS: ({record}) => {
    const {addSelectedItem, removeSelectedItem, itemsSelected} =
      usePartnerContoller();
    const [hoverRef, isHovered] = useHover<any>();
    const openModal = useModalController((s) => s.openModal);

    const handleShowContent = () => {
      openModal('pdfViewer', {mediaDestination: record?.mediaDestination});
    };

    return (
      <UI.Box ref={hoverRef} position="relative">
        <UI.Checkbox
          zIndex={99}
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
        <UI.HStack
          onClick={handleShowContent}
          overflow={'hidden'}
          borderRadius={'md'}
          position={'relative'}
          shadow={'sm'}
          bgRepeat="no-repeat"
          bgSize="cover"
          bgImage={`url("${record?.thumbnailMediaDestination}")`}
          cursor={'pointer'}
          bgPosition={'center center'}
          w="100%"
          height={'200px'}>
          <UI.Center w={'full'}>
            <UI.VStack>
              <UI.Box
                position={'absolute'}
                h={'70px'}
                bottom={0}
                w={'full'}
                bg={'rgba(0, 0, 0, 0.7)'}
                px={4}>
                <UI.Text
                  pt={3}
                  w={'100%'}
                  color={'white'}
                  textTransform={'uppercase'}
                  fontSize={'md'}
                  textAlign={'left'}
                  fontWeight={'semibold'}>
                  {record?.resourceName?.slice(0, 25)}
                  {record?.resourceName?.length > 25 && <span>...</span>}
                </UI.Text>
                <UI.HStack>
                  <UI.Text color={'white'}>{record?.noOfPages} Pages</UI.Text>
                  <UI.Text color={'white'}> | .{record?.fileType}</UI.Text>
                </UI.HStack>
              </UI.Box>
            </UI.VStack>
          </UI.Center>
        </UI.HStack>
      </UI.Box>
    );
  },
};

const ItemGrid = (props: any) => {
  const {isSelected, record, mediaType} = props;
  const Component = MEDIA_TYPE?.[mediaType];
  return (
    <UI.ScaleFade in={true} initialScale={0.9}>
      {Component && <Component record={record} isSelected={isSelected} />}
    </UI.ScaleFade>
  );
};
export default memo(ItemGrid);
