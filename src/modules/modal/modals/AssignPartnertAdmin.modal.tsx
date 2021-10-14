import React, {memo, useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';

import FormGenerate from '@components/FormGenerate';
import {useModalController} from '../modals.controller';
import {usePatch} from '@utils/hooks';

function AssignPartnerAdminModal() {
  const {assignPartnerAdmin, closeModal, data} = useModalController();
  const {
    data: patchData,
    loading,
    patch,
  } = usePatch(`/partnerApplicationSubmissions/${data?.id}`);
  const toast = UI.useToast();

  useEffect(() => {
    if (patchData) {
      closeModal('assignPartnerAdmin');
      toast({status: 'success', description: 'Successfully!', duration: 2000});
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
            Are you sure you want to asign {data?.firstName} {', '}{' '}
            {data?.lastName}
          </UI.Center>
        </UI.ModalHeader>
        <UI.ModalBody fontSize={'lg'} textAlign={'center'}>
          <FormGenerate
            onSubmit={({}) => {
              patch({
                status: 'APPROVED',
              });
            }}
            fields={[
              {
                name: 'date',
                type: 'input',
                size: 'lg',
                placeholder: '',
              },
            ]}>
            <UI.Center w={'full'} pt="10">
              <UI.Button
                colorScheme="blue"
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
                  closeModal('confirmRequest');
                }}
                variant="outline">
                Cancel
              </UI.Button>
            </UI.Center>
          </FormGenerate>
        </UI.ModalBody>

        <UI.ModalFooter></UI.ModalFooter>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(AssignPartnerAdminModal);
