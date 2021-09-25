import React, {memo} from 'react';
import * as SB from 'react-pro-sidebar';
import * as UI from '@chakra-ui/react';
import {useActive} from 'react-navi';
import classNames from 'classnames';

import {useRouter} from '@utils/hooks';
import {
  PartnerApplicationsIcon,
  UserManagmentIcon,
  PartnerManagementIcon,
  TierManagementIcon,
  ContentManagementIcon,
  FeedbackFormIcon,
  SystemSettingsIcon,
} from '@components/icons';

export interface IMenu {
  id?: number;
  label?: string;
  type?: 'level0' | 'level1' | 'level2';
  subMenu?: IMenu[];
  items?: {id: number; label: string}[];
  to?: string;
}

const MENUS = [
  {
    label: 'Partner Applications',
    to: '/home/partner-applications',
    icon: PartnerApplicationsIcon,
  },
  {
    label: 'User Management',
    to: '/home/user-management',
    icon: UserManagmentIcon,
  },
  {
    label: 'Partner Management',
    to: '/home/partner-management',
    icon: PartnerManagementIcon,
  },
  {
    label: 'Tier Management',
    to: '/home/tier-management',
    icon: TierManagementIcon,
  },

  {
    label: 'Content Management',
    to: '/home/content-management',
    icon: ContentManagementIcon,
  },
  {
    label: 'Feedback Form',
    to: '/home/feedback',
    icon: FeedbackFormIcon,
  },
  {
    label: 'System Settings',
    to: '/home/system-settings',
    icon: SystemSettingsIcon,
  },
];

const DashboardMenu = () => {
  return (
    <SB.Menu>
      {MENUS.map((x, i) => (
        <MenuLevel0 key={i} to={x.to} Icon={x.icon} label={x.label} />
      ))}
    </SB.Menu>
  );
};

export const MenuLevel0 = memo(
  (props: {to: string; label: string; Icon: any}) => {
    const {to, label, Icon} = props;
    const {push} = useRouter();
    return (
      <SB.MenuItem
        onClick={() => push(to)}
        className={classNames({
          active: useActive(to, {exact: false}),
        })}
        icon={
          <Icon
            sizeBox="23px"
            fillColor={useActive(to, {exact: false}) ? '#333' : '#6C6F84 '}
          />
        }>
        <UI.Text
          color="black"
          whiteSpace={'nowrap'}
          overflow="hidden"
          fontSize={'16px'}
          fontWeight={'semibold'}>
          {label}
        </UI.Text>
      </SB.MenuItem>
    );
  },
);

export default memo(DashboardMenu);
