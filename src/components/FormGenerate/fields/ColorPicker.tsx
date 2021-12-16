import React, {memo, useEffect} from 'react';
import * as UI from '@chakra-ui/react';
import {CgColorPicker} from 'react-icons/cg';
import {SketchPicker} from 'react-color';

const ColorPicker: React.FC<any> = (props) => {
  const [color, setColor] = React.useState<any>(props?.defaultValues);

  useEffect(() => {
    props?.onChange(color?.hex || color);
  }, [color]);

  return (
    <UI.InputGroup size="md">
      <UI.Input
        pr="4.5rem"
        {...props}
        value={color?.hex || color}
        onChange={(e) => {
          setColor(e?.target?.value);
        }}
      />
      <UI.InputRightElement width="4.5rem">
        <UI.Popover placement="left-start">
          <UI.PopoverTrigger>
            <UI.IconButton
              size={'xs'}
              aria-label="Add to friends"
              icon={<CgColorPicker />}
              background={color?.hex}
            />
          </UI.PopoverTrigger>
          <UI.PopoverContent
            zIndex={999}
            boxShadow={'none'}
            outline={'none'}
            border={'none'}
            background={'none'}
            width={'220px'}>
            <UI.Box>
              <SketchPicker onChangeComplete={setColor} color={color} />
            </UI.Box>
          </UI.PopoverContent>
        </UI.Popover>
      </UI.InputRightElement>
    </UI.InputGroup>
  );
};

export default memo(ColorPicker);
