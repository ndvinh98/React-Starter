import React, {useEffect} from 'react';
import {isEmpty} from 'lodash';
import {useRouter} from '@utils/hooks';
import {useRouterController} from '@modules/router';
import {useGetList} from '@utils/hooks';
import {IPartnerApplicationForms} from '@types';
import FormGenerate from '@components/FormGenerate';
import {IFormControl} from '@components/FormGenerate/FormControl';

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
  const {data, getList, loading} = useGetList<IPartnerApplicationForms>(
    '/partnerApplicationForms',
  );

  useEffect(() => {
    getList({
      page: 1,
      limit: 10,
      cache: true,
    });
  }, []);

  return (
    <UI.VStack py={6} px={8}>
      <UI.Text fontSize="2xl" fontWeight="semibold" w="full">
        Partner Applications
      </UI.Text>
      <FormGenerate fields={FIELDS} />
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
          <UI.HStack key={x?.id}>
            <UI.Text>{x.companyName}</UI.Text>
            <UI.Button
              onClick={() => push(path + `/detail/${x.id}`)}
              color="#54565A"
              bg="#E9E9E9"
              borderRadius="0">
              View
            </UI.Button>
          </UI.HStack>
        ))
      )}
    </UI.VStack>
  );
}

export default Main;
