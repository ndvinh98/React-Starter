import React from 'react';
import {NotFoundBoundary} from 'react-navi';
import NotFound from '@components/404NotFound';
import * as UI from '@chakra-ui/react';
import {useMedia} from '@utils/hooks';
import envConfig from '@env';

import Header from '@components/Header';
import Sidebar from '@components/Sidebar';
import InitModals from '@modules/modal';

function HomeLayout({children}: any) {
  const {isAllMobile, isBase} = useMedia();

  return (
    <NotFoundBoundary render={() => <NotFound />}>
      <UI.HStack spacing={0}>
        {isBase && (
          <UI.Box w={'min-content'}>
            <Sidebar.base />
          </UI.Box>
        )}
        {isAllMobile && <Sidebar.mobile />}
        <UI.Box w={'full'} bg={'ste.gray_lighter'}>
          {isBase && <Header.base />}
          {isAllMobile && <Header.mobile />}
          <UI.Box
            bg={'ste.gray_lighter'}
            h={'calc(100vh - 60px)'}
            overflow={'auto'}
            w={'full'}>
            {children}
            <UI.Text mt={3} textAlign={'center'}>
              Copyright © 2020 ST Engineering - ver {envConfig().FE_VERSION}
            </UI.Text>
            <InitModals />
          </UI.Box>
        </UI.Box>
      </UI.HStack>
    </NotFoundBoundary>
  );
}

export default HomeLayout;
