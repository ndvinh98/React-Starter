import React from 'react';
import * as UI from '@chakra-ui/react';

import * as SB from 'react-pro-sidebar';
import {SidebarWarp} from './styled';
import {BiMenu} from 'react-icons/bi';

import AdminBar from './items/admin';
import SalesBar from './items/sales';

const SIDE_BAR_MENU = {
  admin: AdminBar,
  sales: SalesBar,
};

function SideBarMobile(porps: {type?: 'admin' | 'sales'}) {
  const {type} = porps;
  const IS_OPEN_MENU = +localStorage.getItem('IS_OPEN_MENU');
  const {isOpen, onToggle} = UI.useDisclosure({defaultIsOpen: !!IS_OPEN_MENU});
  React.useEffect(() => {
    if (isOpen) localStorage.setItem('IS_OPEN_MENU', '1');
    else localStorage.setItem('IS_OPEN_MENU', '0');
  }, [isOpen]);
  const Component = SIDE_BAR_MENU?.[type];
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
            {/* @ts-ignore */}
            <Component isCollapsed={!isOpen} />
          </SB.SidebarContent>
        </SB.ProSidebar>
      </SidebarWarp>
    </UI.VStack>
  );
}

export default SideBarMobile;
