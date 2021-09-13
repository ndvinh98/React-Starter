import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';

const InputGroup: React.FC<any> = (props) => {
  const {leftIcon, rightIcon} = props;
  return (
    <UI.InputGroup>
      {leftIcon && (
        <UI.InputLeftElement pointerEvents="none">
          {leftIcon}
        </UI.InputLeftElement>
      )}
      <UI.Input {...props} />
      {rightIcon && (
        <UI.InputLeftElement pointerEvents="none">
          {rightIcon}
        </UI.InputLeftElement>
      )}
    </UI.InputGroup>
  );
};

export default memo(InputGroup);
