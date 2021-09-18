import React, {useEffect, useRef} from 'react';
import {isEmpty} from 'lodash';
import {useRouter, usePagination} from '@utils/hooks';
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
    name: 'type',
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
  const isFirstLoad = useRef(true);
  const {page, limit, setPage, textSearch, setTextSearch, filter, setFilter} =
    usePagination();
  const {data, getList, loading} = useGetList<IPartnerApplicationForms>(
    '/partnerApplicationForms',
  );

  useEffect(() => {
    getList({
      page,
      limit,
      cache: true,
    });
    isFirstLoad.current = false;
  }, []);

  useEffect(() => {
    if (!isFirstLoad.current)
      getList({
        page,
        limit,
        relations: JSON.stringify([]),
        filter: isEmpty(filter) ? undefined : JSON.stringify([filter]),
        textSearch: textSearch
          ? JSON.stringify([
              {firstName: textSearch},
              {email: textSearch},
              {lastName: textSearch},
            ])
          : undefined,
      });
    isFirstLoad.current = false;
  }, [page, limit, textSearch, filter]);

  const handleFilterData = ({textSearch}) => {
    if (textSearch !== undefined) setTextSearch(textSearch);
    setFilter((filter) => ({
      ...filter,
    }));
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
