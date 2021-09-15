import React from 'react';

import {useRouter} from '@utils/hooks';
import {useRouterController} from '@modules/router';
import {Box, Button, Text, VStack, Image} from '@chakra-ui/react';

function ForgotPasswordDone() {
  const {replace} = useRouter();
  const {query} = useRouterController();
  return (
    <VStack
      height={'calc(100vh - 50px)'}
      justifyContent={{md: 'flex-start', lg: 'center'}}>
      <VStack width={'390px'} p={{md: 4, lg: 0}}>
        <Box pb={6}>
          <Image src="/images/logo-black.png" width={150} />
        </Box>
        <Text
          py={5}
          fontSize="3xl"
          fontWeight={'extrabold'}
          textAlign={{md: 'left', lg: 'center'}}>
          We Have Sent You An Email
        </Text>

        <Text textAlign={'left'}>
          {`If your email is registered with us, you will receive an email shortly
        with a message to reset your password at ${query?.email}. Please follow
        the instructions in the email.`}
        </Text>
        <Box w={'100%'}>
          <Button
            mt={10}
            onClick={() => replace('/auth/login')}
            isFullWidth
            type={'submit'}
            size="lg">
            Back to login
          </Button>
        </Box>
      </VStack>
    </VStack>
  );
}

export default ForgotPasswordDone;
