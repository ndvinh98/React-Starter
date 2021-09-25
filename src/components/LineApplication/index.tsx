import React, {memo} from 'react';
import {useRouter} from '@utils/hooks';
import {useRouterController} from '@modules/router';
import * as UI from '@chakra-ui/react';

const LineApplication = (props) => {
  const {aplicationData} = props;
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

      <UI.Text fontSize={{md: 'md', lg: 'lg'}} pl={2}>
        {aplicationData?.companyName} (
        {
          aplicationData?.partnerApplicationSubmission?.submittedByPartnerUser
            ?.email
        }
        )
      </UI.Text>
      <UI.Spacer />
      <UI.Box pr="20px">
        <UI.Button
          w="62px"
          h="30px"
          onClick={() => push(path + `/${aplicationData?.id}`)}
          color="#54565A"
          bg="#E9E9E9"
          borderRadius="0"
          fontSize={12}
          disabled={
            aplicationData?.partnerApplicationSubmission.status === 'PENDING'
              ? false
              : true
          }>
          {aplicationData?.partnerApplicationSubmission.status === 'PENDING'
            ? 'View'
            : aplicationData?.partnerApplicationSubmission.status === 'APPROVED'
            ? 'Accepted'
            : 'Rejected'}
        </UI.Button>
      </UI.Box>
    </UI.HStack>
  );
};

export default memo(LineApplication);
