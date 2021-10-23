import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';

const InputGroup: React.FC<any> = (props) => {
  const {checkboxLabel, onChange, name} = props;

  return (
    <UI.Box justifyContent="start">
      <UI.Checkbox
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
        {...props}>
        <UI.Text fontSize="14px">{checkboxLabel}</UI.Text>
      </UI.Checkbox>
    </UI.Box>
  );
};

export default memo(InputGroup);
