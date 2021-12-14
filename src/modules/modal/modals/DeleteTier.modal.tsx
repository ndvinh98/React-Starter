import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';
import {useModalController} from '../modals.controller';
import {useRemove} from '@utils/hooks';

function RemoveTier() {
  const {deleteTier, closeModal, data} = useModalController();
  const {data: postData, loading, remove} = useRemove(`/tiers/${data?.id}`);
  const toast = UI.useToast();

  React.useEffect(() => {
    if (postData) {
      data?.cb?.();
      closeModal('deleteTier');
      toast({
        status: 'success',
        description: 'Successfully!',
        position: 'top-right',
        isClosable: true,
        duration: 2000,
      });
    }
  }, [postData]);

  return (
    <UI.Modal
      isCentered
      isOpen={deleteTier}
      onClose={() => closeModal('deleteTier')}>
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
          <UI.Box fontSize={20} color={'ste.red'} textAlign="center">
            <UI.Text> Delete Tier</UI.Text>
          </UI.Box>
          <UI.Center fontSize={'lg'} fontWeight={400} pt={3} textAlign="center">
            Are you sure you want to delete {data?.name}? This action cannot be
            undone.
          </UI.Center>
        </UI.ModalHeader>
        <UI.ModalBody fontSize={'lg'} textAlign={'center'}>
          <UI.Center mt={3} w={'full'}>
            <UI.Button
              colorScheme="blue"
              onClick={() => remove()}
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
                closeModal('deleteTier');
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

export default memo(RemoveTier);
