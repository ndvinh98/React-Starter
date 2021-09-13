import React, {useEffect} from 'react';
import * as yup from 'yup';
import * as UI from '@chakra-ui/react';
import useCountDown from 'react-countdown-hook';

import {useRoute, usePost} from '@utils/hooks';
import {useAuthStore} from '@modules/auth';
import FormGenerate from '@components/FormGenerate';

function Auth2FA() {
  const {loginVerifyOtp} = useAuthStore();
  const [timeLeft, actions] = useCountDown(30000, 1000);
  const {query} = useRoute();
  const toast = UI.useToast();

  const {post: resendOpt, data} = usePost('/partnerUsers/resendOtpCode');

  useEffect(() => {
    actions.start();
  }, []);

  const handleResendOtp = () => resendOpt({email: query.email});

  useEffect(() => {
    if (data) {
      toast({
        title: 'Verification code has been sent to your email!',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
      actions.start();
    }
  }, [data]);

  return (
    <UI.VStack
      height={'calc(100vh - 50px)'}
      justifyContent={{md: 'flex-start', lg: 'center'}}>
      <UI.VStack width={'380px'} p={{md: 4, lg: 0}}>
        <UI.Box pb={6}>
          <UI.Image src="/images/logo-black.png" width={150} />
        </UI.Box>
        <UI.Text
          py={5}
          fontSize="3xl"
          fontWeight={'extrabold'}
          textAlign={'center'}>
          Two-Factor Authentication
        </UI.Text>

        <UI.Text textAlign={'left'}>
          Enter the verification code that has been sent to {query?.email}
        </UI.Text>

        <FormGenerate
          spacing={6}
          pt={7}
          onSubmit={({otpCode}) => loginVerifyOtp(query?.email, otpCode)}
          schema={{
            otpCode: yup.string().required(),
          }}
          fields={[
            {
              name: 'otpCode',
              type: 'input',
              size: 'lg',
              placeholder: 'Pin code',
              label: 'Verification code:',
              layout: 'horizontal',
              width: '60%',
            },
          ]}>
          <UI.HStack
            mt={4}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <UI.Text>Didn’t receive the code?</UI.Text>
            <UI.HStack>
              {!!timeLeft && (
                <UI.Box opacity={0.7} as={'span'}>
                  (00:{timeLeft / 1000})
                </UI.Box>
              )}
              <UI.Text
                cursor={!!timeLeft ? 'no-drop' : 'pointer'}
                fontWeight={'bold'}
                onClick={!!timeLeft ? undefined : handleResendOtp}
                opacity={timeLeft ? 0.5 : 1}>
                Resend
              </UI.Text>
            </UI.HStack>
          </UI.HStack>

          <UI.Button isFullWidth mt={10} type={'submit'} size="lg">
            Verify
          </UI.Button>
        </FormGenerate>
      </UI.VStack>
    </UI.VStack>
  );
}

export default Auth2FA;
