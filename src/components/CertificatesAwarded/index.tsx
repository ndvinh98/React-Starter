import React, {useEffect} from 'react';
import {useGetList} from '@utils/hooks';
import {isEmpty} from 'lodash';
import * as UI from '@chakra-ui/react';
import Certificate from '@components/Certificate';
import {ICertificates} from 'types';

import UpLoadCertificates from '@components/UpLoadCertificates';

const CertificateAwarded = ({partnerUserId, profileData}) => {
  const {loading, getList, data} = useGetList<ICertificates>(
    '/partnerUserCertificates',
  );

  const hanldeLoadData = () => {
    getList({
      relations: JSON.stringify(['partnerUser']),
      filter: JSON.stringify([{partnerUser: {id: partnerUserId}}]),
    });
  };

  useEffect(() => {
    if (partnerUserId) {
      hanldeLoadData();
    }
  }, [partnerUserId]);

  return (
    <UI.Box bgColor={'white'} borderRadius="md" mt={4} w="full" pt={5}>
      <UpLoadCertificates
        onUploadDone={() => hanldeLoadData()}
        partnerUserId={profileData?.id}
      />
      <UI.Box w="full" bgColor={'#FFFFFF'} py={6} px={8} spacing={4}>
        <UI.Text bgColor={'#EEEEEC'} p={3} fontSize="lg" fontWeight="600">
          Certificates Awarded
        </UI.Text>
        {loading ? (
          <UI.Center minH="300px">
            <UI.Spinner size="lg" color="ste.red" />
          </UI.Center>
        ) : isEmpty(data?.records) ? (
          <UI.Center>
            <UI.Image src="" />
            <UI.Text>No data</UI.Text>
          </UI.Center>
        ) : (
          <UI.SimpleGrid columns={2} spacingX="40px" spacingY="20px" pt={5}>
            {data?.records.map((x) => (
              <Certificate key={x?.id} data={x} getList={hanldeLoadData} />
            ))}
          </UI.SimpleGrid>
        )}
      </UI.Box>
    </UI.Box>
  );
};

export default CertificateAwarded;
