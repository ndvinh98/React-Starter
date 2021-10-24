import React, {memo, useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';

import {useModalController} from '../modals.controller';
import {usePost} from '@utils/hooks';

function AssignPartnerAdminModal() {
  const {assignPartnerAdmin, closeModal, data} = useModalController();
  const {
    data: patchData,
    loading,
    post,
  } = usePost(`/partnerUsers/${data?.id}/assignAsPartnerAdmin`);
  const toast = UI.useToast();

  useEffect(() => {
    if (patchData) {
      closeModal('assignPartnerAdmin');
      toast({status: 'success', description: 'Successfully!', duration: 2000});
      data?.cb();
    }
  }, [patchData]);

  return (
    <UI.Modal
      isCentered
      isOpen={assignPartnerAdmin}
      onClose={() => closeModal('assignPartnerAdmin')}>
      <UI.ModalOverlay />
      <UI.ModalContent position={'relative'} w="360px" minH="311px">
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
            Are you sure you want to assign
          </UI.Center>
          <UI.Center fontSize={'lg'} textAlign="center" color={'ste.red'}>
            {data?.firstName} {` `} {data?.lastName} as Partner
          </UI.Center>
          <UI.Center fontSize={'lg'} textAlign="center" color={'ste.red'}>
            for {data?.companyName}
          </UI.Center>
        </UI.ModalHeader>
        <UI.ModalBody fontSize={'lg'} textAlign={'center'}>
          <UI.Center mt={8} w={'full'}>
            <UI.Button
              colorScheme="blue"
              onClick={() => {
                post({});
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
                closeModal('assignPartnerAdmin');
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

export default memo(AssignPartnerAdminModal);
