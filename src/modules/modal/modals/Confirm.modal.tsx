import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';
import * as yup from 'yup';
import FormGenerate from '@components/FormGenerate';
import {useModalController} from '../modals.controller';

function ConfirmModal() {
  const {confirmRequest, closeModal, data} = useModalController();

  return (
    <UI.Modal
      isCentered
      isOpen={confirmRequest}
      onClose={() => closeModal('confirmRequest')}>
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
          <UI.Center fontSize={'lg'} textAlign="center" color={'ste.red'}>
            Please select access validity date for {data?.companyName}
          </UI.Center>
        </UI.ModalHeader>
        <UI.ModalBody fontSize={'lg'} textAlign={'center'}>
          <FormGenerate
            spacing={6}
            pt={7}
            onSubmit={(value) => {
              // post(value);
              // email.current = value?.email;
            }}
            schema={{
              date: yup.date().isValid('Date is invalid'),
            }}
            fields={[
              {
                name: 'date',
                type: 'input',
                size: 'lg',
                placeholder: '',
              },
            ]}></FormGenerate>
        </UI.ModalBody>

        <UI.ModalFooter>
          <UI.Center w={'full'}>
            <UI.Button
              colorScheme="blue"
              mr={3}
              w={'120px'}
              type="submit"
              onClick={() => closeModal('comfirmRequest')}>
              Confirm
            </UI.Button>
            <UI.Button
              w={'120px'}
              type="button"
              onClick={() => {
                closeModal('confirmRequest');
              }}
              variant="outline">
              Cancle
            </UI.Button>
          </UI.Center>
        </UI.ModalFooter>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(ConfirmModal);
