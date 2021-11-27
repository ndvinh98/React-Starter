import React, {memo, useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';
import FormGenerate from '@components/FormGenerate';
import {useModalController} from '../modals.controller';
import {usePost} from '@utils/hooks';

function AddBlacklistDomainModal() {
  const {addBlacklistDomain, closeModal, data} = useModalController();
  const {
    post,
    loading,
    data: postData,
  } = usePost('/partnerDomains/addBlacklist');
  const toast = UI.useToast();

  useEffect(() => {
    if (postData) {
      data?.cb();
      closeModal('addBlacklistDomain');
      toast({
        status: 'success',
        isClosable: true,
        description: 'Successfully!',
        duration: 2000,
      });
    }
  }, [postData]);

  return (
    <UI.Modal
      isCentered
      isOpen={addBlacklistDomain}
      onClose={() => closeModal('addBlacklistDomain')}>
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
          <UI.Center fontSize={'lg'} textAlign="center" color={'ste.red'}>
            Add a blacklisted domain
          </UI.Center>
        </UI.ModalHeader>
        <UI.ModalBody fontSize={'lg'} textAlign={'center'}>
          <FormGenerate
            onSubmit={(value) => {
              post(value);
            }}
            fields={[
              {
                name: 'domain',
                type: 'input',
                size: 'lg',
                placeholder: 'Enter domain name...',
              },
            ]}>
            <UI.Center mt={4} w={'full'}>
              <UI.Button
                colorScheme="blue"
                isLoading={loading}
                mr={3}
                w={'120px'}
                type="submit">
                Confirm
              </UI.Button>
              <UI.Button
                w={'120px'}
                type="button"
                onClick={() => {
                  closeModal('addBlacklistDomain');
                }}
                variant="outline">
                Cancel
              </UI.Button>
            </UI.Center>
          </FormGenerate>
        </UI.ModalBody>

        <UI.ModalFooter></UI.ModalFooter>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(AddBlacklistDomainModal);
