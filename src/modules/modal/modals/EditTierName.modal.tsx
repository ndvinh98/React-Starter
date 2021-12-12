import React, {memo, useState, useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';
import {useModalController} from '../modals.controller';
import {usePatch} from '@utils/hooks';

function LogoutModal() {
  const {editTierName, closeModal, data} = useModalController();
  const [name, setName] = useState(data?.defaultName);
  const handleChangeName = (event) => setName(event.target.value);

  React.useEffect(() => {
    setName(data?.defaultName);
  }, [data?.defaultName]);

  const {patch, loading, data: dataEditName} = usePatch<any>('/tiers/');
  const toast = UI.useToast();
  const handleConfirmName = (id: number) => () => {
    patch({name: name}, {}, id);
  };

  useEffect(() => {
    if (dataEditName) {
      toast({
        status: 'success',
        description: 'Successfully!',
        position: 'top-right',
        isClosable: true,
        duration: 2000,
      });
      data?.cb?.();
      closeModal('editTierName');
    }
  }, [dataEditName]);

  return (
    <UI.Modal
      isCentered
      isOpen={editTierName}
      onClose={() => closeModal('editTierName')}>
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
            Edit Tier Name
          </UI.Center>
        </UI.ModalHeader>
        <UI.ModalBody fontSize={'lg'} textAlign={'center'}>
          <UI.Input
            value={name}
            onChange={handleChangeName}
            placeholder="Enter new name"
          />
        </UI.ModalBody>

        <UI.ModalFooter>
          <UI.Center w={'full'}>
            <UI.Button
              colorScheme="blue"
              mr={3}
              w={'120px'}
              onClick={() => closeModal('editTierName')}>
              Cancel
            </UI.Button>
            <UI.Button
              isLoading={loading}
              w={'120px'}
              onClick={handleConfirmName(Number(data?.id))}
              variant="outline">
              Confirm
            </UI.Button>
          </UI.Center>
        </UI.ModalFooter>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(LogoutModal);
