import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
import UploadFiles from '@components/UploadFiles';

export interface IUploadFile {
  name?: string;
  [key: string]: any;
}

const UploadFile: React.FC<IUploadFile> = (props) => {
  const {name, onChange} = props;
  return (
    <UI.Box w={'full'}>
      <UploadFiles
        isHiddenLabel
        {...props}
        onChangeValue={(data) =>
          onChange({
            target: {value: data?.[name] || undefined, name},
          })
        }
      />
    </UI.Box>
  );
};

export default memo(UploadFile);
