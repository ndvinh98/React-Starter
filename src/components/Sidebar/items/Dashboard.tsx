import React, {memo} from 'react';
import * as SB from 'react-pro-sidebar';
import * as UI from '@chakra-ui/react';
import {AiOutlineDashboard, AiOutlineAppstoreAdd} from 'react-icons/ai';
import {HiChevronRight} from 'react-icons/hi';
import {useActive} from 'react-navi';
import classNames from 'classnames';

import {useRouter} from '@utils/hooks';
import Select from '@components/Select';

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
  },
  {
    label: 'User Management',
    to: '/home/user-management',
  },
  {
    label: 'Partner Tier',
    to: '/home/partner-tier',
  },
  {
    label: 'Content Management',
    to: '/home/content-management',
  },
  {
    label: 'Feedback Form',
    to: '/home/feedback-form',
  },
  {
    label: 'System Settings',
    to: '/home/system-settings',
  },
];

const DashboardMenu = (props: any) => {
  const {isCollapsed, onCloseMobileSidebar} = props;
  const {push} = useRouter();

  return (
    <>
      <UI.ScaleFade
        delay={0.1}
        hidden={isCollapsed}
        initialScale={0.9}
        in={!isCollapsed}>
        <UI.Box px={4} py={3}>
          <Select placeholder="Line of Business" isClearable={false} />
        </UI.Box>
      </UI.ScaleFade>

      <SB.Menu>
        <SB.MenuItem
          onClick={() => {
            push('/home');
            onCloseMobileSidebar();
          }}
          className={useActive('/home') ? 'active' : ''}
          icon={<AiOutlineDashboard size={30} />}>
          <UI.Text fontWeight={'semibold'} position={'relative'} color={'#000'}>
            Dashboard
          </UI.Text>
        </SB.MenuItem>
      </SB.Menu>

      <UI.ScaleFade
        delay={0.1}
        hidden={isCollapsed}
        initialScale={0.9}
        in={!isCollapsed}>
        <SB.Menu
          style={{
            height: 'calc(100vh - 200px)',
            overflow: 'auto',
          }}>
          <SB.SubMenu className="as-menu" open>
            {MENUS.map((x, i) => (
              <MenuLevel1 key={i} to={x.to} label={x.label} />
            ))}
          </SB.SubMenu>
        </SB.Menu>
      </UI.ScaleFade>
    </>
  );
};

export const MenuLevel1 = memo((props: {to: string; label: string}) => {
  const {to, label} = props;
  const {push} = useRouter();
  return (
    <SB.SubMenu
      open={false}
      className={classNames('level1', {active: useActive(to, {exact: true})})}
      //@ts-ignore
      title={
        <UI.Text
          onClick={() => push(to)}
          color="black"
          whiteSpace={'pre-wrap'}
          fontSize={'16px'}
          fontWeight={'semibold'}
          position={'relative'}>
          {label}
        </UI.Text>
      }
      suffix={
        <UI.Center transition={'0.3s'} p={1}>
          <HiChevronRight color={'#9097A9'} size={20} />{' '}
        </UI.Center>
      }
      icon={<AiOutlineAppstoreAdd size={25} />}></SB.SubMenu>
  );
});

export default memo(DashboardMenu);
