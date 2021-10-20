import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';

import {useGetList, useFilter} from '@utils/hooks';
import {IApplication} from '@types';

function List() {
  const {getList, loading, data} = useGetList<IApplication>('applications');
  const {page, limit, setPage, setLimit} = useFilter({limit: 10, page: 1});
  useEffect(() => {
    getList({
      page,
      limit,
    });
  }, [page, limit]);

  return (
    <UI.Box minH="89vh">
      <ContentView
        isLoading={loading}
        onPageChange={setPage}
        onLimitChange={setLimit}
        data={data?.records}
        limit={limit}
        totalCount={data?.total}
        currentPage={page}
        linkAddNew="/home/content-management/line-of-business/detail/add"
        linkToChild="/home/content-management/line-of-product"
        name="Line of Business"
        linkDeleteContent="/applications"
      />
    </UI.Box>
  );
}

export default List;
