//@ts-nocheck
import React, {useEffect, useState, useRef, memo} from 'react';
import {isEmpty} from 'lodash';
import {BiCloudUpload} from 'react-icons/bi';
import * as UI from '@chakra-ui/react';
import {FOLDER} from '@assets/base64/folder';
import {FileDrop} from 'react-file-drop';
import './style.css';

interface IUploadFilesPorps {
  label?: string;
  className?: string;
  name?: string;
  onChangeValue?: (data: any) => void;
  defaultValue?: any[];
  isDisabled?: boolean;
  isHiddenLabel?: boolean;
  isLoading?: boolean;
  description?: string;
  acceptFileType?: string;
}

function UploadFiles(props: IUploadFilesPorps) {
  const {
    name = 'upload-file',
    onChangeValue,
    defaultValue,
    isDisabled,
    isLoading,
    description,
    acceptFileType,
  } = props;

  const [files, setFiles] = useState<any[]>(defaultValue);
  const isChanged = useRef(false);

  useEffect(() => {
    if (onChangeValue && isChanged.current) onChangeValue({[name]: files});
  }, [files]);

  const onFileChange = (event: any) => {
    isChanged.current = true;
    if (!isEmpty(event.target.files)) setFiles([...event.target.files]);
  };

  return (
    <FileDrop
      className={`drop-files`}
      onDrop={
        isDisabled
          ? undefined
          : (files) => {
              isChanged.current = true;
              if (!isEmpty(files)) setFiles(files as any);
            }
      }>
      <UI.Center
        bg="#F8FBFF"
        px={7}
        py={5}
        borderWidth="2px"
        borderRadius="md"
        borderStyle="dashed"
        w="full">
        <UI.Box>
          <UI.VStack>
            <UI.Box>
              <img width="40px" src={FOLDER} alt="folder-icon" />
            </UI.Box>
            <UI.Text>Drag & Drop your files here</UI.Text>
            <UI.Text> Or</UI.Text>
            <UI.Button
              isLoading={isLoading}
              cursor="pointer"
              py={2}
              px={3}
              borderRadius={'md'}
              as={'label'}
              htmlFor={name}>
              <UI.Center>
                <BiCloudUpload size={20} />{' '}
                <UI.Text ml={1}>Upload file</UI.Text>
              </UI.Center>
            </UI.Button>
          </UI.VStack>

          <UI.VisuallyHidden>
            <input
              onChange={onFileChange}
              className="upload-input"
              type="file"
              disabled={isDisabled}
              id={name}
              accept={acceptFileType}
            />
          </UI.VisuallyHidden>
        </UI.Box>
      </UI.Center>
      <UI.Text fontStyle="italic" color="#BDBDBD">
        {description ? description : 'Recommended size: 300px x 200px'}
      </UI.Text>
    </FileDrop>
  );
}

export default memo(UploadFiles);
