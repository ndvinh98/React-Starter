import React, {useEffect} from 'react';
import {useRouterController} from '@modules/router';
import {useGetItem, useFilter, useGetList} from '@utils/hooks';

import {useRouter} from '@utils/hooks';

import CompanyInfo from '@components/CompanyInfo';
import UserTable from '@components/UserTable';
import TierToParter from '@components/AddTierToParter';

import {IUserManagement} from '@types';
import {
  IPartnerApplicationForms,
  IPartnerManagement,
  IPartnerUser,
} from '@types';
// import {isEmpty} from 'lodash';

import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import SalesTable from '@components/SalesTable';

function CompanyDetail() {
  const {push} = useRouter();
  const {params} = useRouterController();

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

  console.log(dataCompany);

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
        pageUser,
        limit: limitUser,
        relations: JSON.stringify(['domain']),
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

  const handleFilterDataUser = ({textSearch, status, userType}) => {
    setTextSearchUser(textSearch === undefined ? '' : textSearch);
    setFilterUser((filter) => ({
      ...filter,
      status: status === '-1' ? undefined : status,
      userType: userType === '-1' ? undefined : userType,
    }));
  };

  // Import data Sale Manager

  const {
    page: pageSales,
    limit: limitSales,
    setPage: setPageSales,
    textSearch: textSearchSales,
    setTextSearch: setTextSearchSales,
  } = useFilter({
    page: 1,
    limit: 10,
  });
  const {
    data: dataSales,
    getList: getListSales,
    loading: loadingSales,
  } = useGetList<IUserManagement>('/partnerUserRelations');

  useEffect(() => {
    if (params?.id)
      getListSales({
        page: pageSales,
        limit: limitSales,
        relations: JSON.stringify(['user', 'user.userProfiles']),
        filter: JSON.stringify([{partnerId: params?.id}]),

        textSearch: textSearchSales
          ? JSON.stringify([
              {firstName: textSearchSales},
              {email: textSearchSales},
              {lastName: textSearchSales},
            ])
          : undefined,
      });
  }, [pageSales, limitSales, textSearchSales, params]);

  const handleFilterDataSales = ({textSearch}) => {
    setTextSearchSales(textSearch === undefined ? '' : textSearch);
  };

  return (
    <UI.VStack alignItems="flex-start" py={6} px={8} spacing={4} w="full">
      <UI.HStack
        w="full"
        _hover={{cursor: 'pointer'}}
        onClick={() => push('/home/partner-management')}>
        <BsArrowLeft size={20} />
        <UI.Text fontSize={'14px'}>Back</UI.Text>
      </UI.HStack>
      <UI.Text fontSize="2xl" fontWeight="semibold" w="full">
        {dataCompany?.records[0]?.companyName}
        {''} ({dataDomain?.partnerDomain?.domain})
      </UI.Text>
      <CompanyInfo data={dataCompany?.records[0]} loading={loadingCompany} />
      <UserTable
        data={dataUser}
        loading={loadingUser}
        handleFilterDataUser={handleFilterDataUser}
        setPage={setPageUser}
      />
      <SalesTable
        data={dataSales}
        loading={loadingSales}
        handleFilterData={handleFilterDataSales}
        setPage={setPageSales}
      />
      <TierToParter
        companyName={dataCompany?.records[0]?.companyName}
        partnerId={params?.id}
      />
    </UI.VStack>
  );
}

export default CompanyDetail;
