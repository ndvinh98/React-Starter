import React, {memo} from 'react';
import {startsWith} from 'lodash';
import * as UI from '@chakra-ui/react';
import {FiBell, FiLogOut} from 'react-icons/fi';
import {TiArrowBack} from 'react-icons/ti';
import {RiUserFill} from 'react-icons/ri';
import {useModalController} from '@modules/modal';
import {useHomeController} from '@modules/home';
import {useRouter} from '@utils/hooks';
import {useRouterController} from '@modules/router';
import {useSalesContoller} from '@modules/home';
import {useAuthController} from '@modules/auth';

const USER_TYPE_DISPLAY = {
  USER: 'Sales Manager',
  PARTNERADMIN: 'Partner admin',
  ADMIN: 'Admin',
};
const HEADER_MENU = [
  {
    icon: <RiUserFill size={20} />,
    label: 'Your Profile',
    path: '/home/your-profile',
  },
];

const HEADER_MENU_PARTNER = [
  {
    icon: <TiArrowBack size={25} />,
    label: 'Back to Admin Portal',
    path: '/home/partner-content',
  },
  {
    icon: <RiUserFill size={20} />,
    label: 'Your Profile',
    path: '/home/your-profile',
  },
];

export const HEADER_ITEMS = {
  notify: memo((porps: any) => {
    const {isDisabled} = porps;
    const {push} = useRouter();
    const count = useSalesContoller((s) => s.totalUnread);

    return (
      <UI.Box position="relative" pr={2}>
        {count > 0 && (
          <UI.Circle
            shadow="sm"
            bg="ste.red"
            zIndex="2"
            position="absolute"
            top={0}
            w="20px"
            h="20px"
            fontSize="14px"
            color="white"
            right={'10px'}>
            {count}
          </UI.Circle>
        )}
        <UI.IconButton
          disabled={isDisabled}
          onClick={() => push('/home/notification')}
          variant={'ghost'}
          aria-label="Notify"
          icon={<FiBell size={20} />}
        />
      </UI.Box>
    );
  }),
  ['user-info']: memo(({isHiddenMenu}: any) => {
    const me = useHomeController((s) => s.me);
    const guard = useHomeController((s) => s.guard);
    const path = useRouterController((s) => s.path);
    const {push} = useRouter();
    const {me: profileData, getMe} = useAuthController();

    React.useEffect(() => {
      guard();
      getMe();
    }, []);

    const Avatar = memo(() => (
      <UI.HStack pr={4}>
        <UI.Avatar
          sx={{img: {objectFit: 'contain'}}}
          bg={profileData?.avatarMediaDestination ? 'white' : undefined}
          src={profileData?.avatarMediaDestination}
          name={me?.firstName + ' ' + me?.lastName}
        />
        <UI.Box textAlign="left">
          <UI.Text color={'white'} fontWeight={'bold'} fontSize={'md'}>
            {me?.firstName}
          </UI.Text>
          <UI.Text color={'white'} fontWeight={'medium'} fontSize={'sm'}>
            {USER_TYPE_DISPLAY?.[me?.userType]}
          </UI.Text>
        </UI.Box>
      </UI.HStack>
    ));

    return (
      <UI.Menu isOpen={isHiddenMenu ? false : undefined} placement={'bottom'}>
        <UI.MenuButton>
          <Avatar />
        </UI.MenuButton>
        <UI.MenuList>
          {startsWith(path, '/home')
            ? HEADER_MENU.map((x, i) => (
                <UI.MenuItem
                  onClick={() => push(x?.path)}
                  key={i}
                  fontWeight={'medium'}
                  icon={x.icon}>
                  {x.label}
                </UI.MenuItem>
              ))
            : HEADER_MENU_PARTNER.map((x, i) => (
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
    );
  }),
  logout: memo(() => {
    const {openModal} = useModalController();
    return (
      <UI.Menu>
        <UI.MenuButton
          as={UI.IconButton}
          variant={'ghost'}
          aria-label="logout"
          icon={<FiLogOut size={20} />}
        />
        <UI.MenuList>
          <UI.MenuItem
            onClick={() => {
              openModal('logout');
            }}
            fontWeight={'medium'}
            icon={<FiLogOut size={20} />}>
            Sign out
          </UI.MenuItem>
        </UI.MenuList>
      </UI.Menu>
    );
  }),
};
