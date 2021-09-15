import React, {memo} from 'react';
import {isArray} from 'lodash';

import AsyncSelect from 'react-select/async';

export interface IOptions {
  value: string | number;
  label: string;
}
export interface ISelect {
  options?: IOptions[];
  isClearable?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  defaultValue?: any;
  isMulti?: boolean;
  name?: string;
  isInvalid?: boolean;
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  onChangeValue?: (data: any) => void;
  isAutoFocus?: boolean;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  components?: any;
  loadOptions?: any;
  isDefaultOptions?: boolean;
  onInputChange?: (text: string) => void;
  [key: string]: any;
}

const SIZE = {
  sm: '32px',
  md: '40px',
  lg: '48px',
};
const FONT_SIZES = {
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
};
const Select: React.FC<ISelect> = (props) => {
  const {
    onChange,
    name,
    size,
    isInvalid,
    onChangeValue,
    isAutoFocus,
    onFocus,
    onBlur,
    components,
    loadOptions,
    isDefaultOptions,
    onInputChange,
    ...other
  } = props;
  return (
    <AsyncSelect
      loadOptions={loadOptions}
      defaultOptions={isDefaultOptions}
      isClearable
      onFocus={onFocus}
      onBlur={onBlur}
      autoFocus={isAutoFocus}
      onChange={(data) => {
        onChangeValue?.(data);
        if (!data) {
          onChange?.({target: {value: '', name}});
        }
        if (isArray(data))
          onChange?.({
            target: {value: data.map((x) => x.value) || undefined, name},
          });
        else onChange?.({target: {value: data?.value || undefined, name}});
      }}
      components={components}
      onInputChange={onInputChange}
      styles={{
        valueContainer: (provided) => ({
          ...provided,
          '& *': {
            color: '#9ba3af',
          },
        }),
        indicatorSeparator: () => {
          return {
            disabled: 'none',
          };
        },
        control: (provided, state) => {
          const {isFocused} = state;
          return {
            ...provided,
            outline: 'none',
            boxShadow: isFocused ? '0 0 0 1px #f79c93' : 'none',
            borderWidth: isInvalid ? '2px' : '1px',
            borderColor: isInvalid
              ? '#d03a2b'
              : isFocused
              ? '#d03a2b'
              : 'inherit',
            minHeight: SIZE[size],
            borderRadius: '0.375rem',
            fontSize: FONT_SIZES[size],
            padding: '0px 6px',
            ':hover': {
              borderColor: isInvalid
                ? '#d03a2b'
                : isFocused
                ? '#d03a2b'
                : '#d1dae4',
            },
          };
        },
      }}
      {...other}
    />
  );
};

export default memo(Select);
