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
    type: 'level0',
  },
  {
    label: 'User Management',
    to: '/home/user-management',
    icon: UserManagmentIcon,
    type: 'level0',
  },
  {
    label: 'Partner Management',
    to: '/home/partner-management',
    icon: PartnerManagementIcon,
    type: 'level0',
  },
  {
    label: 'Tier Management',
    to: '/home/tier-management',
    icon: TierManagementIcon,
    type: 'level0',
  },

  {
    label: 'Content Management',
    to: '/home/content-management',
    icon: ContentManagementIcon,
    type: 'level0',
    subMenu: [
      {
        label: 'Line of Business',
        to: '/home/content-management/line-of-business',
        type: 'level1',
      },
      {
        label: 'Line of Product',
        to: '/home/content-management/line-of-product',
        type: 'level1',
      },
      {
        label: 'Product Group',
        to: '/home/content-management/product-group',
        type: 'level1',
      },
      {
        label: 'Products',
        to: '/home/content-management/products',
        type: 'level1',
      },
      {
        label: 'Modules',
        to: '/home/content-management/modules',
        type: 'level1',
      },
    ],
  },
  {
    label: 'Feedback Form',
    to: '/home/feedback',
    icon: FeedbackFormIcon,
    type: 'level0',
  },
  {
    label: 'System Settings',
    icon: SystemSettingsIcon,
    type: 'level0',
    to: '/home/system-settings',
    subMenu: [
      {
        label: 'Appearance',
        to: '/home/system-settings/appearance',
        type: 'level1',
      },
      {
        label: 'Domains',
        to: '/home/system-settings/domains',
        type: 'level1',
      },
    ],
  },
];

const DashboardMenu = () => {
  return (
    <SB.Menu>
      {MENUS.map((x, i) => (
        <MenuLevel0
          key={i}
          to={x.to}
          Icon={x.icon}
          label={x.label}
          subMenu={x?.subMenu}
        />
      ))}
    </SB.Menu>
  );
};

export const MenuLevel0 = memo(
  (props: {to?: string; label: string; Icon?: any; subMenu?: any[]}) => {
    const {to, label, Icon, subMenu} = props;
    const {push} = useRouter();
    return !subMenu ? (
      <SB.MenuItem
        onClick={() => push(to)}
        className={classNames({
          active: useActive(to, {exact: false}),
        })}
        icon={
          <Icon
            sizeBox="23px"
            fillColor={
              useActive(to, {exact: false})
                ? 'var(--ste-colors-ste-left_menu_highlight_colour)'
                : 'var(--ste-colors-ste-left_menu_font_and_icon_colour)'
            }
          />
        }>
        <UI.Text
          color={
            useActive(to, {exact: false})
              ? 'ste.left_menu_highlight_colour'
              : 'ste.left_menu_font_and_icon_colour'
          }
          whiteSpace={'nowrap'}
          overflow="hidden"
          fontSize={'16px'}
          fontWeight={'semibold'}>
          {label}
        </UI.Text>
      </SB.MenuItem>
    ) : (
      <SB.SubMenu
        className={classNames('subMenu', {
          active: useActive(to, {exact: false}),
        })}
        // @ts-ignore
        title={
          <UI.Text
            color={
              useActive(to, {exact: false})
                ? 'ste.left_menu_highlight_colour'
                : 'ste.left_menu_font_and_icon_colour'
            }
            whiteSpace={'nowrap'}
            overflow="hidden"
            fontSize={'16px'}
            fontWeight={'semibold'}>
            {label}
          </UI.Text>
        }
        icon={
          <Icon
            sizeBox="23px"
            fillColor={
              useActive(to, {exact: false})
                ? 'var(--ste-colors-ste-left_menu_highlight_colour)'
                : 'var(--ste-colors-ste-left_menu_font_and_icon_colour)'
            }
          />
        }>
        {subMenu.map((x, i) => (
          <SB.MenuItem
            onClick={() => push(x?.to)}
            // @ts-ignore
            prefix={
              <UI.Box position="relative" w="35px">
                <UI.Box
                  position="absolute"
                  w="70%"
                  right="0"
                  h="1px"
                  backgroundColor="#B1B8C2"></UI.Box>
                <UI.Box
                  position="absolute"
                  w="1px"
                  h="40px"
                  left="10px"
                  bottom="-1px"
                  backgroundColor="#B1B8C2"></UI.Box>
              </UI.Box>
            }
            key={i}>
            <UI.Text
              whiteSpace={'nowrap'}
              overflow="hidden"
              fontSize={'16px'}
              color={useActive(x?.to, {exact: false}) ? '#1A1E32' : '#6C6F84'}
              fontWeight={'extrabold'}>
              {x?.label}
            </UI.Text>
          </SB.MenuItem>
        ))}
      </SB.SubMenu>
    );
  },
);

export default memo(DashboardMenu);
