import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';

export interface IRadio {
  size?: 'sm' | 'md' | 'lg';
  defaultValue?: any;
  options?: {label: string; value: any; width: string}[];
  name?: string;
  [key: string]: any;
}

const RadioGroup: React.FC<IRadio> = (props) => {
  const {
    options,
    onChange,
    name,
    defaultValue,
    onFocus,
    onBlur,
    size = 'md',
  } = props;
  return (
    <UI.RadioGroup
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={(data) => {
        onChange({
          target: {value: data || undefined, name},
        });
      }}
      defaultValue={defaultValue}
      name={name}>
      {options && (
        <UI.Stack px={1} width="full" direction="row">
          {options?.map((x) => (
            <UI.Radio size={size} key={x.value} w={x.width} value={x.value}>
              {x?.label}
            </UI.Radio>
          ))}
        </UI.Stack>
      )}
    </UI.RadioGroup>
  );
};

export default memo(RadioGroup);
