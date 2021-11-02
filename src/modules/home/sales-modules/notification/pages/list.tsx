import React, {useEffect, useState} from 'react';
import {isEmpty} from 'lodash';
import * as UI from '@chakra-ui/react';
import FormGenerate from '@components/FormGenerate';
import {useGetItem, useFilter, useRouter} from '@utils/hooks';
import {useMedia} from '@utils/hooks';
import {AiOutlineSearch} from 'react-icons/ai';
import {useSalesContoller} from '@modules/home';

const NotificationContent = ({data}) => {
  const {push} = useRouter();
  const {getItem} = useGetItem('userNotifications/read/');
  const setReadNotification = () => {
    getItem({}, {path: data?.id});
  };
  const [isRead, setIsRead] = useState(!!+data?.isRead);
  return (
    <UI.Flex
      flexDirection={{md: 'column', lg: 'row'}}
      onClick={() => {
        if (isRead) return;
        setReadNotification();
        setIsRead(true);
      }}
      cursor="pointer"
      w="full"
      shadow="sm"
      p={3}
      bg={isRead ? 'transparent' : 'white'}
      justifyContent="space-between"
      border={isRead ? ' 1px solid #E0E0E0' : 'none'}>
      <UI.HStack
        onClick={() =>
          push(`/home/file-transfer/received/${data?.fileTransferRecipientId}`)
        }>
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
    </UI.Flex>
  );
};

function Notification() {
  const getNotifications = useSalesContoller((s) => s.getNotifications);
  const notifications = useSalesContoller((s) => s.notifications);
  const loading = useSalesContoller((s) => s.loading);

  const {page, limit, setLimit, textSearch, setTextSearch, filter, setFilter} =
    useFilter({
      page: 1,
      limit: 10,
    });

  const getListNotification = () =>
    getNotifications({
      page,
      limit,
      textSearch: textSearch
        ? JSON.stringify([{message: textSearch}])
        : undefined,
      filter: isEmpty(filter)
        ? JSON.stringify([{isRead: '0', notificationType: 'FILETRANSFERS'}])
        : JSON.stringify([filter]),
    });

  useEffect(() => {
    getListNotification();
  }, [limit, page, textSearch, filter]);

  const handleOnChange = ({textSearch, isRead}) => {
    if (!!textSearch) setTextSearch(textSearch);
    else setTextSearch(undefined);

    setFilter({
      notificationType: 'FILETRANSFERS',
      isRead: +isRead < 0 ? undefined : isRead,
    });
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

          {isEmpty(notifications?.records) ? (
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
              {notifications?.records?.map((x) => {
                return <NotificationContent key={x?.id} data={x} />;
              })}
            </UI.VStack>
          )}
        </UI.Box>
        {notifications?.totalPages > 1 && !isAllMobile && (
          <UI.VStack mt={5}>
            <UI.Button isLoading={loading} onClick={() => setLimit(limit + 10)}>
              Load more
            </UI.Button>
          </UI.VStack>
        )}
      </UI.Box>
    </UI.Box>
  );
}

export default Notification;
