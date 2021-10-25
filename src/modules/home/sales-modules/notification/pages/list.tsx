import React, {useEffect, useState} from 'react';
import {isEmpty} from 'lodash';
import * as UI from '@chakra-ui/react';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useGetItem, useFilter} from '@utils/hooks';
import {useModalController} from '@modules/modal';
import {useMedia} from '@utils/hooks';
import {AiOutlineSearch} from 'react-icons/ai';

const IS_APPROVED = {
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  PENDING: 'Pending',
};
const ItemACCESSREQUEST = ({data, getListNoti}) => {
  const {openModal} = useModalController();
  const {getTotalUnread} = useNotifyStore();
  const {getItem, item} = useGetItem('partnerUserNotifications/read/');
  const readNoti = () => {
    getItem({}, {path: data?.id});
  };

  React.useEffect(() => {
    if (item) getTotalUnread();
  }, [item]);

  const [isRead, setIsRead] = useState(!!+data?.isRead);

  return (
    <UI.Flex
      flexDirection={{md: 'column', lg: 'row'}}
      onClick={() => {
        if (isRead) return;
        readNoti();
        setIsRead(true);
      }}
      cursor="pointer"
      w="full"
      shadow="sm"
      p={3}
      bg={isRead ? 'transparent' : 'white'}
      justifyContent="space-between"
      border={isRead ? ' 1px solid #E0E0E0' : 'none'}>
      <UI.HStack>
        <UI.Center
          w={{md: '40px', lg: '70px'}}
          p={{md: 1, lg: 2}}
          bg="white"
          shadow="md">
          <UI.Image
            w={{md: '30px', lg: '50px'}}
            h={{md: '30px', lg: '50px'}}
            src="/images/people.png"
            alt="people.png"
          />
        </UI.Center>
        <UI.Text fontSize={{md: 'md', lg: 'lg'}}> {data?.message}</UI.Text>
      </UI.HStack>

      <UI.HStack
        hidden={data?.partnerUserAccessRequest?.isApproved !== 'PENDING'}
        pt={{md: 4, lg: 0}}
        justifyContent={'center'}>
        <UI.Button
          onClick={() =>
            openModal('comfirmRequest', {
              title: 'Access Request',
              body: `accept ${data?.partnerUser?.firstName} ${data?.partnerUser?.lastName} ${data?.partnerUser?.email} `,
              type: 'ACCEPT',
              cb: () => getListNoti(),
              id: data?.partnerUserAccessRequestId,
            })
          }
          bgColor={'#EEFCEA'}
          color={'#28C76F'}
          size={'sm'}
          _hover={{bgColor: '#28C76F', color: 'white'}}
          colorScheme="#EEFCEA">
          Accept
        </UI.Button>
        <UI.Button
          onClick={() =>
            openModal('comfirmRequest', {
              title: 'REJECT ACCOUNT',
              body: `reject ${data?.partnerUser?.firstName} ${data?.partnerUser?.lastName} ${data?.partnerUser?.email} `,
              type: 'REJECT',
              id: data?.partnerUserAccessRequestId,
              cb: () => getListNoti(),
            })
          }
          size={'sm'}
          bgColor={'#FCEAEB'}
          color={'#D03A2B'}
          _hover={{bgColor: '#D03A2B', color: 'white'}}
          colorScheme="#FCEAEB">
          Reject
        </UI.Button>
      </UI.HStack>

      <UI.HStack
        hidden={
          !['APPROVED', 'REJECTED'].includes(
            data?.partnerUserAccessRequest?.isApproved,
          )
        }
        pt={{md: 4, lg: 0}}
        justifyContent={'center'}>
        <UI.Box
          px={4}
          py={2}
          bg="white"
          borderWidth="1px"
          borderColor="#ADADAD">
          <UI.Text fontWeight={600} fontSize="12px" color="#ADADAD">
            {IS_APPROVED?.[data?.partnerUserAccessRequest?.isApproved]}
          </UI.Text>
        </UI.Box>
      </UI.HStack>
    </UI.Flex>
  );
};

const NOTYFI_TYPE = {
  ACCESSREQUEST: ItemACCESSREQUEST,
  FILEUPLOADS: ItemACCESSREQUEST,
  CERTIFICATIONS: ItemACCESSREQUEST,
};

function Notification() {
  const {data, loading, getList} = useGetList('partnerUserNotifications');
  const {page, limit, setLimit, textSearch, setTextSearch, filter, setFilter} =
    useFilter({
      page: 1,
      limit: 10,
    });

  const getListNoti = () =>
    getList({
      page,
      limit,
      relations: JSON.stringify(['partnerUserAccessRequest', 'partnerUser']),
      textSearch: textSearch
        ? JSON.stringify([{message: textSearch}])
        : undefined,
      filter: isEmpty(filter)
        ? JSON.stringify([{isRead: '0'}])
        : JSON.stringify([filter]),
    });

  useEffect(() => {
    getListNoti();
  }, [limit, page, textSearch, filter]);

  const regetListNotify = () =>
    getList({page: 1, limit: 10, textSearch: undefined});

  const handleOnChange = ({
    textSearch,
    isRead,
    notificationType,
    requestsType,
  }) => {
    if (!!textSearch) setTextSearch(textSearch);
    else setTextSearch(undefined);

    setFilter((state) => ({
      ...state,
      notificationType: +notificationType < 0 ? undefined : notificationType,
      isRead: +isRead < 0 ? undefined : isRead,
      partnerUserAccessRequest: {
        isApproved: +requestsType < 0 ? undefined : requestsType,
      },
    }));
  };

  const {isBase, isAllMobile} = useMedia();

  return (
    <UI.Box p={8}>
       <UI.Text fontWeight={'bold'} fontSize={'20px'} mb={4}>
        Notification
      </UI.Text>
      <UI.Box minH="79vh">
        <FormGenerate
          gap={{md: 2, lg: 6}}
          onChangeValue={handleOnChange}
          fields={[
            {
              type: 'input-group',
              name: 'textSearch',
              colSpan: isBase ? 3 : 12,
              size: 'md',
              placeholder: 'Search...',
              leftIcon: <AiOutlineSearch size={20} />,
            },
            {
              type: 'select',
              colSpan: isBase ? 3 : 12,
              size: 'md',
              name: 'isRead',
              isClearable: false,
              defaultValue: {
                label: 'Unread',
                value: '0',
              },
              options: [
                {
                  label: 'All notifications',
                  value: '-1',
                },
                {
                  label: 'Read',
                  value: '1',
                },
                {
                  label: 'Unread',
                  value: '0',
                },
              ],
            },
          ]}
        />

        <UI.Box position="relative">
          {loading && (
            <UI.VStack
              top="0px"
              left="50%"
              bg="rgba(196, 196, 196, 0.3)"
              transform="translateX(-50%)"
              position="absolute"
              alignItems="center"
              justifyContent="center"
              zIndex="9"
              w="full"
              h="full"
              minH="60px">
              <UI.Center>
                <UI.Spinner color="ste.red" size="lg" />
              </UI.Center>
            </UI.VStack>
          )}
          <UI.Center opacity={0.7} w={'full'} h={'300px'}>
              <UI.VStack>
                <UI.Image src={'https://i.imgur.com/nvdeBu8.png'} />
                <UI.Text pt={2} color={'gray'} fontSize={'lg'}>
                  No results found :((
                </UI.Text>
              </UI.VStack>
            </UI.Center>
          {/* {isEmpty(data?.records) ? (
            <UI.Center opacity={0.7} w={'full'} h={'300px'}>
              <UI.VStack>
                <UI.Image src={'https://i.imgur.com/nvdeBu8.png'} />
                <UI.Text pt={2} color={'gray'} fontSize={'lg'}>
                  No results found :((
                </UI.Text>
              </UI.VStack>
            </UI.Center>
          ) : (
            <UI.VStack spacing={4} mt={4}>
              {data?.records?.map((x) => {
                const Component = NOTYFI_TYPE?.[x?.notificationType] || (
                  <div>123</div>
                );
                return (
                  <Component
                    getListNoti={getListNoti}
                    regetListNotify={regetListNotify}
                    key={x?.id}
                    data={x}
                  />
                );
              })}
            </UI.VStack>
          )} */}
        </UI.Box>
        {/* {data?.totalPages > 1 && !isAllMobile && (
          <UI.VStack mt={5}>
            <UI.Button isLoading={loading} onClick={() => setLimit(limit + 10)}>
              Load more
            </UI.Button>
          </UI.VStack>
        )} */}
      </UI.Box>
    </UI.Box>
  );
}

export default Notification;
