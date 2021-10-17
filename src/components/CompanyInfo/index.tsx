import React, {memo, useEffect} from 'react';
import {useMedia, useGetItem} from '@utils/hooks';
import {useModalController} from '@modules/modal';

import * as UI from '@chakra-ui/react';
import {isEmpty} from 'lodash';
import FormGenerate from '@components/FormGenerate';

function CompanyInfo(props: any) {
  const {data, loading} = props;

  const handleNameAttachment = (name: string) => {
    if (!name) return undefined;
    const names = name?.split('/');
    if (!names.length) return undefined;
    return names?.[names?.length - 1];
  };

  return (
    <UI.VStack w="full">
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
          <UI.Box width="full" bg="white" pt={4} py={6} px={4}>
            <UI.Text
              fontSize={{md: 'md', lg: 'xl'}}
              pl={3}
              fontWeight={'semibold'}
              color={'ste.black'}
              bgColor={'#EEEEEC'}>
              Company Infomation
            </UI.Text>
            <UI.Accordion allowMultiple>
              <UI.AccordionItem>
                <UI.AccordionButton>
                  <UI.Box flex="1" textAlign="left">
                    Section A
                  </UI.Box>
                  <UI.AccordionIcon />
                </UI.AccordionButton>
                <UI.AccordionPanel>
                  <FormGenerate
                    fields={[
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
                          <FieldData
                            name={'Country'}
                            value={data?.countryName}
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
                          <FieldData
                            name={'Postal Code'}
                            value={data?.postalCode}
                          />
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
                    ]}
                  />
                </UI.AccordionPanel>
              </UI.AccordionItem>

              <UI.AccordionItem>
                <UI.AccordionButton>
                  <UI.Box flex="1" textAlign="left">
                    Section B
                  </UI.Box>
                  <UI.AccordionIcon />
                </UI.AccordionButton>
                <UI.AccordionPanel>
                  <FormGenerate
                    fields={[
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
                          <FieldData
                            name={` `}
                            value={data?.companyDirectorName2}
                          />
                        ),
                      },
                      {
                        type: 'decor',
                        DecorComponent: () => (
                          <FieldData
                            name={` `}
                            value={data?.companyDirectorName3}
                          />
                        ),
                      },
                      {
                        type: 'decor',
                        DecorComponent: () => (
                          <FieldData
                            name={` `}
                            value={data?.companyDirectorName4}
                          />
                        ),
                      },
                      {
                        type: 'decor',
                        DecorComponent: () => (
                          <FieldData
                            name={` `}
                            value={data?.companyDirectorName5}
                          />
                        ),
                      },
                    ]}
                  />
                </UI.AccordionPanel>
              </UI.AccordionItem>
              <UI.AccordionItem>
                <UI.AccordionButton>
                  <UI.Box flex="1" textAlign="left">
                    Section C
                  </UI.Box>
                  <UI.AccordionIcon />
                </UI.AccordionButton>
                <UI.AccordionPanel>
                  <FormGenerate
                    fields={[
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
                          <FieldData
                            name={`City`}
                            value={data?.billingCityName}
                          />
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
                    ]}
                  />
                </UI.AccordionPanel>
              </UI.AccordionItem>
              <UI.AccordionItem>
                <UI.AccordionButton>
                  <UI.Box flex="1" textAlign="left">
                    Attachments
                  </UI.Box>
                  <UI.AccordionIcon />
                </UI.AccordionButton>
                <UI.AccordionPanel>
                  <FormGenerate
                    fields={[
                      {
                        type: 'decor',
                        DecorComponent: () => (
                          <FieldView
                            name={`Company's last signed audited financial statement`}
                            value={handleNameAttachment(
                              data?.partnerApplicationAttachments[0]
                                ?.mediaDestination,
                            )}
                            data={
                              data?.partnerApplicationAttachments[0]
                                ?.mediaDestination
                            }
                          />
                        ),
                      },
                      {
                        type: 'decor',
                        DecorComponent: () => (
                          <FieldView
                            name={`Company's business registry`}
                            value={handleNameAttachment(
                              data?.partnerApplicationAttachments[0]
                                ?.mediaDestination,
                            )}
                            data={
                              data?.partnerApplicationAttachments[0]
                                ?.mediaDestination
                            }
                          />
                        ),
                      },
                    ]}
                  />
                </UI.AccordionPanel>
              </UI.AccordionItem>
            </UI.Accordion>
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
      direction={isBase ? 'column' : 'column'}
      alignItems={isBase ? 'flex' : 'flex-start'}
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

export const FieldView = memo(({name, value, data}: any) => {
  const {isBase} = useMedia();

  const {openModal} = useModalController();

  return (
    <UI.Stack
      direction={isBase ? 'row' : 'column'}
      alignItems={isBase ? 'center' : 'flex-start'}
      w={'full'}>
      <UI.Text w={'300px'}>{name}</UI.Text>
      <UI.HStack
        bg={'#F7F7F7'}
        justifyContent={'space-between'}
        p={2}
        w={'full'}>
        <UI.Text fontWeight={'bold'}>{value || '---'}</UI.Text>
        <UI.Button
          onClick={() =>
            openModal('fileViewer2', {
              mediaDestination: data,
              title: 'Attachment',
            })
          }
          bgColor={'#E9E9E9'}
          color={'#54565A'}
          size={'sm'}
          _hover={{bgColor: '#28C76F', color: 'white'}}
          colorScheme="#EEFCEA">
          View
        </UI.Button>
      </UI.HStack>
    </UI.Stack>
  );
});

export default CompanyInfo;
