import React, {memo, useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';

import {useModalController} from '../modals.controller';
import {usePost} from '@utils/hooks';

function ActionModal() {
  const {action, closeModal, data} = useModalController();
  const toast = UI.useToast();

  const {data: resData, post, loading} = usePost(`/users/activeUser`);

  useEffect(() => {
    if (resData) {
      closeModal('action');
      data?.cb();
      toast({
        title: 'Successfully!',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [resData]);
  return (
    <UI.Modal isCentered isOpen={action} onClose={() => closeModal('action')}>
      <UI.ModalOverlay />
      <UI.ModalContent w="350px" position={'relative'}>
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
            {data?.title}
          </UI.Center>
        </UI.ModalHeader>
        <UI.ModalBody fontSize={'lg'} textAlign={'center'}>
          <UI.Text>Are you sure you want to</UI.Text>
          <UI.Text>{data?.title.toLowerCase()}?</UI.Text>
        </UI.ModalBody>

        <UI.ModalFooter>
          <UI.Center w={'full'}>
            <UI.Button
              w={'120px'}
              isLoading={loading}
              mr={3}
              onClick={() => {
                post(
                  {
                    id: data?.id,
                    isActive: data?.type === 'Activate' ? 1 : 0,
                  },
                  {},
                );
              }}>
              Confirm
            </UI.Button>
            <UI.Button
              variant="outline"
              w={'120px'}
              onClick={() => closeModal('action')}>
              Cancel
            </UI.Button>
          </UI.Center>
        </UI.ModalFooter>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(ActionModal);
