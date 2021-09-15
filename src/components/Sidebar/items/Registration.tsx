import React, {memo} from 'react';
import {AiOutlineAppstoreAdd} from 'react-icons/ai';
import {useRouter} from '@utils/hooks';
// import {useUIStore} from '@stores/UI';
import * as SB from 'react-pro-sidebar';
import * as UI from '@chakra-ui/react';

const Registration = ({onCloseMobileSidebar}: any) => {
  // const {checkMatched} = useUIStore();
  const {push} = useRouter();

  const ITEMS = [
    {
      id: 1,
      label: 'Section A',
      to: '/registration/section-a',
    },
    {
      id: 2,
      label: 'Section B',
      to: '/registration/section-b',
    },
    {
      id: 3,
      label: 'Section C',
      to: '/registration/section-c',
    },
    {
      id: 4,
      label: 'Attachments',
      to: '/registration/attachments',
    },
    {
      id: 5,
      label: 'Submission',
      to: '/registration/submission',
    },
  ];
  return (
    <SB.Menu>
      <SB.SubMenu
        defaultOpen
        // open={
        //   currentRoute?.path === '/registration/not-yet-accept'
        //     ? false
        //     : undefined
        // }
        // className={checkMatched({path: '/registration'}) ? 'active' : ''}
        // //@ts-ignore
        // title={
        //   <UI.Text
        //     fontWeight={
        //       checkMatched({path: '/registration'}) ? 'semibold' : 'medium'
        //     }
        //     position={'relative'}
        //     color={checkMatched({path: '/registration'}) ? '#000' : '#6C6F84'}>
        //     Registration
        //   </UI.Text>
        // }
        icon={<AiOutlineAppstoreAdd size={30} />}>
        {ITEMS.map((x, i) => (
          <SB.MenuItem
            onClick={() => {
              onCloseMobileSidebar();
              push(x.to);
            }}
            key={i}>
            <UI.Text
              pl={10}
              // fontWeight={
              //   checkMatched({path: x?.to, exact: true}) ? 'semibold' : 'medium'
              // }
              color={'ste.gray_light'}>
              {x.label}
            </UI.Text>
          </SB.MenuItem>
        ))}
      </SB.SubMenu>
    </SB.Menu>
  );
};
export default memo(Registration);
