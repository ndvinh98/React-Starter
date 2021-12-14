import React, {useEffect, useState, useRef} from 'react';
import {IoMdCloseCircle} from 'react-icons/io';

import * as UI from '@chakra-ui/react';
import UploadThumb from '@components/UploadThumbBtn';
import {useGetItem} from '@utils/hooks';
import {uploadFile} from '@services';

interface IUploadFilesPorps {
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

function UploadFiles(props: IUploadFilesPorps) {
  const {
    className,
    name = 'upload-file',
    onChangeValue,
    defaultValue,
    description,
    urlPath,
  } = props;

  const {data, getItem} = useGetItem<{url: string; value: string}>(urlPath);

  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState();
  const [thumb, setThumb] = useState<any>(defaultValue);

  useEffect(() => {
    if (data) {
      uploadFile(data.url, file)
        .then(() => setThumb(data.value))
        .finally(() => setUploading(false));
    }
  }, [data]);

  const handleOnchange = (thumb) => {
    if (thumb?.[0]) {
      setUploading(true);
      setFile(thumb?.[0]);
      getItem({
        name: thumb?.[0]?.name,
        type: thumb?.[0]?.type,
      });
    }
  };

  const initThumb = useRef(true);
  useEffect(() => {
    if (!initThumb.current) {
      onChangeValue(thumb);
      initThumb.current = false;
    }
  }, [thumb]);

  return (
    <div className={className}>
      <UploadThumb
        name={name ? name : 'thumb'}
        isLoading={uploading}
        description={description}
        onChangeValue={(res) => {
          const thumb = res?.[name] || res?.thumb;
          handleOnchange(thumb);
        }}
      />
      {thumb && (
        <UI.Box mt={3} width={'120px'} position="relative">
          <UI.Circle
            onClick={() => {
              setThumb('');
              setFile(null);
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
            objectFit="cover"
            src={thumb}
          />
        </UI.Box>
      )}
    </div>
  );
}

export default UploadFiles;
