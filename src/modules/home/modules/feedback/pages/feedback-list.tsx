import React, {useEffect, useState, useMemo} from 'react';
import {isEmpty, chain} from 'lodash';
import * as UI from '@chakra-ui/react';
import FormGenerate from '@components/FormGenerate';
import {AiOutlineSearch} from 'react-icons/ai';
import Pagination from '@components/Pagination';
import {useMedia} from '@utils/hooks';
import {useFilter, useGetList, useGetItem} from '@utils/hooks';
import {format} from 'date-fns';

const FeedbackContent = ({data}) => {
  const {getItem} = useGetItem('partnerUserFeedbacks/read/');
  const readFeedback = () => {
    getItem({}, {path: data?.id});
  };

  const [isRead, setIsRead] = useState(!!data?.isRead);

  return (
    <UI.Flex
      flexDirection={{md: 'column', lg: 'row'}}
      onClick={() => {
        if (isRead) return;
        readFeedback();
        setIsRead(true);
      }}
      cursor="pointer"
      w="full"
      shadow="sm"
      p={3}
      bg={isRead ? 'transparent' : 'white'}
      justifyContent="space-between"
      border={isRead ? ' 1px solid #E0E0E0' : 'none'}
      mb={2}>
      <UI.HStack>
        <UI.Center
          w={{md: '40px', lg: '70px'}}
          p={{md: 1, lg: 2}}
          bg={isRead ? 'transparent' : 'white'}
          shadow="md">
          <UI.Image
            w={{md: '30px', lg: '50px'}}
            h={{md: '30px', lg: '50px'}}
            src="/images/feedback-icon.svg"
            alt="feedback.png"
          />
        </UI.Center>
        <UI.Text fontSize={{md: 'md', lg: 'lg'}}>
          {data?.feedbackMessage}
        </UI.Text>
      </UI.HStack>

      <UI.HStack pr={4} pt={{md: 4, lg: 0}} justifyContent={'center'}>
        <UI.Button
          bgColor={'#E9E9E9'}
          color={'#54565A'}
          size={'sm'}
          _hover={{bgColor: '#28C76F', color: 'white'}}
          colorScheme="#EEFCEA">
          View
        </UI.Button>
      </UI.HStack>
    </UI.Flex>
  );
};

const FeedbackCategory = ({data}) => {
  const groupedMessages = useMemo(
    () =>
      chain(data)
        .groupBy((item) => format(new Date(item.createdAt), 'dd MMM yyyy'))
        .sortBy((group) => data.indexOf(group[0]))
        .valueOf(),
    [data],
  );

  return (
    <UI.Box>
      {groupedMessages.map((group, gr_index) => {
        const section = format(new Date(group[0].createdAt), 'dd MMM yyyy');
        return (
          <UI.Box key={gr_index} pt={4} mb={4}>
            <UI.Text pb={2}> {section} </UI.Text>
            {group.map((item, index) => {
              return <FeedbackContent key={index} data={item} />;
            })}
          </UI.Box>
        );
      })}
    </UI.Box>
  );
};

function FeedbackList() {
  const {data, loading, getList} = useGetList('/partnerUserFeedbacks');
  const {page, limit, setLimit, textSearch, setTextSearch, filter, setFilter} =
    useFilter({
      page: 1,
      limit: 10,
    });

  useEffect(() => {
    getList({
      page,
      limit,
      sort: JSON.stringify({createdAt: -1}),
      textSearch: textSearch
        ? JSON.stringify([{feedbackMessage: textSearch}])
        : undefined,
      filter: isEmpty(filter) ? undefined : JSON.stringify([filter]),
    });
  }, [limit, page, textSearch, filter]);

  const {isBase, isAllMobile} = useMedia();

  const handleOnChange = ({textSearch, isRead}) => {
    if (textSearch !== undefined) setTextSearch(textSearch as string);

    if (isRead !== undefined) {
      setFilter((state) => ({...state, isRead}));
    }
    if (isRead < 0) setFilter((state) => ({...state, isRead: undefined}));
  };

  return (
    <UI.Box p={8} fontSize={'20px'}>
      <UI.Text>Feedback Form</UI.Text>
      <UI.Box minH="79vh" mt={4}>
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
                label: 'All feedback',
                value: '-1',
              },
              options: [
                {
                  label: 'All feedback',
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
          {isEmpty(data?.records) ? (
            <UI.Center opacity={0.7} w={'full'} h={'300px'}>
              <UI.VStack>
                <UI.Image src={'https://i.imgur.com/nvdeBu8.png'} />
                <UI.Text pt={2} color={'gray'} fontSize={'lg'}>
                  No results found :((
                </UI.Text>
              </UI.VStack>
            </UI.Center>
          ) : (
            <FeedbackCategory data={data?.records} />
          )}
        </UI.Box>
        {data?.totalPages > 1 && !isAllMobile && (
          <UI.VStack mt={5}>
            <UI.Button isLoading={loading} onClick={() => setLimit(limit + 10)}>
              Load more
            </UI.Button>
          </UI.VStack>
        )}
      </UI.Box>
      {isAllMobile && (
        <Pagination
          justifyContent={{md: 'center', lg: 'flex-end'}}
          mt={6}
          size={isAllMobile ? 'sm' : 'md'}
          currentPage={data?.page || 1}
          totalpage={data?.totalPages || 1}
          onChangePage={(number) => {
            getList({page: number, limit: 10, textSearch: undefined});
          }}
        />
      )}
    </UI.Box>
  );
}

export default FeedbackList;
