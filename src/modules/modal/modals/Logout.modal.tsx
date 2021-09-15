import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';

import {useModalController} from '../modals.controller';
import {useAuthController} from '@modules/auth';

function LogoutModal() {
  const {logout, closeModal} = useModalController();
  const {logout: signOut} = useAuthController();
  return (
    <UI.Modal isCentered isOpen={logout} onClose={() => closeModal('logout')}>
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
          <UI.Center ontSize={'lg'} color={'ste.red'}>
            Sign Out
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
              onClick={() => closeModal('logout')}>
              Cancel
            </UI.Button>
            <UI.Button
              w={'120px'}
              onClick={() => {
                closeModal('logout');
                signOut();
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

export default memo(LogoutModal);
