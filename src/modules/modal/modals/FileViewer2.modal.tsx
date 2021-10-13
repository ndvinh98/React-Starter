import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
import {useModalController} from '../modals.controller';

import ReactFileViewer from 'react-file-viewer';

const getFileType = (name: string) => {
  if (!name) return undefined;
  const names = name?.split('.');
  if (!names.length) return undefined;
  return names?.[names?.length - 1];
};

function FileViewer2() {
  const {fileViewer2, closeModal, data} = useModalController();

  return (
    <UI.Modal
      isCentered
      isOpen={fileViewer2}
      onClose={() => closeModal('fileViewer2')}>
      <UI.ModalOverlay />
      <UI.ModalContent>
        <UI.ModalHeader>{data?.title}</UI.ModalHeader>
        <UI.ModalCloseButton />
        <UI.ModalBody p={5} textAlign={'center'}>
          <UI.Text> </UI.Text>
          {data?.payload?.[0]?.url && (
            <ReactFileViewer
              fileType={getFileType(data?.payload?.[0]?.name)}
              filePath={data?.payload?.[0]?.url}
            />
          )}
        </UI.ModalBody>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(FileViewer2);
