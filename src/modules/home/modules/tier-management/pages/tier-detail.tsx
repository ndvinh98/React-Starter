import React, {useEffect, memo} from 'react';
import * as UI from '@chakra-ui/react';
import {IApplication} from '@types';
import {useRouterController} from '@modules/router';
import {useGetItem, useRouter, useGetList} from '@utils/hooks';
import LoadingComponent from '@components/LoadingComponent';

import {BsArrowLeft, BsDot} from 'react-icons/bs';

function TierDetail() {
  const {params} = useRouterController();
  const {push} = useRouter();
  const {getItem, loading} = useGetItem(`/tiers/${params?.id}`);

  const {
    getList: getListApplication,
    data: dataApplication,
    loading: loadingApplication,
  } = useGetList<IApplication>(`/applications`);

  useEffect(() => {
    if (params?.id) {
      getItem();
    }
  }, [params]);

  useEffect(() => {
    getListApplication();
  }, []);

  return (
    <UI.Box py={5} px={7} minH="90vh">
      <LoadingComponent isLoading={loading}>
        <UI.HStack
          w="full"
          _hover={{cursor: 'pointer'}}
          onClick={() => push('/home/tier-management')}>
          <BsArrowLeft size={20} />
          <UI.Text fontSize={'14px'}>Back</UI.Text>
        </UI.HStack>
        <UI.Text fontSize="24px" fontWeight="bold">
          Silver - Perimeter Intrusion Detection System
        </UI.Text>
        <UI.Box w="70%" mt={3} bg="white" p={3} shadow="sm">
          <UI.VStack w="full" alignItems="flex-start">
            <UI.Text
              fontWeight="semibold"
              fontSize="18px"
              px={2}
              py={1}
              w="full"
              bg="#EEEEEC">
              Access
            </UI.Text>
          </UI.VStack>
          <LoadingComponent
            length={dataApplication?.records?.length}
            isLoading={loadingApplication}>
            <UI.Accordion defaultIndex={[0]} allowMultiple>
              {dataApplication?.records.map((x) => (
                <UI.AccordionItem key={x?.id}>
                  <UI.AccordionButton>
                    <UI.Box
                      fontWeight="semibold"
                      fontSize="16px"
                      flex="1"
                      textAlign="left">
                      {x?.name}
                    </UI.Box>
                    <UI.AccordionIcon />
                    <UI.Center ml={3} w="20px">
                      <UI.Checkbox size="md" />
                    </UI.Center>
                  </UI.AccordionButton>

                  <UI.AccordionPanel position="relative" p={0}>
                    <CategoriesAccordion idApplication={x?.id} />
                  </UI.AccordionPanel>
                </UI.AccordionItem>
              ))}
            </UI.Accordion>
          </LoadingComponent>
        </UI.Box>
      </LoadingComponent>
    </UI.Box>
  );
}

const CategoriesAccordion = memo(({idApplication}: any) => {
  const {getList, loading, data} = useGetList(`/categories`);
  useEffect(() => {
    getList({
      filter: JSON.stringify([{application: idApplication}]),
      limit: 1000,
    });
  }, []);

  return (
    <LoadingComponent isLoading={loading} length={data?.records?.length}>
      <UI.Accordion position="relative" defaultIndex={[0]} allowMultiple>
        <UI.Box
          bottom="0px"
          left="25px"
          position="absolute"
          width="1px"
          height="100%"
          bg="#B1B8C2"
        />
        {data?.records?.map((x, i) => (
          <CategoriesItem
            key={x?.id}
            item={x}
            index={i}
            length={data?.records?.length}
          />
        ))}
      </UI.Accordion>
    </LoadingComponent>
  );
});

const CategoriesItem = memo(({item, length, index}: any) => {
  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <UI.AccordionItem border="none">
      <UI.AccordionButton
        _hover={{background: 'none', fontWeight: 'bold'}}
        position="relative">
        <UI.Box
          left="25px"
          position="absolute"
          width="15px"
          height="1px"
          bg="#B1B8C2"
        />
        {index + 1 === length && (
          <UI.Box
            left="22px"
            position="absolute"
            width="5px"
            height="19px"
            bg="white"
            bottom={0}
          />
        )}
        <UI.Box pl={7} fontSize="16px" flex="1" textAlign="left">
          {item?.name}
        </UI.Box>
        <UI.AccordionIcon />
        <UI.Center ml={3} w="20px">
          <UI.Checkbox
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={(e) =>
              setCheckedItems([e.target.checked, e.target.checked])
            }
          />
        </UI.Center>
      </UI.AccordionButton>
      <UI.AccordionPanel position="relative">
        {index + 1 === length && (
          <UI.Box
            left="23px"
            bottom="0px"
            position="absolute"
            width="5px"
            height="100%"
            bg="white"
          />
        )}
        <GroupingsList
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          categorieId={item?.id}
        />
      </UI.AccordionPanel>
    </UI.AccordionItem>
  );
});

const GroupingsList = memo(
  ({categorieId, checkedItems, setCheckedItems}: any) => {
    const {getList, loading, data} = useGetList(`/groupings`);
    useEffect(() => {
      getList({
        filter: JSON.stringify([{category: categorieId}]),
        limit: 1000,
      });
    }, []);

    return (
      <LoadingComponent isLoading={loading} length={data?.records?.length}>
        <UI.VStack position="relative" alignItems="flex-start" w="full" pl={7}>
          {data?.records?.map((x, i) => (
            <UI.HStack w="full" justifyContent="space-between" key={x?.id}>
              <UI.HStack color="#6C6F84">
                <BsDot fontSize="29px" />
                <UI.Text>{x?.name}</UI.Text>
              </UI.HStack>
              <UI.Checkbox
                isChecked={checkedItems[i]}
                onChange={(e) =>
                  setCheckedItems([checkedItems[i], e.target.checked])
                }
              />
            </UI.HStack>
          ))}
        </UI.VStack>
      </LoadingComponent>
    );
  },
);

export default TierDetail;
