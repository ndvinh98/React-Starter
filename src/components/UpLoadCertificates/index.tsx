import React from 'react';

import * as UI from '@chakra-ui/react';

import UploadFile from '@components/FormGenerate/fields/UploadFile';
function UpLoadCertificates() {
  return (
    <UI.VStack w="full">
      <UploadFile />
    </UI.VStack>
  );
}

export default UpLoadCertificates;
