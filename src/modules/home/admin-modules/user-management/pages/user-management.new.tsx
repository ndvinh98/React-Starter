import React, {useEffect, useRef} from 'react';
import * as UI from '@chakra-ui/react';
import FormGenerate from '@components/FormGenerate';
import {COUNTRY_NAME} from '@constants';
import {BsArrowLeft} from 'react-icons/bs';
import * as yup from 'yup';
import {useConfigStore} from '@services/config';
import {usePost, useRouter, useMedia} from '@utils/hooks';
import {isEmpty} from 'lodash';

function Addnew() {
  const {languages} = useConfigStore();
  const {post, loading, data} = usePost('/users');
  const toast = UI.useToast();
  const {isBase} = useMedia();
  const {push} = useRouter();
  const formRef = useRef(null);

  useEffect(() => {
    if (!isEmpty(data)) {
      formRef?.current?.reset?.({
        salutation: '',
        firstName: '',
        lastName: '',
        salesId: '',
        email: '',
        userType: '',
        jobTitle: '',
        countryName: '',
        cityName: '',
        postalCode: '',
        workNumber: '',
        mobileNumber: '',
        languageId: 1,
        showMobileNumber: 0,
        showWorkNumber: 0,
      });
      toast({
        title: 'Success',
        position: 'top-right',
        description: 'Create a user successfully!',
        status: 'success',
        duration: 2000,
      });
      push('/home/user-management');
    }
  }, [data]);

  const onFormSubmit = (value) => {
    value = {
      ...value,
      showWorkNumber: value.showWorkNumber ? 1 : 0,
      showMobileNumber: value.showMobileNumber ? 1 : 0,
    };
    post(value);
  };

  return (
    <UI.Box py={6} px={8} spacing={4} width="full">
      <UI.HStack
        _hover={{cursor: 'pointer'}}
        onClick={() => push('/home/user-management')}>
        <BsArrowLeft size={20} />
        <UI.Text fontSize={'14px'}>Back</UI.Text>
      </UI.HStack>
      <UI.Text fontWeight={'bold'} fontSize={'20px'} pt={'3'}>
        New User
      </UI.Text>
      <UI.Box bgColor={'white'} p={{lg: 12, md: 4}} mt={4}>
        <UI.Text fontWeight={'bold'} mb={4} fontSize={'20px'}>
          USER INFORMATION
        </UI.Text>
        <FormGenerate
          ref={formRef}
          onSubmit={(value) => onFormSubmit(value)}
          schema={{
            salutation: yup.string().required('Please select Salutation'),
            firstName: yup.string().required('Please enter First Name'),
            lastName: yup.string().required('Please enter Last Name'),
            email: yup
              .string()
              .email('Email is invalid')
              .required('Please enter Work Email Address'),
            userType: yup.string().required('Please Select Role'),
            jobTitle: yup.string().required('Please enter Job Title'),
            countryName: yup.string().required('Please select Country'),
            cityName: yup.string().required('Please enter City'),
            postalCode: yup.string().required('Please enter Postal Code'),
            workNumber: yup.string().required('Please enter Work Number'),
            mobileNumber: yup.string().required('Please enter Mobile Number'),
            languageId: yup
              .string()
              .required('Please select Preferred Lanuage'),
          }}
          fields={[
            {
              isClearable: false,
              name: 'salutation',
              type: 'select',
              colSpan: 12,
              size: 'md',
              width: isBase ? '70%' : '100%',
              layout: isBase ? 'horizontal' : 'vertical',
              label: 'Salutation',
              placeholder: 'Salutation',
              options: [
                {value: 'MR', label: 'Mr'},
                {value: 'MRS', label: 'Mrs'},
                {value: 'MISS', label: 'Miss'},
                {value: 'DR', label: 'Dr'},
                {value: 'MADAM', label: 'Madam'},
              ],
            },
            {
              name: 'firstName',
              type: 'input',
              label: 'First Name',
              placeholder: 'First Name',
              colSpan: 12,
              size: 'md',
              width: isBase ? '70%' : '100%',
              layout: isBase ? 'horizontal' : 'vertical',
            },
            {
              type: 'input',
              name: 'lastName',
              label: 'Last Name',
              placeholder: 'Last Name',
              colSpan: 12,
              size: 'md',
              width: isBase ? '70%' : '100%',
              layout: isBase ? 'horizontal' : 'vertical',
            },

            {
              name: 'email',
              type: 'input',
              label: 'Work Email Address',
              placeholder: 'Work Email Address',
              colSpan: 12,
              size: 'md',
              width: isBase ? '70%' : '100%',
              layout: isBase ? 'horizontal' : 'vertical',
            },
            {
              isClearable: false,
              name: 'userType',
              type: 'select',
              colSpan: 12,
              size: 'md',
              width: isBase ? '70%' : '100%',
              layout: isBase ? 'horizontal' : 'vertical',
              label: 'Role',
              placeholder: 'Admin or Sales Manager',
              options: [
                {value: 'ADMIN', label: 'Admin'},
                {value: 'USER', label: 'Sales Manager'},
              ],
            },
            {
              isClearable: false,
              name: 'salesId',
              type: 'input',
              colSpan: 12,
              size: 'md',
              width: isBase ? '70%' : '100%',
              layout: isBase ? 'horizontal' : 'vertical',
              label: 'Sales ID (Only for Sales Mgr)',
              placeholder: 'Enter Sales ID',
            },
            {
              name: 'jobTitle',
              type: 'input',
              label: 'Job Title',
              placeholder: 'Job Title',
              colSpan: 12,
              size: 'md',
              width: isBase ? '70%' : '100%',
              layout: isBase ? 'horizontal' : 'vertical',
            },
            {
              isClearable: false,
              name: 'countryName',
              type: 'select',
              colSpan: 12,
              label: 'Country',
              size: 'md',
              width: isBase ? '70%' : '100%',
              layout: isBase ? 'horizontal' : 'vertical',
              placeholder: 'Country',
              options: COUNTRY_NAME.map((x) => ({
                value: x?.country,
                label: x?.country,
              })),
            },
            {
              name: 'cityName',
              type: 'input',
              label: 'City',
              placeholder: 'City',
              colSpan: 12,
              size: 'md',
              width: isBase ? '70%' : '100%',
              layout: isBase ? 'horizontal' : 'vertical',
            },
            {
              name: 'postalCode',
              type: 'input',
              label: 'Postal Code',
              placeholder: 'Postal Code',
              colSpan: 12,
              size: 'md',
              width: isBase ? '70%' : '100%',
              layout: isBase ? 'horizontal' : 'vertical',
            },
            {
              name: 'workNumber',
              type: 'input-tel',
              label: 'Work No.',
              placeholder: 'Work Number',
              colSpan: 12,
              size: 'md',
              width: isBase ? '70%' : '100%',
              layout: isBase ? 'horizontal' : 'vertical',
            },
            {
              name: 'showWorkNumber',
              type: 'input-checkbox',
              colSpan: 12,
              checkboxLabel: 'Display to Partners',
              checkboxName: 'showWorkNumber',
              checkboxDefaultValue: false,
              label: <UI.Text></UI.Text>,
              layout: isBase ? 'horizontal' : 'vertical',
              width: isBase ? '70%' : '100%',
            },

            {
              name: 'mobileNumber',
              type: 'input-tel',
              label: 'Mobile No',
              placeholder: 'Mobile No.',
              colSpan: 12,
              size: 'md',
              width: isBase ? '70%' : '100%',
              layout: isBase ? 'horizontal' : 'vertical',
            },

            {
              name: 'showMobileNumber',
              type: 'input-checkbox',
              colSpan: 12,
              checkboxLabel: 'Display to Partners',
              checkboxName: 'showMobileNumber',
              checkboxDefaultValue: false,
              label: <UI.Text></UI.Text>,
              layout: isBase ? 'horizontal' : 'vertical',
              width: isBase ? '70%' : '100%',
            },

            {
              isClearable: false,
              name: 'languageId',
              type: 'select',
              label: 'Preferred Language',
              size: 'md',
              width: isBase ? '70%' : '100%',
              layout: isBase ? 'horizontal' : 'vertical',
              placeholder: 'Preferred Language',
              colSpan: 12,
              options: languages.map((x) => ({
                value: x.id,
                label: x.name,
              })),
            },
          ]}>
          <UI.Center mt={8}>
            <UI.Button isLoading={loading} type={'submit'}>
              Create New User
            </UI.Button>
          </UI.Center>
        </FormGenerate>
      </UI.Box>
    </UI.Box>
  );
}

export default Addnew;
