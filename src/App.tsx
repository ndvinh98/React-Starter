import React from 'react';
import {theme} from '@theme';
import {ChakraProvider} from '@chakra-ui/react';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <div>This is main </div>
    </ChakraProvider>
  );
}
