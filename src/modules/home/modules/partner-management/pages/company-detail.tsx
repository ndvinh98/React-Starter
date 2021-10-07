import React, {useEffect} from 'react';
import {useRouterController} from '@modules/router';
import {useGetItem, useFilter, useGetList} from '@utils/hooks';

import {useRouter} from '@utils/hooks';

import CompanyInfo from '@components/CompanyInfo';
import UserTable from '@components/UserTable';

import {IUserManagement} from '@types';
import {IPartnerApplicationForms, IPartnerManagement} from '@types';
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
    `/partnerApplicationForms/${params.id}`,
  );

  useEffect(() => {
    if (1)
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

  // Import data Sale Manager

  const {
    page,
    limit,
    setPage: setPageSales,
    textSearch,
    setTextSearch,
    filter,
    setFilter,
  } = useFilter({page: 1, limit: 10});
  const {
    data: dataSales,
    getList,
    loading: loadingSales,
  } = useGetList<IUserManagement>('/partnerUserRelations');

  useEffect(() => {
    getList({
      page,
      limit,
      relations: JSON.stringify(['user', 'user.userProfiles']),
      filter: isEmpty(filter)
        ? JSON.stringify([{partnerId: params?.id}])
        : JSON.stringify([
            {
              isActive: filter.status,
              userType: filter.userType,
              partnerId: params?.id,
            },
          ]),
      textSearch: textSearch
        ? JSON.stringify([
            {firstName: textSearch},
            {email: textSearch},
            {lastName: textSearch},
          ])
        : undefined,
    });
  }, [page, limit, textSearch, filter]);

  const handleFilterDataSales = ({textSearch, status, userType}) => {
    setTextSearch(textSearch === undefined ? '' : textSearch);
    setFilter((filter) => ({
      ...filter,
      status: status === '-1' ? undefined : status,
      userType: userType === '-1' ? undefined : userType,
    }));
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
      <UserTable />
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
