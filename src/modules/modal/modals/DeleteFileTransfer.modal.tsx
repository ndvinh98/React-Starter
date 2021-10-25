import React, {memo, useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';
import {useModalController} from '../modals.controller';
import {useRemove} from '@utils/hooks';
import {useContentManagementController} from '@modules/home';

function DeleteFileTransfer() {
  const {deleteFileTransfer, closeModal, data} = useModalController();
  const toast = UI.useToast();
  const {data: resData, loading, remove} = useRemove(data?.url);

  useEffect(() => {
    if (resData) {
      toast({
        status: 'success',
        description: 'Successfully!',
        position: 'top-right',
        isClosable: true,
        duration: 2000,
      });
      data?.cb?.();
      closeModal('deleteFileTransfer');
    }
  }, [resData]);

  return (
    <UI.Modal
      isCentered
      isOpen={deleteFileTransfer}
      onClose={() => closeModal('deleteFileTransfer')}>
      <UI.ModalOverlay />
      <UI.ModalContent position={'relative'} w="360px" minH="211px">
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
          <UI.Center fontSize={'lg'} color={'ste.red'} textAlign="center">
            Delete File Transfer
          </UI.Center>
        </UI.ModalHeader>
        <UI.ModalBody fontSize={'md'} textAlign={'center'}>
          <UI.Box
            mv={2}
            pr={2}
            pl={2}
            fontSize={'md'}
            w={'full'}
            textAlign="justify">
              <UI.VStack>
                <UI.Text>
                  Are you sure you want to delete the following content?
                </UI.Text>
              </UI.VStack>
          </UI.Box>
          <UI.Center mt={8} w={'full'}>
            <UI.Button
              colorScheme="blue"
              onClick={() => {
                remove();
              }}
              mr={3}
              w={'120px'}
              type="submit"
              isLoading={loading}>
              Confirm
            </UI.Button>
            <UI.Button
              w={'120px'}
              type="button"
              onClick={() => {
                closeModal('deleteFileTransfer');
              }}
              variant="outline">
              Cancel
            </UI.Button>
          </UI.Center>
        </UI.ModalBody>
        <UI.ModalFooter></UI.ModalFooter>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(DeleteFileTransfer);
