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
        }
        if (isArray(data))
          onChange({
            target: {value: data.map((x) => x.value) || undefined, name},
          });
        else onChange({target: {value: data?.value || undefined, name}});
      }}
      styles={style({size, isInvalid})}
    />
  );
});
