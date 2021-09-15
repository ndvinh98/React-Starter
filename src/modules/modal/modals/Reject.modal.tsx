import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';

import {useModalController} from '../modals.controller';

function RejectModal() {
  const {reject, closeModal, data} = useModalController();
  return (
    <UI.Modal isCentered isOpen={reject} onClose={() => closeModal('reject')}>
      <UI.ModalOverlay />
      <UI.ModalContent position={'relative'}>
        <UI.Circle
          position={'absolute'}
          top={'-22px'}
          left={'50%'}
          transform={'translateX(-50%)'}
          size={'55px'}
          bg={'white'}>
          <UI.Circle>
            <RiErrorWarningFill color={'#E43A3A'} size={'50px'} />
          </UI.Circle>
        </UI.Circle>

        <UI.ModalHeader mt={8}>
          <UI.Center fontSize={'lg'} textAlign="center" color={'ste.red'}>
            Please select reason you wish to reject {data?.companyName}
            partner’s application?
          </UI.Center>
        </UI.ModalHeader>
        <UI.ModalBody fontSize={'lg'} textAlign={'center'}>
          Are you sure you want to Sign Out?
        </UI.ModalBody>

        <UI.ModalFooter>
          <UI.Center w={'full'}>
            <UI.Button
              colorScheme="blue"
              mr={3}
              w={'120px'}
              onClick={() => closeModal('reject')}>
              Cancel
            </UI.Button>
            <UI.Button
              w={'120px'}
              onClick={() => {
                closeModal('logout');
              }}
              variant="outline">
              Sign Out
            </UI.Button>
          </UI.Center>
        </UI.ModalFooter>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(RejectModal);
