import React, {useEffect} from 'react';
import {useRouterController} from '@modules/router';
import {useGetItem, useFilter, useGetList} from '@utils/hooks';

import {useRouter} from '@utils/hooks';

import CompanyInfo from '@components/CompanyInfo';
import UserTable from '@components/UserTable';

import {IUserManagement} from '@types';
import {
  IPartnerApplicationForms,
  IPartnerManagement,
  IPartnerUser,
} from '@types';
import {isEmpty} from 'lodash';

import * as UI from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';
import SalesTable from '@components/SalesTable';

function CompanyDetail() {
  const {push} = useRouter();
  const {params} = useRouterController();
  const {
    getItem: getItemPartner,
    data: dataCompany,
    loading: loadingCompany,
  } = useGetItem<IPartnerApplicationForms>(
    `/partnerApplicationForms/${params?.id}`,
  );

  useEffect(() => {
    getItemPartner({
      relations: JSON.stringify(['partnerApplicationSubmission']),
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
  } = useFilter({page: 1, limit: 10});
  const {
    data: dataUser,
    getList: getListUser,
    loading: loadingUser,
  } = useGetList<IPartnerUser>('/partnerUsers');

  useEffect(() => {
    getListUser({
      pageUser,
      limit: limitUser,
      relations: JSON.stringify(['domain']),
      filter: isEmpty(filterUser)
        ? undefined
        : JSON.stringify([
            {
              isActive: filterUser.status,
              userType: filterUser.userType,
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
  }, [pageUser, limitUser, textSearchUser, filterUser]);

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
  } = useFilter({page: 1, limit: 10});
  const {
    data: dataSales,
    getList,
    loading: loadingSales,
  } = useGetList<IUserManagement>('/partnerUserRelations');

  useEffect(() => {
    getList({
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
  }, [pageSales, limitSales, textSearchSales]);

  const handleFilterDataSales = ({textSearch}) => {
    setTextSearchSales(textSearch === undefined ? '' : textSearch);
  };

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
        {dataCompany?.companyName}
        {''} ({dataDomain?.partnerDomain?.domain})
      </UI.Text>
      <CompanyInfo data={dataCompany} loading={loadingCompany} />
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
    </UI.VStack>
  );
}

export default CompanyDetail;
