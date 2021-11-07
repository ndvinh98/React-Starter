import React, {useEffect, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';

import BtnLayoutGroup from '@components/BtnLayoutGroup';
import {useGetList, useGetItem} from '@utils/hooks';
import {useRouterController} from '@modules/router';
import {useHistory} from 'react-navi';

import ListViewLayout from '@components/ListViewLayout';
import BtnDownloadGroup from '@components/BtnDownloadGroup';

export interface IRouterParams {
  applicationId?: string;
  categoryId?: string;
  groupingId?: string;
  productId?: string;
  moduleId?: string;
}

function Applications() {
  const {goBack} = useHistory();
  const params = useRouterController((s) => s.params);

  const {
    data: listData,
    getList,
    loading: listLoading,
  } = useGetList(`groupings`);
  const {
    data: itemData,
    getItem,
    loading: itemLoading,
  } = useGetItem(`categories/${params?.lineOfProductId}`);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (params && params?.partnerId && params.lineOfProductId) {
      getItem({
        partnerId: params?.partnerId,
      });
      getList({
        filter: JSON.stringify([{category: params.lineOfProductId}]),
        partnerId: params?.partnerId,
        page: page,
        limit: limit,
        cache: true,
      });
    }
  }, [params?.lineOfProductId, page, limit]);

  return (
    <UI.VStack px={8} pt={8} w={'full'}>
      <UI.HStack w={'full'} h={'10px'}>
        <UI.HStack
          onClick={() => goBack()}
          _hover={{textDecoration: 'underline'}}
          cursor={'pointer'}
          w={'full'}>
          <BsArrowLeft color={'#6C6F84'} />
          <UI.Text color={'#6C6F84'}>Back</UI.Text>
        </UI.HStack>
      </UI.HStack>
      <UI.HStack w={'full'}>
        <UI.Box h={'18px'}>
          {itemLoading ? (
            <UI.Skeleton h={'30px'} />
          ) : (
            <UI.Text fontWeight={'semibold'} fontSize={'xl'}>
              {itemData?.name}
            </UI.Text>
          )}
        </UI.Box>
      </UI.HStack>
      <UI.Stack
        direction={{md: 'column', lg: 'row'}}
        w={'full'}
        pt={{md: 4, lg: 2}}
        justifyContent={'space-between'}>
        <BtnLayoutGroup
          onChangeLayoutStyle={setLayout}
          onLimitChange={setLimit}
          py={5}
        />
        {params?.groupingId && (
          <BtnDownloadGroup
            allIds={itemData?.records.map((x) => x?.id)}
            type={
              params?.moduleId
                ? 'productModuleResources'
                : params?.productId
                ? 'productModules'
                : 'grouping'
            }
          />
        )}
      </UI.Stack>
      <UI.Box w={'full'}>
        <ListViewLayout
          limit={limit}
          mediaType={itemData?.mediaType}
          isCanNotSelected={!params?.groupingId}
          isLoading={listLoading}
          w={'full'}
          page={listData?.page}
          // productModuleRelation={listData?.productModuleRelation}
          totalpage={listData?.totalPages}
          minH={'400px'}
          records={listData?.records}
          totalCount={listData?.total}
          layout={layout}
          onChangePage={setPage}
          type={'normal'}
        />
      </UI.Box>
    </UI.VStack>
  );
}

export default Applications;
