import React, {memo} from 'react';
import {chain} from 'lodash';
import {HStack} from '@chakra-ui/react';

import {HEADER_ITEMS} from './header.items';
import Mobile from './header.mobile';

function Header() {
  const headerButton = [
    {
      headerButtonType: 'search',
      isShow: true,
      position: 1,
    },
    {
      headerButtonType: 'setting',
      isShow: true,
      position: 2,
    },
    {
      headerButtonType: 'notify',
      isShow: true,
      position: 3,
    },
    {
      headerButtonType: 'user-info',
      isShow: true,
      position: 4,
    },
    {
      headerButtonType: 'logout',
      isShow: true,
      position: 5,
      props: null,
    },
  ];
  return (
    <HStack justifyContent={'flex-end'} px={3} height={'60px'} bg={'ste.red'}>
      {chain(headerButton)
        .filter((x) => x.isShow)
        .orderBy(['position'], ['asc'])
        .map((x, i) => {
          const Component = HEADER_ITEMS?.[x?.headerButtonType];
          return <Component key={i} {...x?.props} />;
        })
        .compact()
        .valueOf()}
    </HStack>
  );
}

export default {base: memo(Header), mobile: memo(Mobile)};
