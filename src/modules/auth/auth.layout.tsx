import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
import envConfig from '@env';
import {useMedia} from '@utils/hooks';
import {NotFoundBoundary} from 'react-navi';
import NotFound from '@components/404NotFound';

function AuthLayout({children}: any) {
  const {isAllMobile, isBase} = useMedia();

  return (
    <NotFoundBoundary render={() => <NotFound />}>
      <UI.Stack
        w="100vw"
        h="100vh"
        overflow="hidden"
        direction={{md: 'column', lg: 'row'}}>
        <UI.Box
          w={{md: '100vw', lg: '50vw'}}
          h={{md: '30vh', lg: '100vh'}}
          overflow="hidden">
          {isAllMobile && (
            <UI.Image
              w="full"
              height="full"
              fit="cover"
              src="/images/img-login-page.png"
            />
          )}
          {isBase && (
            <UI.Image
              w="full"
              height="full"
              fit="cover"
              src="/images/img-login-page.png"
            />
          )}
        </UI.Box>
        <UI.Box
          w={{md: '100vw', lg: '50vw'}}
          h={{md: '70vh', lg: '100vh'}}
          overflow={'auto'}>
          <UI.VStack justifyContent={'space-between'} py={3} height={'70vh'}>
            <UI.Box>{children}</UI.Box>
            <UI.Text textAlign={'center'}>
              Copyright © 2020 ST Engineering - ver {envConfig().FE_VERSION}
            </UI.Text>
          </UI.VStack>
        </UI.Box>
      </UI.Stack>
    </NotFoundBoundary>
  );
}

export default memo(AuthLayout);
