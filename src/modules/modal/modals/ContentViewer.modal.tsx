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

function ContentViewer() {
  const {contentViewer, closeModal, data} = useModalController();

  const typeUrl =
    data?.title === 'Certificate'
      ? 'partnerUserCertificates/downloadFileUrl'
      : 'partnerApplicationAttachments/downloadFileUrl';

  const {getItem, data: item, loading, setData} = useGetItem(typeUrl);

  useEffect(() => {
    if (contentViewer) {
      getItem({name: JSON.stringify([data?.mediaDestination])});
    }
    return () => {
      setData(null);
    };
  }, [contentViewer]);

  return (
    <UI.Modal
      isCentered
      size="5xl"
      isOpen={contentViewer}
      scrollBehavior={'inside'}
      onClose={() => closeModal('contentViewer')}>
      <UI.ModalOverlay />
      <UI.ModalContent minH="200px" width="auto">
        <UI.ModalHeader>{data?.title}</UI.ModalHeader>
        <UI.ModalCloseButton />
        {loading ? (
          <UI.Center minW="200px" minH="200px">
            <UI.Spinner size="lg" color="ste.red" />
          </UI.Center>
        ) : (
          <UI.ModalBody p={5}>
            {item?.[0]?.url && !loading && (
              <div style={{height: '100%'}}>
                <ReactFileViewer
                  fileType={getFileType(item?.[0]?.name)}
                  filePath={item?.[0]?.url}
                />
              </div>
            )}
            <UI.Text
              textAlign="center"
              mt={2}
              fontSize={{md: 'md', lg: 'md'}}
              fontWeight="500">
              {item?.[0]?.name}
            </UI.Text>
          </UI.ModalBody>
        )}
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(ContentViewer);
