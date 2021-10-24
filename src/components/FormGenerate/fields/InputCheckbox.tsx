import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';

const InputGroup: React.FC<any> = (props) => {
  const {checkboxLabel, onChange, name, defaultValue, size, ...other} = props;

  return (
    <UI.Checkbox
      {...other}
      defaultChecked={defaultValue}
      onChange={(e) => {
        onChange({
          ...e,
          target: {
            ...e.target,
            value: e.target.checked,
            name,
          },
        });
      }}
      size={size}>
      <UI.Text fontSize="14px">{checkboxLabel}</UI.Text>
    </UI.Checkbox>
  );
};

export default memo(InputGroup);
