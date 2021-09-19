import React, {memo, useEffect} from 'react';
import {useRouterController} from '@modules/router';
import {useGetItem, useMedia, useRouter, usePost} from '@utils/hooks';
import {IPartnerApplicationForms} from '@types';
import * as UI from '@chakra-ui/react';
import {isEmpty} from 'lodash';
import {useModalController} from '@modules/modal';
import FormGenerate from '@components/FormGenerate';
import {MdKeyboardBackspace} from 'react-icons/md';

function Detail() {
  const {params} = useRouterController();
  const {push} = useRouter();
  const {getItem, data, loading} = useGetItem<IPartnerApplicationForms>(
    `/partnerApplicationForms`,
  );

  const {openModal} = useModalController();
  useEffect(() => {
    if (params?.id) getItem(null, {path: `/${params?.id}`});
  }, [params]);

  return (
    <UI.VStack py={6} px={8}>
      {loading ? (
        <UI.Center minH="300px">
          <UI.Spinner size="lg" color="ste.red" />
        </UI.Center>
      ) : isEmpty(data) ? (
        <UI.Center>
          <UI.Image src="" />
          <UI.Text>No data</UI.Text>
        </UI.Center>
      ) : (
        <UI.Box width="full">
          <UI.Link
            fontSize={{md: '14px'}}
            color="ste.gray_light"
            fontStyle={'normal'}
            onClick={() => push('/home/partner-applications')}>
            <UI.Flex alignItems="center">
              <MdKeyboardBackspace size={20} />
              Back
            </UI.Flex>
          </UI.Link>
          <UI.Text
            m={4}
            fontSize={{md: 'md', lg: 'lg'}}
            fontWeight={'semibold'}
            color={'ste.black'}>
            {data?.companyName}
          </UI.Text>
          <UI.Box width="full" bg="white" pt={4} py={6} px={8}>
            <UI.Text
              fontSize={{md: 'md', lg: 'xl'}}
              fontWeight={'semibold'}
              color={'ste.black'}>
              SUBMISSION
            </UI.Text>
            <FormGenerate
              fields={[
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <SectionTitle sectionName={'User Account Creation'} />
                  ),
                },

                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={'Salutation'}
                      value={data?.applicantSalutation}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={'First Name'}
                      value={data?.applicantFirstName}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={'Last Name'}
                      value={data?.applicantLastName}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={'Company Name'}
                      value={data?.companyName}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData name={'Work Email Address'} value={'data?.'} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={'Job Function'}
                      value={data?.applicantJobFunction}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={'Job Title'}
                      value={data?.applicantJobTitle}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData name={'Country'} value={data?.countryName} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={'Name of Company'}
                      value={data?.companyName}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData name={'City'} value={data?.cityName} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData name={'Postal Code'} value={data?.postalCode} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={'Work Number'}
                      value={data?.applicantWorkNo}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={'Mobile Number'}
                      value={data?.applicantMobileNo}
                    />
                  ),
                },

                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={'Preferred Language'}
                      value={data?.applicantPreferredLanguage}
                    />
                  ),
                },

                {
                  type: 'decor',
                  DecorComponent: () => (
                    <SectionTitle sectionName={'Section A'} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={'Name of Company'}
                      value={data?.companyName}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={'Registered Business Address'}
                      value={data?.address1}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData name={' '} value={data?.address2} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData name={' '} value={data?.address3} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData name={'Country'} value={data?.countryName} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData name={'City'} value={data?.cityName} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData name={'Postal Code'} value={data?.postalCode} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={'Country of Incorporation'}
                      value={data?.countryIncorporation}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={'Nature of Business'}
                      value={data?.natureOfBusiness}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <SectionTitle sectionName={'Section B'} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={`Name of Company's CEO or equivalent`}
                      value={data?.companyCEOName}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={`Name of top 3 Shareholders (Optional)`}
                      value={data?.companyShareholderName1}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={` `}
                      value={data?.companyShareholderName2}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={` `}
                      value={data?.companyShareholderName3}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={`Name of all Directors (Optional)`}
                      value={data?.companyDirectorName1}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData name={` `} value={data?.companyDirectorName2} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData name={` `} value={data?.companyDirectorName3} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData name={` `} value={data?.companyDirectorName4} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData name={` `} value={data?.companyDirectorName5} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <SectionTitle sectionName={'Section C'} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={`Billing address`}
                      value={data?.billingAddress1}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData name={` `} value={data?.billingAddress2} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData name={` `} value={data?.billingAddress3} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={`Country`}
                      value={data?.billingCountryName}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData name={`City`} value={data?.billingCityName} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={`Postal Code`}
                      value={data?.applicantPostalCode}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={`Person to contact and attention payment`}
                      value={data?.billingContactDesignation}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={`Designation`}
                      value={data?.billingContactDesignation}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={`Tel No.`}
                      value={data?.billingContactTelNo}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldData
                      name={`Fax No.`}
                      value={data?.billingContactFaxNo}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <SectionTitle sectionName={'Attachments'} />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldView
                      name={`Attachments`}
                      value={'  data?.registryAttachments?'}
                    />
                  ),
                },
                {
                  type: 'decor',
                  DecorComponent: () => (
                    <FieldView
                      name={` `}
                      value={'  data?.registryAttachments?'}
                    />
                  ),
                },
              ]}
            />
            <UI.Flex justifyContent="center" p={3}>
              <UI.Button
                onClick={() =>
                  openModal('reject', {
                    companyName: data?.companyName,
                    id: data?.id,
                  })
                }
                mr="4"
                variant="outline">
                Reject
              </UI.Button>
              <UI.Button
                onClick={() =>
                  openModal('confirmRequest', {companyName: data?.companyName})
                }
                colorScheme=" #D03A2B"
                variant="solid">
                Accept
              </UI.Button>
            </UI.Flex>
          </UI.Box>
        </UI.Box>
      )}
    </UI.VStack>
  );
}

export const SectionTitle = memo(({sectionName}: any) => {
  return (
    <UI.Box py={2} px={2} bg={'ste.red_lightest'} w={'full'}>
      <UI.Text fontWeight={'semibold'} color={'ste.red'}>
        {sectionName}
      </UI.Text>
    </UI.Box>
  );
});
export const FieldData = memo(({name, value}: any) => {
  const {isBase} = useMedia();

  return (
    <UI.Stack
      direction={isBase ? 'row' : 'column'}
      alignItems={isBase ? 'center' : 'flex-start'}
      w={'full'}>
      <UI.Text w={'300px'}>{name}</UI.Text>
      <UI.Box py={2} px={2} w={'full'} bg={'ste.gray_lighter'}>
        <UI.Text fontWeight={'semibold'} color={'ste.black'}>
          {value || '---'}
        </UI.Text>
      </UI.Box>
    </UI.Stack>
  );
});

export const FieldView = memo(({name, value}: any) => {
  const {isBase} = useMedia();

  return (
    <UI.Stack
      direction={isBase ? 'row' : 'column'}
      alignItems={isBase ? 'center' : 'flex-start'}
      w={'full'}>
      <UI.Text w={'300px'}>{name}</UI.Text>
      <UI.HStack py={2} px={2} w={'full'} bg={'ste.gray_lighter'}>
        <UI.Text fontWeight={'semibold'} color={'ste.black'}>
          {value || '---'}
        </UI.Text>
        <UI.Spacer />
        <UI.Button onClick={() => console.log('sss')} variant="outline">
          Reject
        </UI.Button>
      </UI.HStack>
    </UI.Stack>
  );
});

export default Detail;
