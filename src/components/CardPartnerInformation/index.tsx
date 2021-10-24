import React, {memo} from 'react';
import {useRouter} from '@utils/hooks';
import {useRouterController} from '@modules/router';
import * as UI from '@chakra-ui/react';

const CardPartner = (props) => {
  const {data} = props;
  const {push} = useRouter();
  const {path} = useRouterController();

  return (
    <UI.HStack
      flexDirection={{md: 'column', lg: 'row'}}
      cursor="pointer"
      w="full"
      shadow="sm"
      p={3}
      bg="white"
      justifyContent="start"
      border="none"
      alignItems="center">
      <UI.Center
        w={{md: '40px', lg: '70px'}}
        p={{md: 1, lg: 2}}
        bg="white"
        shadow="md">
        <UI.Image
          w={{md: '30px', lg: '50px'}}
          h={{md: '30px', lg: '50px'}}
          src="/images/partner-logo.png"
          alt="people.png"
        />
      </UI.Center>

      <UI.Text fontSize={{md: 'md', lg: 'lg'}} pl={2}>
        {data?.partner?.companyName}
      </UI.Text>
      <UI.Spacer />
      <UI.Box pr="20px">
        <UI.Button
          w="62px"
          h="30px"
          onClick={() => push(path + `/company/${data?.partnerId}`)}
          color="#54565A"
          bg="#E9E9E9"
          borderRadius="0"
          fontSize={12}>
          View
        </UI.Button>
      </UI.Box>
    </UI.HStack>
  );
};

export default memo(CardPartner);
