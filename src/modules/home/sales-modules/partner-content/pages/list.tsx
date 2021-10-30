import FormGenerate from '@components/FormGenerate';
import {IFormControl} from '@components/FormGenerate/FormControl';
// import {IPartnerSale} from '@types';
import {useFilter, useGetList} from '@utils/hooks';
import React, {useEffect} from 'react';
import {AiOutlineSearch} from 'react-icons/ai';
import * as UI from '@chakra-ui/react';
import {isEmpty} from 'lodash';
import CardPartnerContent from '@components/CardPartnerContent';
import {useHomeController} from '@modules/home';

const FIELDS: IFormControl[] = [
  {
    type: 'input-group',
    name: 'textSearch',
    colSpan: 3,
    placeholder: 'Search...',
    leftIcon: <AiOutlineSearch size={20} />,
  },
];

function PartnerList() {
  const {me: profileData} = useHomeController();

  const {page, limit, textSearch, setTextSearch} = useFilter({
    page: 1,
    limit: 1000,
  });
  const {data, getList, loading} = useGetList<any>('/partnerUserRelations');

  useEffect(() => {
    if (profileData)
      getList({
        page,
        limit,
        relations: JSON.stringify(['partner']),
        filter: JSON.stringify([{userId: profileData?.id}]),
        textSearch: textSearch
          ? JSON.stringify([{partner: {companyName: textSearch}}])
          : undefined,
      });
  }, [page, limit, textSearch]);

  const handleFilterDataSales = ({textSearch}, fieldChange) => {
    if (fieldChange.name === 'textSearch') {
      if (textSearch && textSearch.length < 3) return;

      setTextSearch(textSearch);
    }
  };

  return (
    <UI.VStack py={6} px={8} spacing={4} width="full">
      <UI.Text fontSize={{md: 'md', lg: '2xl'}} fontWeight="semibold" w="full">
        Partner Content
      </UI.Text>
      <FormGenerate onChangeValue={handleFilterDataSales} fields={FIELDS} />
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
          <UI.Box w={'full'}>
            {data?.records.map((item) => {
              return (
                <UI.HStack key={item?.id} spacing={8} width="full" pb="5">
                  <CardPartnerContent data={item} />
                </UI.HStack>
              );
            })}
          </UI.Box>
        </UI.VStack>
      )}
    </UI.VStack>
  );
}

export default PartnerList;
