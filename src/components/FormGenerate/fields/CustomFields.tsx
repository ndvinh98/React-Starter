import React, {memo} from 'react';

export interface ISelect {
  defaultValue?: any;
  isMulti?: boolean;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  Component?: React.FC<any>;
  [key: string]: any;
}

const CustomFields: React.FC<ISelect> = (props) => {
  const {onChange, name, Component, ...other} = props;
  return (
    <Component
      isClearable
      onChangeValue={(data) => {
        onChange({target: {value: data?.[name] || undefined, name}});
      }}
      {...other}
    />
  );
};

export default memo(CustomFields);
