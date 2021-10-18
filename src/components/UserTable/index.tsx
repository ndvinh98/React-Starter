import React, {useState} from 'react';
import {format} from 'date-fns';

import TableGenerate from '@components/TableGenerate';
import FormGenerate from '@components/FormGenerate';
import Pagination from '@components/Pagination';

import UserInfoCard from '@components/UserInfoCard';

import {useRouter} from '@utils/hooks';
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
  USER: 'User',
};

export const STATUS_STRING = {
  1: 'Active',
  0: 'Inactive',
};
export const ACTIVE_STRING = {
  1: 'Actived',
  0: 'Decatived',
};

function UserTable(props) {
  const {
    data,
    loading,
    setPage,
    handleFilterDataUser,
    totalCount,
    companyName,
  } = props;
  const {path} = useRouterController();
  const {push} = useRouter();
  const {isBase} = useMedia();

  return (
    <UI.VStack py={6} px={4} spacing={4} width="full" bgColor="white">
      <UI.Box w="full">
        <UI.Text
          fontSize={{md: 'md', lg: 'xl'}}
          fontWeight="semibold"
          w="full"
          bgColor={'#EEEEEC'}
          pl={3}>
          User Infomation
        </UI.Text>
      </UI.Box>
      <UI.Box width="full">
        <FormGenerate
          gap={isBase ? 4 : 6}
          onChangeValue={handleFilterDataUser}
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
                  label: 'User',
                  value: 'USER',
                },
              ],
            },
          ]}
        />
        {isBase ? (
          <TableGenerate
            onClickRow={(row) => push(path + '/user' + `/${row?.id}`)}
            isLoading={loading}
            currentPage={data?.page}
            totalpage={data?.totalPages}
            totalCount={data?.total}
            data={data?.records || []}
            pageSize={data?.limit}
            onChangePage={setPage}
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
                        row?.partnerUserProfiles?.[0]?.avatarMediaDestination
                          ? 'white'
                          : undefined
                      }
                      src={
                        row?.partnerUserProfiles?.[0]?.avatarMediaDestination
                      }
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
                Header: 'Last Activity',
                id: 'lastActivity',
                accessor: (row) => (
                  <UI.Text>
                    {row?.otpCodeExp
                      ? format(new Date(row?.otpCodeExp), 'dd MMM yyyy')
                      : false}
                  </UI.Text>
                ),
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
                Header: 'Registered Date',
                id: 'registDate',
                accessor: (row) => (
                  <UI.Text>
                    {row?.createdAt
                      ? format(new Date(row?.createdAt), 'dd MMM yyyy')
                      : false}
                  </UI.Text>
                ),
              },
              {
                Header: () => <UI.Center>Action</UI.Center>,
                id: 'action',
                accessor: (row) => (
                  <ActionColum
                    // refresh={() =>
                    //   getList({
                    //     page: 1,
                    //     limit: 10,
                    //   })
                    // }
                    row={row}
                    companyName={companyName}
                  />
                ),
              },
            ]}
          />
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
                    currentPage={data?.page}
                    totalpage={data?.totalPages}
                    onChangePage={setPage}
                    size={'sm'}
                    totalCount={totalCount}
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

  const {row, companyName} = props;

  const isHiden = () => {
    return row?.isActive === 0 || row?.userType === 'PARTNERADMIN'
      ? true
      : false;
  };

  return (
    <UI.Center>
      <UI.Menu onClose={onClose} isOpen={isOpen}>
        <UI.MenuButton
          px={4}
          py={2}
          hidden={isHiden()}
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}>
          <HiDotsHorizontal color={'#9097A9'} size={20} />
        </UI.MenuButton>
        <UI.MenuList>
          <UI.MenuItem
            onClick={(e) => {
              e.stopPropagation();
              openModal('assignPartnerAdmin', {
                // cb: () => refresh(),
                id: row?.id,
                firstName: row?.firstName,
                lastName: row?.lastName,
                companyName: companyName,
              });
            }}>
            Assign as Partner Admin
          </UI.MenuItem>
        </UI.MenuList>
      </UI.Menu>
    </UI.Center>
  );
};

export default UserTable;
