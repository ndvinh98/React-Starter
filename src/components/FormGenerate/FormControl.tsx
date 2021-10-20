import React, {memo, forwardRef} from 'react';
import * as UI from '@chakra-ui/react';
import {HTMLChakraProps} from '@chakra-ui/system';

import PasswordInput from './fields/PasswordInput';
import Select, {IOptions} from './fields/Select';
import CheckboxConfirm from './fields/CheckboxConfirm';
import CustomFields from './fields/CustomFields';
import TelInput from './fields/TelInput';
import InputGroup from './fields/InputGroup';
import Recaptcha from './fields/Recaptcha';
import CheckboxGroup from './fields/CheckboxGroup';
import RadioGroup from './fields/RadioGroup';
import UploadFile from './fields/UploadFile';

const FieldComponent = {
  input: UI.Input,
  select: Select,
  textarea: UI.Textarea,
  password: PasswordInput,
  'checkbox-confirm': CheckboxConfirm,
  'custom-field': CustomFields,
  'input-tel': TelInput,
  'input-group': InputGroup,
  recaptcha: Recaptcha,
  'radio-group': RadioGroup,
  'checkbox-group': CheckboxGroup,
  'upload-file': UploadFile,
};

export interface IFormControl extends HTMLChakraProps<'div'> {
  name?: string;
  colSpan?: number;
  type?:
    | 'input'
    | 'select'
    | 'password'
    | 'checkbox-confirm'
    | 'decor'
    | 'custom-field'
    | 'textarea'
    | 'upload-file'
    | 'input-tel'
    | 'input-group'
    | 'recaptcha'
    | 'checkbox-group'
    | 'radio-group';

  label?: string | React.ReactNode;
  text?: string | React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical' | 'inline';
  align?: 'center' | 'left' | 'right';
  helperText?: string | React.ReactNode;
  error?: any;
  isRequiredDot?: boolean;
  messageRequired?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  placeholder?: string;
  defaultValue?: any;
  options?: IOptions[];
  width?: string;
  isDisabled?: boolean;
  DecorComponent?: React.FC<any>;
  CustomComponent?: React.FC<any>;
  onChangeValue?: (data: any) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  refEl?: any;
  isClearable?: boolean;
  styled?: any;
}

const DIRECTION = {
  horizontal: 'row',
  vertical: 'column',
};

const LAYOUT_ITEMS = {
  vertical: 'start',
  horizontal: 'center',
};

const FormControl = (props: IFormControl) => {
  const {
    label,
    helperText,
    type,
    isRequiredDot,
    name,
    error,
    layout,
    width,
    DecorComponent,
    defaultValue,
    align,
    isDisabled,
    styled,
  } = props;
  const Field = type === 'decor' ? DecorComponent : FieldComponent?.[type];

  return (
    <UI.FormControl
      id={name}
      width={'full'}
      isDisabled={isDisabled}
      isRequired={isRequiredDot}
      {...styled}>
      <UI.Stack
        width={'full'}
        justifyContent={'space-between'}
        alignItems={LAYOUT_ITEMS[layout]}
        direction={DIRECTION[layout]}>
        {!!label && <UI.FormLabel m={0}>{label}</UI.FormLabel>}
        <UI.Box width={width}>
          <Field
            w={'full'}
            defaultValue={defaultValue}
            isInvalid={!!error}
            {...props}
          />
        </UI.Box>
      </UI.Stack>
      {error?.message && (
        <UI.Stack
          justifyContent={'space-between'}
          alignItems={LAYOUT_ITEMS[layout]}
          direction={DIRECTION[layout]}>
          <div> </div>
          <UI.Box h={'20x'} width={width}>
            {!!helperText && (
              <UI.FormHelperText>{helperText}</UI.FormHelperText>
            )}
            <UI.Text
              textAlign={align}
              lineHeight={'20px'}
              fontSize={'sm'}
              color={'ste.red'}>
              {error?.message}
            </UI.Text>
          </UI.Box>
        </UI.Stack>
      )}
    </UI.FormControl>
  );
};

export default memo(forwardRef(FormControl));
