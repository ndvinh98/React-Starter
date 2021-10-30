import React, {memo, useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {useGetList} from '@utils/hooks';
import LoadingComponent from '@components/LoadingComponent';

function TierToSale({partnerId}: {partnerId: number}) {
  const {
    data: partnerTierRelationsData,
    loading: partnerTierRelationsLoading,
    getList: getPartnerTierRelations,
  } = useGetList<any>('/partnerTierRelations');

  useEffect(() => {
    if (partnerId)
      getPartnerTierRelations({
        filter: JSON.stringify([{partnerId: +partnerId}]),
        limit: 1000,
        relations: JSON.stringify(['tier', 'partner']),
      });
  }, [partnerId]);

  return (
    <UI.Box shadow="sm" p={5} w="70%" bg="white">
      <LoadingComponent isLoading={partnerTierRelationsLoading}>
        <UI.Text fontSize="18px" fontWeight="bold" bg="#EEEEEC" px={3} py={2}>
          Tier Information
        </UI.Text>

        <UI.HStack spacing={0} my={4} flexWrap="wrap">
          {partnerTierRelationsData?.records?.map((x) => (
            <UI.Box pt={2} key={x?.id} w="full">
              <UI.Tag
                height="45px"
                w="full"
                size="xl"
                bg="white"
                color="#555555"
                borderWidth="1px"
                variant="solid">
                <UI.Text
                  fontSize="18px"
                  fontWeight="400"
                  pl={3}
                  color="#1A1E32">
                  {x?.tier?.name}
                </UI.Text>
              </UI.Tag>
            </UI.Box>
          ))}
        </UI.HStack>
      </LoadingComponent>
    </UI.Box>
  );
}

export default memo(TierToSale);
