import React, {memo, useEffect, useState} from 'react';
import * as UI from '@chakra-ui/react';
import {HTMLChakraProps} from '@chakra-ui/system';
import {useModalController} from '@modules/modal';

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
  const {openModal} = useModalController();

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
  const {isOpen} = UI.useDisclosure();

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
          onClick={() =>
            openModal('uploadAvatar', {
              userId: userId,
              cb: cb,
              image: src,
            })
          }
          as="label">
          {label}
        </UI.Text>
      ) : (
        <UI.Text pl={2}>Uploading...</UI.Text>
      )}
    </UI.VStack>
  );
}

export default memo(LinkUpload);
