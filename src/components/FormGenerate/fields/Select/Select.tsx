import React, {memo} from 'react';
import {isArray} from 'lodash';
import {default as RSelect} from 'react-select';
import {style} from './style';
import {ISelect} from './type';

export const Select = memo((props: ISelect) => {
  const {
    onChange,
    name,
    size,
    isInvalid,
    isClearable = true,
    defaultValue,
    onChangeValue,
    ...other
  } = props;

  return (
    <RSelect
      {...other}
      defaultValue={defaultValue}
      isClearable={isClearable}
      onChange={(data: any) => {
        if (!data) {
          onChange({target: {value: '', name}});
          onChangeValue?.(data);
        }
        if (isArray(data)) {
          onChange({
            target: {value: data.map((x) => x.value) || undefined, name},
          });
          onChangeValue?.(data);
        } else {
          onChange({target: {value: data?.value || undefined, name}});
          onChangeValue?.(data);
        }
      }}
      styles={style({size, isInvalid})}
    />
  );
});
