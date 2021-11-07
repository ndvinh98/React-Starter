import React, {memo, useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {useModalController} from '../modals.controller';
import {useGetItem} from '@utils/hooks';
import {Viewer} from '@react-pdf-viewer/core';
import {ProgressBar} from '@react-pdf-viewer/core';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function PDFViewer() {
  const {pdfViewer, closeModal, data} = useModalController();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const typeUrl =
    data?.title === 'Certificate'
      ? 'partnerUserCertificates/downloadFileUrl'
      : 'partnerApplicationAttachments/downloadFileUrl';

  const {getItem, data: item, loading, setData} = useGetItem(typeUrl);

  useEffect(() => {
    if (pdfViewer) {
      getItem({name: JSON.stringify([data?.mediaDestination])});
    }
    return () => {
      setData(null);
    };
  }, [pdfViewer]);

  return (
    <UI.Modal
      isCentered
      size="full"
      isOpen={pdfViewer}
      onClose={() => closeModal('pdfViewer')}>
      <UI.ModalOverlay />
      <UI.ModalContent>
        <UI.ModalHeader>{data?.title}</UI.ModalHeader>
        <UI.ModalCloseButton />
        <UI.ModalBody p={5}>
          {item?.[0]?.url && !loading && (
            <div
              style={{
                border: '1px solid rgba(0, 0, 0, 0.3)',
                height: '750px',
              }}>
              <Viewer
                plugins={[defaultLayoutPluginInstance]}
                renderLoader={(percentages: number) => (
                  <div style={{width: '240px'}}>
                    <ProgressBar progress={Math.round(percentages)} />
                  </div>
                )}
                fileUrl={item?.[0]?.url}
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
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(PDFViewer);
