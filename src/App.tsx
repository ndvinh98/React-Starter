import React, {Suspense} from 'react';
import {theme} from '@theme';
import {ChakraProvider} from '@chakra-ui/react';
import {Router, View} from 'react-navi';
import {navigation} from '@router';
import {logs} from '@modules/logs';
import LoadingScreen from '@components/LoadingScreen';
import {serverInterceptors} from '@services';
import {Worker} from '@react-pdf-viewer/core';
import {useConfigStore} from '@services/config';

import '@assets/css/datePicker.css';
import '@assets/css/reactCheckboxTree.css';

logs();
serverInterceptors();

export default function App() {
  const setting = useConfigStore((s) => s.settings?.[0]);
  console.log('🚀 ~ setting', setting);
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
      <ChakraProvider
        theme={theme({
          topMenuColour: setting?.topMenuColour,
          leftMenuBackgroundColour: setting?.leftMenuBackgroundColour,
          leftMenuFontAndIconColour: setting?.leftMenuFontAndIconColour,
          leftMenuHighlightColour: setting?.leftMenuHighlightColour,
          leftMenuHighlightStripeColour: setting?.leftMenuHighlightStripeColour,
          backgroundColour: setting?.backgroundColour,
          fontColour: setting?.fontColour,
          fontFamily: setting?.font,
        })}>
        <Router navigation={navigation}>
          <Suspense fallback={<LoadingScreen />}>
            <View />
          </Suspense>
        </Router>
      </ChakraProvider>
    </Worker>
  );
}
