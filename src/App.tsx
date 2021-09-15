import React, {Suspense} from 'react';
import {theme} from '@theme';
import {ChakraProvider} from '@chakra-ui/react';
import {Router, View} from 'react-navi';
import {navigation} from '@router';
import {logs} from '@modules/logs';
import LoadingScreen from '@components/LoadingScreen';
logs();
export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router navigation={navigation}>
        <Suspense fallback={<LoadingScreen />}>
          <View />
        </Suspense>
      </Router>
    </ChakraProvider>
  );
}
