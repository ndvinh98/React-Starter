import React, {memo} from 'react';
import {Input, InputGroup, InputRightElement, Box} from '@chakra-ui/react';
import {Icon} from '@chakra-ui/react';
import {BiShow, BiHide} from 'react-icons/bi';

export interface IPasswordInput {
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  [key: string]: any;
}

const PasswordInput: React.FC<IPasswordInput> = (props) => {
  const {placeholder, size, ...other} = props;
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <InputGroup size={size}>
      <Input
        pr="4.5rem"
        placeholder={placeholder}
        {...other}
        type={show ? 'text' : 'password'}
      />
      <InputRightElement>
        <Box onClick={handleClick}>
          {show ? (
            <Icon w={6} h={6} sx={{cursor: 'pointer'}} as={BiShow} />
          ) : (
            <Icon w={6} h={6} sx={{cursor: 'pointer'}} as={BiHide} />
          )}
        </Box>
      </InputRightElement>
    </InputGroup>
  );
};

export default memo(PasswordInput);
