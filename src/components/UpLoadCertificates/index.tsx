import React, {useEffect, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {useGetItem} from '@utils/hooks';

import UploadSingerFile from '@components/UploadSingerFile';
import {uploadFile} from '@services';

function UpLoadCertificates({partnerUserId}) {
  const [file, setFile] = useState();
  const {loading, getItem, data} = useGetItem<{url: string}>(
    '/partnerUserCertificates/uploadFileUrl',
  );

  const toast = UI.useToast();

  useEffect(() => {
    if (data) {
      uploadFile(data?.url, file).then(() =>
        toast({
          title: 'Successfully!',
          status: 'success',
          duration: 2000,
          position: 'top-right',
          isClosable: true,
        }),
      );
    }
  }, [data]);

  return (
    <UI.VStack alignItems="flex-start" px={5} py={3} bg="white" w="full">
      <UI.Text fontSize="18px">Upload Certificates</UI.Text>
      <UploadSingerFile
        isLoading={loading}
        name="certificate"
        onChangeValue={({certificate}) => {
          if (certificate?.[0]) {
            setFile(certificate?.[0]);
            getItem({
              partnerUserId,
              certificateName: certificate?.[0].name,
              name: certificate?.[0].name,
              type: certificate?.[0].type,
            });
          }
        }}
      />
    </UI.VStack>
  );
}

export default UpLoadCertificates;
