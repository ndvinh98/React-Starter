import React from 'react';
import * as UI from '@chakra-ui/react';

function partnerTable() {
  return (
    <UI.VStack py={6} px={8} spacing={4} width="full">
      <UI.Text fontSize="2xl" fontWeight="semibold" w="full">
        Partner Management
      </UI.Text>
    </UI.VStack>
  );
}

export default partnerTable;
