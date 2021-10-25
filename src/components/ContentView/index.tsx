import React, {memo, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {AiOutlineAppstore, AiOutlineUnorderedList} from 'react-icons/ai';
import {IoIosAddCircleOutline} from 'react-icons/io';
import {useRouter} from '@utils/hooks';
import {ChevronDownIcon} from '@chakra-ui/icons';
import {useContentManagementController} from '@modules/home/admin-modules/content-management';
import {useRouterController} from '@modules/router';

import Select from '@components/Select';
import Pagination from '@components/Pagination';
import LoadingComponent from '@components/LoadingComponent';

import NormalGridItem from './item/NormalGridItem';
import ModuleGridItem from './item/ModuleGridItem';
import NormalListItem from './item/NormalListItem';
import ModuleListItem from './item/ModuleListItem';
import {isEmpty} from 'lodash';
import {useModalController} from '@modules/modal';

export interface IContentView {
  name?: string;
  data?: any[];
  cb?: () => void;
  totalCounter?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  isLoading?: boolean;
  filterBar?: React.ReactNode;
  filterBarWidth?: string;
  totalCount?: number;
  limit?: number;
  currentPage?: number;
  linkAddNew?: string;
  linkToChild?: string;
  linkDeleteContent?: string;
  isModulesView?: boolean;
  isVideo?: boolean;
  isBrochures?: boolean;
  onReloadPage?: () => void;
}

function ContentView(props: IContentView) {
  const {
    name,
    filterBar,
    filterBarWidth,
    data,
    limit,
    totalCount,
    currentPage,
    linkAddNew,
    linkToChild,
    isModulesView,
    isVideo,
    isBrochures,
    linkDeleteContent,
    onLimitChange,
    onPageChange,
    isLoading,
    onReloadPage,
  } = props;
  const {push} = useRouter();
  const [showType, setShowType] = useState<'GRID' | 'LIST'>('GRID');
  const itemSelected = useContentManagementController((s) => s.itemSelected);

  const clear = useContentManagementController((s) => s.clear);
  const {openModal} = useModalController();
  const pathname = useRouterController((s) => s.pathname);

  React.useEffect(() => {
    if (pathname) clear();
  }, [pathname]);

  return (
    <UI.VStack
      //h="88vh"
      alignItems="flex-start"
      justifyContent="space-between"
      w="full">
      <UI.VStack flexGrow={1} w="full" py={5} px={7} alignItems="flex-start">
        <UI.Text fontSize="24px" fontWeight="bold">
          {name ? 'Content Management - ' + name : 'Content Management'}
        </UI.Text>
        <UI.HStack
          w={'full'}
          justifyContent={'space-between'}
          alignItems="flex-start">
          <UI.HStack
            w={'full'}
            justifyContent={'space-between'}
            alignItems="center"
            spacingY={'20px'}
            spacingX={'0px'}
            flexWrap="wrap"
            pb={5}>
            {filterBar && (
              <UI.Box w={filterBarWidth ? filterBarWidth : '300px'}>
                {filterBar}
              </UI.Box>
            )}
            <UI.HStack>
              <UI.Text>View Item</UI.Text>
              <UI.Box w="80px">
                <Select
                  defaultValue={{label: '10', value: 10}}
                  isClearable={false}
                  options={[
                    {label: '10', value: 10},
                    {label: '15', value: 15},
                    {label: '20', value: 20},
                  ]}
                  onChangeValue={(data) => onLimitChange(data?.value)}
                />
              </UI.Box>
              <UI.Center
                onClick={() => {
                  setShowType('GRID');
                }}
                cursor="pointer"
                pl={1}>
                <AiOutlineAppstore
                  color={showType === 'GRID' ? '#D94645' : '#ADADAD'}
                  fontSize="26px"
                />
              </UI.Center>
              <UI.Center
                onClick={() => {
                  setShowType('LIST');
                }}
                cursor="pointer"
                px={1}>
                <AiOutlineUnorderedList
                  color={showType === 'LIST' ? '#D94645' : '#ADADAD'}
                  fontSize="26px"
                />
              </UI.Center>
            </UI.HStack>
          </UI.HStack>
          <UI.Box position="relative">
            <UI.Menu isOpen={isEmpty(itemSelected) ? false : undefined}>
              <UI.MenuButton
                cursor={isEmpty(itemSelected) ? 'no-drop' : 'pointer'}>
                <UI.HStack borderRadius="md" bg="ste.red" px={3} py={2}>
                  <UI.Checkbox isChecked={!isEmpty(itemSelected)} size="lg" />
                  <ChevronDownIcon color="white" />
                </UI.HStack>
              </UI.MenuButton>
              <UI.MenuList zIndex={999}>
                <UI.MenuItem
                  onClick={() => {
                    if (isVideo) {
                      push(
                        `videos/edit/${itemSelected?.[0]?.id}`,
                      );
                    } else if (isBrochures) {
                      push(
                        `brochures/edit/${itemSelected?.[0]?.id}`,
                      );
                    } else {
                      push(`${pathname}/detail/${itemSelected?.[0]?.id}`);
                    }
                  }}
                  isDisabled={itemSelected.length > 1}
                  color="ste.red">
                  <UI.Text mr="5px">Edit</UI.Text>
                  {itemSelected.length > 1 && (
                    <UI.Text fontSize="12px" color="gray.500">
                      (Only one item can be edited)
                    </UI.Text>
                  )}
                </UI.MenuItem>
                <UI.MenuItem
                  onClick={() => {
                    openModal('deleteContent', {
                      name,
                      url: linkDeleteContent,
                      isResources: isVideo || isBrochures,
                      cb: () => onReloadPage?.(),
                    });
                  }}
                  color="ste.red">
                  Delete
                </UI.MenuItem>
              </UI.MenuList>
            </UI.Menu>
          </UI.Box>
        </UI.HStack>
        <LoadingComponent isLoading={isLoading}>
          {showType === 'GRID' && (
            <UI.SimpleGrid
              w="full"
              templateColumns="repeat(auto-fill, 300px);"
              minChildWidth="300px"
              spacing="40px">
              {!isModulesView &&
                data?.map((item) => (
                  <NormalGridItem
                    key={item?.id}
                    isBrochures={isBrochures}
                    isVideo={isVideo}
                    item={item}
                    linkToChild={linkToChild + '?parentId=' + item?.id}
                  />
                ))}

              {isModulesView &&
                data?.map((x) => (
                  <ModuleGridItem
                    item={x}
                    key={x?.id}
                    linkToChild={linkToChild}
                  />
                ))}

              <UI.Center
                cursor="pointer"
                onClick={() => push(linkAddNew)}
                bg="white"
                shadow="md"
                height="200px">
                <UI.Box>
                  <IoIosAddCircleOutline fontSize="80px" color="#828282" />
                  <UI.Text
                    color="#828282"
                    fontWeight="bold"
                    fontSize="18px"
                    mt={3}>
                    ADD NEW
                  </UI.Text>
                </UI.Box>
              </UI.Center>
            </UI.SimpleGrid>
          )}
          {showType === 'LIST' && (
            <UI.VStack w="full">
              {!isModulesView &&
                data?.map((x) => (
                  <NormalListItem
                    item={x}
                    key={x?.id}
                    isBrochures={isBrochures}
                    isVideo={isVideo}
                    linkToChild={linkToChild + '?parentId=' + x?.id}
                  />
                ))}

              {isModulesView &&
                data?.map((x) => (
                  <ModuleListItem
                    item={x}
                    linkToChild={linkToChild}
                    key={x?.id}
                  />
                ))}
              <UI.HStack
                onClick={() => push(linkAddNew)}
                cursor="pointer"
                w="full"
                borderTopWidth={2}
                py={5}>
                <UI.Center mr={3} shadow="md" bg="white" w="90px" h="60px">
                  <IoIosAddCircleOutline fontSize="32px" color="#828282" />
                </UI.Center>
                <UI.Text color="#828282" fontWeight="bold" fontSize="18px">
                  ADD NEW
                </UI.Text>
              </UI.HStack>
            </UI.VStack>
          )}
        </LoadingComponent>
      </UI.VStack>
      <Pagination
        size="sm"
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={limit}
        onChangePage={onPageChange}
      />
    </UI.VStack>
  );
}

export default memo(ContentView);
