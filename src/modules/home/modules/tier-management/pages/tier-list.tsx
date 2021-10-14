import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';

import {useGetList, useRouter} from '@utils/hooks';
import {ITier} from '@types';
import LoadingComponent from '@components/LoadingComponent';
import {useModalController} from '@modules/modal';

function TierList() {
  const {getList, loading, data} = useGetList<ITier>('/tiers');
  const {push} = useRouter();
  const {openModal} = useModalController();

  useEffect(() => {
    getList({
      limit: 1000,
    });
  }, []);

  return (
    <UI.Box py={6} px={8} minH="90vh">
      <UI.VStack w="full" alignItems="flex-start">
        <UI.Text fontSize="2xl" fontWeight="semibold" w="full">
          Tier Management
        </UI.Text>
        <UI.HStack w="full" alignItems="flex-start">
          <UI.Button
            onClick={() =>
              openModal('addNewTier', {
                cb: () =>
                  getList({
                    limit: 1000,
                  }),
              })
            }>
            Add New Tier
          </UI.Button>
        </UI.HStack>
        <LoadingComponent isLoading={loading} length={data?.records?.length}>
          <UI.VStack pt={3} w="full">
            {data?.records?.map((x) => (
              <UI.Box
                onClick={() => push('/home/tier-management/' + x?.id)}
                cursor="pointer"
                bg="white"
                fontWeight="500"
                shadow="sm"
                py={2}
                px={3}
                w="full"
                key={x?.id}>
                {x?.name}
              </UI.Box>
            ))}
          </UI.VStack>
        </LoadingComponent>
      </UI.VStack>
    </UI.Box>
  );
}

export default TierList;
