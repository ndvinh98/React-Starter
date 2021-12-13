import React, {memo, useState, useEffect} from 'react';
import {default as RSelect} from 'react-select';
import {some} from 'lodash';
import {style} from './style';
import {ISelect} from './type';
import * as UI from '@chakra-ui/react';

export const SelectPicker = memo((props: ISelect) => {
  const {
    onChange,
    size,
    isInvalid,
    isClearable = true,
    defaultValue,
    ...other
  } = props;

  const [selected, setSelected] = useState<any[]>([]);

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  const handleRemove = (value) =>
    setSelected((s) => s.filter((x) => x.value !== value));

  const handleAdd = (data) => {
    if (some(selected, data)) return;
    setSelected((s) => [...s, data]);
  };

  return (
    <>
      <RSelect
        {...other}
        defaultValue={defaultValue}
        isClearable={isClearable}
        value={null}
        onChange={handleAdd}
        styles={style({isInvalid, size})}
      />
      <UI.HStack mt={2} spacing={0} flexWrap="wrap">
        {selected?.map((x) => (
          <UI.Box pb={2} pr={2} key={x?.value}>
            <UI.Tag>
              {x?.label}
              <UI.TagCloseButton onClick={() => handleRemove(x?.value)} />
            </UI.Tag>
          </UI.Box>
        ))}
      </UI.HStack>
    </>
  );
});
