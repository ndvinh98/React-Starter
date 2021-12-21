import React, {useState} from 'react';
import {IoMdCloseCircle} from 'react-icons/io';

import * as UI from '@chakra-ui/react';
import UploadThumb from '@components/UploadThumbBtn';

interface IUploadFilesProps {
  label?: string;
  className?: string;
  name?: string;
  onChangeValue?: (data: any) => void;
  defaultValue?: any[];
  isDisabled?: boolean;
  isHiddenLabel?: boolean;
  urlPath?: string;
  [key: string]: any;
}

function UploadFiles(props: IUploadFilesProps) {
  const {
    className,
    name = 'upload-file',
    onChangeValue,
    defaultValue,
    description,
  } = props;

  const [thumb, setThumb] = useState<any>(defaultValue);

  const handleOnchange = (thumb) => {
    if (thumb?.[0]) {
      onChangeValue(thumb?.[0]);
    }
  };

  return (
    <div className={className}>
      <UploadThumb
        name={name ? name : 'thumb'}
        description={description}
        onChangeValue={(res) => {
          const thumb = res?.[name] || res?.thumb;
          setThumb(thumb);
          handleOnchange(thumb);
        }}
      />
      {thumb && (
        <UI.Box mt={3} width={'120px'} position="relative">
          <UI.Circle
            onClick={() => {
              setThumb('');
            }}
            cursor="pointer"
            bg="white"
            right={-2}
            top={-2}
            position="absolute">
            <IoMdCloseCircle fontSize="20px" color="red" />
          </UI.Circle>
          <UI.Image
            boxSize={'120px'}
            borderRadius="md"
            objectFit="contain"
            src={
              typeof thumb === 'string'
                ? thumb
                : window.URL.createObjectURL(thumb?.[0])
            }
          />
        </UI.Box>
      )}
    </div>
  );
}

export default UploadFiles;
