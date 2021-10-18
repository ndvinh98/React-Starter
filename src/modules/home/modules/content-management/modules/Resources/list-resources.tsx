import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter, useRouter} from '@utils/hooks';
import {useRouterController} from '@modules/router';
import LoadingComponent from '@components/LoadingComponent';
import {BsArrowLeft} from 'react-icons/bs';

function List() {
  const {push} = useRouter();
  const {page, limit, filter, setFilter} = useFilter({limit: 10, page: 1});
  const {params} = useRouterController();
  const {getList: getListResources, data: resourcesData} = useGetList(
    'productModuleResources',
  );
  const {
    getList: getListModules,
    data: modulesData,
    loading,
  } = useGetList('productModules');

  useEffect(() => {
    if (params?.id) {
      setFilter(params?.id);
    }
  }, [params]);

  useEffect(() => {
    if (params?.id) {
      getListResources({
        page,
        limit,
        relations: JSON.stringify(['productModule']),
        filter: filter
          ? JSON.stringify([{productModuleId: filter}])
          : undefined,
      });
      getListModules({
        filter: JSON.stringify([{id: params?.id}]),
      });
    }
  }, [page, limit, filter]);

  return (
    <UI.Box minH="89vh">
      <LoadingComponent isLoading={loading}>
        <UI.HStack
          mt={4}
          ml={8}
          w="full"
          _hover={{cursor: 'pointer'}}
          onClick={() => push('/home/content-management/modules')}>
          <BsArrowLeft size={20} />
          <UI.Text fontSize={'14px'}>Back</UI.Text>
        </UI.HStack>
        <ContentView
          data={resourcesData?.records}
          limit={limit}
          isVideo={
            modulesData?.records?.[0]?.mediaType == 'VIDEOS' ? true : false
          }
          isBrochures={
            modulesData?.records?.[0]?.mediaType == 'VIDEOS' ? false : true
          }
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
          name={modulesData?.records?.[0]?.name}
          linkDeleteContent="/productModuleResources/"
          linkAddNew={
            modulesData?.records?.[0]?.mediaType == 'VIDEOS'
              ? '/home/content-management/resources/add-videos/module/' +
                modulesData?.records?.[0]?.id
              : '/home/content-management/resources/add-brochures/module/' +
                modulesData?.records?.[0]?.id
          }
        />
      </LoadingComponent>
    </UI.Box>
  );
}

export default List;
