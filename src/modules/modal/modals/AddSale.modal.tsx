import React, {memo, useEffect} from 'react';

import * as UI from '@chakra-ui/react';
import {RiErrorWarningFill} from 'react-icons/ri';
import {AiOutlineSearch} from 'react-icons/ai';
import {IUserManagement} from '@types';
import FormGenerate from '@components/FormGenerate';
import CardSale from '@components/CardSale';

import {useModalController} from '../modals.controller';
import {usePatch, useFilter, useGetList} from '@utils/hooks';

function AddSale() {
  const {addSale, closeModal, data} = useModalController();

  const {data: patchData, loading} = usePatch(
    `/partnerApplicationSubmissions/${data?.id}`,
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
  const {getList} = useGetList<IUserManagement>('/users');

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

  return (
    <UI.Modal
      isCentered
      autoFocus={false}
      isOpen={addSale}
      onClose={() => closeModal('addSale')}>
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

            <CardSale />

            <UI.Center mt={8} w={'full'}>
              <UI.Button
                colorScheme="blue"
                // onClick={() => {
                //   patch({
                //     status: 'APPROVED',
                //     expiryDate: `${selectedDay.month}/${selectedDay.day}/${selectedDay.year}`,
                //   });
                // }}
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
