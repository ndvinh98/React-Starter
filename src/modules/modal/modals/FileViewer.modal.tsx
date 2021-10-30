import React, {memo, useEffect, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {useModalController} from '../modals.controller';
import '@assets/css/reactFileViewer.css';

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
  const {getItem, data: item, setData} = useGetItem(data?.url);
  const [fileUrl, setFileUrl] = useState();
  const [fileName, setFileName] = useState();

  useEffect(() => {
    if (fileViewer && data?.payload?.mediaDestination) {
      if (data?.payload?.mediaDestination) {
        getItem({name: JSON.stringify([data?.payload?.mediaDestination])});
      }
    }
    return () => {
      setData(null);
    };
  }, [fileViewer]);

  useEffect(() => {
    if (item?.[0]?.url && item?.[0]?.name) {
      setFileUrl(item?.[0]?.url);
      setFileName(item?.[0]?.name);
    }
  }, [item]);

  return (
    <UI.Modal
      isCentered
      size="5xl"
      scrollBehavior={'inside'}
      isOpen={fileViewer}
      onClose={() => closeModal('fileViewer')}>
      <UI.ModalOverlay />
      <UI.ModalContent>
        <UI.ModalHeader>{data?.title}</UI.ModalHeader>
        <UI.ModalCloseButton />
        <UI.ModalBody p={5} textAlign={'center'}>
          <UI.Text> </UI.Text>
          {fileUrl && fileName && (
            <div style={{height: '100%'}}>
              <ReactFileViewer
                fileType={getFileType(fileName)}
                filePath={fileUrl}
              />
            </div>
          )}
        </UI.ModalBody>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(FileViewer);
