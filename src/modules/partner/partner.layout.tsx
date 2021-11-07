import React, {memo} from 'react';
import {NotFoundBoundary} from 'react-navi';
import NotFound from '@components/404NotFound';
import * as UI from '@chakra-ui/react';
import envConfig from '@env';
import {View} from 'react-navi';

import Header from '@components/Header';
import Sidebar from '@components/PartnerSidebar';
import InitModals from '@modules/modal';

function HomeLayout() {
  return (
    <NotFoundBoundary render={() => <NotFound />}>
      <UI.HStack spacing={0}>
        <UI.Box w={'min-content'}>
          <Sidebar />
        </UI.Box>
        <UI.Box w={'full'} bg={'ste.gray_lighter'}>
          <Header.base type="sales" />
          <UI.Box
            bg={'ste.gray_lighter'}
            h={'calc(100vh - 60px)'}
            overflow={'auto'}
            w={'full'}>
            <View />
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

export default memo(HomeLayout);
