import React, {useEffect, useState, useRef} from 'react';
import {isEmpty} from 'lodash';
import {BiCloudUpload} from 'react-icons/bi';
import {RiCloseCircleFill} from 'react-icons/ri';
import {Center, Text, Box} from '@chakra-ui/react';

import {FOLDER} from '@assets/base64/folder';
import {LabelStyled, PreviewStyled, UploadFilesStyled} from './styled';

interface IUploadFilesPorps {
  label?: string;
  className?: string;
  name?: string;
  onChangeValue?: (data: any) => void;
  defaultValue?: any[];
  isDisabled?: boolean;
  isHiddenLabel?: boolean;
  [key: string]: any;
}

function UploadFiles(props: IUploadFilesPorps) {
  const {
    label,
    className,
    name = 'upload-file',
    onChangeValue,
    defaultValue,
    isDisabled,
    isHiddenLabel,
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

  const handleRemoveFile = (index: number) => {
    const res = files.splice(index + 1, 1);
    setFiles(res);
  };

  return (
    <div className={className}>
      {label && !isHiddenLabel && <LabelStyled>{label}</LabelStyled>}
      {!isEmpty(files) && (
        <PreviewStyled>
          {files.map((x: any, i: number) => (
            <div className="file-item" key={i}>
              {x.name}
              <Center
                opacity={isDisabled ? 0.6 : 1}
                onClick={isDisabled ? undefined : () => handleRemoveFile(i)}
                cursor={isDisabled ? 'no-drop' : 'pointer'}
                position={'absolute'}
                right={-2}
                top={-2}>
                <RiCloseCircleFill size={24} />
              </Center>
            </div>
          ))}
        </PreviewStyled>
      )}
      <UploadFilesStyled
        onDrop={
          isDisabled
            ? undefined
            : (files) => {
                isChanged.current = true;
                if (!isEmpty(files)) setFiles([...files]);
              }
        }
        className={`cursor-pointer`}>
        <div className="upload-content mt-2 px-5 py-8">
          <div className="flex justify-center mb-4">
            <img width="40px" src={FOLDER} alt="folder-icon" />
          </div>
          <div className="upload-text text-center">
            Drag & Drop your files here
          </div>
          <div className="upload-text text-center py-4">Or</div>
          <div className="w-full flex justify-center">
            <Box
              bg={isDisabled ? 'ste.gray_lighter' : 'ste.red'}
              color={isDisabled ? 'ste.red_lighter' : 'white'}
              py={2}
              px={3}
              cursor={isDisabled ? 'no-drop' : 'pointer'}
              borderRadius={'md'}
              as={'label'}
              htmlFor={name}>
              <Center>
                <BiCloudUpload size={20} /> <Text ml={1}>Upload file</Text>
              </Center>
            </Box>
          </div>
        </div>
        <input
          onChange={onFileChange}
          className="upload-input"
          type="file"
          disabled={isDisabled}
          id={name}
        />
      </UploadFilesStyled>
    </div>
  );
}

export default UploadFiles;
