import React, {memo} from 'react';
import {useRouter} from '@utils/hooks';
import {useRouterController} from '@modules/router';
import * as UI from '@chakra-ui/react';
import {TiDelete} from 'react-icons/ti';

const Certificate = ({data}) => {
  const {push} = useRouter();
  const {path} = useRouterController();

  console.log(data);
  return (
    <UI.Box>
      <UI.HStack
        flexDirection={{md: 'column', lg: 'row'}}
        cursor="pointer"
        w="full"
        shadow="sm"
        p={5}
        bgColor={'#EEEEEC'}
        justifyContent="start"
        border="none"
        alignItems="center">
        <UI.Text fontSize={{md: 'md', lg: 'lg'}} fontWeight="600" pl={2}>
          {data?.name}
        </UI.Text>
        <UI.Spacer />
        <TiDelete />
      </UI.HStack>
    </UI.Box>
  );
};

export default memo(Certificate);
