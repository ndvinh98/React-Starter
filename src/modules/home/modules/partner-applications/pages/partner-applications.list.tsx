import React, {useEffect, useMemo} from 'react';
import {isEmpty, chain} from 'lodash';
import {useFilter} from '@utils/hooks';
import {useGetList} from '@utils/hooks';
import {IPartnerApplicationForms} from '@types';
import FormGenerate from '@components/FormGenerate';
import {IFormControl} from '@components/FormGenerate/FormControl';
import LineAplication from '@components/LineApplication';
import * as UI from '@chakra-ui/react';
import {AiOutlineSearch} from 'react-icons/ai';
import {format} from 'date-fns';

const FIELDS: IFormControl[] = [
  {
    type: 'input-group',
    name: 'textSearch',
    colSpan: 3,
    placeholder: 'Search...',
    leftIcon: <AiOutlineSearch size={20} />,
  },
  {
    isClearable: false,
    type: 'select',
    name: 'status',
    colSpan: 3,
    defaultValue: {label: 'Access requests', value: 'PENDING'},
    options: [
      {
        label: 'Access requests',
        value: 'PENDING',
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

const FeedbackCategory = ({data}) => {
  const groupedMessages = useMemo(
    () =>
      chain(data)
        .groupBy((item) => format(new Date(item?.updatedAt), 'dd MMM yyyy'))
        .sortBy((group) => data.indexOf(group[0]))
        .valueOf(),
    [data],
  );

  return (
    <UI.Box w={'full'}>
      {groupedMessages.map((group, gr_index) => {
        const section = format(new Date(group[0].updatedAt), 'dd MMM yyyy');
        return (
          <UI.Box key={gr_index} pt={4} mb={4}>
            <UI.Text pb={2} fontWeight="600">
              {' '}
              {section}{' '}
            </UI.Text>
            {group.map((item) => {
              return (
                <UI.HStack key={item?.id} spacing={8} width="full" pb="5">
                  <LineAplication aplicationData={item} />
                </UI.HStack>
              );
            })}
          </UI.Box>
        );
      })}
    </UI.Box>
  );
};

function Main() {
  const {page, limit, textSearch, setTextSearch, filter, setFilter, setLimit} =
    useFilter({page: 1, limit: 10});

  const {data, getList, loading} = useGetList<IPartnerApplicationForms>(
    '/partnerApplicationForms',
  );

  useEffect(() => {
    getList({
      page,
      limit,
      relations: JSON.stringify([
        'partnerApplicationSubmission',
        'partnerApplicationSubmission.submittedByPartnerUser',
      ]),
      filter: isEmpty(filter)
        ? JSON.stringify([{partnerApplicationSubmission: {status: 'PENDING'}}])
        : JSON.stringify([
            {partnerApplicationSubmission: {status: filter.status}},
          ]),
      textSearch: isEmpty(textSearch)
        ? undefined
        : JSON.stringify([{companyName: textSearch}]),
    });
  }, [page, textSearch, filter, limit]);

  const handleFilterData = ({textSearch, status}) => {
    setTextSearch(textSearch);
    setFilter((filter) => ({
      ...filter,
    }));
    if (status === '-1') setFilter(null);
    else setFilter({status});
  };

  const handleLoadMore = () => {
    if (data?.total > limit + 10) {
      setLimit(limit + 10);
    } else if (data?.total <= limit + 10) {
      setLimit(data?.total);
    }
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
        <UI.VStack w={'full'}>
          <FeedbackCategory data={data?.records} />
          <UI.Center hidden={data?.total <= limit}>
            <UI.Button
              onClick={handleLoadMore}
              color="#54565A"
              bg="#E9E9E9"
              borderRadius="2">
              Load more
            </UI.Button>
          </UI.Center>
        </UI.VStack>
      )}
    </UI.VStack>
  );
}

export default Main;
