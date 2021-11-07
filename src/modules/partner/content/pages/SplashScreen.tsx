import React from 'react';
import * as UI from '@chakra-ui/react';
import {usePartnerContoller} from '@modules/partner/partner.contoller';
import {useRouter} from '@utils/hooks';
import {useCurrentRoute} from 'react-navi';

function SplashScreen() {
  const lineOfBusinessId = usePartnerContoller((s) => s.lineOfBusinessId);
  const {push} = useRouter();
  const {url} = useCurrentRoute();

  React.useEffect(() => {
    let timer: any;
    if (lineOfBusinessId) {
      timer = setTimeout(() => {
        push(`${url?.pathname}/${lineOfBusinessId}`);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [lineOfBusinessId]);
  return (
    <UI.Center minH="85vh">
      <UI.Spinner size="lg" color="ste.red" />
    </UI.Center>
  );
}

export default SplashScreen;
