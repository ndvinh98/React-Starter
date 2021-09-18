import React, {useEffect, useState, memo} from 'react';
import {useRouter} from '@utils/hooks';
import {useRouterController} from '@modules/router';
import {isEmpty} from 'lodash';
import * as UI from '@chakra-ui/react';
import FormGenerate from '@components/FormGenerate';
import {useMedia} from '@utils/hooks';
import {
  AiOutlineSearch,
  AiOutlineAppstore,
  AiOutlineBars,
} from 'react-icons/ai';

const LineApplication = ({props}) => {
  const {isBase, isAllMobile} = useMedia();
  const {push} = useRouter();
  const {path} = useRouterController();

  return (
    <UI.Flex
      flexDirection={{md: 'column', lg: 'row'}}
      cursor="pointer"
      w="full"
      shadow="sm"
      p={3}
      bg="white"
      justifyContent="center"
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
          src="/images/people.png"
          alt="people.png"
        />
      </UI.Center>

      <UI.Text fontSize={{md: 'md', lg: 'lg'}} pl={10}>
        {props?.countryName}
      </UI.Text>
      <UI.Spacer />
      <UI.Button
        onClick={() => push(path + `/detail/${props?.id}`)}
        color="#54565A"
        bg="#E9E9E9"
        borderRadius="0">
        View
      </UI.Button>
    </UI.Flex>
  );
};

export default memo(LineApplication);
