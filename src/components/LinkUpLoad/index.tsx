import React, {memo, useEffect, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {isEmpty} from 'lodash';
import {HTMLChakraProps} from '@chakra-ui/system';
import {useGetItem} from '@utils/hooks';
import {uploadFile} from '@services/attachments/uploadFile';
import {useAuthController} from '@modules/auth';

export interface ILinkUploadProps extends HTMLChakraProps<'div'> {
  label?: string;
  name: string;
  displayName?: string;
  src?: string;
  boxSize?: string;
  userId: number;
  cb?: () => void;
}

function LinkUpload(props: ILinkUploadProps) {
  const {
    label = 'Edit Photo',
    name,
    displayName,
    boxSize,
    src,
    userId,
    cb,
    ...others
  } = props;
  const {isOpen, onOpen, onClose} = UI.useDisclosure();
  const {getItem, data: item} = useGetItem('users/uploadAvatarUrl');
  const [file, setFile] = useState<File>(null);
  const {getMe} = useAuthController();

  const onFileChange = (event: any) => {
    if (!isEmpty(event.target.files)) {
      onOpen();
      const file = event.target.files?.[0] as File;
      setFile(file);
      getItem({
        name: file?.name,
        type: file?.type,
        userId: userId,
      });
    }
  };

  const handleUpFile = async (url: string, payload: File) => {
    await uploadFile(url, payload);
    onClose();
    getMe();
    cb?.();
  };

  useEffect(() => {
    if (item && item?.url) {
      handleUpFile(item.url, file);
    }
  }, [item]);

  return (
    <UI.VStack cursor="pointer" maxH="max-content" {...others}>
      {isOpen ? (
        <UI.Circle boxSize={boxSize} bg="ste.red">
          <UI.Spinner size="xl" color="white" />
        </UI.Circle>
      ) : (
        <UI.Avatar
          sx={{
            img: {
              objectFit: 'contain',
            },
          }}
          bg={src ? 'white' : undefined}
          shadow="sm"
          boxSize={boxSize}
          name={displayName}
          src={src}
        />
      )}
      {!isOpen ? (
        <UI.Text
          color="#5A8BEF"
          fontSize="14px"
          fontWeight="semibold"
          htmlFor={name}
          as="label">
          {label}
        </UI.Text>
      ) : (
        <UI.Text pl={2}>Uploading...</UI.Text>
      )}
      <UI.VisuallyHidden>
        <input
          type="file"
          onChange={onFileChange}
          id={name}
          name={name}
          accept="image/png, image/jpeg"
        />
      </UI.VisuallyHidden>
    </UI.VStack>
  );
}

export default memo(LinkUpload);
