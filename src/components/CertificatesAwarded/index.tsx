import React, {useEffect} from 'react';
import {useRouter, useGetList} from '@utils/hooks';
import {isEmpty} from 'lodash';
import {useRouterController} from '@modules/router';
import * as UI from '@chakra-ui/react';
import Certificate from '@components/Certificate';
import {ICertificates} from 'types';

const CertificateAwarded = ({partnerUserId}) => {
  const {loading, getList, data} = useGetList<ICertificates>(
    '/partnerUserCertificates',
  );

  const toast = UI.useToast();

  useEffect(() => {
    if (partnerUserId) {
      getList({
        relations: JSON.stringify(['partnerUser']),
        filter: JSON.stringify([{partnerUser: {id: partnerUserId}}]),
      });
    }
  }, [partnerUserId]);

  return (
    <UI.Box w="full" bgColor={'#FFFFFF'}>
      <UI.Text bgColor={'#EEEEEC'} p={3} fontSize="lg" fontWeight="600">
        {' '}
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
        <>
          {data?.records.map((x) => (
            <Certificate key={x?.id} data={x} />
          ))}
        </>
      )}
    </UI.Box>
  );
};

export default CertificateAwarded;
