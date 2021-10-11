import React from 'react';
import moment from 'moment';

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
  USER: 'Sales Management',
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
  const {data, loading, setPage, handleFilterDataUser} = props;
  const {path} = useRouterController();
  const {push} = useRouter();
  const {isBase} = useMedia();

  // const handleFilterData = ({textSearch, status, userType}) => {
  //   // handleFilterDataUser(textSearch, status, userType);
  //   console.log(textSearch, status, userType, 'hahahah');
  // };

  return (
    <UI.VStack py={6} px={8} spacing={4} width="full" bgColor="white">
      <UI.Text fontSize="2xl" fontWeight="semibold" w="full">
        User Infomation
      </UI.Text>
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
                  label: 'Sales Manager',
                  value: 'USER',
                },
              ],
            },
          ]}
        />
        {isBase ? (
          <TableGenerate
            onClickRow={(row) => push(path + `/${row?.id}`)}
            isLoading={loading}
            currentPage={data?.page}
            totalpage={data?.totalPages}
            data={data?.records || []}
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
                    {' '}
                    {moment(row?.otpCodeExp).format('DD MMM YYYY')}
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
                    {' '}
                    {moment(row?.createdAt).format('DD MMM YYYY')}
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
                        page: 1,
                        limit: 10,
                      })
                    }
                    row={row}
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
  const {row} = props;
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
            onClick={() =>
              openModal('action', {
                title: 'Activate Access',
                type: 'Activate',
                // cb: () => getUserProfile(),
                id: row?.id,
              })
            }>
            Activate Access
          </UI.MenuItem>
          <UI.MenuItem
            hidden={row?.isActive === 0}
            onClick={() =>
              openModal('action', {
                title: 'Deactivate Access',
                type: 'Deactivate',
                // cb: () => getUserProfile(),
                id: row?.id,
              })
            }>
            Deactivate Access
          </UI.MenuItem>
        </UI.MenuList>
      </UI.Menu>
    </UI.Center>
  );
};

export default UserTable;
