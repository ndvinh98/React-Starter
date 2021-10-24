import React, {memo} from 'react';
import {useModalController} from '@modules/modal';
import * as UI from '@chakra-ui/react';
import {TiDelete} from 'react-icons/ti';

const Certificate = ({data, getList}) => {
  const {openModal} = useModalController();

  return (
    <UI.Box>
      <UI.HStack
        flexDirection={{md: 'column', lg: 'row'}}
        cursor="pointer"
        w="full"
        shadow="sm"
        p={5}
        bgColor={'#F7F7F7'}
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

        <UI.Box
          onClick={() =>
            openModal('removeCertificate', {
              id: data?.id,
              certificate: data?.name,
              getList: getList,
            })
          }>
          <TiDelete size="25px" color="#E0E0E0" />
        </UI.Box>
      </UI.HStack>
    </UI.Box>
  );
};

export default memo(Certificate);
