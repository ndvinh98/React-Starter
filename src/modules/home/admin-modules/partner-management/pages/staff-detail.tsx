import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import FormGenerate from '@components/FormGenerate';

import {BsArrowLeft} from 'react-icons/bs';
import {HiDotsHorizontal} from 'react-icons/hi';

import {useRouter, useGetItem, useGetList} from '@utils/hooks';
import {useRouterController} from '@modules/router';
import {IPartnerManagement, IPartnerUsers} from '@types';

import {format} from 'date-fns';
import {isEmpty, keyBy} from 'lodash';
import {useModalController} from '@modules/modal';

import {useMedia} from '@utils/hooks';

import CertificatesAwarded from '@components/CertificatesAwarded';

const USRTYPE_STRING = {
  PARTNERADMIN: 'Owner',
  ADMIN: 'Admin',
  USER: 'User',
};

const STATUS_STRING = {
  1: 'Active',
  0: 'Inactive',
};

const SALUATION_OPITONS = [
  {value: 'MR', label: 'MR'},
  {value: 'MRS', label: 'MRS'},
  {value: 'MISS', label: 'MISS'},
  {value: 'DR', label: 'DR'},
  {value: 'MADAM', label: 'MADAM'},
];
const SALUATION_OPITONS_VALUE = keyBy(SALUATION_OPITONS, 'value');

function UserPartnerDetail() {
  const {push} = useRouter();
  const {params} = useRouterController();
  // const {
  //   data: profileData,
  //   loading,
  //   getItem,
  // } = useGetItem<IPartnerUsers>(`/partnerUsers/${params?.userId}`);
  const {openModal} = useModalController();
  const {isBase} = useMedia();

  // useEffect(() => {
  //   if (params?.userId) getUserProfile();
  // }, [params]);

  const {getItem: getItemDomain, data: dataDomain} =
    useGetItem<IPartnerManagement>(`/partners/${params?.id}`);

  const {
    data: profileData,
    getList: getListUser,
    loading: loadingUser,
  } = useGetList<IPartnerUsers>('/partnerUsers');

  useEffect(() => {
    if (params?.id)
      getItemDomain({
        relations: JSON.stringify(['partnerDomain']),
      });
  }, [params]);

  useEffect(() => {
    if (dataDomain || params?.userId)
      getListUser({
        relations: JSON.stringify([
          'domain',
          'partnerUserProfiles',
          'domain.partners',
          'partnerUserProfiles.language',
        ]),
        filter: JSON.stringify([
          {
            domain: {id: dataDomain?.partnerDomain?.id},
            id: params?.userId,
          },
        ]),
      });
  }, [params, dataDomain]);

  // const getUserProfile = () => {
  //   getItem({
  //     filter: JSON.stringify([
  //       {
  //         partners: {id: params?.id},
  //       },
  //     ]),
  //     relations: JSON.stringify([
  //       'partnerUserProfiles',
  //       'partnerUserProfiles.language',
  //       'domain',
  //       'domain.partners',
  //     ]),
  //   });
  // };

  const isHiden = () => {
    return profileData[0]?.isActive === 0 ||
      profileData?.records?.[0]?.userType === 'PARTNERADMIN'
      ? true
      : false;
  };

  return (
    <UI.Box py={6} px={8}>
      <UI.HStack
        w="full"
        _hover={{cursor: 'pointer'}}
        onClick={() => push(`/home/partner-management/company/${params?.id}`)}>
        <BsArrowLeft size={20} />
        <UI.Text fontSize={'14px'}>Back</UI.Text>
      </UI.HStack>{' '}
      {loadingUser ? (
        <UI.Center minH="200px">
          <UI.Spinner size="lg" color="ste.red" />
        </UI.Center>
      ) : isEmpty(profileData?.records?.[0]) ? (
        <UI.Center fontWeight={600}> 404 - Not Found</UI.Center>
      ) : (
        <UI.Box>
          <UI.Text fontWeight={'bold'} fontSize={'20px'} pt="5">
            {profileData?.records?.[0]?.firstName +
              ' ' +
              profileData?.records?.[0]?.lastName}
          </UI.Text>

          <UI.Box
            bgColor={'white'}
            px={4}
            py={4}
            borderRadius="md"
            mt={4}
            w="full">
            <UI.Table variant="simple">
              <UI.Thead>
                <UI.Tr bgColor={'#EEEEEC'}>
                  <UI.Th>Last Activity</UI.Th>
                  <UI.Th>Status</UI.Th>
                  <UI.Th>Role</UI.Th>
                  <UI.Th>Registered Date</UI.Th>
                  <UI.Th>Action</UI.Th>
                </UI.Tr>
              </UI.Thead>
              <UI.Tbody>
                <UI.Tr>
                  <UI.Td>
                    {profileData?.records?.[0]?.otpCodeExp
                      ? format(
                          new Date(profileData?.records?.[0]?.otpCodeExp),
                          'dd MMM yyyy',
                        )
                      : false}
                  </UI.Td>
                  <UI.Td>
                    {STATUS_STRING[profileData?.records?.[0]?.isActive]}
                  </UI.Td>
                  <UI.Td>
                    {USRTYPE_STRING[profileData?.records?.[0]?.userType]}
                  </UI.Td>
                  <UI.Td>
                    {profileData?.records?.[0]?.createdAt
                      ? format(
                          new Date(profileData?.records?.[0]?.createdAt),
                          'dd MMM yyyy',
                        )
                      : false}
                  </UI.Td>
                  <UI.Td>
                    <UI.Menu>
                      <UI.MenuButton>
                        <UI.IconButton
                          hidden={isHiden()}
                          pl={4}
                          aria-label="setting"
                          variant="unstyled"
                          size="sm"
                          icon={<HiDotsHorizontal size={20} />}
                        />
                      </UI.MenuButton>
                      <UI.MenuList>
                        <UI.MenuItem
                          onClick={() =>
                            openModal('assignPartnerAdmin', {
                              //cb: () => getUserProfile(),
                              id: profileData?.records?.[0]?.id,
                              firstName: profileData?.records?.[0]?.firstName,
                              lastName: profileData?.records?.[0]?.lastName,
                              companyName:
                                //@ts-ignore
                                profileData?.records?.[0]?.domain?.partners?.[0]
                                  ?.companyName,
                            })
                          }>
                          Assign as Partner Admin
                        </UI.MenuItem>
                      </UI.MenuList>
                    </UI.Menu>
                  </UI.Td>
                </UI.Tr>
              </UI.Tbody>
            </UI.Table>
          </UI.Box>

          <UI.Box bg={'white'} mt={8} w="full">
            <UI.Center pt="4">
              <UI.Avatar
                sx={{img: {objectFit: 'contain'}}}
                name={
                  profileData?.records?.[0]?.firstName +
                  ' ' +
                  profileData?.records?.[0]?.lastName
                }
                bg={
                  profileData[0]?.partnerUserProfiles[0]?.avatarMediaDestination
                    ? 'white'
                    : undefined
                }
                boxSize="100px"
                userId={profileData?.records?.[0]?.id}
                src={
                  profileData?.records?.[0]?.partnerUserProfiles[0]
                    ?.avatarMediaDestination
                }
              />
            </UI.Center>
            <UI.Box p="4">
              {profileData && (
                <FormGenerate
                  fields={[
                    {
                      name: 'firstName',
                      type: 'input',
                      label: 'First Name',
                      placeholder: 'First Name',
                      colSpan: isBase ? 6 : 12,
                      size: 'md',
                      isDisabled: true,
                      defaultValue: profileData?.records?.[0]?.firstName,
                    },
                    {
                      type: 'input',
                      name: 'lastName',
                      label: 'Last Name',
                      placeholder: 'Last Name',
                      colSpan: isBase ? 6 : 12,
                      size: 'md',
                      isDisabled: true,
                      defaultValue: profileData?.records?.[0]?.lastName,
                    },
                    {
                      name: 'salutation',
                      type: 'select',
                      colSpan: isBase ? 6 : 12,
                      size: 'md',
                      label: 'Salutation',
                      placeholder: 'Salutation',
                      defaultValue:
                        SALUATION_OPITONS_VALUE?.[
                          profileData?.records?.[0]?.salutation
                        ],
                      options: SALUATION_OPITONS,
                      isDisabled: true,
                    },
                    {
                      type: 'input',
                      name: 'email',
                      label: 'Email',
                      placeholder: 'Email',
                      colSpan: isBase ? 6 : 12,
                      size: 'md',
                      isDisabled: true,
                      defaultValue: profileData?.records?.[0]?.email,
                    },
                    {
                      name: 'jobFunction',
                      type: 'input',
                      label: 'Job Function',
                      placeholder: 'Sales Id',
                      colSpan: isBase ? 6 : 12,
                      size: 'md',
                      isDisabled: true,
                      defaultValue:
                        profileData?.records?.[0]?.partnerUserProfiles[0]
                          ?.jobFunction,
                    },
                    {
                      name: 'jobTitle',
                      type: 'input',
                      label: 'Job Title',
                      placeholder: 'Job Title',
                      colSpan: isBase ? 6 : 12,
                      size: 'md',
                      isDisabled: true,
                      defaultValue:
                        profileData?.records?.[0]?.partnerUserProfiles[0]
                          ?.jobFunction,
                    },
                    {
                      name: 'countryName',
                      type: 'input',
                      colSpan: isBase ? 6 : 12,
                      label: 'Country',
                      size: 'md',
                      placeholder: 'Country',
                      isDisabled: true,
                      defaultValue:
                        profileData?.records?.[0]?.partnerUserProfiles[0]
                          ?.countryName,
                    },
                    {
                      name: 'cityName',
                      type: 'input',
                      label: 'City',
                      placeholder: 'City',
                      colSpan: isBase ? 6 : 12,
                      size: 'md',
                      isDisabled: true,
                      defaultValue:
                        profileData?.records?.[0]?.partnerUserProfiles[0]
                          ?.cityName,
                    },
                    {
                      name: 'postalCode',
                      type: 'input',
                      label: 'Postal Code',
                      placeholder: 'Postal Code',
                      colSpan: isBase ? 6 : 12,
                      size: 'md',
                      isDisabled: true,
                      defaultValue:
                        profileData?.records?.[0]?.partnerUserProfiles[0]
                          ?.postalCode,
                    },
                    {
                      name: 'workNumber',
                      type: 'input',
                      label: 'Work No.',
                      placeholder: 'Work Number',
                      colSpan: isBase ? 6 : 12,
                      size: 'md',
                      isDisabled: true,
                      defaultValue:
                        profileData?.records?.[0]?.partnerUserProfiles[0]
                          ?.workNumber,
                    },
                    {
                      name: 'mobileNumber',
                      type: 'input',
                      label: 'Mobile No.',
                      placeholder: 'Mobile No.',
                      colSpan: isBase ? 6 : 12,
                      size: 'md',
                      isDisabled: true,
                      defaultValue:
                        profileData?.records?.[0]?.partnerUserProfiles[0]
                          ?.mobileNumber,
                    },
                    {
                      name: 'preferredLanguage',
                      type: 'input',
                      label: 'Preferred Language',
                      size: 'md',
                      placeholder: 'Preferred Language',
                      colSpan: isBase ? 6 : 12,
                      defaultValue:
                        profileData?.records?.[0]?.partnerUserProfiles[0]
                          ?.language?.name,

                      isDisabled: true,
                    },
                  ]}></FormGenerate>
              )}
            </UI.Box>
          </UI.Box>

          <CertificatesAwarded
            partnerUserId={profileData?.records?.[0]?.id}
            profileData={profileData?.records?.[0]}
          />
        </UI.Box>
      )}
    </UI.Box>
  );
}

export default UserPartnerDetail;
