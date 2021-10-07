/* eslint-disable react/no-unescaped-entities */
import React, {useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import FormGenerate from '@components/FormGenerate';
import * as yup from 'yup';

import {ELocalStorage} from '@constants';
import {useAuthController} from '@modules/auth';
import {useRouter} from '@utils/hooks';

function Login() {
  const {login, isLoading} = useAuthController();
  const {push} = useRouter();
  useEffect(() => {
    localStorage.setItem(ELocalStorage.REMEMBER_ACCESS_TOKEN, '0');
  }, []);

  return (
    <UI.VStack
      height={{lg: 'calc(100vh - 50px)'}}
      justifyContent={{md: 'flex-start', lg: 'center'}}>
      <UI.VStack width={'360px'} p={{md: 4, lg: 0}}>
        <UI.Box pb={6}>
          <UI.Image src="/images/logo-black.png" width={150} />
        </UI.Box>
        <UI.Text
          py={5}
          fontSize="3xl"
          fontWeight={'extrabold'}
          textAlign={'center'}>
          Login To Your Account
        </UI.Text>

        <FormGenerate
          spacing={6}
          onSubmit={({email, password}) => {
            login(email, password);
          }}
          schema={{
            email: yup.string().email().required('Email is a required field.'),
            password: yup
              .string()
              .min(8, 'Password must be at least 8 characters')
              .required('Password is required'),
          }}
          fields={[
            {
              name: 'email',
              type: 'input',
              size: 'lg',
              placeholder: 'Email',
            },
            {
              name: 'password',
              type: 'password',
              size: 'lg',
              placeholder: 'Password',
            },
          ]}>
          <UI.HStack mt={4} justifyContent={'space-between'}>
            <UI.Checkbox
              onChange={(e) => {
                if (e.target.checked)
                  localStorage.setItem(
                    ELocalStorage.REMEMBER_ACCESS_TOKEN,
                    '1',
                  );
                else
                  localStorage.setItem(
                    ELocalStorage.REMEMBER_ACCESS_TOKEN,
                    '0',
                  );
              }}
              size={'lg'}>
              <UI.Text fontSize={'md'}>Remember me</UI.Text>
            </UI.Checkbox>
            <UI.Link
              color="ste.red"
              fontSize={'md'}
              fontStyle={'italic'}
              onClick={() => push('/auth/forgot-password')}>
              Forgot password?
            </UI.Link>
          </UI.HStack>

          <UI.Button
            isLoading={isLoading}
            mt={10}
            type={'submit'}
            isFullWidth
            size="lg">
            Login now
          </UI.Button>
        </FormGenerate>
      </UI.VStack>
    </UI.VStack>
  );
}

export default Login;
