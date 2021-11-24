import React, {memo, useState, useEffect, useRef} from 'react';
import * as UI from '@chakra-ui/react';
import {useModalController} from '../modals.controller';
import {RiErrorWarningFill} from 'react-icons/ri';
import ReactAvatarEditor from 'react-avatar-editor';
import {useGetItem} from '@utils/hooks';
import {uploadFile} from '@services/attachments/uploadFile';


function UploadAvatarModal() {
  const {uploadAvatar, closeModal, data} = useModalController();
  const toast = UI.useToast();
  const [file, setFile] = useState<File>();
  const [img, setImg] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const {getItem, data: item} = useGetItem('users/uploadAvatarUrl');
  const [imgProps, setImgProps] = useState({
    image: undefined,
    allowZoomOut: false,
    position: {
      x: 0.5,
      y: 0.5,
    },
    scale: 1,
    rotate: 0,
    borderRadius: 150,
    width: 300,
    height: 300,
  });
  const editorRef = useRef<any>();

  const createFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    const metadata = {
      type: 'image/jpeg',
    };
    const file = new File([data], 'avatar.jpg', metadata);
    setImgProps({...imgProps, image: file});
    setFile(file);
  };

  useEffect(() => {
    if (data?.image) {
      createFile(data?.image);
    }
  }, [data?.image]);

  const handlePositionChange = (position) => {
    setImgProps({...imgProps, position: position});
  };

  const handleNewImage = (e) => {
    setImgProps({...imgProps, image: e.target.files[0]});
    setFile(e.target.files[0]);
  };

  const handleScale = (e) => {
    setImgProps({...imgProps, scale: e.target.value});
  };

  const dataURLtoFile = (dataUrl, fileName) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, {type: mime});
  };

  const handleSaveAvatar = () => {
    if (file) {
      const imgURL = editorRef.current?.getImageScaledToCanvas()?.toDataURL();
      setImg(dataURLtoFile(imgURL, file?.name));
      setLoading(true);
    } else {
      toast({
        title: 'Please Select Image!',
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleUpFile = (url: string, payload: File) => {
    uploadFile(url, payload).then(() => {
      setLoading(false);
      toast({
        title: 'Successfully!',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
      closeModal('uploadAvatar');
      data?.cb();
    });
  };

  useEffect(() => {
    if (item && item?.url && img) {
      handleUpFile(item.url, img);
    }
  }, [item]);

  useEffect(() => {
    if (img) {
      getItem({
        name: img?.name,
        type: img?.type,
        userId: data?.userId,
      });
    }
  }, [img]);

  return (
    <UI.Modal
      isCentered
      isOpen={uploadAvatar}
      onClose={() => closeModal('uploadAvatar')}>
      <UI.ModalOverlay />
      <UI.ModalContent w="550px" position={'relative'}>
        <UI.Circle
          position={'absolute'}
          top={'-22px'}
          left={'50%'}
          transform={'translateX(-50%)'}
          size={'55px'}
          bg={'white'}>
          <UI.Circle>
            <RiErrorWarningFill color={'#E43A3A'} size={'50px'} />
          </UI.Circle>
        </UI.Circle>

        <UI.ModalHeader mt={8}>
          <UI.Center ontSize={'lg'} color={'ste.red'}>
            Edit Avatar
          </UI.Center>
        </UI.ModalHeader>
        <UI.ModalBody fontSize={'lg'} textAlign={'center'}>
          <UI.VStack spacing={4}>
            <ReactAvatarEditor
              ref={editorRef}
              scale={imgProps.scale}
              width={imgProps.width}
              height={imgProps.height}
              position={imgProps.position}
              onPositionChange={handlePositionChange}
              rotate={imgProps.rotate}
              borderRadius={imgProps.borderRadius}
              image={imgProps.image}
              className="editor-canvas"
            />

            <input
              accept="image/png, image/jpeg"
              name="newImage"
              type="file"
              onChange={handleNewImage}
            />

            <UI.HStack>
              <UI.Text>Zoom: </UI.Text>
              <input
                name="scale"
                type="range"
                onChange={handleScale}
                min={'1'}
                max="2"
                step="0.01"
                defaultValue="1"
              />
            </UI.HStack>
          </UI.VStack>
        </UI.ModalBody>

        <UI.ModalFooter>
          <UI.Center w={'full'}>
            <UI.Button
              isLoading={loading}
              onClick={handleSaveAvatar}
              mr={4}
              w={'120px'}>
              Save
            </UI.Button>
            <UI.Button
              variant="outline"
              w={'120px'}
              onClick={() => closeModal('uploadAvatar')}>
              Cancel
            </UI.Button>
          </UI.Center>
        </UI.ModalFooter>
      </UI.ModalContent>
    </UI.Modal>
  );
}

export default memo(UploadAvatarModal);
