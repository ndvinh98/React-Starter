import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';

import FormGenerate from '@components/FormGenerate';
import {AiOutlineSearch} from 'react-icons/ai';
import {useMedia, useRouter, useFilter, useGetList} from '@utils/hooks';
import TableGenerate from '@components/TableGenerate';
import {format} from 'date-fns';
import {HiDotsHorizontal} from 'react-icons/hi';
import {useModalController} from '@modules/modal';
import {useAuthController} from '@modules/auth';

function FileTransfer() {
  const {push} = useRouter();
  const {isBase} = useMedia();
  const {me, getMe} = useAuthController();
  useEffect(() => {
    getMe();
  }, []);
  const {data, loading, getList} = useGetList('/userFileTransfers');
  //const [refresh, setRefresh] = useState()
  const {page, limit, setPage, textSearch, setTextSearch, filter} = useFilter({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    if (me?.id) {
      getList({
        page,
        limit,
        sort: JSON.stringify({createdAt: -1}),
        textSearch: textSearch
          ? JSON.stringify([{subject: textSearch}])
          : undefined,
        filter: JSON.stringify([{userId: me?.id}]),
        relations: JSON.stringify([
          'userFileTransferRecipients',
          'userFileTransferRecipients.partnerUser',
        ]),
      });
    }
  }, [limit, page, textSearch, filter, me]);

  const handleFilterData = ({textSearch, status}) => {
    if (textSearch !== undefined) setTextSearch(textSearch as string);
    if (status === 'received') push('/home/file-transfer/received');
  };

  return (
    <UI.Box minH="77vh" p={8}>
      
      <UI.Text fontSize={'20px'} fontWeight={'bold'} mb={4}>
        File Transfer
      </UI.Text>
      <FormGenerate
        gap={isBase ? 6 : 2}
        onChangeValue={handleFilterData}
        fields={[
          {
            name: 'textSearch',
            type: 'input-group',
            colSpan: isBase ? 3 : 12,
            size: 'md',
            placeholder: 'Search...',
            leftIcon: <AiOutlineSearch size={20} />,
          },
          {
            name: 'status',
            type: 'select',
            colSpan: isBase ? 3 : 6,
            size: 'md',
            placeholder: 'Status',
            isClearable: false,
            defaultValue: {
              label: 'Sent',
              value: 'sent',
            },
            options: [
              {
                label: 'Received',
                value: 'received',
              },
              {
                label: 'Sent',
                value: 'sent',
              },
            ],
          },
          {
            type: 'decor',
            colSpan: isBase ? 3 : 12,
            DecorComponent: () => {
              return (
                <UI.HStack
                  position={{md: 'absolute', lg: 'static'}}
                  top={'-166px'}
                  w={'full'}
                  justifyContent={'flex-start'}>
                  <UI.Button
                    onClick={() => push('/home/file-transfer/send-file')}
                    size={'md'}>
                    Send Files
                  </UI.Button>
                </UI.HStack>
              );
            },
          },
        ]}
      />
      <UI.Box w={'full'} bgColor={'white'} borderRadius={'10px'} px={4}>
        <TableGenerate
          onClickRow={(row) => push(`/home/file-transfer/sent/${row?.id}`)}
          isLoading={loading}
          currentPage={data?.page}
          totalCount={data?.total}
          pageSize={data?.limit}
          totalpage={data?.totalPages}
          data={data?.records || []}
          onChangePage={setPage}
          columns={[
            {
              Header: 'Recipient',
              id: 'sender',
              accessor: (row) => (
                <UI.VStack alignItems="flex-start">
                  {/* {row?.userFileTransferRecipients.map((x) => (
                    <UI.Text key={x?.id}>
                      {x?.partnerUser?.firstName} ({x?.partnerUser?.email})
                    </UI.Text>
                  ))} */}
                  {row?.userFileTransferRecipients?.[0] && (
                    <UI.Text>
                      {
                        row?.userFileTransferRecipients?.[0]?.partnerUser
                          ?.firstName
                      }{' '}
                      (
                      {row?.userFileTransferRecipients?.[0]?.partnerUser?.email}
                      )
                    </UI.Text>
                  )}
                  {row?.userFileTransferRecipients?.[1] && (
                    <UI.Text>
                      {
                        row?.userFileTransferRecipients?.[1]?.partnerUser
                          ?.firstName
                      }{' '}
                      (
                      {row?.userFileTransferRecipients?.[1]?.partnerUser?.email}
                      )
                      {row?.userFileTransferRecipients?.length > 2
                        ? ' ...'
                        : undefined}
                    </UI.Text>
                  )}
                </UI.VStack>
              ),
            },
            {
              Header: 'Subject',
              id: 'subject',
              accessor: (row) => (
                <UI.Text w={'400px'}>
                  {row?.subject?.length > 100
                    ? row?.subject?.substring(0, 100) + '...'
                    : row?.subject}
                </UI.Text>
              ),
            },
            {
              Header: 'Sent',
              id: 'sent',
              accessor: (row) => (
                <UI.Text>
                  {format(new Date(row?.createdAt), 'dd MMM yyyy')}
                </UI.Text>
              ),
            },
            {
              Header: () => <UI.Center>Action</UI.Center>,
              id: 'action',
              accessor: (row) => (
                <ActionColum refresh={() => getMe()} row={row} />
              ),
            },
          ]}
        />
      </UI.Box>
    </UI.Box>
  );
}

export const ActionColum = (props: any) => {
  const {isOpen, onOpen, onClose} = UI.useDisclosure();
  const {openModal} = useModalController();
  const {row, refresh} = props;
  return (
    <UI.Center>
      <UI.Menu onClose={onClose} isOpen={isOpen}>
        <UI.MenuButton
          px={4}
          py={2}
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}>
          <HiDotsHorizontal color={'#9097A9'} size={20} />
        </UI.MenuButton>
        <UI.MenuList minWidth={'150px'}>
          <UI.MenuItem
            isDisabled={row?.isActive === 1}
            onClick={(e) => {
              //console.log(row);
              e.stopPropagation();
              openModal('deleteFileTransfer', {
                url: `userFileTransfers/${row?.id}`,
                cb: () => refresh(),
              });
            }}>
            Delete
          </UI.MenuItem>
        </UI.MenuList>
      </UI.Menu>
    </UI.Center>
  );
};

export default FileTransfer;
