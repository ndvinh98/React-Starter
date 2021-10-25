import React from 'react';
import {HTMLChakraProps} from '@chakra-ui/system';
import {isEmpty} from 'lodash';

import * as UI from '@chakra-ui/react';

import Pagination from '@components/Pagination';
import ItemGridNormal from './items/ItemGridNormal';
import ItemListNormal from './items/ItemListNormal';
import ItemListModules from './items/ItemListModules';
import ItemGridModules from './items/ItemGridModules';
import ItemGridResources from './items/ItemGridResources';
import ItemListResources from './items/ItemListResources';

export interface IListViewLayout extends HTMLChakraProps<'div'> {
  records?: any[];
  page?: number;
  totalpage?: number;
  layout?: 'grid' | 'list';
  height?: string;
  onChangePage?: (page: number) => void;
  isLoading?: boolean;
  productModuleRelation?: any;
  type?: 'normal' | 'modules' | 'resources';
  isCanNotSelected?: boolean;
  mediaType?: string;
  totalCount?: number;
  limit?: number;
}

const TEMPLATE_NORMAL = {
  grid: {
    templateColumns: 'repeat(auto-fill, 300px)',
    item: ItemGridNormal,
  },
  list: {
    templateColumns: '1fr',
    item: ItemListNormal,
  },
};

const TEMPLATE_MODULES = {
  grid: {
    templateColumns: 'repeat(auto-fill, 300px)',
    item: ItemGridModules,
  },
  list: {
    templateColumns: '1fr',
    item: ItemListModules,
  },
};

const TEMPLATE_RESOURCES = {
  grid: {
    templateColumns: 'repeat(auto-fill, 300px)',
    item: ItemGridResources,
  },
  list: {
    templateColumns: '1fr',
    item: ItemListResources,
  },
};

const TYPE = {
  normal: TEMPLATE_NORMAL,
  modules: TEMPLATE_MODULES,
  resources: TEMPLATE_RESOURCES,
};

function ListViewLayout(props: IListViewLayout) {
  const {
    productModuleRelation,
    records,
    layout = 'grid',
    page = 1,
    totalpage = 1,
    onChangePage,
    isLoading,
    type = 'normal',
    isCanNotSelected,
    mediaType,
    totalCount,
    limit,
  } = props;
  return (
    <UI.VStack w={'full'}>
      <UI.Box w={'full'}>
        {isLoading ? (
          <UI.Center w={'full'} h={'full'}>
            <UI.Spinner color={'ste.red'} size={'xl'} />
          </UI.Center>
        ) : isEmpty(records) ? (
          <UI.Center w={'full'} h={'300px'}>
            <UI.VStack>
              <UI.Image src={'https://i.imgur.com/nvdeBu8.png'} />
              <UI.Text pt={2} color={'gray'} fontSize={'lg'}>
                No results found :((
              </UI.Text>
            </UI.VStack>
          </UI.Center>
        ) : (
          <UI.Grid
            w={'full'}
            pt={4}
            gap={'35px'}
            minH="64vh"
            templateColumns={{
              lg: TYPE?.[type]?.[layout]?.templateColumns,
              md: '1fr',
            }}>
            {records?.map?.((x) => {
              const Component = TYPE?.[type]?.[layout]?.item;
              return (
                <Component
                  isCanNotSelected={isCanNotSelected}
                  productModuleRelation={productModuleRelation}
                  mediaDestination={x?.mediaDestination}
                  mediaType={mediaType}
                  key={x?.id}
                  id={x?.id}
                  title={x?.name}
                  record={x}
                />
              );
            })}
          </UI.Grid>
        )}
      </UI.Box>
      <Pagination
        totalCount={totalCount}
        currentPage={page}
        totalpage={totalpage || 1}
        onChangePage={onChangePage}
        pageSize={limit}
        size="sm"
      />
    </UI.VStack>
  );
}

export default React.memo(ListViewLayout);
