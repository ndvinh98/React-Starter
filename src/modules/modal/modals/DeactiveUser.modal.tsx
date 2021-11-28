import React, {memo, useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';

import {useModalController} from '../modals.controller';
import FormGenerate from '@components/FormGenerate';
import * as yup from 'yup';
import {usePost} from '@utils/hooks';

function DeactivetUser() {
  const {deactiveUser, closeModal, data} = useModalController();
  const {data: patchData, loading, post} = usePost(`/users/activeUser`);
  const toast = UI.useToast();

  useEffect(() => {
    if (patchData) {
      closeModal('deactiveUser');
      toast({
        status: 'success',
        description: 'Successfully!',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
    }
  }, [patchData]);

  return (
    <UI.Modal
      isCentered
      isOpen={deactiveUser}
      onClose={() => closeModal('deactiveUser')}>
      <UI.ModalOverlay />
      <UI.ModalContent minW="654px" minH="413px" position={'relative'}>
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
          <UI.Center ontSize={'lg'} color={'ste.red'}>
            {data?.title}
          </UI.Center>
        </UI.ModalHeader>
        <UI.ModalBody fontSize={'lg'} textAlign={'center'}>
          <UI.VStack>
            <UI.Text>Are you sure you want to deactive access</UI.Text>
            <FormGenerate
              onSubmit={({reasonMessage}: {reasonMessage: string}) => {
                post({
                  id: data?.id,
                  isActive: 0,
                  deactivationReason: reasonMessage,
                });
              }}
              schema={{
                reasonMessage: yup
                  .string()
                  .required('Reason Message is required'),
                reasons: yup.array().required('Reasons is required'),
              }}
              fields={[
                {
                  name: 'reasonMessage',
                  type: 'textarea',
                  placeholder: 'Type your message...',
                  label: (
                    <UI.VStack w="full" justifyContent="space-between">
                      <UI.Text w="full" fontSize={16} color="#1A1E32">
                        Reason
                      </UI.Text>
                    </UI.VStack>
                  ),
                  h: '170px',
                },
              ]}>
              <UI.Center w={'full'} pt="10">
                <UI.Button
                  colorScheme="blue"
                  type="button"
                  mr={3}
                  w={'120px'}
                  onClick={() => closeModal('deactiveUser')}>
                  Cancel
                </UI.Button>
                <UI.Button
                  loading={loading}
                  w={'120px'}
                  type="submit"
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

export default memo(DeactivetUser);
