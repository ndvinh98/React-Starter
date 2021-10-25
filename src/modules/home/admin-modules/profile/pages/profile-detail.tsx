import React, {useState, useEffect} from 'react';
import {keyBy, isEmpty} from 'lodash';
import * as UI from '@chakra-ui/react';
import FormGenerate from '@components/FormGenerate';
import {COUNTRY_NAME} from '@constants';
import {useMedia, usePatch} from '@utils/hooks';
import * as yup from 'yup';

import {useConfigStore} from '@services/config';
import LinkUpload from '@components/LinkUpLoad';
import {useAuthController} from '@modules/auth';
// import {useHomeController} from '@modules/home';

const SALUATION_OPITONS = [
  {value: 'MR', label: 'MR'},
  {value: 'MRS', label: 'MRS'},
  {value: 'MISS', label: 'MISS'},
  {value: 'DR', label: 'DR'},
  {value: 'MADAM', label: 'MADAM'},
];
const SALUATION_OPITONS_VALUE = keyBy(SALUATION_OPITONS, 'value');

function ProfileDetail() {
  const {isBase} = useMedia();
  const {languages} = useConfigStore();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const {me: profileData, getMe} = useAuthController();
  const {patch, data, loading} = usePatch(`users/${profileData?.id}`);
  const toast = UI.useToast();

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    console.log(profileData);
  }, [profileData]);

  useEffect(() => {
    if (data) {
      toast({
        title: 'Successfully!',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
      setIsDisabled(true);
    }
  }, [data]);

  return (
    <>
      <UI.Box p={6}>
        <UI.Text fontWeight={'bold'} mb={4}>
          Your Profile
        </UI.Text>
        <UI.Box bg={'white'} w={'95%'}>
          <UI.Center pt="4">
            <LinkUpload
              displayName={profileData?.firstName + ' ' + profileData?.lastName}
              name="avatar"
              boxSize="100px"
              userId={profileData?.id}
              src={profileData?.avatarMediaDestination}
              cb={() => getMe()}
            />
          </UI.Center>
          {!isEmpty(profileData) && !isEmpty(languages) && (
            <UI.Box p={{md: 2, lg: 4}}>
              <FormGenerate
                onSubmit={(data: any) => {
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
                  salutation: yup
                    .string()
                    .required('Salutation is required')
                    .default(profileData?.salutation),
                  jobFunction: yup
                    .string()
                    .required('Job Function is required')
                    .default(profileData?.jobFunction),
                  jobTitle: yup
                    .string()
                    .required('Job Title is required')
                    .default(profileData?.jobTitle),
                  cityName: yup
                    .string()
                    .required('City is required')
                    .default(profileData?.firstName),
                  countryName: yup
                    .string()
                    .required('City is required')
                    .default(profileData?.countryName),
                  postalCode: yup
                    .string()
                    .required('Postal Code is required')
                    .default(profileData?.cityName),
                  workNumber: yup
                    .string()
                    .required('Work Number is required')
                    .default(profileData?.workNumber),
                  mobileNumber: yup
                    .string()
                    .required('Mobile Number is required')
                    .default(profileData?.mobileNumber),
                  preferredLanguage: yup
                    .number()
                    .optional()
                    // .required('Preferred Please select language')
                    .default(profileData?.language),
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
                    type: 'input',
                    name: 'jobFunction',
                    label: 'Job Function',
                    placeholder: 'Job Function',
                    colSpan: isBase ? 6 : 12,
                    size: 'md',
                    isDisabled: isDisabled,
                    defaultValue: profileData?.jobFunction,
                  },
                  {
                    name: 'jobTitle',
                    type: 'input',
                    label: 'Job Title',
                    placeholder: 'Job Title',
                    colSpan: isBase ? 6 : 12,
                    size: 'md',
                    isDisabled: isDisabled,
                    defaultValue: profileData?.jobTitle,
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
                      value: profileData?.countryName,
                      label: profileData?.countryName,
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
                    defaultValue: profileData?.cityName,
                  },
                  {
                    name: 'postalCode',
                    type: 'input',
                    label: 'Postal Code',
                    placeholder: 'Postal Code',
                    colSpan: isBase ? 6 : 12,
                    size: 'md',
                    isDisabled: isDisabled,
                    defaultValue: profileData?.postalCode,
                  },
                  {
                    name: 'workNumber',
                    type: 'input',
                    label: 'Work No.',
                    placeholder: 'Work Number',
                    colSpan: isBase ? 6 : 12,
                    size: 'md',
                    isDisabled: isDisabled,
                    defaultValue: profileData?.workNumber,
                  },
                  {
                    name: 'mobileNumber',
                    type: 'input',
                    label: 'Mobile No.',
                    placeholder: 'Mobile No.',
                    colSpan: isBase ? 6 : 12,
                    size: 'md',
                    isDisabled: isDisabled,
                    defaultValue: profileData?.mobileNumber,
                  },
                  {
                    name: 'preferredLanguage',
                    type: 'select',
                    label: 'Preferred Language',
                    size: 'md',
                    placeholder: 'Preferred Language',
                    colSpan: isBase ? 6 : 12,
                    defaultValue: {
                      value: keyBy(languages, 'id')?.[
                        profileData?.language || 1
                      ]?.id,
                      label: keyBy(languages, 'id')?.[
                        profileData?.language || 1
                      ]?.name,
                    },
                    options: languages.map((x) => ({
                      value: x.id,
                      label: x.name,
                    })),
                    isDisabled: isDisabled,
                  },
                ]}>
                <UI.Center pt={4} pb={{md: 4}}>
                  <UI.HStack>
                    <UI.Button
                      type="button"
                      onClick={() => setIsDisabled(false)}
                      w={{md: '150px', lg: '200px'}}
                      colorScheme="#EEFCEA">
                      Edit
                    </UI.Button>
                    <UI.Button
                      type="submit"
                      isDisabled={isDisabled}
                      w={{md: '150px', lg: '200px'}}
                      variant="outline"
                      isLoading={loading}
                      colorScheme="#FCEAEB">
                      Save Change
                    </UI.Button>
                  </UI.HStack>
                </UI.Center>
              </FormGenerate>
            </UI.Box>
          )}
        </UI.Box>
      </UI.Box>
    </>
  );
}

export default ProfileDetail;
