import React, {memo, useState} from 'react';
import {debounce} from 'lodash';
import Highlighter from 'react-highlight-words';

import * as UI from '@chakra-ui/react';
import {FiBell, FiLogOut, FiSearch} from 'react-icons/fi';
import {
  // RiBuildingFill,
  RiUserFill,
  // RiBarChartFill,
  // RiFileUserFill,
  RiFeedbackFill,
  RiFileTransferFill,
} from 'react-icons/ri';
// import {GiDiploma} from 'react-icons/gi';
// import {FaUsers} from 'react-icons/fa';
import {HiUserGroup} from 'react-icons/hi';
import {SettingIcon} from '@components/icons';
import AsyncSelect from '@components/AsyncSelect';

import {useModalController} from '@modules/modal';
import {useHomeController} from '@modules/home';
import {useAuthController} from '@modules/auth';
import {useRouter} from '@utils/hooks';

const USER_TYPE_DISPLAY = {
  USER: 'User',
  PARTNERADMIN: 'Partner admin',
  ADMIN: 'Admin',
};
const HEADER_MENU = [
  {
    icon: <RiUserFill size={20} />,
    label: 'Your Profile',
    path: '/home/your-profile',
  },
  // {
  //   icon: <RiBuildingFill size={20} />,
  //   label: 'Company Information',
  //   path: '/partner/company-information',
  // },
  // {
  //   icon: <RiBarChartFill size={20} />,
  //   label: 'Tier Information',
  //   path: '/partner/tier-information',
  // },
  // {
  //   icon: <FaUsers size={20} />,
  //   label: 'User Management',
  //   path: '/partner/user-management',
  // },
  // {
  //   icon: <GiDiploma size={20} />,
  //   label: 'Certificates',
  //   path: '/partner/file-certificate',
  // },
  // {
  //   icon: <RiFileUserFill size={20} />,
  //   label: 'STE Profile',
  //   path: '/partner/ste-profile',
  // },
];

export const HEADER_ITEMS = {
  notify: memo((porps: any) => {
    const {isDisabled} = porps;
    // const {push} = useRouter();
    return (
      <UI.Box position="relative" pr={2}>
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
          1
        </UI.Circle>
        <UI.IconButton
          disabled={isDisabled}
          // onClick={() => push('/partner/notification')}
          variant={'ghost'}
          aria-label="Notify"
          icon={<FiBell size={20} />}
        />
      </UI.Box>
    );
  }),
  ['user-info']: memo(({isHiddenMenu}: any) => {
    //const {me} = useHomeController();
    const {me} = useAuthController();

    const {push} = useRouter();

    const Avatar = memo(() => (
      <UI.HStack pr={4}>
        <UI.Avatar
          sx={{img: {objectFit: 'contain'}}}
          bg={me?.avatarMediaDestination ? 'white' : undefined}
          src={me?.avatarMediaDestination}
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
          {HEADER_MENU.map((x, i) => (
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
  setting: memo(() => {
    // const {push} = useRouter();
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
    return (
      <>
        <UI.Box px={2}>
          <UI.Menu placement={'bottom'}>
            <UI.MenuButton>
              <UI.IconButton
                variant={'ghost'}
                aria-label="setting"
                icon={<SettingIcon width={'24px'} height={'24px'} />}
              />
            </UI.MenuButton>
            <UI.MenuList>
              {SETTING_MENU.map((x, i) => (
                <UI.MenuItem
                  // onClick={() => push(x?.path)}
                  key={i}
                  fontWeight={'medium'}
                  icon={x.icon}>
                  {x.label}
                </UI.MenuItem>
              ))}
            </UI.MenuList>
          </UI.Menu>
        </UI.Box>
        <UI.Divider w={4} h={'70%'} orientation="vertical" />
      </>
    );
  }),
  search: memo(() => {
    const {isOpen, onClose, onOpen} = UI.useDisclosure();
    const {openModal} = useModalController();
    const [textsearch, setTextsearch] = useState('');

    const searchName = async (text, cb) => {
      const res = {records: []};
      const options = res?.records?.map((x) => ({
        label: x?.resourceName,
        value: x?.id,
      }));
      cb(options);
    };

    const loadOptions = (text, cb) => {
      searchName(text, cb);
    };
    const loadOptionsDb = debounce((text, cb) => loadOptions(text, cb), 500);
    return (
      <UI.HStack>
        {isOpen && (
          <UI.Box w={'500px'}>
            <AsyncSelect
              components={{
                IndicatorsContainer: () => (
                  <UI.Center cursor="pointer" px={1}>
                    <FiSearch size={20} color={'#D94645'} />
                  </UI.Center>
                ),
                Option: ({children, data, isFocused, selectOption}) => {
                  return (
                    <UI.Box
                      cursor="pointer"
                      onClick={() => selectOption(data)}
                      p={2}
                      bg={isFocused ? 'rgba(196, 196, 196, 0.4)' : 'white'}>
                      <Highlighter
                        highlightStyle={{
                          fontWeight: 'bold',
                          backgroundColor: 'transparent',
                        }}
                        searchWords={[textsearch]}
                        autoEscape
                        textToHighlight={String(children)}
                      />
                    </UI.Box>
                  );
                },
              }}
              loadOptions={loadOptionsDb}
              isDefaultOptions={false}
              name={'search'}
              onInputChange={setTextsearch}
              onChangeValue={(data) => {
                if (data.value) {
                  // useApplicationsStore.setState({
                  //   productResourcesSearchId: data.value,
                  // });
                  openModal('search');
                }
              }}
              onBlur={() => onClose()}
              isAutoFocus
            />
          </UI.Box>
        )}
        {!isOpen && (
          <UI.IconButton
            onClick={() => onOpen()}
            variant={'ghost'}
            aria-label="setting"
            icon={<FiSearch size={20} />}
          />
        )}
      </UI.HStack>
    );
  }),
};
