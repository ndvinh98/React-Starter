import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import FormGenerate from '@components/FormGenerate';

import {BsArrowLeft} from 'react-icons/bs';

import {useRouter, useGetItem} from '@utils/hooks';
import {useRouterController} from '@modules/router';
import {IPartnerUsers} from '@types';

import {format} from 'date-fns';
import {keyBy} from 'lodash';

import {useMedia} from '@utils/hooks';

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
  const {
    data: profileData,
    loading,
    getItem,
  } = useGetItem<IPartnerUsers>(`/partnerUsers/${params?.userId}`);

  const {isBase} = useMedia();

  useEffect(() => {
    if (params?.userId) getUserProfile();
  }, [params]);

  const getUserProfile = () => {
    getItem({
      relations: JSON.stringify([
        'partnerUserProfiles',
        'partnerUserProfiles.language',
        'domain',
        'domain.partners',
      ]),
    });
  };

  return (
    <UI.Box py={6} px={8}>
      <UI.HStack
        w="full"
        _hover={{cursor: 'pointer'}}
        onClick={() => push(`/home/partner-information/company/${params?.id}`)}>
        <BsArrowLeft size={20} />
        <UI.Text fontSize={'14px'}>Back</UI.Text>
      </UI.HStack>
      <UI.Text fontWeight={'bold'} fontSize={'20px'} pt="5">
        {profileData?.firstName + ' ' + profileData?.lastName}
      </UI.Text>

      <UI.Box bgColor={'white'} px={4} py={4} borderRadius="md" mt={5} w="full">
        <UI.Table variant="simple">
          <UI.Thead>
            <UI.Tr bgColor={'#EEEEEC'}>
              <UI.Th>Last Activity</UI.Th>
              <UI.Th>Status</UI.Th>
              <UI.Th>Role</UI.Th>
              <UI.Th>Registered Date</UI.Th>
            </UI.Tr>
          </UI.Thead>
          <UI.Tbody>
            <UI.Tr>
              <UI.Td>
                {profileData?.otpCodeExp
                  ? format(new Date(profileData?.otpCodeExp), 'dd MMM yyyy')
                  : false}
              </UI.Td>
              <UI.Td>{STATUS_STRING[profileData?.isActive]}</UI.Td>
              <UI.Td>{USRTYPE_STRING[profileData?.userType]}</UI.Td>
              <UI.Td>
                {profileData?.createdAt
                  ? format(new Date(profileData?.createdAt), 'dd MMM yyyy')
                  : false}
              </UI.Td>
            </UI.Tr>
          </UI.Tbody>
        </UI.Table>
      </UI.Box>
      {loading ? (
        <UI.Center minH="200px">
          <UI.Spinner size="lg" color="ste.red" />
        </UI.Center>
      ) : (
        <UI.Box bg={'white'} mt={8} w="full">
          <UI.Center pt="4">
            <UI.Avatar
              sx={{img: {objectFit: 'contain'}}}
              name={profileData?.firstName + ' ' + profileData?.lastName}
              bg={
                profileData?.partnerUserProfiles[0]?.avatarMediaDestination
                  ? 'white'
                  : undefined
              }
              boxSize="100px"
              userId={profileData?.id}
              src={profileData?.partnerUserProfiles[0]?.avatarMediaDestination}
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
                    defaultValue: profileData?.firstName,
                  },
                  {
                    type: 'input',
                    name: 'lastName',
                    label: 'Last Name',
                    placeholder: 'Last Name',
                    colSpan: isBase ? 6 : 12,
                    size: 'md',
                    isDisabled: true,
                    defaultValue: profileData?.lastName,
                  },
                  {
                    name: 'salutation',
                    type: 'select',
                    colSpan: isBase ? 6 : 12,
                    size: 'md',
                    label: 'Salutation',
                    placeholder: 'Salutation',
                    defaultValue:
                      SALUATION_OPITONS_VALUE?.[profileData?.salutation],
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
                    defaultValue: profileData?.email,
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
                      profileData?.partnerUserProfiles[0]?.jobFunction,
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
                      profileData?.partnerUserProfiles[0]?.jobFunction,
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
                      profileData?.partnerUserProfiles[0]?.countryName,
                  },
                  {
                    name: 'cityName',
                    type: 'input',
                    label: 'City',
                    placeholder: 'City',
                    colSpan: isBase ? 6 : 12,
                    size: 'md',
                    isDisabled: true,
                    defaultValue: profileData?.partnerUserProfiles[0]?.cityName,
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
                      profileData?.partnerUserProfiles[0]?.postalCode,
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
                      profileData?.partnerUserProfiles[0]?.workNumber,
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
                      profileData?.partnerUserProfiles[0]?.mobileNumber,
                  },
                  {
                    name: 'preferredLanguage',
                    type: 'input',
                    label: 'Preferred Language',
                    size: 'md',
                    placeholder: 'Preferred Language',
                    colSpan: isBase ? 6 : 12,
                    defaultValue:
                      profileData?.partnerUserProfiles[0]?.language?.name,

                    isDisabled: true,
                  },
                ]}></FormGenerate>
            )}
          </UI.Box>
        </UI.Box>
      )}
    </UI.Box>
  );
}

export default UserPartnerDetail;
