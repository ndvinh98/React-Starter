import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';
import {TiDelete} from 'react-icons/ti';

const CardSale = ({data}) => {
  return (
    <UI.HStack
      flexDirection={{md: 'column', lg: 'row'}}
      fontSize="14px"
      cursor="pointer"
      w="full"
      shadow="sm"
      px={2}
      bgColor={'#EEEEEC'}
      justifyContent="start"
      rounded="3xl"
      alignItems="center">
      <UI.Text fontSize={{md: 'md', lg: 'lg'}} pl={2}>
        {data?.firstName}
      </UI.Text>
      <UI.Spacer />
      <UI.Box
      // onClick={() =>
      //   openModal('removeCertificate', {
      //     id: data?.id,
      //     certificate: data?.name,
      //   })
      // }
      >
        <TiDelete />
      </UI.Box>
    </UI.HStack>
  );
};

export default memo(CardSale);
