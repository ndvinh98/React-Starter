import React, {useEffect, useRef} from 'react';

import {usePost, useRouter} from '@utils/hooks';
import {Box, Button, Text, VStack, HStack, Image} from '@chakra-ui/react';
import FormGenerate from '@components/FormGenerate';
import * as yup from 'yup';

function ForgotPassword() {
  const {push, replace} = useRouter();
  const {post, loading, data} = usePost('/partnerUsers/forgotPassword');
  const email = useRef<string>('');

  useEffect(() => {
    if (data) {
      replace(`/auth/forgot-password-verify?email=${email.current}`);
    }
  }, [data]);

  return (
    <VStack
      height={'calc(100vh - 50px)'}
      justifyContent={{md: 'flex-start', lg: 'center'}}>
      <VStack width={'340px'}>
        <Box pb={6}>
          <Image src="/images/logo-black.png" width={150} />
        </Box>
        <Text
          py={5}
          fontSize="3xl"
          fontWeight={'extrabold'}
          textAlign={'center'}>
          Forgot Your Password?
        </Text>

        <Text textAlign={'left'}>
          If you have forgotten your password, please enter your user email
          address below and click next. You will receive a message to reset or
          create a new password shortly.
        </Text>

        <FormGenerate
          spacing={6}
          pt={7}
          onSubmit={(value) => {
            post(value);
            email.current = value?.email;
          }}
          schema={{
            email: yup.string().email().required(),
          }}
          fields={[
            {
              name: 'email',
              type: 'input',
              size: 'lg',
              placeholder: 'Enter your email',
            },
          ]}>
          <HStack justifyContent={'space-between'} mt={10}>
            <Button
              onClick={() => push('/auth/login')}
              variant="outline"
              width={'45%'}
              type={'submit'}
              size="lg">
              Back
            </Button>
            <Button width={'45%'} isLoading={loading} type={'submit'} size="lg">
              Next
            </Button>
          </HStack>
        </FormGenerate>
      </VStack>
    </VStack>
  );
}

export default ForgotPassword;
