import React, {useEffect} from 'react';
import moment from 'moment';

import TableGenerate from '@components/TableGenerate';
import FormGenerate from '@components/FormGenerate';
import Pagination from '@components/Pagination';
import {IPartnerManagement} from '@types';
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

function CompanyManagement() {
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
  const {data, getList, loading} = useGetList<IPartnerManagement>('/partners');

  useEffect(() => {
    getList({
      page,
      limit,
      relations: JSON.stringify(['partnerDomain']),
      filter: isEmpty(filter)
        ? undefined
        : JSON.stringify([
            {isActive: filter.status, userType: filter.userType},
          ]),
      textSearch: textSearch
        ? JSON.stringify([{companyName: textSearch}])
        : undefined,
    });
  }, [page, limit, textSearch, filter]);

  const handleFilterData = ({textSearch, status}, fieldChange) => {
    if (fieldChange.name === 'textSearch') {
      if (textSearch && textSearch.length < 3) return;
      setPage(1), setTextSearch(textSearch === undefined ? '' : textSearch);
    }

    if (fieldChange.name === 'status') {
      setPage(1),
        setFilter((filter) => ({
          ...filter,
          status: status === '-1' ? undefined : status,
        }));
    }
  };

  return (
    <UI.VStack py={6} px={8} spacing={4} width="full">
      <UI.Text fontSize="2xl" fontWeight="semibold" w="full">
        Partner Management
      </UI.Text>

      <UI.Box width="full">
        <UI.HStack>
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
            ]}
          />
          <UI.HStack>
            <UI.Text w="70px">View Item</UI.Text>
            <UI.Box w="80px">
              <Select
                isClearable={false}
                size="sm"
                name="limit"
                onChangeValue={(data) => {
                  setLimit(data.value);
                  setPage(1);
                }}
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
                    label: '30',
                    value: 30,
                  },
                  {
                    label: '50',
                    value: 50,
                  },
                ]}
              />
            </UI.Box>
          </UI.HStack>
        </UI.HStack>

        {loading ? (
          <UI.Center minH="300px">
            <UI.Spinner size="lg" color="ste.red" />
          </UI.Center>
        ) : isEmpty(data?.records) ? (
          <UI.Center>No data</UI.Center>
        ) : (
          <UI.Box width="full">
            {isBase ? (
              <UI.Box px={4} bgColor="white">
                <TableGenerate
                  onClickRow={(row) => push(path + `/company/${row?.id}`)}
                  isLoading={loading}
                  currentPage={data?.page}
                  totalpage={data?.totalPages}
                  totalCount={data?.total}
                  pageSize={data?.limit}
                  data={data?.records || []}
                  onChangePage={setPage}
                  Footer={
                    <UI.Tr>
                      <UI.Td fontWeight="bold" colSpan={1000}>
                        {data?.total} Companies
                      </UI.Td>
                    </UI.Tr>
                  }
                  columns={[
                    {
                      Header: 'Company',
                      id: 'company',
                      accessor: (row) => <UI.Text>{row?.companyName}</UI.Text>,
                    },
                    {
                      Header: 'Status',
                      id: 'status',
                      accessor: (row) => {
                        return (
                          <UI.Text>
                            {STATUS_STRING?.[row?.isActive] || ''}
                          </UI.Text>
                        );
                      },
                    },
                    {
                      Header: 'Registered Date',
                      id: 'registDate',
                      accessor: (row) => (
                        <UI.Text>
                          {moment(row?.createdAt).format('DD MMM YYYY')}
                        </UI.Text>
                      ),
                    },

                    {
                      Header: 'Validity Date',
                      id: 'validDate',
                      accessor: (row) => {
                        return (
                          <UI.Text>
                            {' '}
                            {moment(row?.expiryDate).format('DD MMM YYYY')}
                          </UI.Text>
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
                />
              </UI.Box>
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
                    totalCount={data?.total}
                    pageSize={data?.limit}
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
              openModal('actionPartner', {
                title: 'Activate Access',
                type: 'Activate',
                path: 'partners',
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
              openModal('actionPartner', {
                title: 'Deactivate Access',
                type: 'Deactivate',
                path: 'partners',
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

export default CompanyManagement;
