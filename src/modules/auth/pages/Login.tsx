/* eslint-disable react/no-unescaped-entities */
import React, {useEffect, memo} from 'react';
import * as UI from '@chakra-ui/react';
import FormGenerate from '@components/FormGenerate';
import * as yup from 'yup';

import {ELocalStorage} from '@constants';
import {useAuthStore} from '@modules/auth';

function Login() {
  const {login, isLoading} = useAuthStore();
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
          onSubmit={({email, password}) => login(email, password)}
          schema={{
            email: yup.string().email().required('Email is a required field.'),
            password: yup
              .string()
              .min(6)
              .required('Password is a required field.'),
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
              // onClick={() => push('/auth/forgot-password')}
            >
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

          <UI.HStack justifyContent={'space-evenly'} mt={4}>
            <UI.Text fontSize={{md: '15px'}} fontStyle={'italic'}>
              Don't have an account?
            </UI.Text>
            <UI.Link
              fontSize={{md: '15px'}}
              color="ste.red"
              fontStyle={'italic'}
              // onClick={() => push('/auth/register')}
            >
              Create a new account.
            </UI.Link>
          </UI.HStack>
        </FormGenerate>
      </UI.VStack>
    </UI.VStack>
  );
}

export default Login;
