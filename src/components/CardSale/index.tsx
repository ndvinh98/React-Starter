import React, {memo} from 'react';
import {useModalController} from '@modules/modal';
import * as UI from '@chakra-ui/react';
import {TiDelete} from 'react-icons/ti';

const CardSale = () => {
  //const {openModal} = useModalController();

  return (
    <UI.HStack
      flexDirection={{md: 'column', lg: 'row'}}
      cursor="pointer"
      w="full"
      shadow="sm"
      p={2}
      bgColor={'#EEEEEC'}
      justifyContent="start"
      rounded="3xl"
      alignItems="center">
      <UI.Text fontSize={{md: 'md', lg: 'lg'}} pl={2}>
        Tom Jones (email@gmail.com)
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
