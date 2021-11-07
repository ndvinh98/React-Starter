import React, {useEffect, useState, memo} from 'react';
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
}

function UploadFiles(props: IUploadFilesPorps) {
  const {
    name = 'upload-file',
    onChangeValue,
    defaultValue,
    isDisabled,
    isLoading,
  } = props;

  const [files, setFiles] = useState<any[]>(defaultValue);

  useEffect(() => {
    if (onChangeValue) onChangeValue({[name]: files});
  }, [files]);

  const onFileChange = (event: any) => {
    if (!isEmpty(event.target.files)) setFiles([...event.target.files]);
  };

  return (
    <FileDrop
      onDrop={
        isDisabled
          ? undefined
          : (files) => {
              if (!isEmpty(files)) setFiles([...files]);
            }
      }
      className={`drop-files`}>
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

          <UI.VisuallyHidden height={0}>
            <input
              onChange={onFileChange}
              className="upload-input"
              type="file"
              disabled={isDisabled}
              id={name}
            />
          </UI.VisuallyHidden>
        </UI.Box>
      </UI.Center>
    </FileDrop>
  );
}

export default memo(UploadFiles);
