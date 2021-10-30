import React, {memo, useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {useModalController} from '../modals.controller';
import {useGetItem} from '@utils/hooks';
import ReactFileViewer from 'react-file-viewer';
import '@assets/css/reactFileViewer.css';

const getFileType = (name: string) => {
  if (!name) return undefined;
  const names = name?.split('.');
  if (!names.length) return undefined;
  return names?.[names?.length - 1];
};

function FileViewer2() {
  const {fileViewer2, closeModal, data} = useModalController();

  const typeUrl =
    data?.title === 'Certificate'
      ? 'partnerUserCertificates/downloadFileUrl'
      : 'partnerApplicationAttachments/downloadFileUrl';

  const {getItem, data: item, setData} = useGetItem(typeUrl);

  useEffect(() => {
    if (fileViewer2) {
      getItem({name: JSON.stringify([data?.mediaDestination])});
    }
    return () => {
      setData(null);
    };
  }, [fileViewer2]);

  return (
    <UI.Modal
      isCentered
      size="5xl"
      isOpen={fileViewer2}
      scrollBehavior={'inside'}
      onClose={() => closeModal('fileViewer2')}>
      <UI.ModalOverlay />
      <UI.ModalContent>
        <UI.ModalHeader>{data?.title}</UI.ModalHeader>
        <UI.ModalCloseButton />
        <UI.ModalBody p={5}>
          {item?.[0]?.url && (
            <div style={{height: '100%'}}>
              <ReactFileViewer
                fileType={getFileType(item?.[0]?.name)}
                filePath={item?.[0]?.url}
              />
            </div>
          )}
          <UI.Text
            textAlign="center"
            fontSize={{md: 'md', lg: 'md'}}
            fontWeight="500">
            {item?.[0]?.name}
          </UI.Text>
        </UI.ModalBody>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(FileViewer2);
