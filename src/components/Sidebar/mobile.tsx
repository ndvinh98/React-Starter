import React from 'react';
import * as UI from '@chakra-ui/react';
import {startsWith} from 'lodash';

import {chain} from 'lodash';
// import {useUIStore} from '@stores/UI';
import {MENU_ITEMS} from './menu.items';
import * as SB from 'react-pro-sidebar';
import {SidebarWarp} from './styled';
// import {useAuthController} from '@stores/auth';
import {BiChevronDown} from 'react-icons/bi';
import {
  RiBuildingFill,
  RiUserFill,
  RiBarChartFill,
  RiFileUserFill,
} from 'react-icons/ri';
import {GiDiploma} from 'react-icons/gi';
import {FaUsers} from 'react-icons/fa';
import {useRouter} from '@utils/hooks';

const HEADER_MENU = [
  {
    icon: <RiUserFill size={20} />,
    label: 'Your Profile',
    path: '/partner/your-profile',
  },
  {
    icon: <RiBuildingFill size={20} />,
    label: 'Company Information',
    path: '/partner/company-information',
  },
  {
    icon: <RiBarChartFill size={20} />,
    label: 'Tier Information',
    path: '/partner/tier-information',
  },
  {
    icon: <FaUsers size={20} />,
    label: 'User Management',
    path: '/partner/user-management',
  },
  {
    icon: <GiDiploma size={20} />,
    label: 'Certificates',
    path: '/partner/file-certificate',
  },
  {
    icon: <RiFileUserFill size={20} />,
    label: 'STE Profile',
    path: '/partner/ste-profile',
  },
];

function SideBarMobile() {
  const sidebarMenu = [];
  const {isOpen, onToggle} = UI.useDisclosure();
  // const {isShowSidebarMobile, closeSidebarMobile} = useUIStore();
  // const {me} = useAuthController();
  const {push} = useRouter();
  // const isRegistrationPage = startsWith(
  //   currentRoute?.fullPath,
  //   '/registration',
  // );
  return (
    <UI.Slide style={{zIndex: 5}} direction="left" in={false}>
      <UI.VStack
        position="fixed"
        bg="white"
        top={0}
        left={0}
        alignItems={'start'}
        justifyContent={'flex-start'}
        h={'100vh'}
        overflow={'hidden'}>
        <SidebarWarp>
          <SB.ProSidebar collapsed={false} width={'350px'}>
            <SB.SidebarHeader>
              <UI.Box w={'350px'} h={'60px'} />
            </SB.SidebarHeader>
            <SB.SidebarContent>
              <UI.HStack onClick={() => onToggle()} w="full" px={4} pt={4}>
                {/* <UI.Avatar
                  bg={me?.avatarMediaDestination ? 'white' : undefined}
                  src={me?.avatarMediaDestination}
                  name={me?.firstName + ' ' + me?.lastName}
                /> */}
                <UI.VStack w="full" spacing={0} justifyContent="start">
                  <UI.Text
                    fontWeight="semibold"
                    color="#1A1E32"
                    w="full"
                    textAlign="left">
                    {/* {me?.firstName || 'firstName'} {me?.lastName || 'lastName'} */}
                  </UI.Text>
                  <UI.Text color="#1A1E32" w="full" textAlign="left">
                    {/* {me?.userType || 'User'} */}
                  </UI.Text>
                </UI.VStack>
                <UI.Center>
                  <BiChevronDown
                    // opacity={isRegistrationPage ? 0 : 1}
                    size="25px"
                  />
                </UI.Center>
              </UI.HStack>
              <UI.Collapse in={isOpen} animateOpacity>
                <UI.Divider pt={3} />
                <UI.Box mt={3} pb={4} px={8} shadow="md">
                  <UI.List spacing={4}>
                    {HEADER_MENU.map((x, i) => (
                      <UI.ListItem
                        onClick={() => {
                          push(x.path);
                          // closeSidebarMobile();
                        }}
                        key={i}>
                        <UI.HStack>
                          {x.icon} <UI.Text color="black">{x.label}</UI.Text>
                        </UI.HStack>
                      </UI.ListItem>
                    ))}
                  </UI.List>
                </UI.Box>
              </UI.Collapse>
              {chain(sidebarMenu)
                .filter((x) => x?.isShow)
                .orderBy(['position'], ['asc'])
                .map((menu, i) => {
                  const Component = MENU_ITEMS?.[menu.sidebarMenuType];
                  return (
                    <Component
                      key={i}
                      isCollapsed={false}
                      // onCloseMobileSidebar={() => closeSidebarMobile()}
                    />
                  );
                })
                .valueOf()}
            </SB.SidebarContent>
          </SB.ProSidebar>
        </SidebarWarp>
      </UI.VStack>
    </UI.Slide>
  );
}

export default SideBarMobile;
