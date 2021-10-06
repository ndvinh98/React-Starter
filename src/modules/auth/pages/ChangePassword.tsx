import React, {useEffect} from 'react';
import {usePost, useRouter} from '@utils/hooks';
import {Box, Button, Text, VStack, Image} from '@chakra-ui/react';
import FormGenerate from '@components/FormGenerate';
import * as yup from 'yup';

function ChangePassword() {
  const {query, replace} = useRouter();
  const {post, loading, data} = usePost('/users/resetPassword');
  useEffect(() => {
    if (data) {
      replace(`/auth/change-password-done`);
    }
  }, [data]);

  return (
    <VStack
      height={'calc(100vh - 50px)'}
      justifyContent={{md: 'flex-start', lg: 'center'}}>
      <VStack width={'350px'}>
        <Box pb={6}>
          <Image src="/images/logo-black.png" width={150} />
        </Box>
        <Text
          py={5}
          fontSize="3xl"
          fontWeight={'extrabold'}
          textAlign={'center'}>
          Create A New Password
        </Text>

        <FormGenerate
          spacing={6}
          onSubmit={({password}) => {
            post({
              newPassword: password,
              token: query?.token,
            });
          }}
          schema={{
            password: yup
              .string()
              .min(8, 'Password must be at least 8 characters')
              .required('Password is required'),
            confirmPassword: yup
              .string()
              .oneOf([yup.ref('password'), null], 'Passwords must match')
              .required('Confirm Password is required'),
          }}
          fields={[
            {
              name: 'password',
              type: 'password',
              size: 'lg',
              placeholder: 'Password',
            },
            {
              name: 'confirmPassword',
              type: 'password',
              size: 'lg',
              placeholder: 'Confirm Password',
            },
          ]}>
          <Button
            mt={10}
            isLoading={loading}
            isFullWidth
            type={'submit'}
            size="lg">
            Confirm
          </Button>
        </FormGenerate>
      </VStack>
    </VStack>
  );
}

export default ChangePassword;
