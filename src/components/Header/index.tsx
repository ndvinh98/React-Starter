import React, {memo} from 'react';
import {chain} from 'lodash';
import {HStack} from '@chakra-ui/react';

import {HEADER_ITEMS} from './header.items';
import Mobile from './header.mobile';

const AdminHeaderButton = [
  {
    headerButtonType: 'search',
    isShow: false,
    position: 1,
  },
  {
    headerButtonType: 'setting',
    isShow: false,
    position: 2,
  },
  {
    headerButtonType: 'notify',
    isShow: false,
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

const ClientHeaderButton = [
  {
    headerButtonType: 'search',
    isShow: false,
    position: 1,
  },
  {
    headerButtonType: 'setting',
    isShow: false,
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

const HEADER_BUTTONS = {
  admin: AdminHeaderButton,
  sales: ClientHeaderButton,
};

function Header(props: {type?: 'admin' | 'sales'}) {
  const {type} = props;
  return (
    <HStack
      justifyContent={'flex-end'}
      px={3}
      height={'60px'}
      bg={'ste.top_menu'}>
      {chain(HEADER_BUTTONS?.[type])
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
