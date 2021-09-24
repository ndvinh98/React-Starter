import React from 'react';
import * as UI from '@chakra-ui/react';
import {AiOutlineSearch} from 'react-icons/ai';
import {IFormControl} from '@components/FormGenerate/FormControl';
import FormGenerate from '@components/FormGenerate';

const FIELDS: IFormControl[] = [
  {
    type: 'input-group',
    name: 'search',
    colSpan: 5,
    placeholder: 'Search...',
    leftIcon: <AiOutlineSearch size={20} />,
  },
  {
    type: 'select',
    name: 'status',
    colSpan: 3,
    defaultValue: {label: 'Status', value: '-1'},
    options: [
      {
        label: 'All requests',
        value: '-1',
      },
      {
        label: 'Accepted requests',
        value: 'APPROVED',
      },
      {
        label: 'Rejected requests',
        value: 'REJECTED',
      },
    ],
  },
  {
    type: 'select',
    name: 'role',
    colSpan: 3,
    defaultValue: {label: 'All Roles', value: '-1'},
    options: [
      {
        label: 'All requests',
        value: '-1',
      },
      {
        label: 'Accepted requests',
        value: 'APPROVED',
      },
      {
        label: 'Rejected requests',
        value: 'REJECTED',
      },
    ],
  },
];

// const handleFilterData = ({textSearch, status}) => {
//   if (textSearch !== undefined) setTextSearch(textSearch);
//   setFilter((filter) => ({
//     ...filter,
//   }));
//   if (status === '-1') setFilter(null);
//   else setFilter({status});
// };

function userTable() {
  return (
    <UI.VStack py={6} px={8} spacing={4} width="full">
      <UI.Text fontSize="2xl" fontWeight="semibold" w="full">
        Partner Management
      </UI.Text>
      <UI.HStack width="full">
        <FormGenerate fields={FIELDS} />
        <UI.Button>Add New User</UI.Button>
      </UI.HStack>
    </UI.VStack>
  );
}

export default userTable;
