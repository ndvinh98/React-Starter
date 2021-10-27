import React, {memo, useEffect, useState} from 'react';

import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';
import {isEmpty} from 'lodash';
import {IUserManagement} from '@types';

import {useModalController} from '../modals.controller';
import {usePost, useGetList} from '@utils/hooks';
import Select from '@components/Select';

function AddSale() {
  const {addSale, closeModal, data} = useModalController();

  const toast = UI.useToast();
  const [newSale, setNewSale] = useState([]);

  const handleRemoveUser = (value: number) =>
    setNewSale((s) => s.filter((x) => x?.value !== value));

  const {getList, data: dataUser} = useGetList<IUserManagement>('/users');

  useEffect(() => {
    if (data?.partnerId)
      getList({
        relations: JSON.stringify(['userProfiles']),
        filter: JSON.stringify([{userType: 'USER'}]),
        notInPartnerId: data?.partnerId,
      });
  }, [data]);

  const handleAddSale = () => {
    if (isEmpty(newSale)) {
      toast({
        title: 'Warning!, No new Sale',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      createNewSale({
        userIds: newSale.map((x) => x?.value),
        partnerId: data?.partnerId,
      });

      data.cb();
      closeModal('addSale');
      toast({status: 'success', description: 'Successfully!', duration: 2000});
    }
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
      <UI.ModalContent position={'relative'} w="360px" maxH="360px">
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
            <UI.Box w="full">
              <Select
                w="full"
                placeholder="Select user"
                isMulti
                options={dataUser?.records?.map((x) => ({
                  value: x?.id,
                  label: `${x?.firstName} ${x?.lastName} `,
                  view: `${x?.firstName} ${x?.lastName} `,
                }))}
                onChangeValue={setNewSale}
              />
            </UI.Box>

            {!isEmpty(newSale) && (
              <UI.VStack w="full">
                <UI.VStack w="full" justifyContent="space-between" px={3}>
                  {newSale?.map?.((x) => (
                    <UI.Tag
                      w="full"
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      bg="#E0E0E0"
                      color="#777777"
                      key={x?.value}>
                      {x?.view}
                      <UI.Spacer />
                      <UI.TagCloseButton
                        onClick={() => handleRemoveUser(x?.value)}
                      />
                    </UI.Tag>
                  ))}
                </UI.VStack>
              </UI.VStack>
            )}

            <UI.Center mt={8} w={'full'}>
              <UI.Button
                colorScheme="blue"
                mr={3}
                w={'120px'}
                type="submit"
                isLoading={loading}
                onClick={handleAddSale}>
                Confirm
              </UI.Button>
              <UI.Button
                w={'120px'}
                type="button"
                onClick={() => {
                  closeModal('addSale');
                  setNewSale([]);
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

export default memo(AddSale);
