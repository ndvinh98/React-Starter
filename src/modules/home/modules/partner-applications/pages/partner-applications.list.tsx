import React, {useEffect, useRef} from 'react';
import {isEmpty} from 'lodash';
import {useRouter, useFilter} from '@utils/hooks';
import {useRouterController} from '@modules/router';
import {useGetList} from '@utils/hooks';
import {IPartnerApplicationForms} from '@types';
import FormGenerate from '@components/FormGenerate';
import {IFormControl} from '@components/FormGenerate/FormControl';
import LineAplication from '@components/LineApplication';

import * as UI from '@chakra-ui/react';
import {AiOutlineSearch} from 'react-icons/ai';

const FIELDS: IFormControl[] = [
  {
    type: 'input-group',
    name: 'search',
    colSpan: 3,
    placeholder: 'Search...',
    leftIcon: <AiOutlineSearch size={20} />,
  },
  {
    type: 'select',
    name: 'status',
    colSpan: 3,
    defaultValue: {label: 'All requests', value: '-1'},
    options: [
      {
        label: 'All requests',
        value: '-1',
      },
      {
        label: 'Accepted requests',
        value: '1',
      },
      {
        label: 'Rejected requests',
        value: '0',
      },
    ],
  },
];

function Main() {
  const {push} = useRouter();
  const {path} = useRouterController();
  const {page, limit, setPage, textSearch, setTextSearch, filter, setFilter} =
    useFilter({page: 1, limit: 10});
  const {data, getList, loading} = useGetList<IPartnerApplicationForms>(
    '/partnerApplicationForms',
  );

  useEffect(() => {
    getList({
      page,
      limit,
      relations: JSON.stringify(['partnerApplicationSubmission']),
      filter: isEmpty(filter)
        ? undefined
        : JSON.stringify([
            {partnerApplicationSubmission: {status: filter.status}},
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
        Partner Applications
      </UI.Text>
      <FormGenerate onChangeValue={handleFilterData} fields={FIELDS} />
      {loading ? (
        <UI.Center minH="300px">
          <UI.Spinner size="lg" color="ste.red" />
        </UI.Center>
      ) : isEmpty(data?.records) ? (
        <UI.Center>
          <UI.Image src="" />
          <UI.Text>No data</UI.Text>
        </UI.Center>
      ) : (
        data.records.map((x) => (
          <UI.HStack key={x?.id} spacing={8} width="full">
            <LineAplication props={x} />
          </UI.HStack>
        ))
      )}
    </UI.VStack>
  );
}

export default Main;
