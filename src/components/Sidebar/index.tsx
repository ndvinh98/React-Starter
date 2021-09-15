import React, {memo} from 'react';
import * as UI from '@chakra-ui/react';

import {chain} from 'lodash';
import {MENU_ITEMS} from './menu.items';
import * as SB from 'react-pro-sidebar';
import {SidebarWarp} from './styled';
import {BiMenu} from 'react-icons/bi';
import Mobile from './mobile';

const sidebarMenu = [
  {
    sidebarMenuType: 'dashboard',
    position: 1,
    isShow: true,
  },
];

function SideBar() {
  const {isOpen, onToggle} = UI.useDisclosure({defaultIsOpen: true});
  return (
    <UI.VStack
      alignItems={'start'}
      justifyContent={'flex-start'}
      h={'100vh'}
      overflow={'hidden'}>
      <SidebarWarp>
        <SB.ProSidebar collapsed={!isOpen} width={'350px'}>
          <SB.SidebarHeader>
            <UI.HStack
              spacing={0}
              px={5}
              w={'350px'}
              h={'60px'}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <UI.ScaleFade unmountOnExit in={isOpen}>
                <UI.Image w="80px" src="/images/admin-portal-logo.png" />
              </UI.ScaleFade>
              <UI.Box onClick={onToggle} cursor={'pointer'}>
                <BiMenu color={'#9097A9'} size={35} />
              </UI.Box>
            </UI.HStack>
          </SB.SidebarHeader>
          <SB.SidebarContent>
            {chain(sidebarMenu)
              .filter((x) => x?.isShow)
              .orderBy(['position'], ['asc'])
              .map((menu, i) => {
                const Component = MENU_ITEMS?.[menu.sidebarMenuType];
                return <Component key={i} isCollapsed={!isOpen} />;
              })
              .valueOf()}
          </SB.SidebarContent>
        </SB.ProSidebar>
      </SidebarWarp>
    </UI.VStack>
  );
}

export default {base: memo(SideBar), mobile: memo(Mobile)};
