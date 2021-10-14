import React, {memo, useEffect, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';
import {useModalController} from '../modals.controller';
import {usePatch} from '@utils/hooks';

import DatePicker from '@components/DatePicker';

function ConfirmModal() {
  const {confirmRequest, closeModal, data} = useModalController();
  const {data: patchData} = usePatch(
    `/partnerApplicationSubmissions/${data?.id}`,
  );
  const toast = UI.useToast();
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    if (patchData) {
      closeModal('confirmRequest');
      toast({status: 'success', description: 'Successfully!', duration: 2000});
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
          <UI.Text mb={2}>Validity Date:</UI.Text>
          <DatePicker
            isMinimumTodayDate
            value={selectedDay}
            onChange={setSelectedDay}
          />
        </UI.ModalBody>

        <UI.ModalFooter></UI.ModalFooter>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(ConfirmModal);
