import React, {memo, useEffect, useState} from 'react';
import * as UI from '@chakra-ui/react';

export interface IPasswordInput {
  size?: 'sm' | 'md' | 'lg';
  defaultValue?: string;
  [key: string]: any;
}

const TelInput: React.FC<IPasswordInput> = (props) => {
  const {size, defaultValue, onBlur, onChange, name, ...other} = props;
  const [countryCode, setCountryCode] = useState<string>('');
  const [cityCode, setCityCode] = useState<string>('');
  const [number, setNumber] = useState<string>('');

  useEffect(() => {
    const items = defaultValue?.split(' ');
    if (items?.length === 3) {
      setCountryCode(items?.[0]);
      setCityCode(items?.[1]);
      setNumber(items?.[2]);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (countryCode && countryCode && number)
      onChange({
        target: {
          value: `${countryCode} ${cityCode} ${number}`,
          name,
        },
      });
    else
      onChange({
        target: {
          value: '',
          name,
        },
      });
  }, [countryCode, cityCode, number]);

  return (
    <UI.Stack direction={{md: 'column', lg: 'row'}} w={'full'} spacing={6}>
      <UI.Input
        {...other}
        onBlur={onBlur}
        value={countryCode}
        size={size}
        placeholder={'Country Code'}
        onChange={(e) => setCountryCode(e?.target?.value)}
      />
      <UI.Input
        {...other}
        onBlur={onBlur}
        value={cityCode}
        size={size}
        w={{lg: '50%', md: '100%'}}
        placeholder={'City Code'}
        onChange={(e) => setCityCode(e?.target?.value)}
      />
      <UI.Input
        {...other}
        onBlur={onBlur}
        value={number}
        size={size}
        placeholder={'Number'}
        onChange={(e) => setNumber(e?.target?.value)}
      />
    </UI.Stack>
  );
};

export default memo(TelInput);
