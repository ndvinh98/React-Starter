import React, {memo, useEffect, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {useGetList, usePost} from '@utils/hooks';
import LoadingComponent from '@components/LoadingComponent';
import Select from '@components/Select';
import {useModalController} from '@modules/modal';

import {ITier} from '@types';
import TierDetail from './TierDetail';

function AddTierToParter({
  partnerId,
  companyName,
}: {
  partnerId: number;
  companyName: string;
}) {
  const {openModal} = useModalController();

  const {data, loading, getList} = useGetList<ITier>('/tiers');
  const {
    data: partnerTierRelationsData,
    loading: partnerTierRelationsLoading,
    getList: getPartnerTierRelations,
  } = useGetList<any>('/partnerTierRelations');

  const [key, setKey] = useState(1);

  const {post, data: partnerTierRelationsPostData} = usePost(
    '/partnerTierRelations',
  );
  const [tierIdSelected, setTierIdSelected] = useState('');

  useEffect(() => {
    getList({limit: 1000});
    getPartnerTierRelations({
      filter: JSON.stringify([{partnerId: +partnerId}]),
      limit: 1000,
      relations: JSON.stringify(['tier']),
    });
  }, [partnerId]);

  useEffect(() => {
    if (partnerTierRelationsPostData) {
      getPartnerTierRelations({
        filter: JSON.stringify([{partnerId: +partnerId}]),
        relations: JSON.stringify(['tier']),
        limit: 1000,
      });
      setKey(key + 1);
    }
  }, [partnerTierRelationsPostData]);

  return (
    <UI.Box shadow="sm" p={5} w="70%" bg="white">
      <LoadingComponent isLoading={loading || partnerTierRelationsLoading}>
        <UI.Text fontSize="18px" fontWeight="bold" bg="#EEEEEC" px={3} py={2}>
          Tier Management
        </UI.Text>
        <UI.HStack justifyContent="space-between" mt={3}>
          <UI.Box w="90%">
            <Select
              name="tierId"
              placeholder="Select Tier"
              onChangeValue={(tierId) => {
                setTierIdSelected(tierId?.value);
              }}
              options={data?.records?.map((x) => ({
                label: x?.name,
                value: x?.id,
              }))}
            />
          </UI.Box>
          <UI.Button
            isDisabled={!tierIdSelected}
            onClick={() => post({partnerId, tierId: tierIdSelected})}>
            Add
          </UI.Button>
        </UI.HStack>
        <UI.HStack spacing={0} mt={2} flexWrap="wrap">
          {partnerTierRelationsData?.records?.map((x) => (
            <UI.Box pt={2} pl={2} key={x?.id}>
              <UI.Tag
                size="md"
                borderRadius="full"
                bg="white"
                color="#555555"
                borderWidth="1px"
                variant="solid">
                <UI.Text>{x?.tier?.name}</UI.Text>
                <UI.TagCloseButton
                  onClick={() =>
                    openModal('removeTier', {
                      companyName,
                      id: x?.id,
                      cb: () => {
                        getPartnerTierRelations({
                          filter: JSON.stringify([{partnerId: +partnerId}]),
                          relations: JSON.stringify(['tier']),
                          limit: 1000,
                        });
                        setKey(key + 1);
                      },
                    })
                  }
                />
              </UI.Tag>
            </UI.Box>
          ))}
          <TierDetail key={key} partnerId={partnerId} />
        </UI.HStack>
      </LoadingComponent>
    </UI.Box>
  );
}

export default memo(AddTierToParter);
