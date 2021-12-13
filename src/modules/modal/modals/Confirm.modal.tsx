import React, {memo, useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';
import {useModalController} from '../modals.controller';
import {usePatch, useRouter} from '@utils/hooks';
import FormGenerate from '@components/FormGenerate';

function ConfirmModal() {
  const {confirmRequest, closeModal, data} = useModalController();
  const {
    data: patchData,
    loading,
    patch,
  } = usePatch(`/partnerApplicationSubmissions/${data?.id}`);
  const toast = UI.useToast();
  const {push} = useRouter();

  useEffect(() => {
    if (patchData) {
      closeModal('confirmRequest');
      toast({
        status: 'success',
        description: 'Successfully!',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
      push('/home/partner-applications');
    }
  }, [patchData]);

  return (
    <UI.Modal
      isCentered
      autoFocus={false}
      isOpen={confirmRequest}
      onClose={() => closeModal('confirmRequest')}>
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
            Please select access validity date for {data?.companyName}
          </UI.Center>
        </UI.ModalHeader>
        <UI.ModalBody>
          <FormGenerate
            onSubmit={(data) => {
              const {selectedDay} = data;
              patch({
                status: 'APPROVED',
                expiryDate: `${selectedDay.month}/${selectedDay.day}/${selectedDay.year}`,
              });
            }}
            fields={[
              {
                name: 'selectedDay',
                type: 'date-picker',
                isMinimumTodayDate: true,
                label: 'Validity Date:',
              },
            ]}>
            <UI.HStack justifyContent={'space-evenly'} mt={5}>
              <UI.Button isLoading={loading} w={'120px'} type="submit">
                Confirm
              </UI.Button>
              <UI.Button
                onClick={() => {
                  closeModal('confirmRequest');
                }}
                w={'120px'}
                variant="outline"
                type="button">
                Cancel
              </UI.Button>
            </UI.HStack>
          </FormGenerate>
        </UI.ModalBody>

        <UI.ModalFooter></UI.ModalFooter>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(ConfirmModal);
