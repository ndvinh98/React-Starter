import React, {Suspense} from 'react';
import {theme} from '@theme';
import {ChakraProvider} from '@chakra-ui/react';
import {Router, View} from 'react-navi';
import {navigation} from '@router';
import {logs} from '@modules/logs';
import LoadingScreen from '@components/LoadingScreen';
import {serverInterceptors} from '@services';
import {Worker} from '@react-pdf-viewer/core';

import '@assets/css/datePicker.css';
import '@assets/css/reactCheckboxTree.css';

logs();
serverInterceptors();

export default function App() {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
      <ChakraProvider theme={theme}>
        <Router navigation={navigation}>
          <Suspense fallback={<LoadingScreen />}>
            <View />
          </Suspense>
        </Router>
      </ChakraProvider>
    </Worker>
  );
}
