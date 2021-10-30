import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';
import {useModalController} from '../modals.controller';
import {useRemove} from '@utils/hooks';

function RemoveCertificate() {
  const {removeCertificate, closeModal, data} = useModalController();
  const {
    data: postData,
    loading,
    remove,
  } = useRemove(`/partnerUserCertificates/${data?.id}`);
  const toast = UI.useToast();

  React.useEffect(() => {
    if (postData) {
      closeModal('removeCertificate');
      toast({
        status: 'success',
        description: 'Successfully!',
        position: 'top-right',
        isClosable: true,
        duration: 2000,
      });
      data?.getList();
    }
  }, [postData]);

  return (
    <UI.Modal
      isCentered
      isOpen={removeCertificate}
      onClose={() => closeModal('removeCertificate')}>
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
            <UI.Text> Delete Certificate</UI.Text>
          </UI.Box>
          <UI.Box
            pt={2}
            mv={2}
            pr={2}
            pl={2}
            fontWeight={400}
            fontSize={'lg'}
            w={'full'}
            textAlign="center">
            <UI.Text> Are you sure you want to delete</UI.Text>
            <UI.Text>this certificate? </UI.Text>
          </UI.Box>
        </UI.ModalHeader>
        <UI.ModalBody fontSize={'lg'} textAlign={'center'}>
          <UI.Center mt={4} w={'full'}>
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
                closeModal('removeCertificate');
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

export default memo(RemoveCertificate);
