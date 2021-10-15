import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';

import {useGetList, useFilter} from '@utils/hooks';
import {IApplication} from '@types';
import {isEmpty} from 'lodash';

function List() {
  const {getList, loading, data} = useGetList<IApplication>('applications');
  const {page, limit} = useFilter({limit: 10, page: 1});
  useEffect(() => {
    getList({
      page,
      limit,
    });
  }, [page, limit]);

  return (
    <UI.Box minH="89vh">
      {loading ? (
        <UI.Center minH="300px">
          <UI.Spinner size="lg" color="ste.red" />
        </UI.Center>
      ) : isEmpty(data?.records) ? (
        <UI.Center>
          <UI.Image src="https://i.imgur.com/nvdeBu8.png" />
          <UI.Text>No data</UI.Text>
        </UI.Center>
      ) : (
        <ContentView
          data={data?.records}
          limit={limit}
          totalCount={data?.total}
          currentPage={page}
          linkAddNew="/home/content-management/line-of-business/add-new"
          linkToChild="/home/content-management/line-of-product"
          name="Content Management - Line of Business"
        />
      )}
    </UI.Box>
  );
}

export default List;
