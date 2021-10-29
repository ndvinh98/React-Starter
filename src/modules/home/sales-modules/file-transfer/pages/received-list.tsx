import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';

import FormGenerate from '@components/FormGenerate';
import {AiOutlineSearch} from 'react-icons/ai';
import {useMedia, useRouter, useFilter, useGetList} from '@utils/hooks';
import TableGenerate from '@components/TableGenerate';
import {format} from 'date-fns';
import {HiDotsHorizontal} from 'react-icons/hi';
import {useModalController} from '@modules/modal';
import {useHomeController} from '@modules/home';

function FileTransfer() {
  const {push} = useRouter();
  const {isBase} = useMedia();
  const me = useHomeController((s) => s.me);

  const {data, loading, getList} = useGetList('/fileTransferRecipients');
  const {page, limit, setPage, textSearch, setTextSearch, filter} = useFilter({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    getList({
      page,
      limit,
      sort: JSON.stringify({createdAt: -1}),
      textSearch: textSearch
        ? JSON.stringify([{fileTransfer: {subject: textSearch}}])
        : undefined,
      filter: JSON.stringify([{userId: me?.id}]),
      relations: JSON.stringify(['fileTransfer', 'fileTransfer.partnerUser']),
    });
  }, [limit, page, textSearch, filter]);

  const handleFilterData = ({textSearch, status}) => {
    if (textSearch !== undefined) setTextSearch(textSearch as string);
    if (status === 'sent') push('/home/file-transfer/sent');
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
              label: 'Received',
              value: 'received',
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
      <TableGenerate
        onClickRow={(row) => push(`/home/file-transfer/received/${row?.id}`)}
        isLoading={loading}
        currentPage={data?.page}
        totalCount={data?.total}
        pageSize={data?.limit}
        totalpage={data?.totalPages}
        data={data?.records || []}
        onChangePage={setPage}
        columns={[
          {
            Header: 'Sender',
            id: 'sender',
            bodyCellProps: {
              width: '400px',
            },
            headerCellProps: {
              width: '400px',
            },
            accessor: (row) => (
              <UI.VStack w="300px" alignItems="flex-start">
                <UI.Text key={row?.id}>
                  {row?.fileTransfer?.partnerUser?.firstName} (
                  {row?.fileTransfer?.partnerUser?.email})
                </UI.Text>
              </UI.VStack>
            ),
          },
          {
            Header: 'Subject',
            id: 'subject',
            accessor: (row) => <UI.Text>{row?.fileTransfer?.subject}</UI.Text>,
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
              <ActionColum
                refresh={() =>
                  getList({
                    page,
                    limit,
                    sort: JSON.stringify({createdAt: -1}),
                    textSearch: textSearch
                      ? JSON.stringify([{fileTransfer: {subject: textSearch}}])
                      : undefined,
                    filter: JSON.stringify([{userId: me?.id}]),
                    relations: JSON.stringify([
                      'fileTransfer',
                      'fileTransfer.partnerUser',
                    ]),
                  })
                }
                row={row}
              />
            ),
          },
        ]}
      />
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
              e.stopPropagation();
              openModal('deleteFileTransfer', {
                url: `fileTransferRecipients/${row?.id}`,
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
