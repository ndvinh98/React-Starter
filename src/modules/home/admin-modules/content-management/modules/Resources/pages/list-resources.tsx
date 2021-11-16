import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import ContentView from '@components/ContentView';
import FormGenerate from '@components/FormGenerate';
import {useGetList, useFilter, useRouter} from '@utils/hooks';
import {useRouterController} from '@modules/router';
import {BsArrowLeft} from 'react-icons/bs';

function List() {
  const {push} = useRouter();
  const {page, limit, setPage, setLimit, textSearch, setTextSearch} = useFilter(
    {limit: 10, page: 1},
  );
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
      getListResources({
        page,
        limit,
        relations: JSON.stringify([
          'productModule',
          // 'productModule.grouping',
          // 'productModule.grouping.category',
          // 'productModule.grouping.category.application',
        ]),
        filter: JSON.stringify([{productModuleId: params?.id}]),
        textSearch: textSearch
          ? JSON.stringify([{resourceName: textSearch}])
          : undefined,
      });
      getListModules({
        filter: JSON.stringify([{id: params?.id}]),
        relations: JSON.stringify([
          'product',
          'product.grouping',
          'product.grouping.category',
          'product.grouping.category.application',
        ]),
      });
    }
  }, [page, limit, textSearch, params]);

  const handleOnChange = ({textSearch}) => {
    if (textSearch !== undefined) setTextSearch(textSearch as string);
  };

  return (
    <UI.Box minH="89vh">
      <UI.HStack
        mt={4}
        ml={8}
        w="full"
        _hover={{cursor: 'pointer'}}
        onClick={() =>
          push(
            `/home/content-management/modules?productId=${modulesData?.records?.[0]?.product?.id}&productGroup=${modulesData?.records?.[0]?.product?.grouping?.id}&lineOfProduct=${modulesData?.records?.[0]?.product?.grouping?.category?.id}&lineOfBusiness=${modulesData?.records?.[0]?.product?.grouping?.category?.application?.id}`,
          )
        }>
        <BsArrowLeft size={20} />
        <UI.Text fontSize={'14px'}>Back</UI.Text>
      </UI.HStack>
      <ContentView
        onReloadPage={() => location.reload()}
        data={resourcesData?.records}
        isLoading={loading}
        limit={limit}
        isVideo={
          modulesData?.records?.[0]?.mediaType == 'VIDEOS' ? true : false
        }
        isBrochures={
          modulesData?.records?.[0]?.mediaType == 'VIDEOS' ? false : true
        }
        totalCount={resourcesData?.total}
        currentPage={page}
        onPageChange={setPage}
        onLimitChange={setLimit}
        filterBar={
          <FormGenerate
            onChangeValue={handleOnChange}
            gap="10px"
            w="60vw"
            fields={[
              {
                name: 'textSearch',
                type: 'input',
                size: 'md',
                colSpan: 3,
                placeholder: 'Search...',
              },
            ]}
          />
        }
        name={modulesData?.records?.[0]?.name}
        linkDeleteContent="/productModuleResources"
        linkAddNew={
          modulesData?.records?.[0]?.mediaType == 'VIDEOS'
            ? '/home/content-management/resources/add-videos/module/' +
              modulesData?.records?.[0]?.id
            : '/home/content-management/resources/add-brochures/module/' +
              modulesData?.records?.[0]?.id
        }
      />
    </UI.Box>
  );
}

export default List;
