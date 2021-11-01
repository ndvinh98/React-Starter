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
      <UI.ModalContent position={'relative'} w="360px">
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
            <UI.Text> Assign as Partner Admin</UI.Text>
          </UI.Box>
          <UI.Box pt={3}>
            <UI.Center fontSize={'lg'} textAlign="center" fontWeight="400">
              Are you sure you want to assign {data?.firstName} {` `}{' '}
              {data?.lastName} as Partner Admin for {data?.companyName}
            </UI.Center>
          </UI.Box>
        </UI.ModalHeader>
        <UI.ModalBody fontSize={'lg'} textAlign={'center'}>
          <UI.Center mt={2} w={'full'}>
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
