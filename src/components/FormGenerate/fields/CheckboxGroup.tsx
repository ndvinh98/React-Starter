import React from 'react';
import * as UI from '@chakra-ui/react';

export interface IRadio {
  size?: 'sm' | 'md' | 'lg';
  defaultValue?: any;
  options?: {label: string; value: any; width: string}[];
  name?: string;
  [key: string]: any;
}

function CheckboxGroup(props: any) {
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
    <UI.CheckboxGroup
      defaultValue={defaultValue}
      onChange={(data) => {
        onChange({
          target: {value: data || undefined, name},
        });
      }}>
      <UI.HStack spacing={10} direction="row">
        {options?.map((x) => (
          <UI.Checkbox
            onFocus={onFocus}
            onBlur={onBlur}
            size={size}
            key={x.value}
            w={x.width}
            value={x.value}>
            {x?.label}
          </UI.Checkbox>
        ))}
      </UI.HStack>
    </UI.CheckboxGroup>
  );
}

export default CheckboxGroup;
