import React, {memo, useEffect} from 'react';

import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';
import {AiOutlineSearch} from 'react-icons/ai';
import {isEmpty} from 'lodash';
import {IUserManagement} from '@types';
import FormGenerate from '@components/FormGenerate';
import CardSale from '@components/CardSale';

import {useModalController} from '../modals.controller';
import {usePost, useFilter, useGetList} from '@utils/hooks';

function AddSale() {
  const {addSale, closeModal, data} = useModalController();

  const {data: patchData, loading: loadingData} = usePost(
    `/partnerUserRelations`,
  );
  const toast = UI.useToast();

  useEffect(() => {
    if (patchData) {
      closeModal('addSale');
      toast({status: 'success', description: 'Successfully!', duration: 2000});
    }
  }, [patchData]);

  const {page, limit, textSearch, setTextSearch, filter} = useFilter({
    page: 1,
    limit: 10,
  });
  const {
    loading,
    getList,
    data: dataUser,
  } = useGetList<IUserManagement>('/users');

  useEffect(() => {
    getList({
      page,
      limit,
      relations: JSON.stringify(['userProfiles']),
      filter: JSON.stringify([{userType: 'USER'}]),
      textSearch: textSearch
        ? JSON.stringify([
            {firstName: textSearch},
            {email: textSearch},
            {lastName: textSearch},
          ])
        : undefined,
    });
  }, [page, limit, textSearch, filter]);

  const handleFilterData = ({textSearch = undefined}, fieldChange) => {
    if (fieldChange.name === 'textSearch') {
      if (textSearch && textSearch.length < 3) return;

      setTextSearch(textSearch);
    }
  };

  const addItem = (dataNewUser) => {
    console.log(dataNewUser);
    console.log('hâhha');
  };

  return (
    <UI.Modal
      isCentered
      autoFocus={false}
      isOpen={addSale}
      scrollBehavior="inside"
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
          <UI.Stack>
            <FormGenerate
              onChangeValue={handleFilterData}
              fields={[
                {
                  name: 'textSearch',
                  type: 'input-group',

                  size: 'md',
                  placeholder: 'Search...',
                  leftIcon: <AiOutlineSearch size={20} />,
                },
              ]}
            />

            {loading ? (
              <UI.Center minH="300px">
                <UI.Spinner size="lg" color="ste.red" />
              </UI.Center>
            ) : isEmpty(dataUser?.records) ? (
              <UI.Center>
                <UI.Image src="" />
                <UI.Text>No data</UI.Text>
              </UI.Center>
            ) : (
              <UI.Box w={'full'}>
                {dataUser?.records.map((item) => {
                  return (
                    <UI.HStack key={item?.id} spacing={8} width="full" pb="5">
                      <CardSale data={item} addItem={addItem} />
                    </UI.HStack>
                  );
                })}
              </UI.Box>
            )}

            <UI.Center mt={8} w={'full'}>
              <UI.Button
                colorScheme="blue"
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
                  closeModal('addSale');
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
