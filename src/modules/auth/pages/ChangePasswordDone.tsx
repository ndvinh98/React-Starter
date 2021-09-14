import React from 'react';
import {useRouter} from '@utils/hooks';
import {Box, Button, Text, VStack, HStack, Image} from '@chakra-ui/react';

function ChangePasswordDone() {
  const {replace} = useRouter();

  return (
    <VStack
      height={'calc(100vh - 50px)'}
      justifyContent={{md: 'flex-start', lg: 'center'}}>
      <VStack width={'350px'}>
        <Box pb={6}>
          <Image src="/images/logo-black.png" width={150} />
        </Box>
        <Image py={4} src="../images/check_done.png" alt={'check_done'} />
        <Text
          pt={5}
          fontSize="3xl"
          fontWeight={'extrabold'}
          textAlign={'center'}>
          Password Changed!
        </Text>
        <Text>Your password has been changed successfully!</Text>
        <HStack w={'100%'} pt={10}>
          <Button onClick={() => replace('/auth/login')} isFullWidth size="lg">
            Back to login
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}

export default ChangePasswordDone;
