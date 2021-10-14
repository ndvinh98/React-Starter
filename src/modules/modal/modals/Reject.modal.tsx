import React, {memo, useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';

import {useModalController} from '../modals.controller';
import FormGenerate from '@components/FormGenerate';
import * as yup from 'yup';
import {usePatch} from '@utils/hooks';

function RejectModal() {
  const {reject, closeModal, data} = useModalController();
  const {
    data: patchData,
    loading,
    patch,
  } = usePatch(`/partnerApplicationSubmissions/${data?.id}`);
  const toast = UI.useToast();

  useEffect(() => {
    if (patchData) {
      closeModal('reject');
      toast({status: 'success', description: 'Successfully!', duration: 2000});
    }
  }, [patchData]);

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
              onSubmit={({
                reasonMessage,
                reasons,
              }: {
                reasonMessage: string;
                reasons: string[];
              }) => {
                patch({
                  status: 'REJECTED',
                  rejectionRemarks: reasonMessage,
                  sectionARejected: reasons?.includes('A') ? 1 : 0,
                  sectionBRejected: reasons?.includes('B') ? 1 : 0,
                  sectionCRejected: reasons?.includes('C') ? 1 : 0,
                  attachmentsRejected: reasons?.includes('AT') ? 1 : 0,
                });
              }}
              schema={{
                reasonMessage: yup
                  .string()
                  .required('ReasonMessage is required'),
                reasons: yup.array().required('Reasons is required'),
              }}
              fields={[
                {
                  name: 'reasons',
                  type: 'checkbox-group',
                  size: 'lg',
                  options: [
                    {
                      label: 'Section A',
                      value: 'A',
                    },
                    {
                      label: 'Section B',
                      value: 'B',
                    },
                    {
                      label: 'Section C',
                      value: 'C',
                    },
                    {
                      label: 'Attachments',
                      value: 'AT',
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
                  h: '170px',
                },
              ]}>
              <UI.Center w={'full'} pt="10">
                <UI.Button
                  colorScheme="blue"
                  type="button"
                  mr={3}
                  w={'120px'}
                  onClick={() => closeModal('reject')}>
                  Cancel
                </UI.Button>
                <UI.Button
                  loading={loading}
                  x
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

export default memo(RejectModal);
