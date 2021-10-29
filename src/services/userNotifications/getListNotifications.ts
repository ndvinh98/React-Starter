import {request} from '@services';

export const getListNotifications = ({
  page,
  limit,
  textSearch,
  filter,
}: {
  page?: number;
  limit?: number;
  textSearch?: string;
  filter?: string;
}): Promise<any> => {
  return request({
    method: 'GET',
    path: '/userNotifications',
    option: {
      qs: {
        page,
        limit,
        relations: JSON.stringify(['user']),
        textSearch,
        filter,
      },
    },
  }).then(([res, err]) => {
    if (err) {
      return null;
    }
    return res?.data?.data;
  });
};
