import React, {useState, useEffect} from 'react';
import * as UI from '@chakra-ui/react';

import FormGenerate from '@components/FormGenerate';
import ListViewMain from '@components/ListViewMain';
import BtnLayoutGroup from '@components/BtnLayoutGroup';
import {useMedia, useGetList} from '@utils/hooks';
import {useRouterController} from '@modules/router';

function Main() {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const {isBase} = useMedia();
  const params = useRouterController((s) => s.params);

  const {getList, data} = useGetList(
    `/categories?partnerId=${params?.partnerId}`,
  );

  useEffect(() => {
    if (params && params?.partnerId) {
      getList({
        limit: 10,
        page: 1,
      });
    }
  }, [params]);

  return (
    <UI.VStack textAlign={'left'} pl={{lg: 10, md: 5}} pr={5} py={5} w={'full'}>
      <UI.Text
        mb={4}
        w={'full'}
        fontSize={'2xl'}
        fontWeight={'medium'}
        textAlign={'left'}>
        DASHBOARD
      </UI.Text>
      <UI.Stack
        direction={{md: 'column', lg: 'row'}}
        w={'full'}
        justifyContent={'space-between'}>
        <FormGenerate
          w={'full'}
          fields={[
            {
              type: 'select',
              name: 'product',
              placeholder: 'Product',
              colSpan: isBase ? 3 : 12,
              size: 'md',
              options: [],
            },
            {
              type: 'select',
              name: 'language',
              placeholder: 'Language',
              colSpan: isBase ? 3 : 12,
              size: 'md',
              options: [],
            },
            {
              type: 'select',
              name: 'asset-type',
              placeholder: 'Asset Type',
              colSpan: isBase ? 3 : 12,
              size: 'md',
              options: [],
            },
            {
              type: 'decor',
              DecorComponent: () => (
                <UI.HStack justifyContent={{md: 'center', lg: 'flex-start'}}>
                  <UI.Button size={'md'}>Search</UI.Button>
                </UI.HStack>
              ),
              colSpan: isBase ? 3 : 12,
            },
          ]}
        />
        <BtnLayoutGroup
          w={'fit-content'}
          onChangeLayoutStyle={setLayout}
          // onLimitChange={() => {}}
        />
      </UI.Stack>
      <ListViewMain
        w={'full'}
        isCanNotSelected
        isLoading={false}
        page={1}
        totalpage={1}
        height={isBase ? `calc(100vh - 260px)` : 'auto'}
        records={data?.records}
        layout={layout}
        // onChangePage={() => {}}
      />
    </UI.VStack>
  );
}

export default Main;
