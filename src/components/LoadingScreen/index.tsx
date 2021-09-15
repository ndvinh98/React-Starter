import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';

const Splash: React.FC = () => {
  return (
    <UI.Center w={'100vw'} h={'100vh'} overflow={'hidden'}>
      <UI.Box>
        <UI.Image src="/images/admin-portal-logo.png" width={'150px'} />
        <UI.Progress mt={2} colorScheme="red" size="sm" isIndeterminate />
      </UI.Box>
    </UI.Center>
  );
};

export default memo(Splash);
