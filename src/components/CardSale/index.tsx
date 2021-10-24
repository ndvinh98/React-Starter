import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
import {TiDelete} from 'react-icons/ti';

const CardSale = ({data, addItem}) => {
  return (
    <UI.HStack
      flexDirection={{md: 'column', lg: 'row'}}
      fontSize="14px"
      cursor="pointer"
      w="full"
      shadow="sm"
      px={2}
      bgColor={'#EEEEEC'}
      justifyContent="space-between"
      rounded="3xl"
      alignItems="center">
      <UI.Text
        fontSize={{md: 'md', lg: 'lg'}}
        pl={2}
        onClick={() => {
          console.log(data);
        }}>
        {`${data?.firstName} ${data?.lastName}`}
      </UI.Text>

      <UI.Box onClick={() => addItem(data)}>
        <TiDelete />
      </UI.Box>
    </UI.HStack>
  );
};

export default memo(CardSale);
