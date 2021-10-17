import React, {useEffect} from 'react';

import TableGenerate from '@components/TableGenerate';
import FormGenerate from '@components/FormGenerate';
import Pagination from '@components/Pagination';
import {IUserManagement} from '@types';
import Select from '@components/Select';
import UserInfoCard from '@components/UserInfoCard';

import {useRouter, useFilter, useGetList} from '@utils/hooks';
import {useRouterController} from '@modules/router';
import {useMedia} from '@utils/hooks';
import {useModalController} from '@modules/modal';
import {isEmpty} from 'lodash';

import * as UI from '@chakra-ui/react';
import {AiOutlineSearch} from 'react-icons/ai';
import {HiDotsHorizontal} from 'react-icons/hi';

export const USRTYPE_STRING = {
  PARTNERADMIN: 'Owner',
  ADMIN: 'Admin',
  USER: 'Sales Manager',
};

export const STATUS_STRING = {
  1: 'Active',
  0: 'Inactive',
};
export const ACTIVE_STRING = {
  1: 'Actived',
  0: 'Decatived',
};

function userManagement() {
  const {path} = useRouterController();
  const {push} = useRouter();
  const {isBase} = useMedia();

  const {
    page,
    limit,
    setPage,
    textSearch,
    setTextSearch,
    filter,
    setFilter,
    setLimit,
  } = useFilter({page: 1, limit: 10});
  const {data, getList, loading} = useGetList<IUserManagement>('/users');

  useEffect(() => {
    getList({
      page,
      limit,
      relations: JSON.stringify(['userProfiles']),
      filter: isEmpty(filter)
        ? undefined
        : JSON.stringify([
            {isActive: filter.status, userType: filter.userType},
          ]),
      textSearch: textSearch
        ? JSON.stringify([
            {firstName: textSearch},
            {email: textSearch},
            {lastName: textSearch},
          ])
        : undefined,
    });
  }, [page, limit, textSearch, filter]);

  const handleFilterData = (
    {textSearch = undefined, status, userType},
    fieldChange,
  ) => {
    if (fieldChange.name === 'textSearch') {
      if (textSearch && textSearch.length < 3) return;

      setTextSearch(textSearch);
    }

    if (['status', 'userType'].includes(fieldChange.name)) {
      setFilter((filter) => ({
        ...filter,
        status: status === '-1' ? undefined : status,
        userType: userType === '-1' ? undefined : userType,
      }));
    }
  };

  return (
    <UI.VStack py={6} px={8} spacing={4} width="full">
      <UI.Text fontSize="2xl" fontWeight="semibold" w="full">
        User Management
      </UI.Text>
      <UI.Box width="full">
        <FormGenerate
          gap={isBase ? 4 : 6}
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
              defaultValue: {
                label: 'All Status',
                value: '-1',
              },
              isClearable: false,
              options: [
                {
                  label: 'All Status',
                  value: '-1',
                },
                {
                  label: 'Active',
                  value: '1',
                },
                {
                  label: 'Inactive',
                  value: '0',
                },
              ],
            },
            {
              name: 'userType',
              type: 'select',
              colSpan: isBase ? 3 : 6,
              size: 'md',
              placeholder: 'All Roles',
              defaultValue: {
                label: 'All Roles',
                value: '-1',
              },
              isClearable: false,
              options: [
                {
                  label: 'All Roles',
                  value: '-1',
                },
                {
                  label: 'Admin',
                  value: 'ADMIN',
                },
                {
                  label: 'Sales Manager',
                  value: 'USER',
                },
              ],
            },
            {
              type: 'decor',
              name: 'demo',
              colSpan: isBase ? 3 : 12,
              DecorComponent: () => {
                return (
                  <UI.VStack>
                    <UI.HStack
                      position={{md: 'absolute', lg: 'static'}}
                      top={'-166px'}
                      w={'full'}
                      justifyContent={'space-between'}>
                      <UI.Button
                        minW={110}
                        onClick={() => push(path + '/create-user')}
                        size={'md'}>
                        Add new user
                      </UI.Button>
                      <UI.HStack
                        position={{md: 'absolute', lg: 'static'}}
                        top={'-166px'}
                        w={'full'}
                        justifyContent={'flex-end'}>
                        <UI.Text> View Item</UI.Text>
                        <UI.Box w="80px">
                          <Select
                            isClearable={false}
                            size="sm"
                            name="limit"
                            onChangeValue={(data) => setLimit(data.value)}
                            defaultValue={{
                              label: '10',
                              value: 10,
                            }}
                            options={[
                              {
                                label: '10',
                                value: 10,
                              },
                              {
                                label: '20',
                                value: 20,
                              },
                              {
                                label: 'all',
                                value: 1000,
                              },
                            ]}
                          />
                        </UI.Box>
                      </UI.HStack>
                    </UI.HStack>
                  </UI.VStack>
                );
              },
            },
          ]}
        />
        {isBase ? (
          <UI.Box px={4} bgColor="white">
            <TableGenerate
              onClickRow={(row) => push(path + `/${row?.id}`)}
              isLoading={loading}
              currentPage={data?.page}
              totalpage={data?.totalPages}
              data={data?.records || []}
              onChangePage={setPage}
              totalCount={data?.total}
              pageSize={data?.limit}
              Footer={
                <UI.Tr>
                  <UI.Td fontWeight="bold" colSpan={1000}>
                    {data?.total} User
                  </UI.Td>
                </UI.Tr>
              }
              columns={[
                {
                  Header: 'User',
                  id: 'user',
                  accessor: (row) => (
                    <UI.HStack>
                      <UI.Avatar
                        sx={{
                          img: {
                            objectFit: 'contain',
                          },
                        }}
                        bg={
                          row?.userProfiles?.[0]?.avatarMediaDestination
                            ? 'white'
                            : undefined
                        }
                        src={row?.userProfiles?.[0]?.avatarMediaDestination}
                        userId={row?.id}
                        name={row?.firstName + ' ' + row?.lastName}
                        size={'sm'}
                      />
                      <UI.Text>
                        {row?.firstName} {row?.lastName}
                      </UI.Text>
                    </UI.HStack>
                  ),
                },
                {
                  Header: 'Email Address',
                  id: 'emailAddress',
                  accessor: (row) => <UI.Text>{row?.email}</UI.Text>,
                },

                {
                  Header: 'Status',
                  id: 'status',
                  accessor: (row) => {
                    return (
                      <UI.Text>{STATUS_STRING?.[row?.isActive] || ''}</UI.Text>
                    );
                  },
                },
                {
                  Header: 'Role',
                  id: 'role',
                  accessor: (row) => {
                    return (
                      <UI.Text>{USRTYPE_STRING?.[row?.userType] || ''}</UI.Text>
                    );
                  },
                },

                {
                  Header: () => <UI.Center>Action</UI.Center>,
                  id: 'action',
                  accessor: (row) => (
                    <ActionColum
                      refresh={() =>
                        getList({
                          page: 1,
                          limit: 10,
                        })
                      }
                      row={row}
                    />
                  ),
                },
              ]}
            />{' '}
          </UI.Box>
        ) : (
          <UI.Box>
            {loading ? (
              <UI.Center minH="300px">
                <UI.Spinner size="lg" color="ste.red" />
              </UI.Center>
            ) : isEmpty(data?.records) ? (
              <UI.Center>No data</UI.Center>
            ) : (
              <UI.VStack bg="white" spacing={3} p={3}>
                {data?.records.map((x) => (
                  <UserInfoCard key={x?.id} userData={x} />
                ))}
                <UI.HStack
                  alignItems="center"
                  justifyContent="space-between"
                  w="full">
                  <UI.Text w="200px" fontWeight="semibold">
                    {data?.total} User
                  </UI.Text>
                  <Pagination
                    pageSize={data?.limit}
                    currentPage={data?.page}
                    totalpage={data?.totalPages}
                    totalCount={data?.total}
                    onChangePage={setPage}
                    size={'sm'}
                    justifyContent="flex-end"
                  />
                </UI.HStack>
              </UI.VStack>
            )}
          </UI.Box>
        )}
      </UI.Box>
    </UI.VStack>
  );
}

export const ActionColum = (props: any) => {
  const {openModal} = useModalController();

  const {isOpen, onOpen, onClose} = UI.useDisclosure();
  // const {openModal} = useModalStore();
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
        <UI.MenuList>
          <UI.MenuItem
            hidden={row?.isActive === 1}
            onClick={(e) => {
              e.stopPropagation();
              openModal('action', {
                title: 'Activate Access',
                type: 'Activate',
                cb: () => refresh(),
                id: row?.id,
              });
            }}>
            Activate Access
          </UI.MenuItem>
          <UI.MenuItem
            hidden={row?.isActive === 0}
            onClick={(e) => {
              e.stopPropagation();
              openModal('action', {
                title: 'Deactivate Access',
                type: 'Deactivate',
                cb: () => refresh(),
                id: row?.id,
              });
            }}>
            Deactivate Access
          </UI.MenuItem>
        </UI.MenuList>
      </UI.Menu>
    </UI.Center>
  );
};

export default userManagement;
