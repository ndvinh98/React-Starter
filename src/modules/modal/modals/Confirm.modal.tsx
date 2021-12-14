import React, {memo, useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';
import {useModalController} from '../modals.controller';
import {useGetList, usePatch, useRouter} from '@utils/hooks';
import FormGenerate from '@components/FormGenerate';
import {ITier} from '@types';

import * as yup from 'yup';

function ConfirmModal() {
  const {confirmRequest, closeModal, data} = useModalController();
  const {
    data: patchData,
    loading,
    patch,
  } = usePatch(`/partnerApplicationSubmissions/${data?.id}`);

  const {
    data: dataTier,

    getList,
  } = useGetList<ITier>('/tiers');

  const toast = UI.useToast();
  const {push} = useRouter();

  useEffect(() => {
    getList({limit: 1000});
  }, []);

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
              const {startDate, expiryDate, tierIds} = data;
              patch({
                status: 'APPROVED',
                startDate: `${startDate.year}-${startDate.month}-${startDate.day}`,
                expiryDate: `${expiryDate.year}-${expiryDate.month}-${expiryDate.day}`,
                tierIds: JSON.stringify(tierIds.map((x) => x?.value)),
              });
            }}
            schema={{
              startDate: yup
                .object({
                  day: yup.number().required('Start date is required!'),
                })
                .required(),
              expiryDate: yup
                .object({
                  day: yup.number().required('Expiry date is required!'),
                })
                .required(),
              tierIds: yup
                .array()
                .min(1, 'Users is required')
                .required('Users is required'),
            }}
            fields={[
              {
                name: 'startDate',
                type: 'date-picker',
                isMinimumTodayDate: true,
                label: 'Start Date:',
                errorProperty: 'day',
              },
              {
                name: 'expiryDate',
                type: 'date-picker',
                isMinimumTodayDate: true,
                label: 'Validity Date:',
                errorProperty: 'day',
              },
              {
                name: 'tierIds',
                type: 'select-picker',
                placeholder: 'Select Tier',
                label: 'Tier:',
                options: dataTier?.records?.map((x) => ({
                  label: x?.name,
                  value: x?.id,
                })),
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
