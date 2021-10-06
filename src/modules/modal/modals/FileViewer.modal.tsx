import React, {memo, useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {useModalController} from '../modals.controller';

import ReactFileViewer from 'react-file-viewer';
import {useGetItem} from '@utils/hooks';


const getFileType = (name: string) => {
  if (!name) return undefined;
  const names = name?.split('.');
  if (!names.length) return undefined;
  return names?.[names?.length - 1];
};

function FileViewer() {
  const {fileViewer, closeModal, data} = useModalController();
  const {getItem, data: item} = useGetItem('partnerUserFeedbackAttachments/downloadFileUrl');

  useEffect(() => {
    if (fileViewer) {
      if (data?.type === 'feedback') {
        getItem({name: JSON.stringify([data?.payload?.mediaDestination])});
      }
    }
  }, [fileViewer]);

  return (
    <UI.Modal
      isCentered
      isOpen={fileViewer}
      onClose={() => closeModal('fileViewer')}>
      <UI.ModalOverlay />
      <UI.ModalContent>
        <UI.ModalHeader>{data?.title}</UI.ModalHeader>
        <UI.ModalCloseButton />
        <UI.ModalBody p={5} textAlign={'center'}>
          <UI.Text> </UI.Text>
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

export default memo(FileViewer);
