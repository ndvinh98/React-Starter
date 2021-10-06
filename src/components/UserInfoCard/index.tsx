import React from 'react';

import * as UI from '@chakra-ui/react';
import {FiMoreHorizontal} from 'react-icons/fi';

const USERTYPE_STRING = {
  PARTNERADMIN: 'Owner',
  ADMIN: 'Admin',
  USER: 'Sales Manager',
};
const STATUS_STRING = {
  1: 'Active',
  0: 'Inactive',
};

export const ACTIVE_STRING = {
  1: 'Actived',
  0: 'Decatived',
};
function UserInfoCard(props) {
  const {userData} = props;

  //const {openModal} = useModalStore();

  return (
    <UI.Box
      w="full"
      bg="#F3F3F3"
      p={'16px'}
      position="relative"
      borderRadius="md">
      <UI.HStack alignItems="flex-start" spacing={4}>
        <UI.Avatar
          bg={
            userData?.partnerUserProfiles?.[0]?.avatarMediaDestination
              ? 'white'
              : undefined
          }
          sx={{
            img: {
              objectFit: 'contain',
            },
          }}
          boxSize="50px"
          name={userData?.firstName + ' ' + userData?.lastName}
          src={userData?.partnerUserProfiles?.[0]?.avatarMediaDestination}
        />
        <UI.VStack w="full" spacing={0}>
          <UI.Text w="full" fontSize="16px" fontWeight="bold">
            {userData?.firstName} {userData?.lastName}
          </UI.Text>
          <UI.Text pb={2} w="full" fontSize="14px" fontWeight="semibold">
            {userData?.email}
          </UI.Text>
          <UI.Text pb={2} w="full" fontSize="14px" fontWeight="semibold">
            {STATUS_STRING?.[userData?.isActive]}
          </UI.Text>
          <UI.Text pb={2} w="full" fontSize="14px" fontWeight="semibold">
            {USERTYPE_STRING?.[userData?.userType]}
          </UI.Text>
        </UI.VStack>
      </UI.HStack>
      <UI.Menu>
        <UI.MenuButton position="absolute" top="0px" right="0px">
          <UI.IconButton
            aria-label="setting"
            variant="unstyled"
            size="sm"
            icon={<FiMoreHorizontal size={20} />}
          />
        </UI.MenuButton>
        <UI.MenuList>
          <UI.MenuItem
            isDisabled={userData?.isActive === 1}
            // onClick={() =>
            //   openModal('action', {
            //     title: 'Activate Access',
            //     type: 'Activate',
            //     cb: () => cb?.(),
            //     id: userData?.id,
            //   })
            // }
          >
            Approve Access
          </UI.MenuItem>
          <UI.MenuItem
            isDisabled={userData?.isActive === 0}
            // onClick={() =>
            //   openModal('action', {
            //     title: 'Deactivate Access',
            //     type: 'Deactivate',
            //     cb: () => cb?.(),
            //     id: userData?.id,
            //   })
            // }
          >
            Deactivate Access
          </UI.MenuItem>
          <UI.MenuItem
          // onClick={() => {
          //   openModal('action', {
          //     title: 'Change role',
          //     type: 'change-role',
          //     cb: () => cb?.(),
          //     currentUserType: userData?.userType,
          //     id: userData?.id,
          //   });
          // }}
          >
            Change Role
          </UI.MenuItem>
        </UI.MenuList>
      </UI.Menu>
    </UI.Box>
  );
}

export default UserInfoCard;
