import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';

import {useModalController} from '../modals.controller';
import FormGenerate from '@components/FormGenerate';
import * as yup from 'yup';
import {usePatch} from '@utils/hooks';

function RejectModal() {
  const {reject, closeModal, data} = useModalController();
  const {data: patchData, loading, patch} = usePatch('');

  return (
    <UI.Modal isCentered isOpen={reject} onClose={() => closeModal('reject')}>
      <UI.ModalOverlay />
      <UI.ModalContent minW="654px" h="550px" position={'relative'}>
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
            Please select reason you wish to reject {data?.companyName}{' '}
            partner’s application?
          </UI.Center>
        </UI.ModalHeader>
        <UI.ModalBody fontSize={'lg'} textAlign={'center'}>
          <UI.VStack>
            <UI.HStack></UI.HStack>

            <FormGenerate
              schema={{
                feedbackMessage: yup.string().required('Field is required'),
              }}
              fields={[
                {
                  name: 'type',
                  type: 'checkbox-group',
                  size: 'lg',
                  options: [
                    {
                      label: 'checkbox 1',
                      value: '1',
                    },
                    {
                      label: 'checkbox 2',
                      value: '2',
                    },
                  ],
                },
                {
                  name: 'reasonMessage',
                  type: 'textarea',
                  placeholder: 'Type your message...',
                  label: (
                    <UI.VStack w="full" justifyContent="space-between">
                      <UI.Text w="full" fontSize={16} color="#1A1E32">
                        Reason
                      </UI.Text>
                      <UI.Text w="full" fontSize={12} color=" #ADADAD">
                        Max 4000 characters
                      </UI.Text>
                    </UI.VStack>
                  ),
                  h: '250px',
                },
              ]}>
              <UI.Center w={'full'}>
                <UI.Button
                  colorScheme="blue"
                  mr={3}
                  w={'120px'}
                  onClick={() => closeModal('reject')}>
                  Cancel
                </UI.Button>
                <UI.Button
                  w={'120px'}
                  onClick={() => {
                    closeModal('reject');
                  }}
                  variant="outline">
                  Confirm
                </UI.Button>
              </UI.Center>
            </FormGenerate>
          </UI.VStack>
        </UI.ModalBody>

        <UI.ModalFooter></UI.ModalFooter>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(RejectModal);
