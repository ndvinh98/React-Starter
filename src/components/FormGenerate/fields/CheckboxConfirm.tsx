import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
export interface ICheckboxConfirm {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  defaultValue?: boolean;
  align?: 'center' | 'left' | 'right';
  [key: string]: any;
}

const JUSTIFY_CONTENT = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
};

const CheckboxConfirm: React.FC<ICheckboxConfirm> = (props) => {
  const {text, size, defaultValue, onChange, name, align, ...other} = props;

  return (
    <UI.Checkbox
      {...other}
      display={'flex'}
      justifyContent={JUSTIFY_CONTENT[align]}
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
      defaultChecked={defaultValue}
      size={size}>
      <UI.Text fontSize={'md'}>{text}</UI.Text>
    </UI.Checkbox>
  );
};

export default memo(CheckboxConfirm);
