import React, {memo, useEffect, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';
import {useModalController} from '../modals.controller';
import {usePatch} from '@utils/hooks';

import DatePicker from '@components/DatePicker';
import {utils} from 'react-modern-calendar-datepicker';

function ResetValidationModal() {
  const {resetValidation, closeModal, data} = useModalController();
  const {data: patchData, loading, patch} = usePatch(`/partners/${data?.id}`);
  const toast = UI.useToast();

  const [selectedDay, setSelectedDay] = useState(
    utils('fa').getMonthNumber(`6`),
  );

  useEffect(() => {
    if (patchData) {
      closeModal('resetValidation');
      toast({
        status: 'success',
        description: 'Successfully!',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
      data?.cb();
    }
  }, [patchData]);

  return (
    <UI.Modal
      isCentered
      autoFocus={false}
      isOpen={resetValidation}
      onClose={() => closeModal('resetValidation')}>
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
            Reset Validity Date
          </UI.Center>
        </UI.ModalHeader>
        <UI.ModalBody>
          <UI.Stack>
            <UI.Center fontSize={'lg'} textAlign="center" color={'ste.red'}>
              Please set the new validity date for {data?.companyName}
            </UI.Center>
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
                  closeModal('resetValidation');
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

export default memo(ResetValidationModal);
