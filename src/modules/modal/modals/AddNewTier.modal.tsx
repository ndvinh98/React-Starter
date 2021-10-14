import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';
import {useModalController} from '../modals.controller';
import {usePost} from '@utils/hooks';

function AddNewTier() {
  const {addNewTier, closeModal, data} = useModalController();
  const [name, setName] = React.useState('');
  const handleChange = (event) => setName(event.target.value);
  const {data: postData, loading, post} = usePost(`/tiers`);
  const toast = UI.useToast();

  React.useEffect(() => {
    if (postData) {
      data?.cb?.();
      closeModal('addNewTier');
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
      isOpen={addNewTier}
      onClose={() => closeModal('addNewTier')}>
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
            Add new tier
          </UI.Center>
        </UI.ModalHeader>
        <UI.ModalBody fontSize={'lg'} textAlign={'center'}>
          <UI.Center fontSize={'lg'} textAlign="center">
            <UI.VStack w="full" alignItems="flex-start">
              <UI.Text fontSize="16px">Tier name:</UI.Text>
              <UI.Input
                value={name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </UI.VStack>
          </UI.Center>
          <UI.Center mt={8} w={'full'}>
            <UI.Button
              colorScheme="blue"
              onClick={() => post({name})}
              mr={3}
              w={'120px'}
              type="submit"
              isDisabled={!name}
              isLoading={loading}>
              Confirm
            </UI.Button>
            <UI.Button
              w={'120px'}
              type="button"
              onClick={() => {
                closeModal('addNewTier');
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

export default memo(AddNewTier);
