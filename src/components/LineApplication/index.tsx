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
          src="/images/people.png"
          alt="people.png"
        />
      </UI.Center>

      <UI.Text fontSize={{md: 'md', lg: 'lg'}} pl={10}>
        {props?.countryName}
      </UI.Text>
      <UI.Spacer />
      <UI.Box pr="20px">
        <UI.Button
          w="62px"
          h="30px"
          onClick={() => push(path + `/${props?.id}`)}
          color="#54565A"
          bg="#E9E9E9"
          borderRadius="0"
          fontSize={12}
          disabled={
            props?.partnerApplicationSubmission.status === 'PENDING'
              ? false
              : true
          }>
          {props?.partnerApplicationSubmission.status === 'PENDING'
            ? 'View'
            : props?.partnerApplicationSubmission.status === 'APPROVED'
            ? 'Accepted'
            : 'Rejected'}
        </UI.Button>
      </UI.Box>
    </UI.HStack>
  );
};

export default memo(LineApplication);
