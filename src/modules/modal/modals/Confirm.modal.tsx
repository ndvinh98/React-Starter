import React, {memo, useEffect, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';
import {useModalController} from '../modals.controller';
import {usePatch, useRouter} from '@utils/hooks';

import DatePicker from '@components/DatePicker';

function ConfirmModal() {
  const {confirmRequest, closeModal, data} = useModalController();
  const {
    data: patchData,
    loading,
    patch,
  } = usePatch(`/partnerApplicationSubmissions/${data?.id}`);
  const toast = UI.useToast();
  const [selectedDay, setSelectedDay] = useState(null);

  const {push} = useRouter();

  useEffect(() => {
    if (patchData) {
      closeModal('confirmRequest');
      toast({status: 'success', description: 'Successfully!', duration: 2000});
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
          <UI.Stack>
            <UI.Text mb={2}>Validity Date:</UI.Text>
            <DatePicker
              isMinimumTodayDate
              value={selectedDay}
              onChange={setSelectedDay}
            />
            <UI.Center mt={8} w={'full'} pt={3}>
              <UI.Button
                colorScheme="blue"
                onClick={() => {
                  patch({
                    status: 'APPROVED',
                    expiryDate: `${selectedDay.month}/${selectedDay.day}/${selectedDay.year}`,
                  });
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
                  closeModal('confirmRequest');
                }}
                variant="outline">
                Cancel
              </UI.Button>
            </UI.Center>
          </UI.Stack>
        </UI.ModalBody>

        <UI.ModalFooter></UI.ModalFooter>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(ConfirmModal);
