import React, {memo, useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';
import {useModalController} from '../modals.controller';
import {usePatch} from '@utils/hooks';

function AllowDomainModal() {
  const {allowDomain, closeModal, data} = useModalController();
  const {
    data: patchData,
    loading,
    patch,
  } = usePatch(`/partnerDomains/${data?.id}`);
  const toast = UI.useToast();

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (patchData) {
      data?.cb();
      closeModal('allowDomain');
      toast({status: 'success', description: 'Successfully!', duration: 2000});
    }
  }, [patchData]);

  return (
    <UI.Modal
      isCentered
      isOpen={allowDomain}
      onClose={() => closeModal('allowDomain')}>
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
            {data?.isAllowed ? 'Blacklist' : 'Whitelist'} Domain
          </UI.Center>
        </UI.ModalHeader>
        <UI.ModalBody fontSize={'lg'} textAlign={'center'}>
          <UI.Center fontSize={'lg'} textAlign="center">
            Are you sure you want to{' '}
            {data?.isAllowed ? 'blacklist' : 'whitelist'} {data?.domain} ?
          </UI.Center>
          <UI.Center mt={8} w={'full'}>
            <UI.Button
              colorScheme="blue"
              onClick={() => {
                patch({isAllowed: data?.isAllowed ? 0 : 1});
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
                closeModal('allowDomain');
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

export default memo(AllowDomainModal);
