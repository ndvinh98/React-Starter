import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {AiOutlineSearch} from 'react-icons/ai';
import {IFormControl} from '@components/FormGenerate/FormControl';
import FormGenerate from '@components/FormGenerate';
import {useRouter, useFilter, useGetList} from '@utils/hooks';
import {useRouterController} from '@modules/router';
import {IUserManagement} from '@types';
import {useMedia} from '@utils/hooks';
import {isEmpty} from 'lodash';

function userTable() {
  const {push} = useRouter();
  const {path} = useRouterController();
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
  const {data, getList, loading} =
    useGetList<IUserManagement>('/user-management');

  const isHiden = false;

  useEffect(() => {
    getList({
      page,
      limit,

      // filter: isEmpty(filter)
      //   ? JSON.stringify([{partnerApplicationSubmission: {status: 'PENDING'}}])
      //   : JSON.stringify([
      //       {partnerApplicationSubmission: {status: filter.status}},
      //     ]),
      textSearch: textSearch
        ? JSON.stringify([
            {firstName: textSearch},
            {email: textSearch},
            {lastName: textSearch},
          ])
        : undefined,
    });
  }, [page, limit, textSearch, filter]);

  const handleFilterData = ({textSearch, status}) => {
    if (textSearch !== undefined) setTextSearch(textSearch);
    setFilter((filter) => ({
      ...filter,
    }));
    if (status === '-1') setFilter(null);
    else setFilter({status});
  };

  return (
    <UI.VStack py={6} px={8} spacing={4} width="full">
      <UI.Text fontSize="2xl" fontWeight="semibold" w="full">
        Partner Management
      </UI.Text>
      <UI.Box width="full">
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
              name: 'hasAccess',
              type: 'select',
              colSpan: isBase ? 3 : 6,
              size: 'md',

              defaultValue: {
                label: 'All User',
                value: '-1',
              },
              options: [
                {
                  label: 'All User',
                  value: '-1',
                },
                {
                  label: 'No site access',
                  value: '0',
                },
                {
                  label: 'Has site access',
                  value: '1',
                },
              ],
            },
            {
              name: 'userType',
              type: 'select',
              colSpan: isBase ? 3 : 6,
              size: 'md',
              placeholder: 'Roles',
              defaultValue: {
                label: 'All User Type',
                value: '-1',
              },
              options: [
                {
                  label: 'All User Type',
                  value: '-1',
                },
                {
                  label: 'Owner',
                  value: 'PARTNERADMIN',
                },
                {
                  label: 'User',
                  value: 'USER',
                },
                {
                  label: 'Admin',
                  value: 'ADMIN',
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
                    justifyContent={'flex-end'}>
                    <UI.Button
                      onClick={() => push('/user-management/add-new')}
                      size={'md'}>
                      Add new user
                    </UI.Button>
                  </UI.HStack>
                );
              },
            },
          ]}
        />
      </UI.Box>
    </UI.VStack>
  );
}

export default userTable;
