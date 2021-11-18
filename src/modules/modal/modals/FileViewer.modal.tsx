import React, {memo, useEffect, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {useModalController} from '../modals.controller';
import '@assets/css/reactFileViewer.css';
import {AiOutlineDownload} from 'react-icons/ai';
import ReactFileViewer from 'react-file-viewer';
import {useGetItem} from '@utils/hooks';
import fileDownload from 'js-file-download';
import axios from 'axios';

const getFileType = (name: string) => {
  if (!name) return undefined;
  const names = name?.split('.');
  if (!names.length) return undefined;
  return names?.[names?.length - 1];
};

function FileViewer() {
  const {fileViewer, closeModal, data} = useModalController();
  const {getItem, data: item} = useGetItem(data?.url);
  const [fileUrl, setFileUrl] = useState();
  const [fileName, setFileName] = useState();

  useEffect(() => {
    if (fileViewer && data?.payload?.mediaDestination) {
      if (data?.payload?.mediaDestination) {
        getItem({name: JSON.stringify([data?.payload?.mediaDestination])});
      }
    }
    return () => {
      setFileUrl(null);
    };
  }, [fileViewer]);

  useEffect(() => {
    if (item?.[0]?.url && item?.[0]?.name) {
      setFileUrl(item?.[0]?.url);
      setFileName(item?.[0]?.name);
    }
  }, [item]);

  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  return (
    <UI.Modal
      isCentered
      size="5xl"
      scrollBehavior={'inside'}
      isOpen={fileViewer}
      onClose={() => closeModal('fileViewer')}>
      <UI.ModalOverlay />
      <UI.ModalContent>
        <UI.ModalHeader>
          <UI.HStack w="full" justifyContent={'space-between'} px={4}>
            <UI.Box>{data?.title}</UI.Box>
            {data?.isDownload ? (
              <UI.IconButton
                //disabled={isDisabled}
                onClick={() => handleDownload(fileUrl, fileName)}
                variant={'ghost'}
                aria-label="Notify"
                color="black"
                icon={<AiOutlineDownload size={20} />}
              />
            ) : (
              <UI.ModalCloseButton />
            )}
          </UI.HStack>
        </UI.ModalHeader>
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
