import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter} from '@utils/hooks';
import {useRouterController} from '@modules/router';
import LoadingComponent from '@components/LoadingComponent';

function List() {
  const {page, limit, filter, setFilter} = useFilter({limit: 10, page: 1});
  const {params} = useRouterController();
  const {getList: getListResources, data: resourcesData} = useGetList(
    'productModuleResources',
  );
  const {getList: getListModules, data: modulesData, loading} = useGetList('productModules');
  

  useEffect(() => {
    if (params?.id) {
      setFilter(params?.id);
    }
  }, [params]);

  useEffect(() => {
    if (params?.id){
      getListResources({
        page,
        limit,
        relations: JSON.stringify(['productModule']),
        filter: filter
          ? JSON.stringify([{productModuleId: filter}])
          : undefined,
      });
      getListModules({
        filter: JSON.stringify([{id: params?.id}])
      });
    }
  }, [page, limit, filter]);

  return (
    
    <UI.Box minH="89vh">
      <LoadingComponent isLoading={loading}>
      <ContentView
        data={resourcesData?.records}
        limit={limit}
        totalCount={resourcesData?.total}
        currentPage={page}
        filterBar={
          <FormGenerate
            //onChangeValue={handleOnChange}
            gap="10px"
            w="60vw"
            mb={4}
            fields={[
              {
                name: 'search',
                type: 'input',
                size: 'md',
                colSpan: 3,
                placeholder: 'Search...',
              },
            ]}
          />
        }
        name={
          'Content Management - ' +
          modulesData?.records?.[0]?.name 
        }
        linkAddNew={
          modulesData?.records?.[0]?.mediaType == 'VIDEOS'
            ? '/home/content-management/modules/add-new-video'
            : '/home/content-management/modules/add-new-document'
        }
      />
      </LoadingComponent>
    </UI.Box>
  );
}

export default List;
