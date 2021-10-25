import React, {memo, useEffect, useState} from 'react';
import {isEmpty, keyBy, startsWith} from 'lodash';
import classNames from 'classnames';
import * as SB from 'react-pro-sidebar';
import * as UI from '@chakra-ui/react';
import {chain} from 'lodash';
import {AiOutlineDashboard, AiOutlineAppstoreAdd} from 'react-icons/ai';
import {HiChevronRight} from 'react-icons/hi';
import {GoPrimitiveDot} from 'react-icons/go';
import {useRouterController} from '@modules/router';
import Select from '@components/Select';
import {useGetItem, useRouter} from '@utils/hooks';

export interface IMenu {
  id?: number;
  label?: string;
  type?: 'level0' | 'level1' | 'level2';
  subMenu?: IMenu[];
  items?: {id: number; label: string}[];
  to?: string;
}

const DashboardMenu = (props: any) => {
  const {isCollapsed, onCloseMobileSidebar} = props;
  const params = useRouterController((s) => s.params);
  const path = useRouterController((s) => s.path);

  const [menus, setMenus] = useState<any[]>([]);
  const {push} = useRouter();

  const {getItem: getApplications, data: applications} =
    useGetItem<any[]>('/applications/menu');

  const {getItem: getMyPermission, data: myPermission} = useGetItem<any>(
    '/tiers/permissionByPartnerId',
  );

  useEffect(() => {
    if (params && params?.partnerId) {
      getApplications();
      getMyPermission({
        partnerId: params?.partnerId,
      });
    }
  }, [params?.partnerId]);

  useEffect(() => {
    if (!isEmpty(applications) && !isEmpty(myPermission)) {
      const menu = applications.map((x) => ({
        id: x.id,
        label: x.name,
        type: 'level0',
        subMenu: chain(x.categories)
          .map((y) => {
            if (myPermission?.categoryPermission?.includes(y?.id))
              return {
                id: y.id,
                type: 'level1',
                label: y.name,
                to: `/partner/${params?.partnerId}/${x?.id}/${y?.id}`,
                subMenu: chain(y.groupings)
                  .map((z) => {
                    if (myPermission?.groupingPermission?.includes(z?.id)) {
                      return {
                        id: z.id,
                        type: 'level2',
                        label: z.name,
                        to: `/partner/${params?.partnerId}/${x?.id}/${y?.id}/${z?.id}`,
                        items: chain(z.products)
                          .map((k) => {
                            if (
                              myPermission?.productPermission?.includes(k?.id)
                            )
                              return {
                                to: `/partner/${params?.partnerId}/${x?.id}/${y?.id}/${z?.id}/${k?.id}`,
                                id: k.id,
                                label: k.name,
                              };
                          })
                          .compact()
                          .valueOf(),
                      };
                    }
                  })
                  .compact()
                  .valueOf(),
              };
          })
          .compact()
          .valueOf(),
      }));
      const menuIds = keyBy(menu, 'id');
      setMenus(menuIds[1]?.subMenu);
    }
  }, [applications, myPermission]);

  return (
    <>
      <UI.ScaleFade
        delay={0.1}
        hidden={isCollapsed}
        initialScale={0.9}
        in={!isCollapsed}>
        <UI.Box px={4} py={3}>
          <Select
            value={{
              value: 1,
              label: 'Security',
            }}
            placeholder="Line of Business"
            isClearable={false}
          />
        </UI.Box>
      </UI.ScaleFade>

      <SB.Menu>
        <SB.MenuItem
          onClick={() => {
            push(`/partner/${params?.partnerId}/1`);
            onCloseMobileSidebar?.();
          }}
          className={path === `/partner/${params?.partnerId}/1` ? 'active' : ''}
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
            {menus.map((x) => (
              <MenuLevel1
                onCloseMobileSidebar={onCloseMobileSidebar}
                x={x}
                key={x?.id}
              />
            ))}
          </SB.SubMenu>
        </SB.Menu>
      </UI.ScaleFade>
    </>
  );
};

export const MenuLevel1 = memo((props: any) => {
  const {x, onCloseMobileSidebar} = props;
  const {isOpen, onToggle} = UI.useDisclosure();
  const {push} = useRouter();
  const path = useRouterController((s) => s.path);

  return (
    <SB.SubMenu
      className={classNames('level1', {
        active: startsWith(path, x.to),
      })}
      open={isOpen}
      key={x.id}
      //@ts-ignore
      title={
        <UI.Text
          onClick={() => {
            push(x?.to);
            onCloseMobileSidebar?.();
          }}
          whiteSpace={'pre-wrap'}
          fontSize={'16px'}
          fontWeight={'semibold'}
          color={startsWith(path, x.to) ? '#000000' : '#6C6F84'}
          position={'relative'}>
          {x?.label === 'Access Control (Smart Locks)' ? (
            <span>
              Access Control
              <br />
              (Smart Locks)
            </span>
          ) : (
            x?.label
          )}
        </UI.Text>
      }
      suffix={
        <UI.Center
          transition={'0.3s'}
          transform={isOpen ? 'rotate(90deg)' : ''}
          onClick={() => onToggle()}
          p={1}>
          <HiChevronRight color={'#9097A9'} size={20} />{' '}
        </UI.Center>
      }
      icon={<AiOutlineAppstoreAdd size={25} />}>
      {x?.subMenu?.map?.((y, index) => (
        <MenuLevel2
          y={y}
          key={y.id}
          index={index}
          onCloseMobileSidebar={onCloseMobileSidebar}
          count={x?.subMenu?.length - 1}
        />
      ))}
    </SB.SubMenu>
  );
});

export const MenuLevel2 = memo((props: any) => {
  const {y, index, count, onCloseMobileSidebar} = props;
  const {isOpen, onToggle} = UI.useDisclosure();
  const {push} = useRouter();
  const path = useRouterController((s) => s.path);

  return (
    <SB.SubMenu
      open={isOpen}
      key={y.id}
      className={classNames('level2', {
        'lv2-last': index === count,
      })}
      suffix={
        <UI.Center
          transform={isOpen ? 'rotate(90deg)' : ''}
          transition={'0.3s'}
          onClick={() => onToggle()}
          p={1}>
          <HiChevronRight color={'#9097A9'} size={20} />
        </UI.Center>
      }
      icon={<UI.Box w={'20px'} h={'20px'} />}
      //@ts-ignore
      title={
        <UI.Text
          onClick={() => {
            push(y?.to);
            onCloseMobileSidebar?.();
          }}
          whiteSpace={'pre-wrap'}
          width={'90%'}
          fontSize={'16px'}
          fontWeight={'semibold'}
          color={startsWith(path, y.to) ? '#000000' : '#6C6F84'}
          position={'relative'}>
          {y?.label}
        </UI.Text>
      }>
      {y?.items?.map?.((z) => (
        <SB.MenuItem
          onClick={() => {
            push(z?.to);
            onCloseMobileSidebar?.();
          }}
          key={z.id}
          icon={<UI.Box w={'20px'} h={'20px'} />}>
          <UI.HStack>
            <GoPrimitiveDot
              color={startsWith(path, z.to) ? '#000000' : '#6C6F84'}
              size={10}
            />
            <UI.Text
              whiteSpace={'pre-wrap'}
              fontWeight={startsWith(path, z.to) ? 'semibold' : 'medium'}
              color={startsWith(path, z.to) ? '#000000' : '#6C6F84'}
              ml={0}>
              {z?.label}
            </UI.Text>
          </UI.HStack>
        </SB.MenuItem>
      ))}
    </SB.SubMenu>
  );
});
export default memo(DashboardMenu);
