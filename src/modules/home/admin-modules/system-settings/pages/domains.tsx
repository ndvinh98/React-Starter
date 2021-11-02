import React, {useEffect, useRef} from 'react';
import {isEmpty} from 'lodash';
import * as UI from '@chakra-ui/react';
import FormGenerate from '@components/FormGenerate';
import {AiOutlineSearch} from 'react-icons/ai';
import {useMedia} from '@utils/hooks';
import {useFilter, useGetList} from '@utils/hooks';
import TableGenerate from '@components/TableGenerate';
import {HiDotsHorizontal} from 'react-icons/hi';
import {useModalController} from '@modules/modal';
import {IPartnerManagement} from '@types';

function Appearance() {
  const {page, limit, setPage,setLimit, textSearch, setTextSearch, filter, setFilter} =
    useFilter({page: 1, limit: 10});
  const {data, getList, loading} =
    useGetList<IPartnerManagement>('/partnerDomains');

  const statusDomain = useRef(1);

  useEffect(() => {
    getList({
      page,
      limit,
      filter: isEmpty(filter)
        ? undefined
        : JSON.stringify([{isAllowed: filter.status}]),
      textSearch: textSearch
        ? JSON.stringify([{domain: textSearch}])
        : undefined,
    });
  }, [page, limit, textSearch, filter]);

  const handleFilterData = ({textSearch, status}) => {
    statusDomain.current = undefined;
    setTextSearch(textSearch === undefined ? '' : textSearch);
    if (parseInt(status) > -1){
      statusDomain.current = parseInt(status);
      setFilter((filter) => ({
        ...filter,
        status: parseInt(status),
      }));
    }
    else{
      setFilter(undefined)
    }
    setPage(1);
    setLimit(10);
  };

  const {isBase} = useMedia();
  const {openModal} = useModalController();

  return (
    <UI.Box p={8} fontSize={'20px'}>
      <UI.Text>Domains</UI.Text>
      <UI.Box minH="79vh" mt={4}>
        <FormGenerate
          gap={{md: 2, lg: 6}}
          onChangeValue={handleFilterData}
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
              name: 'status',
              isClearable: false,
              defaultValue: {
                label: 'All Status',
                value: "-1",
              },
              options: [
                {
                  label: 'All Status',
                  value: "-1",
                },
                {
                  label: 'Blacklist',
                  value: '0',
                },
                {
                  label: 'Whitelist',
                  value: '1',
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
                      onClick={() => {
                        openModal('addBlacklistDomain', {
                          cb: () =>
                            getList({
                              page: 1,
                              limit: 10,
                              filter: JSON.stringify([
                                {isAllowed: statusDomain.current},
                              ]),
                            }),
                        });
                      }}
                      size={'md'}>
                      Add Blacklist
                    </UI.Button>
                  </UI.HStack>
                );
              },
            },
          ]}
        />
        <TableGenerate
          isLoading={loading}
          currentPage={data?.page}
          totalCount={data?.total}
          pageSize={data?.limit}
          totalpage={data?.totalPages}
          data={data?.records || []}
          onChangePage={setPage}
          Footer={
            <UI.Tr>
              <UI.Td fontWeight="bold" colSpan={1000}>
                {data?.total} Domain
              </UI.Td>
            </UI.Tr>
          }
          columns={[
            {
              Header: 'Domains',
              id: 'domains',
              bodyCellProps: {
                width: '400px',
              },
              headerCellProps: {
                width: '400px',
              },
              accessor: (row) => (
                <UI.Text fontSize={'16px'}>{row?.domain}</UI.Text>
              ),
            },
            {
              Header: 'Status',
              id: 'status',
              accessor: (row) => (
                <UI.Text fontSize={'16px'}>
                  {row?.isAllowed ? 'Whitelist' : 'Blacklist'}
                </UI.Text>
              ),
            },
            {
              Header: () => (
                <UI.Center>
                  <UI.Text fontSize={'12px'}>Action</UI.Text>
                </UI.Center>
              ),
              id: 'action',
              accessor: (row) => (
                <ActionColum
                  refresh={() =>
                    getList({
                      page: 1,
                      limit: 10,
                      filter: JSON.stringify([
                        {isAllowed: statusDomain.current},
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
            fontSize={'16px'}
            isDisabled={row?.isActive === 1}
            onClick={(e) => {
              e.stopPropagation();
              openModal('allowDomain', {
                id: row?.id,
                isAllowed: row?.isAllowed,
                domain: row?.domain,
                cb: () => refresh(),
              });
            }}>
            {row?.isAllowed ? 'Blacklist' : 'Whitelist'}
          </UI.MenuItem>
        </UI.MenuList>
      </UI.Menu>
    </UI.Center>
  );
};

export default Appearance;
