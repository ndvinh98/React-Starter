import React, {memo, useEffect, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {useModalController} from '../modals.controller';
import {useGetItem} from '@utils/hooks';
import ReactFileViewer from 'react-file-viewer';

const getFileType = (name: string) => {
  if (!name) return undefined;
  const names = name?.split('.');
  if (!names.length) return undefined;
  return names?.[names?.length - 1];
};

function FileViewer2() {
  const {fileViewer2, closeModal, data} = useModalController();

  const [typeUrl, setTypeUrl] = useState(
    data?.title === 'Certificate'
      ? 'partnerUserCertificates/downloadFileUrl'
      : 'partnerApplicationAttachments/downloadFileUrl',
  );

  const {getItem, data: item} = useGetItem(typeUrl);

  useEffect(() => {
    if (data != null) {
      getItem({name: JSON.stringify([data?.mediaDestination])});
    }
  }, [data]);

  return (
    <UI.Modal
      isCentered
      isOpen={fileViewer2}
      onClose={() => closeModal('fileViewer2')}>
      <UI.ModalOverlay />
      <UI.ModalContent>
        <UI.ModalHeader>{data?.title}</UI.ModalHeader>
        <UI.ModalCloseButton />
        <UI.ModalBody p={5}>
          <UI.Text fontSize={{md: 'md', lg: 'xl'}} fontWeight="600">
            {item?.[0]?.name}
          </UI.Text>
          {item?.[0]?.url && (
            <ReactFileViewer
              fileType={getFileType(item?.[0]?.name)}
              filePath={item?.[0]?.url}
            />
          )}
        </UI.ModalBody>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(FileViewer2);
