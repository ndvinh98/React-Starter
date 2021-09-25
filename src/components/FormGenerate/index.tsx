import React, {memo, forwardRef, useImperativeHandle} from 'react';
import {HTMLChakraProps} from '@chakra-ui/system';
import {useForm} from 'react-hook-form';
import {isEmpty} from 'lodash';
import FormControl, {IFormControl} from './FormControl';
import {yupResolver} from '@hookform/resolvers/yup';
import * as UI from '@chakra-ui/react';
import * as yup from 'yup';

export interface IFormGenerate extends HTMLChakraProps<any> {
  onSubmit?: (values: any) => void;
  fields?: IFormControl[];
  schema?: any;
  children?: React.ReactNode;
  gap?: number;
  watchFields?: string | string[];
  onChangeValue?: (
    dataForm: any,
    filedChange: {name: string; value: any},
  ) => void;
}

const FormGenerate = (props: IFormGenerate, ref?: any) => {
  const {
    onSubmit,
    children,
    fields,
    schema,
    gap = 4,
    onChangeValue,
    ...other
  } = props;
  const {
    handleSubmit,
    register,
    formState: {errors},
    getValues,
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(yup.object().shape(schema)),
  });
  useImperativeHandle(ref, () => ({
    handleSubmit,
    getValues,
    setValue,
    reset: handleReset,
    watch,
  }));

  const handleReset = (props) => {
    reset(props, {keepValues: false});
  };

  React.useEffect(() => {
    const subscription = watch(onChangeValue);
    return () => subscription?.unsubscribe?.();
  }, [watch]);

  return (
    <UI.Box as={'form'} w={'full'} onSubmit={handleSubmit(onSubmit)} {...other}>
      <UI.Grid templateColumns="repeat(12, 1fr)" gap={gap}>
        {!isEmpty(fields) &&
          fields.map((x, i) => (
            <UI.GridItem colSpan={x?.colSpan || 12} key={i}>
              <FormControl
                {...x}
                defaultValue={x?.defaultValue}
                error={errors?.[x.name]}
                {...register(x?.name)}
              />
            </UI.GridItem>
          ))}
      </UI.Grid>
      {children}
    </UI.Box>
  );
};

export default memo(forwardRef(FormGenerate));
