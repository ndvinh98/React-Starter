import React, {memo} from 'react';
import {default as RSelect} from 'react-select';
import {style} from './style';
import {ISelect} from './type';

export const Select = memo((props: ISelect) => {
  return (
    <RSelect
      styles={style({size: props?.size, isInvalid: props?.isInvalid})}
      {...props}
      onChange={(data) => {
        props?.onChange?.(data);
        props?.onChangeValue?.(data);
      }}
    />
  );
});
