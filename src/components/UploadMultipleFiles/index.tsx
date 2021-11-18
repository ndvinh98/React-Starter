import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  memo,
} from 'react';
import {isEmpty} from 'lodash';
import {BiCloudUpload} from 'react-icons/bi';
import {RiCloseCircleFill} from 'react-icons/ri';

import {FOLDER} from '@assets/base64/folder';
import {UploadFilesStyled} from './styled';
import * as UI from '@chakra-ui/react';

interface IUploadFilesPorps {
  label?: string;
  className?: string;
  name?: string;
  onChangeValue?: (data: any) => void;
  defaultValue?: any[];
  isDisabled?: boolean;
  isHiddenLabel?: boolean;
  uploadStatus?: 'DONE' | 'FAIL' | 'PENDING';
  [key: string]: any;
}

function UploadMultipleFiles(props: IUploadFilesPorps, ref: any) {
  const {
    name = 'upload-file',
    onChangeValue,
    defaultValue,
    isDisabled,
    uploadStatus = 'PENDING',
  } = props;

  const [files, setFiles] = useState<any[]>(defaultValue || []);
  const isChanged = useRef(false);

  useEffect(() => {
    if (onChangeValue && isChanged.current) onChangeValue({[name]: files});
  }, [files]);

  const onFileChange = (event: any) => {
    isChanged.current = true;
    if (!isEmpty(event.target.files))
      setFiles((s) => [...s, ...event.target.files]);
  };

  const handleRemoveFile = (item) => {
    setFiles((s) => s.filter((x) => x.name !== item.name));
  };

  useImperativeHandle(ref, () => ({clear: () => setFiles([])}));

  return (
    <UI.Box>
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
        <UI.VStack borderWidth={'1px'} borderRadius="md" p={4}>
          <UI.Center>
            <UI.Image width="40px" src={FOLDER} alt="folder-icon" />
          </UI.Center>
          <UI.Center>Drag & Drop your files here</UI.Center>
          <UI.Text>Or</UI.Text>
          <UI.Center>
            <UI.Box
              bg={isDisabled ? 'ste.gray_lighter' : 'ste.red'}
              color={isDisabled ? 'ste.red_lighter' : 'white'}
              py={2}
              px={3}
              cursor={isDisabled ? 'no-drop' : 'pointer'}
              borderRadius={'md'}
              as={'label'}
              htmlFor={name}>
              <UI.Center>
                <BiCloudUpload size={20} />{' '}
                <UI.Text ml={1}>Upload file</UI.Text>
              </UI.Center>
            </UI.Box>
          </UI.Center>
        </UI.VStack>
        <input
          onChange={onFileChange}
          className="upload-input"
          type="file"
          multiple
          disabled={isDisabled}
          id={name}
        />
      </UploadFilesStyled>
      {!isEmpty(files) && (
        <UI.VStack mt={3}>
          {files.map((x: any, i: number) => (
            <UI.HStack w="full" key={i}>
              <UI.HStack bg="#F7F7F7" px={4} py={2}>
                <UI.Center
                  opacity={isDisabled ? 0.2 : 0.5}
                  onClick={isDisabled ? undefined : () => handleRemoveFile(x)}
                  cursor={isDisabled ? 'no-drop' : 'pointer'}>
                  <RiCloseCircleFill size={18} />
                </UI.Center>
                <UI.Text color="#1A1E32" fontWeight="bold">
                  {x.name}
                </UI.Text>
              </UI.HStack>
              {uploadStatus === 'DONE' && (
                <UI.HStack>
                  <UI.Image boxSize="16px" src="/images/done.png" />
                  <UI.Text color="#BDBDBD" fontStyle="italic">
                    Successfully uploaded
                  </UI.Text>
                </UI.HStack>
              )}
              {uploadStatus === 'FAIL' && (
                <UI.HStack>
                  <UI.Image boxSize="16px" src="/images/fail.png" />
                  <UI.Text color="#BDBDBD" fontStyle="italic">
                    Successfully uploaded
                  </UI.Text>
                </UI.HStack>
              )}
            </UI.HStack>
          ))}
        </UI.VStack>
      )}
    </UI.Box>
  );
}

export default memo(forwardRef(UploadMultipleFiles));
