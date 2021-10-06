import React, {useEffect} from 'react';
import {useRouterController} from '@modules/router';
import {useGetItem} from '@utils/hooks';

import {useRouter} from '@utils/hooks';

import CompanyInfo from '@components/CompanyInfo';
import UserTable from '@components/UserTable';

import {IPartnerApplicationForms} from '@types';

import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import SalesTable from '@components/SalesTable';

function CompanyDetail() {
  const {push} = useRouter();
  const {params} = useRouterController();
  const {
    getItem,
    data: dataCompany,
    loading: loadingCompany,
  } = useGetItem<IPartnerApplicationForms>(`/partnerApplicationForms/${35}`);

  useEffect(() => {
    if (1)
      getItem({
        relations: JSON.stringify(['partnerApplicationSubmission']),
      });
  }, [params]);
  return (
    <UI.VStack py={6} px={8} spacing={4} w="full">
      <UI.HStack
        w="full"
        _hover={{cursor: 'pointer'}}
        onClick={() => push('/home/partner-management')}>
        <BsArrowLeft size={20} />
        <UI.Text fontSize={'14px'}>Back</UI.Text>
      </UI.HStack>
      <UI.Text fontSize="2xl" fontWeight="semibold" w="full">
        Name Company
      </UI.Text>
      <CompanyInfo data={dataCompany} loading={loadingCompany} />
      <UserTable />
      <SalesTable />
    </UI.VStack>
  );
}

export default CompanyDetail;
