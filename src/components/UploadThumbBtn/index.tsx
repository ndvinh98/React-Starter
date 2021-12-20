import React, {useEffect, useState, useRef, memo} from 'react';
import {isEmpty} from 'lodash';
import {BiCloudUpload} from 'react-icons/bi';
import * as UI from '@chakra-ui/react';

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
    <UI.Box>
      <UI.Box>
        <UI.Button
          isLoading={isLoading}
          cursor="pointer"
          py={2}
          px={3}
          borderRadius={'md'}
          as={'label'}
          htmlFor={name}>
          <UI.Center>
            <BiCloudUpload size={20} />
            <UI.Text color="white" ml={1}>
              Upload file
            </UI.Text>
          </UI.Center>
        </UI.Button>

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
      <UI.Text mt={2} fontStyle="italic" color="#BDBDBD">
        {description ? description : 'Recommended size: 300px x 200px'}
      </UI.Text>
    </UI.Box>
  );
}

export default memo(UploadFiles);
