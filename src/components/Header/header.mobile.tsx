import React from 'react';
import * as UI from '@chakra-ui/react';
// import {startsWith} from 'lodash';
import {BiMenu} from 'react-icons/bi';
import {SettingIcon2} from '@components/icons';
import {FiBell, FiLogOut} from 'react-icons/fi';
// import {useModalStore} from '@stores/modals';
// import {useUIStore} from '@stores/UI';
import {RiFeedbackFill, RiFileTransferFill} from 'react-icons/ri';
import {HiUserGroup} from 'react-icons/hi';
import {useRouter} from '@utils/hooks';
// import {useNotifyStore} from '@stores/notify';

const SETTING_MENU = [
  {
    icon: <HiUserGroup size={20} />,
    label: 'About ST Engineering',
    path: '/ste/about',
  },
  {
    icon: <RiFeedbackFill size={20} />,
    label: 'Feedback Form',
    path: '/ste/feedback-form',
  },
  {
    icon: <RiFileTransferFill size={20} />,
    label: 'File transfer',
    path: '/ste/file-transfer',
  },
];

function HeaderMobile() {
  // const {openModal} = useModalStore();
  // const {currentRoute} = useUIStore();
  // const {totalUnread} = useNotifyStore();
  // const {toggleSidebarMobile} = useUIStore();

  const {push} = useRouter();

  // const isRegistration = startsWith(currentRoute?.fullPath, '/registration');
  return (
    <UI.HStack
      px={4}
      justifyContent="space-between"
      w="full"
      h="60px"
      shadow="md"
      position="relative"
      zIndex="9"
      backgroundColor="white">
      <UI.HStack spacing={4}>
        <BiMenu
          // onClick={() => toggleSidebarMobile()}
          color={'#4F4F4F'}
          size={'30px'}
        />

        <UI.Menu placement={'bottom'}>
          <UI.MenuButton
          // disabled={isRegistration}
          // opacity={!isRegistration ? 1 : 0}
          >
            <SettingIcon2 width={'30px'} height={'30px'} />
          </UI.MenuButton>
          <UI.MenuList>
            {SETTING_MENU.map((x, i) => (
              <UI.MenuItem
                onClick={() => push(x?.path)}
                key={i}
                fontWeight={'medium'}
                icon={x.icon}>
                {x.label}
              </UI.MenuItem>
            ))}
          </UI.MenuList>
        </UI.Menu>
      </UI.HStack>
      <UI.Image src="/images/admin-portal-logo.png" height={'30px'} />
      <UI.HStack spacing={4}>
        <UI.Box
          // onClick={
          //   isRegistration ? undefined : () => push('/partner/notification')
          // }
          position="relative">
          <FiBell color={'#4F4F4F'} size={'26px'} />
          <UI.Circle
            shadow="sm"
            bg="ste.red"
            zIndex="2"
            position="absolute"
            top="-5px"
            right="-5px"
            w="20px"
            h="20px"
            fontSize="14px"
            color="white">
            {/* {totalUnread} */} 10
          </UI.Circle>
        </UI.Box>
        <UI.Menu>
          <UI.MenuButton>
            <FiLogOut color={'#4F4F4F'} size={'26px'} />
          </UI.MenuButton>
          <UI.MenuList zIndex={99999999}>
            <UI.MenuItem
              onClick={() => {
                // openModal('logout');
              }}
              fontWeight={'medium'}
              icon={<FiLogOut size={20} />}>
              Sign out
            </UI.MenuItem>
          </UI.MenuList>
        </UI.Menu>
      </UI.HStack>
    </UI.HStack>
  );
}

export default HeaderMobile;
