import React, {memo, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {AiOutlineAppstore, AiOutlineUnorderedList} from 'react-icons/ai';
import {IoIosAddCircleOutline} from 'react-icons/io';
import {useRouter} from '@utils/hooks';

import Select from '@components/Select';
import Pagination from '@components/Pagination';
import LoadingComponent from '@components/LoadingComponent';

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
  isModulesView?: boolean;
  isVideo?: boolean;
  isBrochures?: boolean;
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
    isLoading,
    linkToChild,
    isModulesView,
    isVideo,
    isBrochures,
  } = props;
  const {push} = useRouter();
  const [showType, setShowType] = useState<'GRID' | 'LIST'>('GRID');

  return (
    <UI.VStack
      //h="88vh"
      alignItems="flex-start"
      justifyContent="space-between"
      w="full">
      <UI.VStack flexGrow={1} w="full" py={5} px={7} alignItems="flex-start">
        <UI.Text fontSize="24px" fontWeight="bold">
          {name}
        </UI.Text>
        <UI.HStack
          w={'full'}
          justifyContent={'space-between'}
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

        {showType === 'GRID' && (
          <UI.SimpleGrid
            w="full"
            templateColumns="repeat(auto-fill, 300px);"
            minChildWidth="300px"
            spacing="40px">
            <LoadingComponent isLoading={isLoading}>
              {!isModulesView &&
                data?.map((x) => (
                  <UI.Box
                    onClick={() => {
                      push(linkToChild);
                    }}
                    bg="white"
                    bgImage={`url(${
                      x?.thumbnailMediaDestination?.replace(' ', '%20') ||
                      x?.mediaDestination
                    })`}
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    cursor="pointer"
                    shadow="sm"
                    height="200px"
                    size="20px"
                    fontWeight="bold"
                    position="relative"
                    key={x?.id}>
                    {isVideo && (
                      <UI.Image
                        //left= {0}
                        position="absolute"
                        zIndex={1}
                        top={'50%'}
                        left={'50%'}
                        transform={'translate(-50%, -50%);'}
                        w="100px"
                        src={'/images/playback.png'}
                      />
                    )}
                    {!isVideo && !isBrochures ? (
                      <UI.Center
                        position="absolute"
                        w="full"
                        height="50px"
                        bg="#000000a7"
                        bottom={0}>
                        <UI.Text color="white">
                          {x?.name || x?.resourceName}
                        </UI.Text>
                      </UI.Center>
                    ) : (
                      <UI.Box
                        position="absolute"
                        w="full"
                        //height="50px"
                        bg="#000000a7"
                        bottom={0}
                        p={2}>
                        <UI.Text color="white">
                          {x?.name || x?.resourceName}
                        </UI.Text>
                        <UI.HStack>
                          <UI.Text color={'white'} fontSize={'12px'}>
                            {isVideo
                              ? x?.videoLength + ' | ' + x?.videoFileType
                              : x?.noOfPages + ' pages | ' + x?.brochureFormat}
                          </UI.Text>
                        </UI.HStack>
                      </UI.Box>
                    )}
                  </UI.Box>
                ))}

              {isModulesView &&
                data?.map((x) => (
                  <UI.Box
                    //onClick={() => {push(linkToChild)}}
                    onClick={() => {
                      push(linkToChild + '/module/' + x?.id);
                    }}
                    //onClick={() => {push(linkToChild+"?mediaType="+x?.mediaType+"&moduleId="+x?.moduleId)}}
                    cursor="pointer"
                    shadow="sm"
                    height="200px"
                    size="20px"
                    borderWidth="2px"
                    key={x?.id}>
                    <UI.VStack
                      h={'full'}
                      w={'full'}
                      justifyContent={'center'}
                      alignItems={'center'}>
                      <UI.Box w={'68px'} h={'68px'} bg={'white'} p={3}>
                        <UI.Image
                          src={
                            x?.thumbnailMediaDestination?.replace(' ', '%20') ||
                            x?.mediaDestination
                          }></UI.Image>
                      </UI.Box>
                      <UI.Text fontWeight={'bold'} color={'#828282'}>
                        {x?.name?.toUpperCase()}
                      </UI.Text>
                    </UI.VStack>
                  </UI.Box>
                ))}
            </LoadingComponent>

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
            <LoadingComponent isLoading={isLoading}>
              {!isModulesView &&
                data?.map((x) => (
                  <UI.HStack
                    onClick={() => {
                      push(linkToChild);
                    }}
                    key={x?.id}
                    cursor="pointer"
                    w="full"
                    borderTopWidth={2}
                    py={5}>
                    <UI.Center
                      bgImage={`url(${
                        x?.thumbnailMediaDestination?.replace(' ', '%20') ||
                        x?.mediaDestination
                      })`}
                      bgSize="cover"
                      bgRepeat="no-repeat"
                      cursor="pointer"
                      mr={3}
                      shadow="md"
                      position="relative"
                      w="90px"
                      h="60px">
                      {isVideo && (
                        <UI.Image
                          //left= {0}
                          position="absolute"
                          zIndex={1}
                          top={'50%'}
                          left={'50%'}
                          transform={'translate(-50%, -50%);'}
                          w="30px"
                          src={'/images/playback.png'}
                        />
                      )}
                    </UI.Center>

                    <UI.VStack alignItems={'start'}>
                      <UI.Text
                        textTransform="uppercase"
                        color="#828282"
                        fontWeight="bold"
                        fontSize="18px">
                        {x?.name || x?.resourceName}
                      </UI.Text>
                      {(isVideo || isBrochures) && (
                        <UI.Text color={'#828282'} fontSize={'12px'}>
                          {isVideo
                            ? x?.videoLength + ' | ' + x?.videoFileType
                            : x?.noOfPages + ' pages | ' + x?.brochureFormat}
                        </UI.Text>
                      )}
                    </UI.VStack>
                  </UI.HStack>
                ))}

              {isModulesView &&
                data?.map((x) => (
                  <UI.HStack
                    //onClick={() => {push(linkToChild)}}
                    onClick={() => {
                      push(linkToChild + '/module/' + x?.id);
                    }}
                    key={x?.id}
                    cursor="pointer"
                    w="full"
                    borderTopWidth={2}
                    py={5}>
                    <UI.Box
                      bg={'white'}
                      cursor="pointer"
                      mr={3}
                      shadow="md"
                      p={4}
                      w="68px"
                      h="68px">
                      <UI.Image
                        src={
                          x?.thumbnailMediaDestination?.replace(' ', '%20') ||
                          x?.mediaDestination
                        }></UI.Image>
                    </UI.Box>
                    <UI.Text
                      textTransform="uppercase"
                      color="#828282"
                      fontWeight="bold"
                      fontSize="18px">
                      {x?.name}
                    </UI.Text>
                  </UI.HStack>
                ))}
            </LoadingComponent>
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
      </UI.VStack>
      <Pagination
        size="sm"
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={limit}
      />
    </UI.VStack>
  );
}

export default memo(ContentView);
