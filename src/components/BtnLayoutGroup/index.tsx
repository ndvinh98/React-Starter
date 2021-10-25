import React, {useState, memo} from 'react';
import * as UI from '@chakra-ui/react';
import Selset from '@components/Select';
import {BiGridAlt, BiListUl} from 'react-icons/bi';
import {HTMLChakraProps} from '@chakra-ui/system';

export interface IBtnLayoutGroup extends HTMLChakraProps<'div'> {
  defaultLayout?: 'grid' | 'list';
  defaultLimit?: 5 | 10 | 20 | 30 | 50;
  onLimitChange?: (count: number) => void;
  onChangeLayoutStyle?: (layout: 'grid' | 'list') => void;
}

function BtnLayoutGroup(props: IBtnLayoutGroup) {
  const {
    w = 'full',
    justifyContent = 'flex-start',
    defaultLayout = 'grid',
    defaultLimit = 10,
    onLimitChange,
    onChangeLayoutStyle,
  } = props;

  const [layout, setLayout] = useState<'grid' | 'list'>(defaultLayout);
  const [limit, setLimit] = useState(defaultLimit);
  return (
    <UI.HStack w={w} justifyContent={justifyContent} {...props}>
      <UI.HStack justifyContent={'space-between'} spacing={1}>
        <UI.Text w={'80px'}>View Item:</UI.Text>
        <UI.Box w={'105px'}>
          <Selset
            size={'md'}
            name={'limit'}
            isClearable={false}
            placeholder={'item'}
            onChangeValue={({value}) => {
              setLimit(value);
              onLimitChange?.(value);
            }}
            value={{label: String(limit), value: limit}}
            options={[
              {label: '5', value: 5},
              {label: '10', value: 10},
              {label: '20', value: 20},
              {label: '30', value: 30},
              {label: '50', value: 50},
            ]}
          />
        </UI.Box>
        <UI.Center
          onClick={() => {
            setLayout('grid');
            onChangeLayoutStyle?.('grid');
          }}
          cursor={'pointer'}
          p={1}>
          <BiGridAlt
            size={23}
            color={layout === 'grid' ? '#D94645' : '#ADADAD'}
          />
        </UI.Center>
        <UI.Center
          onClick={() => {
            setLayout('list');
            onChangeLayoutStyle?.('list');
          }}
          cursor={'pointer'}
          p={1}>
          <BiListUl
            color={layout === 'list' ? '#D94645' : '#ADADAD'}
            size={26}
            cursor={'pointer'}
          />
        </UI.Center>
      </UI.HStack>
    </UI.HStack>
  );
}

export default memo(BtnLayoutGroup);
