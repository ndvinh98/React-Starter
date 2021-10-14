import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import {useRouterController} from '@modules/router';
import {useGetItem, useRouter} from '@utils/hooks';
import LoadingComponent from '@components/LoadingComponent';

function TierDetail() {
  const {params} = useRouterController();
  const {push} = useRouter();
  const {getItem, loading} = useGetItem(`/tiers/${params?.id}`);

  useEffect(() => {
    if (params?.id) {
      getItem();
    }
  }, [params]);

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
        <UI.Box mt={3} bg="white" p={3} shadow="sm">
          <UI.VStack w="full" alignItems="flex-start">
            <UI.Text fontSize="18px" px={2} py={1} w="full" bg="#EEEEEC">
              Access
            </UI.Text>
          </UI.VStack>
          <UI.Accordion defaultIndex={[0]} allowMultiple>
            <UI.AccordionItem>
              <h2>
                <UI.AccordionButton>
                  <UI.Box flex="1" textAlign="left">
                    Section 1 title
                  </UI.Box>
                  <UI.AccordionIcon />
                </UI.AccordionButton>
              </h2>
              <UI.AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </UI.AccordionPanel>
            </UI.AccordionItem>
          </UI.Accordion>
        </UI.Box>
      </LoadingComponent>
    </UI.Box>
  );
}

export default TierDetail;
