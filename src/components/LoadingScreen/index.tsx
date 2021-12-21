import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';

const Splash: React.FC = () => {
  return (
    <UI.Center w={'100vw'} h={'100vh'} overflow={'hidden'}>
      <UI.Box>
        <UI.Image
          src="https://stepartnerportal-dev.s3.ap-southeast-1.amazonaws.com/settings/logo/logo.png"
          width={'150px'}
        />
        <UI.Progress mt={2} colorScheme="red" size="sm" isIndeterminate />
      </UI.Box>
    </UI.Center>
  );
};

export default memo(Splash);
