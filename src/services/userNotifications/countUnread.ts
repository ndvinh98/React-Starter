import {request} from '@services';

export const countUnread = (): Promise<{count: number}> => {
  return request({
    method: 'GET',
    path: 'userNotifications/countUnread',
    // option: {
    //   qs: {
    //     filter: JSON.stringify([{notificationType: 'FILETRANSFERS'}])
    //   },
    // },
  }).then(([res, err]) => {
    if (err) {
      return null;
    }
    return res?.data?.data;
  });
};
