import React, {memo, useEffect} from 'react';

import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';
import {AiOutlineSearch} from 'react-icons/ai';

import {useModalController} from '../modals.controller';
import {usePost, useGetList} from '@utils/hooks';
import FormGenerate from '@components/FormGenerate';
import * as yup from 'yup';

function AddSale() {
  const {addSale, closeModal, data} = useModalController();

  const toast = UI.useToast();
  const {getList, data: dataUser} = useGetList<any>('/users');

  useEffect(() => {
    if (data?.partnerId)
      getList({
        relations: JSON.stringify(['userProfiles']),
        filter: JSON.stringify([{userType: 'USER'}]),
        notInPartnerId: data?.partnerId,
      });
  }, [data]);

  const handleAddSale = ({userIds}) => {
    createNewSale({
      userIds,
      partnerId: data?.partnerId,
    });
    data.cb();
    closeModal('addSale');
    toast({
      status: 'success',
      description: 'Successfully!',
      position: 'top-right',
      duration: 2000,
    });
  };

  const {post: createNewSale, loading} = usePost(
    '/partnerUserRelations/createMany',
  );

  return (
    <UI.Modal
      isCentered
      autoFocus={false}
      isOpen={addSale}
      onClose={() => closeModal('addSale')}>
      <UI.ModalOverlay />
      <UI.ModalContent position={'relative'} w="360px">
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
            Add new Sales Manager
          </UI.Center>
        </UI.ModalHeader>
        <UI.ModalBody>
          <UI.Stack w="full">
            <FormGenerate
              onSubmit={handleAddSale}
              schema={{
                userIds: yup
                  .array()
                  .min(1, 'Users is required')
                  .required('Users is required'),
              }}
              fields={[
                {
                  type: 'select-picker',
                  name: 'userIds',
                  placeholder: (
                    <UI.HStack>
                      <AiOutlineSearch size={20} /> <UI.Text>Search</UI.Text>
                    </UI.HStack>
                  ),
                  width: '100%',
                  fieldStyled: {
                    alignItems: 'flex-start',
                  },
                  leftIcon: <AiOutlineSearch size={20} />,
                  options: dataUser?.records?.map((x) => ({
                    value: x.id,
                    label: `${x?.firstName} ${x?.lastName} (${x?.email})`,
                    email: x?.user?.email,
                  })),
                },
              ]}>
              <UI.HStack mt={5} justifyContent="center">
                <UI.Button isLoading={loading} w={'120px'} type={'submit'}>
                  Send
                </UI.Button>
                <UI.Button
                  onClick={() => closeModal('addSale')}
                  variant="outline"
                  isLoading={loading}
                  mt={5}
                  w={'120px'}
                  type={'button'}>
                  Cancel
                </UI.Button>
              </UI.HStack>
            </FormGenerate>
          </UI.Stack>
        </UI.ModalBody>

        <UI.ModalFooter></UI.ModalFooter>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(AddSale);
