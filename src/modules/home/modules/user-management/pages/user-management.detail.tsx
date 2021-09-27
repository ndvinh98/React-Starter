import React, {useState, useEffect, memo} from 'react';
import * as UI from '@chakra-ui/react';
import FormGenerate from '@components/FormGenerate';
import {COUNTRY_NAME} from '@constants';
import {BsArrowLeft, BsThreeDotsVertical} from 'react-icons/bs';
import {useRouter, useGetItem, usePatch} from '@utils/hooks';
import {useConfigStore} from '@services/config';
import {useRouterController} from '@modules/router';
import {IUserProfiles} from '@types';

import {format} from 'date-fns';
import {keyBy} from 'lodash';
import {useModalController} from '@modules/modal';

import {useMedia} from '@utils/hooks';
import UserInfoCard from '@components/UserInfoCard';

import * as yup from 'yup';

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

function UserDetail() {
  const {languages} = useConfigStore();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isProfileActive, setIsProfileActive] = useState<boolean>(true);
  const {push} = useRouter();
  const params = useRouterController();
  const {data: profileData, loading, getItem} = useGetItem('');
  const {openModal} = useModalController();
  const {isBase} = useMedia();

  const [partnerUserProfiles, setPartnerUserProfiles] =
    useState<IUserProfiles>(null);

  useEffect(() => {
    setIsProfileActive(profileData?.isActive);
  }, [profileData]);

  const getUserProfile = () => {
    getItem(
      {
        relations: JSON.stringify([
          'partnerUserProfiles',
          'partnerUserProfiles.language',
        ]),
      },
      {path: `partnerUsers/${params?.id}`},
    );
  };

  useEffect(() => {
    if (params?.id) getUserProfile();
  }, [params]);

  useEffect(() => {
    if (profileData && profileData?.partnerUserProfiles)
      setPartnerUserProfiles(
        profileData?.partnerUserProfiles?.[0] as IUserProfiles,
      );
  }, [profileData]);
  const {
    patch,
    data,
    loading: updating,
  } = usePatch(`partnerUsers/${params?.id}`);

  useEffect(() => {
    if (data) {
      setIsDisabled(true);
    }
  }, [data]);

  return (
    <>
      <UI.HStack
        _hover={{cursor: 'pointer'}}
        onClick={() => push('/partner/user-management')}>
        <BsArrowLeft size={20} />
        <UI.Text fontSize={'14px'}>Back</UI.Text>
      </UI.HStack>
      <UI.Text fontWeight={'bold'} fontSize={'20px'}>
        {profileData?.firstName + ' ' + profileData?.lastName}
      </UI.Text>

      <UI.Box bgColor={'white'} px={4} py={4} borderRadius="md" mt={4}>
        {isBase ? (
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
                  {profileData?.updatedAt
                    ? format(new Date(profileData?.updatedAt), 'dd MMM yyyy')
                    : false}
                </UI.Td>
                <UI.Td>{STATUS_STRING[profileData?.isActive]}</UI.Td>
                <UI.Td>{USRTYPE_STRING[profileData?.userType]}</UI.Td>
                <UI.Td>
                  {profileData?.updatedAt
                    ? format(new Date(profileData?.createdAt), 'dd MMM yyyy')
                    : false}
                </UI.Td>
                <UI.Td>
                  <UI.Menu>
                    <UI.MenuButton>
                      <UI.IconButton
                        pl={4}
                        aria-label="setting"
                        variant="unstyled"
                        size="sm"
                        icon={<BsThreeDotsVertical size={20} />}
                      />
                    </UI.MenuButton>
                    <UI.MenuList>
                      <UI.MenuItem
                        isDisabled={isProfileActive}
                        onClick={() =>
                          openModal('action', {
                            title: 'Activate Access',
                            type: 'Activate',
                            cb: () => getUserProfile(),
                            id: profileData?.id,
                          })
                        }>
                        Activate Access
                      </UI.MenuItem>
                      <UI.MenuItem
                        isDisabled={!isProfileActive}
                        onClick={() =>
                          openModal('action', {
                            title: 'Deactivate Access',
                            type: 'Deactivate',
                            cb: () => getUserProfile(),
                            id: profileData?.id,
                          })
                        }>
                        Deactivate Access
                      </UI.MenuItem>
                      <UI.MenuItem
                        onClick={() => {
                          openModal('action', {
                            title: 'Change role',
                            type: 'change-role',
                            cb: () => getUserProfile(),
                            currentUserType: profileData?.userType,
                            id: profileData?.id,
                          });
                        }}>
                        Change Role
                      </UI.MenuItem>
                    </UI.MenuList>
                  </UI.Menu>
                </UI.Td>
              </UI.Tr>
            </UI.Tbody>
          </UI.Table>
        ) : (
          <UserInfoCard cb={getUserProfile} userData={profileData} />
        )}
      </UI.Box>
      {loading ? (
        <UI.Center minH="200px">
          <UI.Spinner size="lg" color="ste.red" />
        </UI.Center>
      ) : (
        <UI.Box bg={'white'} mt={8}>
          <UI.Center pt="4">
            {/* <LinkUpload
              displayName={profileData?.firstName + ' ' + profileData?.lastName}
              name="avatar"
              boxSize="100px"
              partnerUserId={profileData?.id}
              src={partnerUserProfiles?.avatarMediaDestination}
              cb={() => getUserProfile()}
            /> */}
          </UI.Center>
          <UI.Box p="4">
            {profileData && partnerUserProfiles && (
              <FormGenerate
                onSubmit={(data) => {
                  patch(data);
                }}
                schema={{
                  firstName: yup
                    .string()
                    .required('First Name is required')
                    .default(profileData?.firstName),
                  lastName: yup
                    .string()
                    .required('Last Name is required')
                    .default(profileData?.lastName),
                  email: yup
                    .string()
                    .email('Email is required')
                    .required('Email is required')
                    .default(profileData?.email),
                  salutation: yup
                    .string()
                    .required('Salutation is required')
                    .default(profileData?.salutation),

                  jobTitle: yup
                    .string()
                    .required('Job Title is required')
                    .default(partnerUserProfiles?.jobTitle),
                  cityName: yup
                    .string()
                    .required('City is required')
                    .default(profileData?.firstName),
                  countryName: yup
                    .string()
                    .required('City is required')
                    .default(partnerUserProfiles?.countryName),
                  postalCode: yup
                    .string()
                    .required('Postal Code is required')
                    .default(partnerUserProfiles?.cityName),
                  workNumber: yup
                    .string()
                    .required('Work Number is required')
                    .default(partnerUserProfiles?.workNumber),
                  mobileNumber: yup
                    .string()
                    .required('Mobile Number is required')
                    .default(partnerUserProfiles?.mobileNumber),
                  preferredLanguage: yup
                    .number()
                    .required('Preferred Language is required')
                    .default(partnerUserProfiles?.language?.id),
                }}
                fields={[
                  {
                    name: 'firstName',
                    type: 'input',
                    label: 'First Name',
                    placeholder: 'First Name',
                    colSpan: 6,
                    size: 'md',
                    isDisabled: true,
                    defaultValue: profileData?.firstName,
                  },
                  {
                    type: 'input',
                    name: 'lastName',
                    label: 'Last Name',
                    placeholder: 'Last Name',
                    colSpan: 6,
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
                    isDisabled: isDisabled,
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
                    name: 'jobTitle',
                    type: 'input',
                    label: 'Job Title',
                    placeholder: 'Job Title',
                    colSpan: isBase ? 6 : 12,
                    size: 'md',
                    isDisabled: isDisabled,
                    defaultValue: partnerUserProfiles?.jobTitle,
                  },
                  {
                    name: 'countryName',
                    type: 'select',
                    colSpan: isBase ? 6 : 12,
                    label: 'Country',
                    size: 'md',
                    placeholder: 'Country',
                    options: COUNTRY_NAME.map((x) => ({
                      value: x?.country,
                      label: x?.country,
                    })),
                    isDisabled: isDisabled,
                    defaultValue: {
                      value: partnerUserProfiles?.countryName,
                      label: partnerUserProfiles?.countryName,
                    },
                  },
                  {
                    name: 'cityName',
                    type: 'input',
                    label: 'City',
                    placeholder: 'City',
                    colSpan: isBase ? 6 : 12,
                    size: 'md',
                    isDisabled: isDisabled,
                    defaultValue: partnerUserProfiles?.cityName,
                  },
                  {
                    name: 'postalCode',
                    type: 'input',
                    label: 'Postal Code',
                    placeholder: 'Postal Code',
                    colSpan: isBase ? 6 : 12,
                    size: 'md',
                    isDisabled: isDisabled,
                    defaultValue: partnerUserProfiles?.postalCode,
                  },
                  {
                    name: 'workNumber',
                    type: 'input',
                    label: 'Work No.',
                    placeholder: 'Work Number',
                    colSpan: isBase ? 6 : 12,
                    size: 'md',
                    isDisabled: isDisabled,
                    defaultValue: partnerUserProfiles?.workNumber,
                  },
                  {
                    name: 'mobileNumber',
                    type: 'input',
                    label: 'Mobile No.',
                    placeholder: 'Mobile No.',
                    colSpan: isBase ? 6 : 12,
                    size: 'md',
                    isDisabled: isDisabled,
                    defaultValue: partnerUserProfiles?.mobileNumber,
                  },
                  {
                    name: 'preferredLanguage',
                    type: 'select',
                    label: 'Preferred Language',
                    size: 'md',
                    placeholder: 'Preferred Language',
                    colSpan: isBase ? 6 : 12,
                    defaultValue: {
                      value: partnerUserProfiles?.language?.id,
                      label: partnerUserProfiles?.language?.name,
                    },
                    options: languages.map((x) => ({
                      value: x.id,
                      label: x.name,
                    })),
                    isDisabled: isDisabled,
                  },
                ]}>
                <UI.Center pt="4">
                  <UI.HStack>
                    <UI.Button
                      onClick={() => setIsDisabled(false)}
                      w={{lg: '200px', md: '130px'}}
                      type="button"
                      colorScheme="#EEFCEA">
                      Edit
                    </UI.Button>
                    <UI.Button
                      isLoading={updating}
                      isDisabled={isDisabled}
                      w={{lg: '200px', md: '130px'}}
                      type="submit"
                      variant="outline"
                      colorScheme="#FCEAEB">
                      Save Change
                    </UI.Button>
                  </UI.HStack>
                </UI.Center>
              </FormGenerate>
            )}
          </UI.Box>
        </UI.Box>
      )}
    </>
  );
}

export default memo(UserDetail);
