import React, {useEffect} from 'react';

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
import {isEmpty} from '@chakra-ui/utils';
import {useCurrentRoute} from 'react-navi';

function CompanyDetail() {
  const {lastChunk} = useCurrentRoute();
  console.log(lastChunk?.request?.params?.companyId);
  const {push} = useRouter();

  /// get Info Company
  const {
    getList: getItemPartner,
    data: dataCompany,
    loading: loadingCompany,
  } = useGetList<IPartnerApplicationForms>(`/partnerApplicationForms`);

  useEffect(() => {
    getItemPartner({
      filter: JSON.stringify([
        {
          partnerApplicationSubmission: {
            partnerId: lastChunk?.request?.params?.companyId,
          },
        },
      ]),
      relations: JSON.stringify([
        'partnerApplicationSubmission',
        'partnerApplicationAttachments',
      ]),
    });
  }, []);

  const {
    getItem: getItemDomain,
    data: dataDomain,
    loading: loadingDomain,
  } = useGetItem<IPartnerManagement>(
    `/partners/${lastChunk?.request?.params?.companyId}`,
  );

  useEffect(() => {
    getItemDomain({
      relations: JSON.stringify(['partnerDomain']),
    });
  }, []);

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
    if (dataDomain) hanldeGetListUser();
  }, [pageUser, limitUser, textSearchUser, filterUser, dataDomain]);

  const hanldeGetListUser = () =>
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
        isActive: status?.value === '-1' ? undefined : status?.value,
        userType: userType?.value === '-1' ? undefined : userType?.value,
      }));
    }
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
    handleGetListSale();
  }, [pageSales, limitSales, textSearchSales]);

  const handleGetListSale = () => {
    getListSales({
      page: pageSales,
      limit: limitSales,
      relations: JSON.stringify(['user', 'user.userProfiles']),
      filter: JSON.stringify([
        {partnerId: lastChunk?.request?.params?.companyId},
      ]),

      textSearch: textSearchSales
        ? JSON.stringify([
            {user: {firstName: textSearchSales}},
            {user: {email: textSearchSales}},
            {user: {lastName: textSearchSales}},
          ])
        : undefined,
    });
  };

  const handleFilterDataSales = ({textSearch}, fieldChange) => {
    if (fieldChange.name === 'textSearch') {
      if (textSearch && textSearch.length < 3) return;

      setTextSearchSales(textSearch);
    }
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
      {loadingDomain ? (
        <UI.Center minH="200px" w="full">
          <UI.Spinner size="lg" color="ste.red" />
        </UI.Center>
      ) : isEmpty(dataDomain) ? (
        <UI.Text fontWeight={600}> 404 - Not Found</UI.Text>
      ) : (
        <UI.VStack spacing={5} align="stretch">
          <UI.Text fontSize="2xl" fontWeight="semibold" w="full">
            {dataCompany?.records[0]?.companyName}
            {''} ({dataDomain?.partnerDomain?.domain})
          </UI.Text>
          <CompanyInfo
            data={dataCompany?.records[0]}
            loading={loadingCompany}
          />
          <UserTable
            data={dataUser}
            loading={loadingUser}
            handleFilterDataUser={handleFilterDataUser}
            setPage={setPageUser}
            companyName={dataCompany?.records[0]?.companyName}
            getList={hanldeGetListUser}
          />
          <SalesTable
            data={dataSales}
            loading={loadingSales}
            handleFilterData={handleFilterDataSales}
            setPage={setPageSales}
            getList={handleGetListSale}
            companyName={dataCompany?.records[0]?.companyName}
            partnerId={lastChunk?.request?.params?.companyId}
          />
          <TierToParter
            companyName={dataCompany?.records[0]?.companyName}
            partnerId={+lastChunk?.request?.params?.companyId}
          />
        </UI.VStack>
      )}
    </UI.VStack>
  );
}

export default CompanyDetail;
