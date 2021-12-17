import React, {useEffect} from 'react';
import {useRouterController} from '@modules/router';
import {useGetItem, useFilter, useGetList} from '@utils/hooks';
import {format} from 'date-fns';

import {useRouter} from '@utils/hooks';

import CompanyInfo from '@components/CompanyInfo';

import {
  IPartnerApplicationForms,
  IPartnerManagement,
  IPartnerUser,
} from '@types';
// import {isEmpty} from 'lodash';

import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import UserTableSale from '@components/UserTableSale';
import TierToSale from '@components/TierToSale';

function CompanyDetail() {
  const {push} = useRouter();
  const {params} = useRouterController();

  const STATUS_STRING = {
    1: 'Active',
    0: 'Inactive',
  };

  /// get Info Company
  const {
    getList: getItemPartner,
    data: dataCompany,
    loading: loadingCompany,
  } = useGetList<IPartnerApplicationForms>(`/partnerApplicationForms`);

  useEffect(() => {
    if (params?.id)
      getItemPartner({
        filter: JSON.stringify([
          {
            partnerApplicationSubmission: {partnerId: params?.id},
          },
        ]),
        relations: JSON.stringify([
          'partnerApplicationSubmission',
          'partnerApplicationAttachments',
        ]),
      });
  }, [params]);

  const {getItem: getItemDomain, data: dataDomain} =
    useGetItem<IPartnerManagement>(`/partners/${params?.id}`);

  useEffect(() => {
    if (params?.id)
      getItemDomain({
        relations: JSON.stringify(['partnerDomain']),
      });
  }, [params]);

  //import data User

  const {
    page: pageUser,
    limit: limitUser,
    setPage: setPageUser,
    textSearch: textSearchUser,
    setTextSearch: setTextSearchUser,
    filter: filterUser,
    setFilter: setFilterUser,
  } = useFilter({
    page: 1,
    limit: 10,
  });
  const {
    data: dataUser,
    getList: getListUser,
    loading: loadingUser,
  } = useGetList<IPartnerUser>('/partnerUsers');

  useEffect(() => {
    if (dataDomain)
      getListUser({
        page: pageUser,
        limit: limitUser,
        relations: JSON.stringify(['domain', 'partnerUserProfiles']),
        filter: JSON.stringify([
          {
            ...filterUser,
            domain: {id: dataDomain?.partnerDomain?.id},
          },
        ]),
        textSearch: textSearchUser
          ? JSON.stringify([
              {firstName: textSearchUser},
              {email: textSearchUser},
              {lastName: textSearchUser},
            ])
          : undefined,
      });
  }, [pageUser, limitUser, textSearchUser, filterUser, dataDomain]);

  const handleFilterDataUser = (
    {textSearch, status, userType},
    fieldChange,
  ) => {
    if (fieldChange.name === 'textSearch') {
      if (textSearch && textSearch.length < 3) return;

      setTextSearchUser(textSearch);
    }

    if (['status', 'userType'].includes(fieldChange.name)) {
      setFilterUser((filterUser) => ({
        ...filterUser,
        isActive: status === '-1' ? undefined : status,
        userType: userType === '-1' ? undefined : userType,
      }));
    }
  };

  return (
    <UI.VStack alignItems="flex-start" py={6} px={8} spacing={4} w="full">
      <UI.HStack
        w="full"
        _hover={{cursor: 'pointer'}}
        onClick={() => push('/home/partner-information')}>
        <BsArrowLeft size={20} />
        <UI.Text fontSize={'14px'}>Back</UI.Text>
      </UI.HStack>
      <UI.Text fontSize="2xl" fontWeight="semibold" w="full">
        {dataCompany?.records[0]?.companyName}
        {''} ({dataDomain?.partnerDomain?.domain})
      </UI.Text>

      <UI.Box bgColor={'white'} px={4} py={4} borderRadius="md" mt={4} w="full">
        <UI.Table variant="simple">
          <UI.Thead>
            <UI.Tr bgColor={'#EEEEEC'}>
              <UI.Th>Company</UI.Th>
              <UI.Th>Status</UI.Th>
              <UI.Th>Registered Date</UI.Th>
              <UI.Th>Start Date</UI.Th>
              <UI.Th>Validity Date</UI.Th>
            </UI.Tr>
          </UI.Thead>
          <UI.Tbody>
            <UI.Tr>
              <UI.Td>{dataDomain?.companyName}</UI.Td>
              <UI.Td>{STATUS_STRING[dataDomain?.isActive]}</UI.Td>
              <UI.Td>
                {dataDomain?.createdAt
                  ? format(new Date(dataDomain?.createdAt), 'dd MMM yyyy')
                  : false}
              </UI.Td>
              <UI.Td>
                {dataDomain?.startDate
                  ? format(new Date(dataDomain?.startDate), 'dd MMM yyyy')
                  : false}
              </UI.Td>
              <UI.Td>
                {dataDomain?.expiryDate
                  ? format(new Date(dataDomain?.expiryDate), 'dd MMM yyyy')
                  : false}
              </UI.Td>
            </UI.Tr>
          </UI.Tbody>
        </UI.Table>
      </UI.Box>
      <CompanyInfo data={dataCompany?.records[0]} loading={loadingCompany} />
      <UserTableSale
        data={dataUser}
        loading={loadingUser}
        handleFilterDataUser={handleFilterDataUser}
        setPage={setPageUser}
        companyName={dataCompany?.records[0]?.companyName}
        getList={getListUser}
      />

      <TierToSale partnerId={params?.id} />
    </UI.VStack>
  );
}

export default CompanyDetail;
