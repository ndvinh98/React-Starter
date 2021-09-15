import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
import {useModalController} from '../modals.controller';

function SearchModal() {
  const {search} = useModalController();

  return (
    <UI.Modal isCentered isOpen={search} onClose={() => {}}>
      <UI.ModalOverlay />
      <UI.ModalContent width="100px" height="100px">
        <UI.ModalBody textAlign={'center'}>
          <UI.Center h="100%">
            <UI.VStack>
              <UI.Spinner color="ste.red" />
              <UI.Text color="ste.red" fontWeight="semibold">
                Loading...
              </UI.Text>
            </UI.VStack>
          </UI.Center>
        </UI.ModalBody>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(SearchModal);
