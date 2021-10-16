import React, {memo} from 'react';
import {useModalController} from '@modules/modal';
import * as UI from '@chakra-ui/react';
import {TiDelete} from 'react-icons/ti';

const Certificate = ({data}) => {
  const {openModal} = useModalController();

  return (
    <UI.Box>
      <UI.HStack
        flexDirection={{md: 'column', lg: 'row'}}
        cursor="pointer"
        w="full"
        shadow="sm"
        p={5}
        bgColor={'#EEEEEC'}
        justifyContent="space-between"
        border="none"
        alignItems="center">
        <UI.Box
          onClick={() =>
            openModal('fileViewer2', {
              mediaDestination: data?.mediaDestination,
              title: 'Certificate',
            })
          }>
          <UI.Text fontSize={{md: 'md', lg: 'lg'}} fontWeight="600" pl={2}>
            {data?.name}
          </UI.Text>
        </UI.Box>
        <TiDelete />
      </UI.HStack>
    </UI.Box>
  );
};

export default memo(Certificate);
