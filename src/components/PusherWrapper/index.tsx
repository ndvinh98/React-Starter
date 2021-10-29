import React from 'react';
import {useChannelStore, pusher} from '@modules/pusher';
import {useHomeController} from '@modules/home';

const channelFileTransfer = pusher.subscribe(
  'channel-user-received-file-transfer',
);

const PusherWrapper: React.FC = ({children}) => {
  const me = useHomeController((s) => s.me);
  const pushToFileTransfer = useChannelStore((s) => s.pushToFileTransfer);

  channelFileTransfer.bind(me?.id.toString(), function (event: any) {
    pushToFileTransfer(event);
  });

  return <>{children}</>;
};

export default PusherWrapper;
