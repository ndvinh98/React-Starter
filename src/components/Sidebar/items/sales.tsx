import React, {memo} from 'react';
import * as SB from 'react-pro-sidebar';
import * as UI from '@chakra-ui/react';
import {useActive} from 'react-navi';
import classNames from 'classnames';

import {useRouter} from '@utils/hooks';
import {ContentManagementIcon} from '@components/icons';

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
    label: 'Partner Information',
    to: '/home/partner-information',
    icon: ContentManagementIcon,
    type: 'level0',
  },
  {
    label: 'Partner Content',
    to: '/home/partner-content',
    icon: ContentManagementIcon,
    type: 'level0',
  },
  {
    label: 'File Transfer',
    to: '/home/file-transfer',
    icon: ContentManagementIcon,
    type: 'level0',
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
          // @ts-ignore
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
    ) : (
      <SB.SubMenu
        className={classNames('subMenu', {
          active: useActive(to, {exact: false}),
        })}
        // @ts-ignore
        title={
          <UI.Text
            color="black"
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
            fillColor={useActive(to, {exact: false}) ? '#333' : '#6C6F84 '}
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
              color="#6C6F84"
              fontWeight={
                useActive(x?.to, {exact: false}) ? 'extrabold' : 'medium'
              }>
              {x?.label}
            </UI.Text>
          </SB.MenuItem>
        ))}
      </SB.SubMenu>
    );
  },
);

export default memo(DashboardMenu);
